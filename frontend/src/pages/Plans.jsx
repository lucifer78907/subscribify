import "./Plans.scss";
import Plan from "../components/Plan";
import { useLoaderData, useNavigate, useParams } from "react-router";
import { useState } from "react";

const Plans = () => {
  const { allPlans } = useLoaderData();
  const [planActive, setPlanActive] = useState("Monthly");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();

  const handlePlanChange = () => {
    if (planActive === "Monthly") setPlanActive("Yearly");
    else setPlanActive("Monthly");
  };

  const changeActivePlan = (planName) => {
    setSelectedPlan(planName);
  };

  const formSubmiHandler = (e) => {
    e.preventDefault();
    if (selectedPlan !== null) {
      navigate(`/billing/${userId}/${planActive}/${selectedPlan}`);
    }
  };

  return (
    <form className="main" onSubmit={formSubmiHandler}>
      <main className="plans__section">
        <aside className="plans__info">
          <p className="plans__info--duration" onClick={handlePlanChange}>
            <span className="plans__info--active">{planActive}</span>
          </p>
          <p className="plans__info--para">
            Click to see{" "}
            <span>{planActive === "Monthly" ? "Yearly" : "Monthly"}</span> plans
          </p>
          <ul className="features__list">
            <li className="features__list--item">{planActive} Price</li>
            <li className="features__list--item">Video Quality</li>
            <li className="features__list--item">Resolution</li>
            <li className="features__list--item">
              Devices you can use to watch
            </li>
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
              selectedPlan={selectedPlan}
              changeActivePlan={changeActivePlan}
            />
          );
        })}
      </main>
      <button
        disabled={selectedPlan === null ? true : false}
        className="plans__button"
      >
        Next
      </button>

      {selectedPlan === null && (
        <p className="confirm">Please select a plan to continue</p>
      )}
    </form>
  );
};

export default Plans;

export const loader = async () => {
  const response = await fetch("http://localhost:8080/plans");

  if (!response.ok) throw json({ message: "Server error occured" });

  return response;
};
