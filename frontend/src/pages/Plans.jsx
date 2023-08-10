import "./Plans.scss";
import Plan from "../components/Plan";
import { useLoaderData } from "react-router";
import { useState } from "react";

const Plans = () => {
  const { allPlans } = useLoaderData();
  const [planActive, setPlanActive] = useState("Monthly");

  const handlePlanChange = () => {
    if (planActive === "Monthly") setPlanActive("Yearly");
    else setPlanActive("Monthly");
  };

  return (
    <section className="plans__section">
      <aside className="plans__info">
        <p className="plans__info--duration" onClick={handlePlanChange}>
          <span className="plans__info--active">{planActive}</span>
          <span>Yearly</span>
        </p>
        <ul className="features__list">
          <li className="features__list--item">{planActive} Price</li>
          <li className="features__list--item">Video Quality</li>
          <li className="features__list--item">Resolution</li>
          <li className="features__list--item">Devices you can use to watch</li>
          <li className="features__list--item">No of devices</li>
        </ul>
      </aside>
      {allPlans.map((plan) => {
        return (
          <Plan
            key={plan._id}
            planName={plan["Plan Name"]}
            device={plan["Details"]["Devices"]}
            price={plan["Pricing"][planActive]["Price"]}
            quality={plan["Details"]["Video quality"]}
            res={plan["Details"]["Resolution"]}
            noDevices={plan["Details"]["Number of active screens"]}
          />
        );
      })}
    </section>
  );
};

export default Plans;

export const loader = async ({ request, params }) => {
  const response = await fetch("http://localhost:8080/plans");

  if (!response.ok) throw json({ message: "Server error occured" });

  return response;
};
