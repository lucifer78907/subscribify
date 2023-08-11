import { redirect, useLoaderData } from "react-router";
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
  const response = await fetch(
    "https://subsbackendrestapi-aff0ae7fe4b5.herokuapp.com/plans/" + userId
  );
  if (!response.ok) throw json({ message: "Server error" });
  return response;
};

export const action = async ({ request, params }) => {
  const { userId } = params;
  const response = await fetch(
    "https://subsbackendrestapi-aff0ae7fe4b5.herokuapp.com/plans/" + userId,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );

  if (!response.ok) return json({ message: "Server error" });

  return redirect(`/plans/${userId}`);
};

export default UserHome;
