import React from "react";
import SideBar from "../SideBar";

import "./Amendment.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./Amendment.css";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Loader from "../Repeatable/Loader";
import DeleteModalTemplate from "../Repeatable/DeleteModalTemplate";

const SubmitAmendment = () => {
    const token = useSelector((state) => state.token);
    const collapsed = useSelector((state) => state.collapse);
    const apiURL = process.env.REACT_APP_API_URL;
    const [bookingId, setBookingId] = useState("");
    const [disable, setDisabled] = useState(false);
    const [Remarks, setRemarks] = useState("");
    const [Loading, setLoading] = useState(false);
    const [ErrorDetails, setErrorDetails] = useState([]);
    const [trips, setTrips] = useState(null);
    const [selectedTrips, setSelectedTrips] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [checkTrips, setCheckTrips] = useState(null);

    const navigate = useNavigate("");
    const [amendmentId, setAmendmentId] = useState(null);

    const dispatch = useDispatch();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year} -${month} -${day}`;
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
                `${apiURL} / admin - booking / view - booking`,
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
                `${apiURL} / admin - booking / amendment - charges`,
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

    const Clear = () => {
        setBookingId("");
        setErrorDetails([]);
        setTrips(null);
        setDisabled(false);
        setAmendmentId(null);
        setCheckTrips(null);
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

    return (
        <div>
            <SideBar />

            <div
                className={`dynamic-container ${collapsed ? "padding-after-collapse" : "padding-before-collapse"
                    }`}
            >
                {Loading ? (
                    <Loader />
                ) : (
                    <div className="main-container">
                        <h1>
                            {" "}
                            <ArrowBack
                                className="icons"
                                onClick={() => {
                                    navigate("/amendment");
                                }}
                            />
                            &nbsp; Submit Amendment
                        </h1>
                        <br />
                        <div>
                            <label>Booking ID</label>
                            <input
                                disabled={disable}
                                type="text"
                                placeholder="Enter Booking ID"
                                value={bookingId}
                                onChange={(e) => {
                                    setBookingId(e.target.value);
                                }}
                            />
                            <button onClick={getData} disabled={Loading}>
                                {Loading ? "Searching..." : "Search Booking"}
                            </button>
                            <button onClick={Clear}>Clear</button>
                            <br />
                            <br />
                            <div>
                                {ErrorDetails?.length > 0 && (
                                    <div>
                                        {ErrorDetails?.map((item) => (
                                            <div className="amendment-error-container">
                                                <div className="amendment-detail">
                                                    <b>Details</b> <br />
                                                    {item?.details}
                                                </div>
                                                <br />

                                                <div className="amednment-detail">
                                                    <b>Message</b>
                                                    <br /> {item?.message}
                                                </div>
                                            </div>
                                        ))}
                                        <br />
                                    </div>
                                )}
                            </div>
                            {amendmentId && (
                                <div className="amendment-submitted-container">
                                    {" "}
                                    <p>
                                        Amendment is Submitted : Your Amendment ID is{" "}
                                        <b>{amendmentId}</b>
                                    </p>
                                </div>
                            )}
                            <div>
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
                                <br />
                            </div>

                            <p>Note</p>
                            <li>
                                To Cancel the Complete Booking , no need to select any trip .
                            </li>
                            <li>
                                To Cancel a selected Trip for all the passengers, Just Select
                                the Trip, no need to select any passengerr .
                            </li>
                            <br />
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
                                    <label htmlFor="">Remarks</label>
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
                                    </button>
                                </div>
                            )}
                        </div>
                        <br />
                    </div>
                )}
            </div>
            <ToastContainer />
            <DeleteModalTemplate
                isOpen={isDeleteModalOpen}
                handleClose={closeDeleteModal}
                handleDelete={submitAmendment}
                description={"Submit the Amendment"}
            />
        </div>
    );
};

export default SubmitAmendment;