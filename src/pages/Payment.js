import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC);

const fetchCheckoutSession = async ({ productType, locale, propertyId, email }) => {
  return fetch(`${process.env.REACT_APP_API_URI}create-checkout-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productType,
      locale,
      propertyId,
      email,
    }),
  }).then((res) => res.json());
};

export default function Payment() {
  const { propertyId } = useParams();
  const { user } = useAuth0();

  const handleClick = async (tier) => {
    const { sessionId } = await fetchCheckoutSession({
      productType: tier,
      locale: "en",
      propertyId,
      email: user.email,
    });

    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });
    console.log(error.message);
  };

  // TODO: Design
  // check if property needs to be purchased (check date)
  // show date, if current give extension
  // shows prices from stripe API

  return (
    <div>
      <h4>Payment Page</h4>
      <div>
        <button
          role="link"
          onClick={() => handleClick("price_1HH1e9JTQgPl8Cr4ra0LcKc5")}
        >
          1 Month
        </button>
        <button
          role="link"
          onClick={() => handleClick("price_1HH1eXJTQgPl8Cr4GumkUINt")}
        >
          1 Year
        </button>
      </div>
    </div>
  );
}
