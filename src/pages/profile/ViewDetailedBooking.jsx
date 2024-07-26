import React from "react";
import { CiSaveDown1 } from "react-icons/ci";
import ViewDetailedBookingCard from "../../componenets/booking/viewDetailedBooking/ViewDetailedBookingCard";
import paymentFlight from "../../assets/booking/viewDetailedBookings/paymentFlight.png";
const ViewDetailedBooking = () => {
  return (
    <div className="  mx-[5vw]">
      <div className="  flex gap-2 w-full">
        <div className="w-[75%]  flex flex-col ">
          <div className=" bg-[#007EC4] flex justify-between items-center text-white rounded-xl px-2  py-4">
            <div className="text-[1.3rem] font-bold">Ticket booking</div>
            <div className="">
              <button className="bg-white flex justify-center items-center text-[#007EC4] p-2 w-[200px] rounded-lg">
                <CiSaveDown1 />
                Download ticket
              </button>
            </div>
          </div>
          <div className="">
            <ViewDetailedBookingCard />
          </div>
        </div>
        <div className="w-[25%] flex flex-col gap-3  p-5 rounded-lg shadow-lg  border">
          <div className="gap-4 flex ">
            <div>
              <img src={paymentFlight} alt="" />
            </div>
            <div className=" py-2 flex flex-col justify-between">
              <div className="flex flex-col gap-1">
                <div className="text-slate-400">Economy</div>
                <div className="font-semibold text-[1.2rem]">
                  Emirates A380 Airbus
                </div>
              </div>

              <div className="flex items-center gap-1 text-gray-300">
                <div className="border border-sky-300 px-2 py-1 rounded-lg text-black">
                  4.3
                </div>
                |
                <div className="font-semibold text-md text-black">
                  Very Good
                </div>
                |<div className="font-light text-black">reviews</div>
              </div>
            </div>
          </div>
          <div className="border-y py-4 text-[1rem]">
            <h2 className="font-montserrat">
              Your booking is protected by{" "}
              <span className="font-semibold">MY AIR DEAL</span>{" "}
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-bold">Price Details</div>
            <div className=" flex flex-col gap-2 ">
              <div className="flex justify-between">
                <div>Base Fare</div>
                <div>5600</div>
              </div>
              <div className="flex justify-between">
                <div>Discount</div>
                <div>600</div>
              </div>
              <div className="flex justify-between">
                <div>Taxes</div>
                <div>1400</div>
              </div>
              <div className="flex justify-between">
                <div>Service Fee</div>
                <div>400</div>
              </div>
            </div>

            <div className=" flex justify-between pt-3 border-t">
              <div>Total</div>
              <div>$ 6800</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailedBooking;
