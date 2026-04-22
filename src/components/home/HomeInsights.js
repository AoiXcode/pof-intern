import { MapPin, User } from "lucide-react"; // install if needed

export const HomeInsights = ({ lcases }) => {
  if (!lcases.length) return null;

  const latest = lcases[lcases.length - 1];

  const cityCount = {};
  lcases.forEach(c => {
    cityCount[c.city] = (cityCount[c.city] || 0) + 1;
  });

  const mostCity = Object.keys(cityCount).reduce((a, b) =>
    cityCount[a] > cityCount[b] ? a : b
  );

  return (
    <div className="home-insights">

      <div className="insight-card">
        <div className="icon"><MapPin size={18} /></div>
        <p>Most Affected</p>
        <h3>{mostCity}</h3>
      </div>

      <div className="insight-card">
        <div className="icon"><User size={18} /></div>
        <p>Latest Case</p>
        <h3>{latest.name}</h3>
      </div>

    </div>
  );
};