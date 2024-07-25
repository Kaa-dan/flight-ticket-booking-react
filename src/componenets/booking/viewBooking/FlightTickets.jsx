import React from "react";
import FlightLogo from "../../../assets/booking/viewBookings/flightLogo.png";
import { MdOutlineDateRange } from "react-icons/md";
import { BsDoorClosedFill } from "react-icons/bs";
import { IoIosTime } from "react-icons/io";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
const FlightTicket = () => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-md bg-white">
      <div className="flex items-center">
        <img
          src={FlightLogo}
          className="h-16 w-16 rounded-lg p-1 object-contain mr-4 border border-blue-700"
        />

        <div className=" flex gap-3 items-center ">
          <div className="flex justify-center items-center gap-1 ">
            <div>
              <div className="text-lg font-semibold">Destination 1</div>

              <div className="text-lg font-semibold">Destination 2</div>
            </div>
          </div>
          <div className="border w-6 border-black"></div>
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-end">
              <div className="text-xl font-bold">12:00 pm</div>

              <div className="text-xl font-bold">6:00 pm</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center  space-x-6 ">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <div className="text-[1.5rem] text-sky-600 bg-slate-300 p-1 rounded-md">
              <MdOutlineDateRange />
            </div>
            <div>
              <div className="text-sm text-gray-500">Date</div>
              <div className="font-medium">12-11-22</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="text-[1.5rem] text-sky-600 bg-slate-300 p-1 rounded-md">
              <IoIosTime />
            </div>
            <div>
              <div className="text-sm text-gray-500">Flight time</div>
              <div className="font-medium">Newark</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 ">
            <div className="text-[1.5rem] text-sky-600 bg-slate-300 p-1 rounded-md">
              <BsDoorClosedFill />
            </div>
            <div>
              <div className="text-sm text-gray-500">Gate</div>
              <div className="font-medium">A12</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="text-[1.5rem] text-sky-600 bg-slate-300 p-1 rounded-md">
              <MdAirlineSeatReclineExtra />
            </div>
            <div>
              <div className="text-sm text-gray-500">Seat no</div>
              <div className="font-medium">128</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="bg-[#007EC4] text-white px-4 py-2 rounded-sm">
          Download Ticket
        </button>
        <button className="bg-transparent border border-[#007EC4] t px-4 py-2 rounded-sm">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default FlightTicket;
