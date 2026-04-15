
export default function Summary  ()  {
 const data = [
    { label: "Affected", value: 0, className: "affected" },
    { label: "Death", value: 0, className: "death" },
    { label: "Recovered", value: 0, className: "recovered" },
    { label: "Active", value: 0, className: "active" },
    { label: "Serious", value: 0, className: "serious" },
  ];

  return (
    <div className="summary-grid">
      {data.map((item, index) => (
        <div key={index} className={`card ${item.className}`}>
          <p>{item.label}</p>
          <h3>{item.value}</h3>
        </div>
      ))}
    </div>
  );
}


