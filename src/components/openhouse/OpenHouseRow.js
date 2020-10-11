import React, { useState } from "react";
import DatePicker from "react-datepicker";

export default function OpenHouseRow() {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  return (
    <div className="col-span-6">
      <div className="flex justify-between text-sm leading-5 font-medium text-gray-900">
        <DatePicker
          selected={startTime}
          onChange={(d) => setStartTime(d)}
          dateFormat="MMMM d, yyyy h:mm aa"
          showTimeSelect
        />
        <div className="text-sm font-medium leading-5 text-gray-700">to</div>
        <DatePicker
          selected={endTime}
          onChange={(date) => setEndTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="h:mm aa"
          closeOnScroll={true}
        />
        <button className="text-red-600 hover:text-red-900" onClick={() => {}}>
          Remove
        </button>
      </div>
    </div>
  );
}
