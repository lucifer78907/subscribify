import { useLoaderData } from "react-router";
import CurrentPlanCard from "../components/CurrentPlanCard";
import "../components/CurrentPlanCard.scss";
import { json } from "react-router";

const UserHome = () => {
  const { data } = useLoaderData();
  return (
    <section className="userhome">
      <h2 className="heading__secondary heading__secondary--billing">
        Plan Details
      </h2>
      <CurrentPlanCard
        lastUpdate={data.updatedAt}
        planDuration={data.planDuration}
        plan={data.plan}
      />
    </section>
  );
};

export const loader = async ({ params }) => {
  const { userId } = params;
  const response = await fetch("http://localhost:8080/plans/" + userId);
  if (!response.ok) throw json({ message: "Server error" });
  return response;
};

export default UserHome;
