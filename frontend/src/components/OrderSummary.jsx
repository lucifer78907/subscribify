import "./OrderSummary.scss";

const OrderSummary = ({ planData, duration }) => {
  return (
    <section>
      <h2 className="heading__secondary heading__secondary--plan">
        Order Summary
      </h2>
      <article className="order__details">
        <article className="order__detail">
          <p className="order__detail--title">Plan Name</p>
          <p className="order__detail--data">{planData["Plan Name"]}</p>
        </article>
        <article className="order__detail">
          <p className="order__detail--title">Billing Cycle</p>
          <p className="order__detail--data">{duration}</p>
        </article>
        <article className="order__detail">
          <p className="order__detail--title">Plan Price</p>
          <p className="order__detail--data">
            &#8377;
            {`${planData["Pricing"][duration]["Price"].split(" ")[0]}/${
              duration === "Monthly" ? "mo" : "yr"
            }`}
          </p>
        </article>
      </article>
    </section>
  );
};

export default OrderSummary;
