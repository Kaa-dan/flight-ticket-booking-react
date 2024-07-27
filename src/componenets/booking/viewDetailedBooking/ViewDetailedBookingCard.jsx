import React from "react";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { BsDoorClosedFill } from "react-icons/bs";
import { IoIosTime } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import FlighFromToo from "../../../assets/booking/viewDetailedBookings/flight.svg";
import paymentFlight from "../../../assets/booking/viewDetailedBookings/paymentFlight.png";
import timeFormatChanger from "../../util/timeFormatChanger";
import dateDateFormatChanger from "../../util/dateDateFormatChanger";

const ViewDetailedBookingCard = ({ singleBookingData }) => {
  console.log({ singleBookingData });
  return (
    <div className="shadow-lg mt-4 border rounded-sm  ">
      <div className="mx-auto  rounded-lg shadow-md  p-7 ">
        <div className="flex justify-between items-center  bg-[#007EC4] p-4 rounded-t-xl text-white">
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/50"
              alt="Profile"
              className="h-16 w-16 rounded-full object-cover mr-4"
            />
            <div>
              <div className="text-xl font-bold">James Doe</div>
              <div className="text-sm ">ASKY-005</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold">Price</div>
            <div className="text-2xl font-bold">
              ₹{" "}
              {
                singleBookingData?.itemInfos.AIR.totalPriceInfo.totalFareDetail
                  .fC.TF
              }
              /-
            </div>
          </div>
        </div>
        {singleBookingData?.itemInfos?.AIR.tripInfos.map((value) => {

          console.log({ value })
          return <div className="border p-4 mb-4 my-2 bg-red-500">
            <div className="flex gap-2w-full p-1 ">
              <div className="  bg-[#D0E7F4] flex justify-center items-center gap-3 p-2 rounded-lg flex-col w-[40%]">
                <div className="w-full">
                  <div className="gap-4 flex ">
                    <div>
                      <img className="h-[60px]" src={paymentFlight} alt="" />
                    </div>
                    <div className=" py-2 flex flex-col justify-between">
                      <div className="flex flex-col gap-1">
                        <div className="text-slate-400">Economy</div>
                        <div className="font-semibold text-[1.2rem]">
                          Emirates A380 Airbus
                        </div>
                      </div>

                      {/* <div className="flex items-center gap-1 text-gray-300">
            <div className="border border-sky-300 px-2 py-1 rounded-lg text-black">
              4.3
            </div>
            |
            <div className="font-semibold text-md text-black">
              Very Good
            </div>
            |<div className="font-light text-black">reviews</div>
          </div> */}
                    </div>
                  </div>
                </div>
                <div className="flex w-full justify-between items-center gap-1">
                  <div className="w-1/3 flex flex-col gap-1">
                    <div className="text-sm font-light">
                      <span>{value.sI[0].da.city} </span>
                    </div>
                    <div className="font-semibold text-md">
                      <span>{value.sI[0].da.code}</span>
                    </div>
                    <div className="font-semibold text-[.8rem] ">
                      <span>{value.sI[0].da.name}</span>
                    </div>
                    <div className="text-sm font-light">
                      <span>{value.sI[0].da.country}</span>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <img className="h-6" src={FlighFromToo} alt="" />
                  </div>
                  <div className=" w-1/3 flex flex-col gap-1">
                    <div className="text-sm font-light">
                      <span>{value.sI.length === 1 ? value.sI[0].aa.city : value.sI[value.sI.length - 1].aa.city}</span>
                    </div>
                    <div className="font-semibold text-md">
                      <span>{value.sI.length === 1 ? value.sI[0].aa.code : value.sI[value.sI.length - 1].aa.code}</span>
                    </div>
                    <div className="font-semibold text-[.8rem]">
                      <span>{value.sI.length === 1 ? value.sI[0].aa.name : value.sI[value.sI.length - 1].aa.name}</span>
                    </div>
                    <div className="text-sm font-light">
                      <span>{value.sI.length === 1 ? value.sI[0].aa.country : value.sI[value.sI.length - 1].aa.country}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[60%]  flex flex-col justify-center p-4">
                <div className="flex justify-between mb-2">
                  <div className="flex  gap-1 items-center">
                    <div className="text-[1.5rem] text-white bg-[#0A2945] p-1 rounded-lg">
                      <MdDateRange />
                    </div>
                    <div className="">
                      <div className="text-[#495049] font-semibold">
                        {" "}
                        Departure Date
                      </div>
                      <div className="font-semibold">{dateDateFormatChanger(value.sI[0].dt)}</div>
                    </div>
                  </div>
                  <div className="flex  gap-1 items-center">
                    <div className="text-[1.5rem] text-white bg-[#0A2945] p-1 rounded-lg">
                      <IoIosTime />
                    </div>
                    <div className="">
                      <div className="text-[#495049] font-semibold">
                        {" "}
                        Departure Time
                      </div>
                      <div className="font-semibold">{timeFormatChanger(value.sI[0].dt)}</div>
                    </div>
                  </div>
                  <div className="flex  gap-1 items-center">
                    <div className="text-[1.5rem] text-white bg-[#0A2945] p-1 rounded-lg">
                      <IoIosTime />
                    </div>
                    <div className="">
                      <div className="text-[#495049] font-semibold">
                        {" "}
                        Departure Date
                      </div>
                      <div className="font-semibold">12/7/2024</div>
                    </div>
                  </div>
                </div>
                <div className=" flex justify-between ">
                  <div className="flex  gap-1 items-center  ">
                    <div className="text-[1.5rem] text-white bg-[#0A2945] p-1 rounded-lg">
                      <BsDoorClosedFill />
                    </div>
                    <div className="">
                      <div className="text-[#495049] font-semibold">
                        {" "}
                        Departure Date
                      </div>
                      <div className="font-semibold">12/7/2024</div>
                    </div>
                  </div>
                  <div className="flex  gap-1 items-center">
                    <div className="text-[1.5rem] text-white bg-[#0A2945] p-1 rounded-lg">
                      <BsDoorClosedFill />
                    </div>
                    <div className="">
                      <div className="text-[#495049] font-semibold">
                        {" "}
                        Departure Date
                      </div>
                      <div className="font-semibold">12/7/2024</div>
                    </div>
                  </div>
                  <div className="flex  gap-1 items-center">
                    <div className="text-[1.5rem] text-white bg-[#0A2945] p-1 rounded-lg">
                      <MdOutlineAirlineSeatReclineExtra />
                    </div>
                    <div className="">
                      <div className="text-[#495049] font-semibold">
                        {" "}
                        Departure Date
                      </div>
                      <div className="font-semibold">12/7/2024</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        })}


        <div className="flex justify-center">
          <div className="flex items-center text-white w-3/4 justify-between bg-[#253B59] p-3 rounded-lg">
            <div>Require to change plane</div>
            <div>Layover time: 01h 45m</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailedBookingCard;
