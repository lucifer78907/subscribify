import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "../components/CheckoutForm";
import { useParams } from "react-router";

const Billing = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const { selectedPlan, duration } = useParams();

  useEffect(() => {
    async function f1() {
      const response = await fetch(
        "https://subsbackendrestapi-aff0ae7fe4b5.herokuapp.com/config"
      );
      const { publishableKey } = await response.json();
      setStripePromise(loadStripe(publishableKey));
    }
    f1();
  }, []);

  useEffect(() => {
    async function f2() {
      const response = await fetch(
        "https://subsbackendrestapi-aff0ae7fe4b5.herokuapp.com/create-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ selectedPlan, duration }),
        }
      );
      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);
    }
    f2();
  }, []);

  return (
    <>
      <h2 className="heading__secondary heading__secondary--billing">
        Complete Payment
      </h2>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Billing;
