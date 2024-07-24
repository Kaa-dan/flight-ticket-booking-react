import React from "react";
import { FaPlane } from "react-icons/fa";
import { HiOutlineDownload } from "react-icons/hi";
import Header from "../../componenets/home/Header";

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
      <div className="mx-[7vw] my-10">
        <div className="flex justify-between items-center rounded-lg bg-red-800 mb-6 p-5">
          <div className="flex h-16 space-x-4 justify-between bg-slate-500 w-full">
            <button className="py-2 px-6 w-1/4 bg-blue-600 text-white rounded-lg">
              Flights
            </button>
            <button className="py-2 w-1/4 px-6 bg-gray-200 text-gray-600 rounded-lg">
              Helicopters
            </button>
            <button className="py-2 w-1/4 px-6 bg-gray-200 text-gray-600 rounded-lg">
              Air Ambulance
            </button>
            <button className="py-2 w-1/4 px-6 bg-gray-200 text-gray-600 rounded-lg">
              Charter Flight
            </button>
          </div>
        </div>
        <div className="flex justify-between h-12 items-center bg-yellow-500 mb-4 p-2 rounded-lg ">
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
          <h2 className="text-xl font-bold mb-4">
            Bookings / Flights / Upcoming
          </h2>
          {bookings.map((booking, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 p-4 mb-4 rounded-lg border"
            >
              <div className="flex items-center">
                <img
                  src={booking.airlineLogo}
                  alt="Airline Logo"
                  className="w-16 h-16 mr-4"
                />
                <div className="text-left">
                  <div className="font-bold text-lg">{booking.from}</div>
                  <div className="text-gray-600">{booking.departureTime}</div>
                  <FaPlane className="mx-auto my-2 text-blue-500" />
                  <div className="font-bold text-lg">{booking.to}</div>
                  <div className="text-gray-600">{booking.arrivalTime}</div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <div className="text-center md:text-left">
                  <div className="text-gray-500">Date</div>
                  <div>{booking.date}</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-gray-500">Flight time</div>
                  <div>{booking.flightTime}</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-gray-500">Gate</div>
                  <div>{booking.gate}</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-gray-500">Seat no.</div>
                  <div>{booking.seatNo}</div>
                </div>
                <button className="flex items-center py-2 px-4 bg-blue-600 text-white rounded-lg">
                  <HiOutlineDownload className="mr-2" />
                  Download Ticket
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightBookings;
