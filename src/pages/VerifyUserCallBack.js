import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { Redirect } from "react-router-dom";
import { useAccessToken } from "../context/AccessTokenContext";

const VERIFY_USER_MUTATION = gql`
  mutation VerifyUser {
    verifyUser
  }
`;

export default function VerifyUserCallBack() {
  const [finished, setFinished] = useState(null);
  const { accessToken } = useAccessToken();
  const [verifyUser] = useMutation(VERIFY_USER_MUTATION);

  useEffect(() => {
    async function verifyUserFunction() {
      const response = await verifyUser();
      setFinished(response?.data?.verifyUser);
    }

    if (accessToken) {
      verifyUserFunction();
    }
  }, [verifyUser, accessToken]);

  if (finished === "existing") {
    return <Redirect to="/dashboard" />;
  } else if (finished === "new") {
    return <Redirect to="/onboarding" />;
  } else if (finished === "inactive") {
    return <Redirect to="/reactivate_account" />;
  }

  return <div>loading...</div>;
}
