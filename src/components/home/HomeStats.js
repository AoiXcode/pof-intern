export const HomeStats = ({ lcases }) => {

  const total = lcases.length;

  const active = lcases.filter(c => c.case === 4).length;
  const death = lcases.filter(c => c.case === 2).length;

  return (
    <div className="home-stats">

      <div className="stat-card total">
        <p>Total</p>
        <h3>{total}</h3>
      </div>

      <div className="stat-card active">
        <p>Active</p>
        <h3>{active}</h3>
      </div>

      <div className="stat-card death">
        <p>Deaths</p>
        <h3>{death}</h3>
      </div>

    </div>
  );
};