import { useState, FormEvent } from "react";
import { createLink } from "../api/linkApi";

interface Props {
  onCreated: () => void;
}

const CreateLinkForm = ({ onCreated }: Props) => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setShortUrl(null);
    setLoading(true);

    try {
      const result = await createLink(originalUrl);
      setShortUrl(result.shortUrl);
      setOriginalUrl("");
      onCreated();
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Failed to create short link";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Create a short link</h2>
      <form onSubmit={handleSubmit} className="create-form">
        <input
          type="text"
          placeholder="https://example.com/my-long-url"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}

      {shortUrl && (
        <p className="success-text">
          Short URL:{" "}
          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
};

export default CreateLinkForm;
