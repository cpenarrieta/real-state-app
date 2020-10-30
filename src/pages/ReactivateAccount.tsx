import React, { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { useAlert } from "../context/AlertContext";
import { useHistory } from "react-router-dom";

const ACTIVATE_ACCOUNT_MUTATION = gql`
  mutation ActivateAccount {
    activateAccount
  }
`;

export default function ReactivateAccount() {
  const { setShowAlert } = useAlert();
  const history = useHistory();
  const [activateAccount, { error }] = useMutation(ACTIVATE_ACCOUNT_MUTATION);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    }
  }, [error, setShowAlert]);

  return (
    <div className="bg-logoPink rounded-md">
      <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-logoFont md:text-4xl md:leading-10">
          <span className="block">Your account was deactivated.</span>
          <span className="block text-logoRed">
            No worries, activate your account now.
          </span>
        </h2>
        <div className="mt-8 flex lg:flex-shrink-0 lg:mt-0">
          <div className="inline-flex rounded-md shadow">
            <button
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-logoRed hover:bg-logoRed-500 transition duration-150 ease-in-out"
              onClick={async () => {
                await activateAccount();
                history.push("/dashboard");
              }}
            >
              Reactivate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
