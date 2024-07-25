import React from "react";
import { FaPlane } from "react-icons/fa";
import { HiOutlineDownload } from "react-icons/hi";
import Header from "../../componenets/home/Header";
import FlightTicket from "../../componenets/booking/viewBooking/FlightTickets";
const FlightBookings = () => {
  const bookings = [
    {
      airlineLogo: "https://via.placeholder.com/50",
      from: "Destination 1",
      to: "Destination 2",
      departureTime: "12:00 pm",
      arrivalTime: "6:00 pm",
      date: "12-11-22",
      flightTime: "Newark(EWR)",
      gate: "A12",
      seatNo: "128",
    },
    {
      airlineLogo: "https://via.placeholder.com/50",
      from: "Destination 1",
      to: "Destination 2",
      departureTime: "12:00 pm",
      arrivalTime: "6:00 pm",
      date: "12-11-22",
      flightTime: "Newark(EWR)",
      gate: "A12",
      seatNo: "128",
    },
    {
      airlineLogo: "https://via.placeholder.com/50",
      from: "Destination 1",
      to: "Destination 2",
      departureTime: "12:00 pm",
      arrivalTime: "6:00 pm",
      date: "12-11-22",
      flightTime: "Newark(EWR)",
      gate: "A12",
      seatNo: "128",
    },
  ];

  return (
    <div className=" bg-violet-400">
      <Header />
      <div className="mx-[7vw] my-5">
        <div className="flex justify-between items-center rounded-lg bg-red-800 mb-5 px-3 py-4">
          <div className="flex h-12 space-x-1 justify-between bg-slate-500 w-full">
            <button className="py-2 px-6 w-1/4 bg-blue-600 text-white ">
              Flights
            </button>
            <button className="py-2 w-1/4 px-6 bg-gray-200 text-gray-600 ">
              Helicopters
            </button>
            <button className="py-2 w-1/4 px-6 bg-gray-200 text-gray-600 ">
              Air Ambulance
            </button>
            <button className="py-2 w-1/4 px-6 bg-gray-200 text-gray-600 ">
              Charter Flight
            </button>
          </div>
        </div>
        <div className="flex justify-between h-10 items-center bg-yellow-500 mb-3 p-2 rounded-lg ">
          <div className="flex h-full w-full justify-between">
            <button className="py-2  w-1/3 px-6  text-white border-b-2 border-blue-900">
              Upcoming
            </button>
            <button className="py-2 w-1/3  px-6 bg-gray-200 text-gray-600 border-l-2 border-slate-300 ">
              Completed
            </button>
            <button className="py-2 w-1/3  px-6 bg-gray-200 text-gray-600 border-l-2 border-slate-300">
              Cancelled
            </button>
          </div>
        </div>
        <div className="bg-pink-500 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-3">
            <a href="">Bookings</a> / <a href="">Flights </a> /{" "}
            <a href="">Upcoming</a>
          </h2>
          <div className="flex flex-col gap-2">
            {bookings.map((booking, index) => (
              <FlightTicket />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightBookings;
