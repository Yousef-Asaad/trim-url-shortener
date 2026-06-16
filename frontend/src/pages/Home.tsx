import { useEffect, useState, useCallback } from "react";
import CreateLinkForm from "../components/CreateLinkForm";
import LinkTable from "../components/LinkTable";
import { getLinks } from "../api/linkApi";
import { Link } from "../types/link";

const Home = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLinks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getLinks();
      setLinks(data);
      setError(null);
    } catch {
      setError("Failed to load links");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  return (
    <div className="page">
      <h1>Trim - URL Shortener</h1>
      <CreateLinkForm onCreated={fetchLinks} />
      {loading && <p>Loading links...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && <LinkTable links={links} />}
    </div>
  );
};

export default Home;
