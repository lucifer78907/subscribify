import "../pages/Plans";

const Plan = (props) => {
  return (
    <article className="plans">
      <article className="plans__plan">
        <div className="plans__box">
          <p className="plans__name">{props.planName}</p>
        </div>
        <ul className="plans__details">
          <li className="plans__detail">{props.price}</li>
          <li className="plans__detail">{props.quality}</li>
          <li className="plans__detail">{props.res}</li>
          <li className="plans__detail">{props.device.join("+")}</li>
          <li className="plans__detail">{props.noDevices}</li>
        </ul>
      </article>
    </article>
  );
};

export default Plan;
