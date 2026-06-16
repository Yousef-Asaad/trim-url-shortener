import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import AnalyticsCard from "../components/AnalyticsCard";
import { getAnalytics } from "../api/linkApi";
import { Analytics as AnalyticsType } from "../types/link";

const Analytics = () => {
  const { id } = useParams<{ id: string }>();
  const [analytics, setAnalytics] = useState<AnalyticsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getAnalytics(id);
        setAnalytics(data);
        setError(null);
      } catch (err: any) {
        const message =
          err?.response?.data?.message || "Failed to load analytics";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [id]);

  return (
    <div className="page">
      <RouterLink to="/" className="back-link">
        ← Back to links
      </RouterLink>
      <h1>Link Analytics</h1>
      {loading && <p>Loading analytics...</p>}
      {error && <p className="error-text">{error}</p>}
      {analytics && <AnalyticsCard analytics={analytics} />}
    </div>
  );
};

export default Analytics;
