import "../pages/Plans";

const Plan = (props) => {
  let planClassName = `plans__box ${
    props.selectedPlan === props.planName ? "plans__box--active" : ""
  }`;

  const handleClick = () => {
    props.changeActivePlan(props.planName);
  };

  return (
    <article className="plans" onClick={handleClick}>
      <article className="plans__plan">
        <div className={planClassName}>
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
