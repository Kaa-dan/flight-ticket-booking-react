import React, { useEffect, useState } from "react";
import { CiSaveDown1 } from "react-icons/ci";
import ViewDetailedBookingCard from "../../componenets/booking/viewDetailedBooking/ViewDetailedBookingCard";

import { useLocation } from "react-router-dom";
import { getQueryParams } from "../../componenets/util/getQueryParams";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaAngleDoubleDown } from "react-icons/fa";

const ViewDetailedBooking = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const [singleBookingData, setSingleBookingData] = useState(null);

  const queryParams = getQueryParams(location.search);
  console.log(singleBookingData);
  const { bookingId } = queryParams;
  console.log(bookingId);
  const getSingleTicketDetailHandler = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}booking/retrieve-booking`,
        { bookingId }, // Body of the request
        {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization header
          },
        }
      );

      setSingleBookingData(response.data.data);

      console.log({ response });
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    getSingleTicketDetailHandler();
  }, [bookingId]);

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
            <ViewDetailedBookingCard singleBookingData={singleBookingData} />
          </div>
        </div>
        <div className="w-[25%] flex flex-col gap-3  p-5 rounded-lg shadow-lg  border">
          <div className="border-y py-4 text-[1rem]">
            <h2 className="font-montserrat">
              Your booking is protected by{" "}
              <span className="font-semibold">MY AIR DEAL</span>{" "}
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-bold">Price Details</div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <div>Base Fare</div>
                <div>
                  {
                    singleBookingData?.itemInfos.AIR.totalPriceInfo
                      .totalFareDetail.fC.BF
                  }
                </div>
              </div>
              <div className="flex flex-col">
                <div
                  className="flex justify-between cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <div className="flex justify-center items-center gap-1">
                    {" "}
                    <div>Total Additional Fare</div>{" "}
                    <FaAngleDoubleDown color="green" />
                  </div>

                  <div>
                    {
                      singleBookingData?.itemInfos.AIR.totalPriceInfo
                        .totalFareDetail.fC.TAF
                    }
                  </div>
                </div>
                {isDropdownOpen && (
                  <div className="mt-2 ml-4 bg-slate-200 p-2 shadow-sm rounded-lg">
                    <div className="flex justify-between">
                      <div>IGST</div>
                      <div>
                        {
                          singleBookingData?.itemInfos.AIR.totalPriceInfo
                            .totalFareDetail.afC.TAF.AGST
                        }
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>Other Taxes</div>
                      <div>
                        {
                          singleBookingData?.itemInfos.AIR.totalPriceInfo
                            .totalFareDetail.afC.TAF.OT
                        }
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>Fuel Surcharge</div>
                      <div>
                        {
                          singleBookingData?.itemInfos.AIR.totalPriceInfo
                            .totalFareDetail.afC.TAF.YR
                        }
                      </div>
                    </div>
                    {/* Add other details as needed */}
                  </div>
                )}
              </div>
              {/* Uncomment if needed
        <div className="flex justify-between">
          <div>Taxes</div>
          <div>1400</div>
        </div>
        <div className="flex justify-between">
          <div>Service Fee</div>
          <div>400</div>
        </div> */}
            </div>
            <div className="flex justify-between pt-3 border-t">
              <div>Total</div>
              <div>
                {
                  singleBookingData?.itemInfos.AIR.totalPriceInfo
                    .totalFareDetail.fC.TF
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailedBooking;
