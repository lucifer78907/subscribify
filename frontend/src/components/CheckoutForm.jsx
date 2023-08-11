import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useLoaderData, useParams } from "react-router";
import "./CheckoutForm.scss";
import OrderSummary from "./OrderSummary";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [planData] = useLoaderData();
  const { duration, userId, selectedPlan } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `http://localhost:8080/plans/${userId}/${selectedPlan}/${duration}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    const data = await response.json();

    console.log("Works", data);

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/activePlan`,
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="checkout__form">
        <PaymentElement />
        <button
          disabled={!stripe}
          className="checkout__button checkout__button--billing"
        >
          Confirm Payment
        </button>
      </form>
      <OrderSummary planData={planData} duration={duration} />
    </>
  );
};

export const loader = async ({ request, params }) => {
  const response = await fetch(
    "http://localhost:8080/plan/" + params.selectedPlan
  );

  if (!response.ok) throw json({ message: "Server Error" });

  return response;
};

export default CheckoutForm;
