import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "../components/CheckoutForm";

const Billing = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    async function f1() {
      const response = await fetch("http://localhost:8080/config");
      const { publishableKey } = await response.json();
      setStripePromise(loadStripe(publishableKey));
    }
    f1();
  }, []);

  useEffect(() => {
    async function f2() {
      const response = await fetch("http://localhost:8080/create-payment", {
        method: "POST",
        body: JSON.stringify({}),
      });
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
