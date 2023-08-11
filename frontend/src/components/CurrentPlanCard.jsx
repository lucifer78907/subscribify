import "./CurrentPlanCard.scss";

const CurrentPlanCard = ({ lastUpdate, planDuration, plan }) => {
  const currDate = new Date(lastUpdate);
  const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    hour12: false,
    timeZone: "Asia/Kolkata",
  });
  const date = formatter.format(currDate);
  let futureDate;
  if (planDuration === "Monthly") {
    futureDate = currDate.setMonth(currDate.getMonth() + 1);
    futureDate = formatter.format(futureDate);
  } else {
    futureDate = currDate.setFullYear(currDate.getFullYear() + 1);
    futureDate = formatter.format(futureDate);
  }

  return (
    <article className="currentplan">
      <header className="currentplan__header">
        <p className="currentplan__header--para">
          Current Plan Details <span>Active</span>
        </p>
        <button className="currentplan__header--button">Cancel</button>
      </header>
      <main className="currentplan__main">
        <ul className="currentplan__details">
          <li className="currentplan__details--plan">{plan["Plan Name"]}</li>
          <li className="currentplan__details--device">
            {plan["Details"]["Devices"].join("+")}
          </li>
          <li className="currentplan__details--price">
            <span>
              &#8377; {plan["Pricing"][planDuration]["Price"].split(" ")[0]}
            </span>
            /{planDuration === "Monthly" ? "mo" : "yr"}
          </li>
        </ul>
        <button className="currentplan__main--button">Change Plan</button>
        <p className="currentplan__main--para">
          Your subscription has started on {date} and will autorenew on{" "}
          {futureDate}
        </p>
      </main>
    </article>
  );
};

export default CurrentPlanCard;
