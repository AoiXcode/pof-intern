import { MapPin, User } from "lucide-react";

export const HomeInsights = ({ lcases }) => {
  if (!lcases || lcases.length === 0) return null;

  // 🔥 ALWAYS get latest by date (reliable)
  const latest = [...lcases].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )[0];

  // 🏙️ city counter
  const cityCount = lcases.reduce((acc, curr) => {
    acc[curr.city] = (acc[curr.city] || 0) + 1;
    return acc;
  }, {});

  // 🔥 most affected city
  const mostCity =
    Object.keys(cityCount).length > 0
      ? Object.keys(cityCount).reduce((a, b) =>
          cityCount[a] > cityCount[b] ? a : b
        )
      : "-";

  return (
    <div className="home-insights">

      <div className="insight-card">
        <div className="icon">
          <MapPin size={18} />
        </div>
        <p>Most Affected</p>
        <h3>{mostCity}</h3>
      </div>

      <div className="insight-card">
        <div className="icon">
          <User size={18} />
        </div>
        <p>Latest Case</p>
        <h3>{latest?.name || "-"}</h3>
      </div>

    </div>
  );
};