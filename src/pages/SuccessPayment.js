import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAccessToken } from "../context/AccessTokenContext";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SuccessPayment = () => {
  const { accessToken } = useAccessToken();
  const [session, setSession] = useState({});
  const query = useQuery();
  const sessionId = query.get("session_id");
  const propertyId = query.get("propertyId");

  useEffect(() => {
    async function fetchSession() {
      setSession(
        await fetch(
          `${process.env.REACT_APP_API_URI}checkout-session?sessionId=${sessionId}`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          }
        ).then((res) => res.json())
      );
    }
    fetchSession();
  }, [sessionId, accessToken]);

  return (
    <div className="">
      <div className="">
        <header className="">
          <div className=""></div>
        </header>
        <div className="">
          <Link to={`/manage-property/${propertyId}`}>Back To Property</Link>
          <h1>Your payment succeeded - {propertyId}</h1>
          <h4>View CheckoutSession response:</h4>
        </div>
        <div className="">
          <div className="">
            <pre>{JSON.stringify(session, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
