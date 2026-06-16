import { Analytics } from "../types/link";

interface Props {
  analytics: Analytics;
}

const AnalyticsCard = ({ analytics }: Props) => {
  return (
    <div>
      <div className="card">
        <h2>Total Clicks</h2>
        <p className="total-clicks">{analytics.totalClicks}</p>
      </div>

      <div className="card">
        <h2>Clicks Per Day</h2>
        {analytics.clicksPerDay.length === 0 ? (
          <p>No clicks yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Clicks</th>
              </tr>
            </thead>
            <tbody>
              {analytics.clicksPerDay.map((row) => (
                <tr key={row.date}>
                  <td>{row.date}</td>
                  <td>{row.clicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="card">
        <h2>Top Referrers</h2>
        {analytics.topReferrers.length === 0 ? (
          <p>No referrer data yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Referrer</th>
                <th>Clicks</th>
              </tr>
            </thead>
            <tbody>
              {analytics.topReferrers.map((row) => (
                <tr key={row.referrer}>
                  <td>{row.referrer}</td>
                  <td>{row.clicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AnalyticsCard;
