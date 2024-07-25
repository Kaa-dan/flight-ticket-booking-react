import React from "react";
import FlightLogo from "../../../assets/booking/viewBookings/flightLogo.png";
const FlightTicket = () => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-md bg-white">
      <div className="flex items-center">
        <img
          src={FlightLogo}
          className="h-16 w-16 rounded-lg p-1 object-contain mr-4 border border-blue-700"
        />

        <div className="bg-yellow-400 flex gap-2 items-center ">
          <div className="flex justify-center items-center gap-1 ">
            <div>
              <div className="text-lg font-semibold">Destination 1</div>

              <div className="text-lg font-semibold">Destination 2</div>
            </div>
          </div>
          <div>----</div>
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-end">
              <div className="text-xl font-bold">12:00 pm</div>

              <div className="text-xl font-bold">6:00 pm</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <div className="text-center">
          <div className="text-sm text-gray-500">Date</div>
          <div className="font-medium">12-11-22</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">Gate</div>
          <div className="font-medium">A12</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">Flight time</div>
          <div className="font-medium">Newark(EWR)</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">Seat no.</div>
          <div className="font-medium">128</div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Download Ticket
        </button>
        <button className="bg-transparent border border-blue-500 text-blue-500 px-2 py-2 rounded-lg">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default FlightTicket;
