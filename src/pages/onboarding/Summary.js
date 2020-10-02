import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { useAlert } from "../../context/AlertContext";

const COMPLETE_MUTATION = gql`
  mutation CompleteOnboarding {
    completeOnboarding
  }
`;

const NEW_PROPERTY_MUTATION = gql`
  mutation SaveProperty {
    saveProperty {
      uuid
    }
  }
`;

export default function Summary({ readyForDone }) {
  const history = useHistory();
  const { setShowAlert } = useAlert();
  const [completeOnboarding] = useMutation(COMPLETE_MUTATION, {
    refetchQueries: ["MeQuery"],
    awaitRefetchQueries: true,
  });
  const [saveProperty, { error: savePropertyError }] = useMutation(
    NEW_PROPERTY_MUTATION
  );

  useEffect(() => {
    if (savePropertyError) {
      setShowAlert(true);
    }
  }, [savePropertyError, setShowAlert]);

  if (!readyForDone) {
    history.goBack();
  }

  return (
    <div className="bg-white">
      <div className="max-w-screen-xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
          You are ready to create your first Property! <span>🎉</span>
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <button
              onClick={async () => {
                const response = await completeOnboarding();

                if (response?.data?.completeOnboarding) {
                  const propertyResponse = await saveProperty({
                    variables: {
                      property: {
                        uuid: null,
                      },
                    },
                  });

                  const propertyUuid =
                    propertyResponse?.data?.saveProperty?.uuid;

                  if (propertyUuid) {
                    history.push(`/manage-property/${propertyUuid}`);
                  }
                }
              }}
              className="inli ne-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
              Create your first Property
            </button>
          </div>
          <div className="ml-3 inline-flex">
            <button
              onClick={async () => {
                const response = await completeOnboarding();

                if (response?.data?.completeOnboarding) {
                  history.push("/dashboard");
                }
              }}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline focus:border-indigo-300 transition duration-150 ease-in-out"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
