import React, { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import DatePickerFormik from "./DatePickerFormik";
import { useAlert } from "../../context/AlertContext";
import { OPEN_HOUSE_QUERY } from "../../queries/getOpenHouse";

const DELETE_OPEN_HOUSE_MUTATION = gql`
  mutation DeleteOpenHouse($id: Int!) {
    deleteOpenHouse(id: $id)
  }
`;

export default function OpenHouseRow({ id, index, remove, uuid }) {
  const [deleteOpenHouse, { error }] = useMutation(DELETE_OPEN_HOUSE_MUTATION, {
    refetchQueries: [
      {
        query: OPEN_HOUSE_QUERY,
        variables: { uuid },
      },
    ],
    awaitRefetchQueries: true,
  });
  const { setShowAlert } = useAlert();

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    }
  }, [error, setShowAlert]);

  return (
    <div className="col-span-6 py-3 px-6">
      <div className="flex justify-between text-sm leading-5 font-medium text-logoFont">
        <DatePickerFormik
          name={`openHouseDates.${index}.date`}
          dateFormat="MMMM d, yyyy"
          placeholderText="Click to select a date"
        />

        <DatePickerFormik
          name={`openHouseDates.${index}.start`}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="h:mm aa"
          closeOnScroll={true}
          placeholderText="Click to select a time"
        />

        <DatePickerFormik
          name={`openHouseDates.${index}.end`}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="h:mm aa"
          closeOnScroll={true}
          placeholderText="Click to select a time"
        />

        <button
          className="text-red-600 hover:text-red-900"
          onClick={async (e) => {
            e.preventDefault();
            if (id && id > 0) {
              await deleteOpenHouse({
                variables: {
                  id,
                },
              });
            }
            remove(index);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
