import React from "react";
import { useHistory } from "react-router-dom";

export default function EmailVerify({ email, emailVerified }) {
  const history = useHistory();

  if (!emailVerified) {
    return (
      <div className="bg-white">
        <div className="max-w-screen-xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-logoFont sm:text-4xl sm:leading-10">
            Confirm your account
          </h2>
          <h5 className="text-lg text-logoFont mt-5">
            We need to verify <span className="text-green-500">{email}</span>{" "}
            before continuing.
            <br />
            Please check your inbox and follow instructions to confirm your
            email.
          </h5>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-screen-xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-logoFont sm:text-4xl sm:leading-10">
          Great! <span className="text-green-500">{email}</span> is verified.
          <br />
          You're almost ready to create your first Property.
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <button
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-logoRed hover:bg-logoRed-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              onClick={() => history.push("/onboarding/summary")}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
