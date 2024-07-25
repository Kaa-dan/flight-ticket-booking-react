import React, { useEffect, useState } from "react";
import Header from "../../componenets/home/Header";
import FlightTicket from "../../componenets/booking/viewBooking/FlightTickets";
import axios from "axios";
import { useSelector } from "react-redux";

const FlightBookings = () => {
  const [bookingFilter, setBookingFilter] = useState("UPCOMING");
  const { token } = useSelector((state) => state.auth);
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(false);

  const bookings = [
    {
      id: 1,
      airlineLogo: "https://via.placeholder.com/50",
      from: "Destination 1",
      to: "Destination 2",
      departureTime: "12:00 pm",
      arrivalTime: "6:00 pm",
      date: "12-11-22",
      flightTime: "Newark(EWR)",
      gate: "A12",
      seatNo: "128",
      status: "UPCOMING",
    },
    {
      id: 2,
      airlineLogo: "https://via.placeholder.com/50",
      from: "Destination 1",
      to: "Destination 2",
      departureTime: "12:00 pm",
      arrivalTime: "6:00 pm",
      date: "12-11-22",
      flightTime: "Newark(EWR)",
      gate: "A12",
      seatNo: "128",
      status: "COMPLETED",
    },
    {
      id: 3,
      airlineLogo: "https://via.placeholder.com/50",
      from: "Destination 1",
      to: "Destination 2",
      departureTime: "12:00 pm",
      arrivalTime: "6:00 pm",
      date: "12-11-22",
      flightTime: "Newark(EWR)",
      gate: "A12",
      seatNo: "128",
      status: "CANCELLED",
    },
    ,
    {
      id: 4,
      airlineLogo: "https://via.placeholder.com/50",
      from: "Destination 1",
      to: "Destination 2",
      departureTime: "12:00 pm",
      arrivalTime: "6:00 pm",
      date: "12-11-22",
      flightTime: "Newark(EWR)",
      gate: "A12",
      seatNo: "128",
      status: "CANCELLED",
    },
  ];

  const filteredBookings = bookings.filter(
    (booking) => booking.status === bookingFilter
  );

  const getBookingData = async () => {
    try {
      let response;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      if (bookingFilter === "COMPLETED") {
        response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}user/completed-user-bookings`,
          config
        );
      } else if (bookingFilter === "CANCELLED") {
       
        response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}user/cancelled-user-bookings`,
          config
        );
      } else {
        response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}user/upcoming-user-bookings`,
          config
        );
      }

   
      if (response.status === 200) {
        setBookingData(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getBookingData();
  }, [bookingFilter]);
  return (
    <div className="bg-gray-100">
      <Header />
      <div className="mx-[5vw] my-5 bg-white p-[2vw] rounded-md">
        <div className="flex justify-between items-center rounded-lg mb-5 px-3 py-4 border">
          <div className="flex h-12 space-x-[1px] justify-between bg-slate-300 w-full">
            <button className="py-2 px-6 w-1/4 bg-blue-600 text-white">
              Flights
            </button>
            <button className="py-2 w-1/4 px-6 bg-white text-gray-600">
              Helicopters
            </button>
            <button className="py-2 w-1/4 px-6 bg-white text-gray-600">
              Air Ambulance
            </button>
            <button className="py-2 w-1/4 px-6 bg-white text-gray-600">
              Charter Flight
            </button>
          </div>
        </div>
        <div className="flex justify-between h-10 items-center mb-3 p-2 rounded-lg border ">
          <div className="flex h-full w-full  justify-between">
            <button
              className={`py-2 w-1/3 px-6 text-gray-600 border-b-2 ${
                bookingFilter === "UPCOMING"
                  ? "border-blue-600"
                  : "border-transparent"
              }`}
              onClick={() => setBookingFilter("UPCOMING")}
            >
              Upcoming
            </button>
            <button
              className={`py-2 w-1/3 px-6 text-gray-600 border-l-2 border-l-slate-300 border-b-2 ${
                bookingFilter === "COMPLETED"
                  ? "border-blue-600"
                  : "border-transparent"
              }`}
              onClick={() => setBookingFilter("COMPLETED")}
            >
              Completed
            </button>
            <button
              className={`py-2 w-1/3 px-6 border-l-2 border-l-slate-300 text-gray-600 border-b-2 ${
                bookingFilter === "CANCELLED"
                  ? "border-blue-600"
                  : "border-transparent"
              } `}
              onClick={() => setBookingFilter("CANCELLED")}
            >
              Cancelled
            </button>
          </div>
        </div>
        <div className="px-4 pt-3 pb-7 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-3">
            <a href="">Bookings</a> / <a href="">Flights </a> /{" "}
            <a href="">{bookingFilter}</a>
          </h2>
          <div className="flex flex-col gap-2">
            {bookingData.length > 0 ? (
              bookingData?.map((booking) => (
                <FlightTicket key={booking.id} booking={booking} />
              ))
            ) : (
              <p>No {bookingFilter.toLowerCase()} bookings.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightBookings;
