import "../pages/Plans";

const Plan = (props) => {
  return (
    <article className="plans">
      <article className="plans__plan">
        <div className="plans__box">
          <p className="plans__name">Mobile</p>
        </div>
        <ul className="plans__details">
          <li className="plans__detail">100</li>
          <li className="plans__detail">Good</li>
          <li className="plans__detail">480p</li>
          <li className="plans__detail">Phone, Tablet</li>
        </ul>
      </article>
    </article>
  );
};

export default Plan;
