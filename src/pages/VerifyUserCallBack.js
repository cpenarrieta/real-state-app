import React, { useState, useEffect, useCallback } from "react";
import { useMutation, gql } from "@apollo/client";
import { Redirect } from "react-router-dom";

const VERIFY_USER_MUTATION = gql`
  mutation VerifyUser {
    verifyUser
  }
`;

export default function VerifyUserCallBack() {
  const [finished, setFinished] = useState(false);
  const [verifyUser] = useMutation(VERIFY_USER_MUTATION);

  useEffect(() => {
    async function verifyUserFunction() {
      await verifyUser();
      setFinished(true);
    }
    verifyUserFunction();
  }, [verifyUser]);

  if (finished) {
    return <Redirect to="/dashboard" />;
  }

  return <div>loading...</div>;
}
