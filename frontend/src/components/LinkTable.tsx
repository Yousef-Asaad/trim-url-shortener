import { useNavigate } from "react-router-dom";
import { Link } from "../types/link";

interface Props {
  links: Link[];
}

const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:5000";

const LinkTable = ({ links }: Props) => {
  const navigate = useNavigate();

  if (links.length === 0) {
    return <p>No links created yet.</p>;
  }

  return (
    <div className="card">
      <h2>Your Links</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Original URL</th>
              <th>Short URL</th>
              <th>Clicks</th>
              <th>Analytics</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <tr key={link.id}>
                <td className="truncate">{link.originalUrl}</td>
                <td>
                  <a
                    href={`${API_BASE_URL}/${link.shortCode}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {`${API_BASE_URL}/${link.shortCode}`}
                  </a>
                </td>
                <td>{link.clicks}</td>
                <td>
                  <button onClick={() => navigate(`/analytics/${link.id}`)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LinkTable;
