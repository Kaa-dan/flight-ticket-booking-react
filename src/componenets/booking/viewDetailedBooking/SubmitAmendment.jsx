import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteModalTemplateConfirm from "./DeleteModalTemplateConfirm";

const SubmitAmendment = ({ singleBookingData }) => {
  const { token } = useSelector((state) => state.auth);
  const collapsed = true;
  const apiURL = import.meta.env.VITE_SERVER_URL;
  const [bookingId, setBookingId] = useState(singleBookingData.order.bookingId);
  const [disable, setDisabled] = useState(false);
  const [Remarks, setRemarks] = useState("");
  const [Loading, setLoading] = useState(false);
  const [ErrorDetails, setErrorDetails] = useState([]);
  const [trips, setTrips] = useState(null);
  const [selectedTrips, setSelectedTrips] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [checkTrips, setCheckTrips] = useState(null);
  const navigate = useNavigate();
  const [amendmentId, setAmendmentId] = useState(null);
  const dispatch = useDispatch();



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const getData = async () => {
    if (bookingId === "") {
      toast.warning("Please Enter Booking ID");
      return;
    }
    setLoading(true);
    await axios
      .post(
        `${apiURL}admin-booking/view-booking`,
        {
          bookingId,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);

        // Extract trips information
        const travellers = res.data.data.itemInfos?.AIR?.travellerInfos.map(
          (passenger) => ({
            fn: passenger.fN,
            ln: passenger.lN,
          })
        );
        const extractedTrips = res.data.data.itemInfos?.AIR?.tripInfos.map(
          (tripInfo) => {
            const segments = tripInfo.sI;
            const firstSegment = segments[0];
            const lastSegment = segments[segments.length - 1];
            return {
              src: firstSegment.da.code,
              dest: lastSegment.aa.code,
              departureDate: formatDate(firstSegment.dt),
              travellers,
            };
          }
        );
        setTrips(extractedTrips);
        setDisabled(true);
      })
      .catch((error) => {
        if (error?.response?.data?.action === "logout") {
          setTimeout(() => {
            dispatch({ type: "logout" });
          }, 1000);
        }
        toast.error(error?.response?.data?.error);
        setLoading(false);
      });
  };


  const checkAmendment = async () => {
    if (bookingId === "") {
      toast.warning("Please Enter Booking ID");
    }
    setLoading(true);
    await axios
      .post(
        `${apiURL}admin-booking/amendment-charges`,
        {
          bookingId,
          type: "CANCELLATION",
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setCheckTrips(res.data.trips);
      })
      .catch((error) => {
        if (error?.response?.data?.action === "logout") {
          setTimeout(() => {
            dispatch({ type: "logout" });
          }, 1000);
        }
        setLoading(false);
        toast.error(error?.response?.data?.error);
        setErrorDetails(error?.response?.data?.errors);
      });
  };


  const submitAmendment = async () => {
    const finalTripList = selectedTrips.map((selection) => {
      const trip = trips[selection.tripIndex];
      const selectedPassengers = selection.passengerIndices.map(
        (index) => trip.travellers[index]
      );

      const tripDetails = {
        src: trip.src,
        dest: trip.dest,
        departureDate: trip.departureDate,
      };

      if (selectedPassengers.length > 0) {
        tripDetails.travellers = selectedPassengers;
      }

      return tripDetails;
    });

    const requestData = {
      bookingId,
      type: "CANCELLATION",
      remarks: Remarks,
    };

    if (finalTripList.length > 0) {
      requestData.trips = finalTripList;
    }

    console.log(requestData);

    setLoading(true);
    await axios
      .post(`${apiURL} / admin - booking / submit - amendment, requestData`, {
        headers: {
          authorization: ` Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        toast.success("Amendment Submitted Successfsully");
        setBookingId("");
        setRemarks("");
        setBookingId("");
        setErrorDetails([]);
        setTrips(null);
        setAmendmentId(res.data.amendmentId);
        setIsDeleteModalOpen(false);
        setDisabled(false);
        setCheckTrips(null);
      })
      .catch((error) => {
        if (error?.response?.data?.action === "logout") {
          setTimeout(() => {
            dispatch({ type: "logout" });
          }, 1000);
        }
        toast.error(error?.response?.data?.error);
        setLoading(false);
        setErrorDetails(error?.response?.data?.errors);
        setIsDeleteModalOpen(false);
      });
  };

  const handleTripSelection = (tripIndex) => {
    setSelectedTrips((prevSelectedTrips) => {
      if (prevSelectedTrips.some((t) => t.tripIndex === tripIndex)) {
        return prevSelectedTrips.filter((t) => t.tripIndex !== tripIndex);
      } else {
        return [...prevSelectedTrips, { tripIndex, passengerIndices: [] }];
      }
    });
  };


  const handlePassengerSelection = (tripIndex, passengerIndex) => {
    setSelectedTrips((prevSelectedTrips) => {
      const trip = prevSelectedTrips.find((t) => t.tripIndex === tripIndex);
      if (trip) {
        if (trip.passengerIndices.includes(passengerIndex)) {
          trip.passengerIndices = trip.passengerIndices.filter(
            (id) => id !== passengerIndex
          );
        } else {
          trip.passengerIndices.push(passengerIndex);
        }
        return [...prevSelectedTrips];
      } else {
        return [
          ...prevSelectedTrips,
          { tripIndex, passengerIndices: [passengerIndex] },
        ];
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <div className=" bg-gray-50 p-7">
      <div className={`transition-padding duration-300`}>
        {Loading ? (
          <div className="flex justify-center items-center h-screen">
            <p className="text-xl font-semibold">Loading...</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">


            {amendmentId && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
                <p>Amendment is Submitted: Your Amendment ID is <span className="font-bold">{amendmentId}</span></p>
              </div>
            )}

            <div className="space-y-6">
              {checkTrips?.map((trip, tripIndex) => (
                <div key={tripIndex} className="amendment-trip-container">
                  <div className="amendment-trip-detail">
                    {" "}
                    <div>
                      <b>Source</b> : {trip.src}
                    </div>
                    <div>
                      <b>Destination</b> : {trip.dest}
                    </div>
                    <div>
                      <b>Departure Date</b> :{" "}
                      {new Date(trip.departureDate).toLocaleString()}
                    </div>
                    <div>
                      <b>Flight Numbers</b> : {trip.flightNumbers.join(", ")}
                    </div>
                    <div>
                      <b>Airlines</b> : {trip.airlines.join(", ")}
                    </div>
                  </div>
                  <div className="amendment-category-container">
                    {Object.keys(trip.amendmentInfo).map(
                      (category, catIndex) => (
                        <div key={catIndex} className="amendment-category">
                          <h4>{category}</h4>
                          <div>
                            <b>Amendment Charges</b>:{" "}
                            {trip.amendmentInfo[category].amendmentCharges}
                          </div>
                          <div>
                            <b>Refund Amount</b>:{" "}
                            {trip.amendmentInfo[category].refundAmount}
                          </div>
                          <div>
                            <b>Total Fare</b>:{" "}
                            {trip.amendmentInfo[category].totalFare}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Note:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>To Cancel the Complete Booking, no need to select any trip.</li>
                <li>To Cancel a selected Trip for all the passengers, Just Select the Trip, no need to select any passenger.</li>
              </ul>
            </div>

            {trips?.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Select the Trips and Passengers to Cancel</h3>
                <div className="space-y-4">
                  {trips?.length > 0 && (
                    <div>
                      {" "}
                      <h3>Select the Trips and Passengers to Cancel</h3>
                      <div className="selected-trips-container">
                        {trips?.map((item, tripIndex) => (
                          <div className="selected-trip">
                            <div>
                              <input
                                type="checkbox"
                                className="selected-trip-checkbox"
                                checked={selectedTrips.some(
                                  (t) => t.tripIndex === tripIndex
                                )}
                                onChange={() => handleTripSelection(tripIndex)}
                              />
                            </div>
                            <div>
                              <div>Source : {item?.src}</div>
                              <div>Destination : {item?.dest}</div>
                              <div>Departure Date : {item?.departureDate}</div>
                            </div>
                            <div className="travellers-container">
                              {item?.travellers.map((traveller, TravellerIndex) => (
                                <div>
                                  <div>
                                    <input
                                      type="checkbox"
                                      checked={selectedTrips.some(
                                        (t) =>
                                          t.tripIndex === tripIndex &&
                                          t.passengerIndices.includes(
                                            TravellerIndex
                                          )
                                      )}
                                      onChange={() =>
                                        handlePassengerSelection(
                                          tripIndex,
                                          TravellerIndex
                                        )
                                      }
                                    />
                                  </div>

                                  <div>
                                    First Name : {traveller?.fn}
                                    <br />
                                    Last Name : {traveller?.ln}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <br />
                      <br />
                      {/* <label htmlFor="">Remarks</label>
                      <br />
                      <br />
                      <textarea
                        name=""
                        id=""
                        rows="5"
                        cols="100"
                        placeholder="Enter Remarks"
                        value={Remarks}
                        onChange={(e) => {
                          setRemarks(e.target.value);
                        }}
                      ></textarea>
                      <br />
                      <br />
                      <button onClick={checkAmendment}>
                        Check Amendment Charges
                      </button>
                      <button
                        onClick={() => {
                          if (bookingId === "") {
                            toast.warning("Please Enter Booking ID");
                            return;
                          }
                          if (Remarks === "") {
                            toast.warning("Please Enter Remarks");
                            return;
                          }
                          setIsDeleteModalOpen(true);
                        }}
                        disabled={Loading}
                      >
                        {Loading ? "Submitting..." : "Submit Amendment Charges"}
                      </button> */}
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                  <textarea
                    id="remarks"
                    rows="5"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-1/2 sm:text-sm border border-gray-300 rounded-md "
                    placeholder="Enter Remarks"
                    value={Remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  ></textarea>
                </div>

                <div className="mt-8 space-x-4">
                  <button
                    onClick={checkAmendment}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Check Amendment Charges
                  </button>
                  <button
                    onClick={() => {
                      if (bookingId === "") {
                        toast.warning("Please Enter Booking ID");
                        return;
                      }
                      if (Remarks === "") {
                        toast.warning("Please Enter Remarks");
                        return;
                      }
                      setIsDeleteModalOpen(true);
                    }}
                    disabled={Loading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    {Loading ? "Submitting..." : "Submit Amendment Charges"}
                  </button>
                </div>
                {ErrorDetails?.length > 0 && (
                  <div className="my-6 space-y-4">
                    {ErrorDetails?.map((item, index) => (
                      <div key={index} className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                        <p className="font-bold">Details:</p>
                        <p>{item?.details}</p>
                        <p className="font-bold mt-2">Message:</p>
                        <p>{item?.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <DeleteModalTemplateConfirm
        isOpen={isDeleteModalOpen}
        handleClose={closeDeleteModal}
        handleDelete={submitAmendment}
        description={"Submit the Amendment"}
      />

    </div>
  );
};

export default SubmitAmendment;
