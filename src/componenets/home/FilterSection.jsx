import { useEffect, useState } from "react";
import axios from "axios";
// icons
import { RiFlightTakeoffFill } from "react-icons/ri";
import { RiFlightLandLine } from "react-icons/ri";
import { MdOutlineDateRange } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { GoArrowSwitch } from "react-icons/go";
import { FaTelegramPlane } from "react-icons/fa";

// custom component
import CustomInput from "../util/DatePickerCustom";
import DatePicker from "react-datepicker";
import CustomSelect from "../util/CustomSelect";
import MultiCityForm from "../util/MultiCityForm";
import Modal from "../util/CustomModal";
import ReactToast from "../util/ReactToast";

import "react-datepicker/dist/react-datepicker.css";

import formatDate from "../util/DateFormatChanger";
const FilterSection = () => {
  const [formData, setFormData] = useState({
    cabinClass: "ECONOMY",

    ADULT: "1",
    CHILD: "0",
    INFANT: "0",

    fromCityOrAirport: {
      code: "",
    },
    toCityOrAirport: {
      code: "",
    },
    travelDate: new Date(),
    returnDate: new Date(),

    isDirectFlight: true,
    isConnectingFlight: true,
    pft: "REGULAR",
  });

  // State for dynamically rendering form elements
  const [dynamicFormData, setDynamicFormData] = useState([
    {
      fromCity: "",
      toCity: "",
      travelDate: formData.travelDate,
    },
  ]);

  console.log({ formData });
  console.log({ dynamicFormData });

  const [Loading, setLoading] = useState(false);

  //filter state for country code
  const [countryCodeone, setCountryCodeOne] = useState("IN");
  const [defaultOptions, setDefaultOptions] = useState([]);

  //state for modal
  const [modalIsOpen, setModelIsOpen] = useState(false);

  // state for filteration
  const [typeOfTravel, setTypeOfTravel] = useState("one-way");

  //changing type-of-travel
  const handleTypeOfTravelChange = (type) => {
    setTypeOfTravel(type);
  };

  // modal
  const openModalHandler = () => {
    setModelIsOpen(true);
  };

  //set country code where from
  const setContryCodeFrom = (value) => {
    setFormData((prev) => ({ ...prev, fromCityOrAirport: value }));
  };

  //set country code where to
  const setContryCodeTo = (value) => {
    if (formData.fromCityOrAirport === value) {
      ReactToast("Select different airport");
    } else {
      setFormData((prev) => ({
        ...prev,
        toCityOrAirport: value,
      }));
      if (typeOfTravel === "multi-city") {
        // setDynamicFormData((prev) => ({ ...prev }));
      }
    }
  };

  // API search for first select tag

  const getCountriesHandlerOne = async (inputValue, callback) => {
    try {
      let response = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }search/user-get-all-airports?search=${inputValue}`
      );

      const options = response.data.data.map((item) => ({
        value: item.code,
        label: `${item.name} - ${item.code}`,
      }));

      callback(options);
    } catch (error) {
      console.error("Error fetching options:", error);
      callback([]);
    }
  };

  // API search for second select tag
  const getCountriesHandlerTwo = async (inputValue, callback) => {
    try {
      let response = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }search/user-get-all-airports?search=${inputValue}`
      );

      const options = response.data.data.map((item) => ({
        value: item.code,
        label: `${item.name} - ${item.code}`,
      }));

      callback(options);
    } catch (error) {
      console.error("Error fetching options:", error);
      callback([]);
    }
  };

  //select tag default value
  const fetchDefaultOptions = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }search/airport-country-code?countrycode=IN`
      );
      const options = response.data.data.map((item) => ({
        value: item.code,
        label: `${item.name} - ${item.code}`,
      }));
      setDefaultOptions(options);
    } catch (error) {
      console.error("Error fetching default options:", error);
    }
  };

  const submitHandler = async () => {
    try {
      let query;

      if (typeOfTravel === "one-way") {
        query = {
          searchQuery: {
            cabinClass: formData.cabinClass,
            paxInfo: {
              ADULT: formData.ADULT,
              CHILD: formData.CHILD,
              INFANT: formData.INFANT,
            },

            routeInfos: [
              {
                fromCityOrAirport: {
                  code: formData.fromCityOrAirport,
                },
                toCityOrAirport: {
                  code: formData.toCityOrAirport,
                },
                travelDate: formatDate(formData.travelDate),
              },
            ],
            searchModifiers: {
              isDirectFlight: formData.isDirectFlight,
              isConnectingFlight: formData.isConnectingFlight,
            },
          },
        };
      } else if (typeOfTravel === "round-trip") {
        query = {
          searchQuery: {
            cabinClass: formData.cabinClass,
            paxInfo: {
              ADULT: formData.ADULT,
              CHILD: formData.CHILD,
              INFANT: formData.INFANT,
            },

            routeInfos: [
              {
                fromCityOrAirport: {
                  code: formData.fromCityOrAirport,
                },
                toCityOrAirport: {
                  code: formData.toCityOrAirport,
                },
                travelDate: formatDate(formData.travelDate),
              },
              {
                fromCityOrAirport: {
                  code: formData.toCityOrAirport,
                },
                toCityOrAirport: {
                  code: formData.fromCityOrAirport,
                },
                travelDate: formatDate(formData.returnDate),
              },
            ],
            searchModifiers: {
              isDirectFlight: formData.isDirectFlight,
              isConnectingFlight: formData.isConnectingFlight,
            },
          },
        };
      } else {
        const dynamic = dynamicFormData.map((value) => ({
          fromCityOrAirport: {
            code: value.fromCity,
          },
          toCityOrAirport: {
            code: value.toCity,
          },
          travelDate: formatDate(value.travelDate),
        }));

        query = {
          searchQuery: {
            cabinClass: formData.cabinClass,
            paxInfo: {
              ADULT: formData.ADULT,
              CHILD: formData.CHILD,
              INFANT: formData.INFANT,
            },

            routeInfos: [
              {
                fromCityOrAirport: {
                  code: formData.fromCityOrAirport,
                },
                toCityOrAirport: {
                  code: formData.toCityOrAirport,
                },
                travelDate: formatDate(formData.travelDate),
              },
              ...dynamic,
            ],
            searchModifiers: {
              isDirectFlight: formData.isDirectFlight,
              isConnectingFlight: formData.isConnectingFlight,
            },
          },
        };
      }
      console.log("query", query);
      setLoading(true);
      const data = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}search/flight`,
        query,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDefaultOptions();
  }, []);

  return (
    <div className="flex flex-col items-center justify-evenly  w-full relative ">
      <div className="     rounded-xl  shadow-md border border-gray-200 flex flex-col justify-center px-5 gap-4 max-w-[1900px] min-w-[210px] py-5  xs:w-[90%] relative top-[-100px] bg-white  ">
        {/* type of travel selecting section */}

        <div className="flex justify-center md:justify-stretch w-full text-white ">
          <button
            className={`bg-[#007EC4] rounded-l-lg p-2 md:p-3 border-2 ${
              typeOfTravel === "one-way" && "border-red-500"
            }`}
            //click handler
            onClick={() => handleTypeOfTravelChange("one-way")}
          >
            One way
          </button>
          <button
            className={`bg-[#01324D] md:p-3 p-2 border-2 ${
              typeOfTravel === "round-trip" && "border-red-500"
            } `}
            //click handler
            onClick={() => handleTypeOfTravelChange("round-trip")}
          >
            Round trip
          </button>
          <button
            className={` bg-[#007EC4] rounded-r-lg md:p-3 p-2 border-2 ${
              typeOfTravel === "multi-city" && "border-red-500"
            }`}
            //click handler
            onClick={() => handleTypeOfTravelChange("multi-city")}
          >
            Multi City
          </button>
        </div>

        <div>
          <h3 className="font-semibold my-0">Where are you flying?</h3>
        </div>

        {/* select country code and date section  */}
        <div className="flex flex-col w-full gap-2">
          <div className="flex flex-col  md:flex-row bg-[#ffffff]  w-full  gap-2 ">
            {/* {select country section} */}
            <div
              className="flex flex-col md:w-1/2 md:flex-row  relative gap-2 md:gap-2
         justify-between "
            >
              <div className="flex   items-center border rounded p-2 md:w-1/2 ">
                <div>
                  <RiFlightLandLine className=" text-2xl md:text-3xl " />
                </div>
                <div className="w-full ">
                  <CustomSelect
                    loadOptions={getCountriesHandlerOne}
                    placeholder="Where From ?"
                    icon={<RiFlightTakeoffFill />}
                    setFormData={setContryCodeFrom}
                    defaultOptions={defaultOptions}
                  />
                </div>
              </div>
              <div className="md:flex  hidden sm:items-center  justify-center text-white absolute left-1/2 top-1/2 transform -translate-x-1/2  -translate-y-1/2 bg-black w-8 h-8 rounded-full ">
                <GoArrowSwitch />
              </div>
              <div className="flex  items-center border rounded p-2 md:w-1/2 ">
                <div>
                  <RiFlightLandLine className=" text-2xl md:text-3xl " />
                </div>
                <div className="w-full">
                  <CustomSelect
                    setFormData={setContryCodeTo}
                    loadOptions={getCountriesHandlerTwo}
                    placeholder="Where To ?"
                    defaultOptions={defaultOptions}
                  />
                </div>
              </div>
            </div>

            {/* date picker section  */}
            <div className="flex flex-col md:flex-row     w-full  md:w-1/2 gap-2">
              <div className="  rounded   flex items-center border md:w-1/2  py-2 ">
                <div className=" flex items-center justify-center md:justify-evenly   w-full">
                  <DatePicker
                    minDate={new Date()}
                    selected={formData.travelDate}
                    onChange={(date) => {
                      setFormData((prevState) => {
                        const newState = { ...prevState, travelDate: date };

                        if (date > prevState.returnDate) {
                          newState.returnDate = date;
                        }

                        return newState;
                      });
                    }}
                    customInput={
                      <CustomInput CustomIcon={MdOutlineDateRange} />
                    }
                    dateFormat="dd-MM-yyyy"
                    value={formData.travelDate}
                  />
                  {typeOfTravel !== "multi-city" ? (
                    <>
                      {" "}
                      <span className="">|</span>
                      <DatePicker
                        minDate={formData.travelDate}
                        selected={formData.returnDate}
                        onChange={(date) => {
                          setFormData((prev) => ({
                            ...prev,
                            returnDate: date,
                          }));
                        }}
                        customInput={<CustomInput />}
                        dateFormat="dd-MM-yyyy"
                        disabled={typeOfTravel !== "round-trip"}
                      />
                      <FaTimes
                        className="text-transparent cursor-pointer"
                        onClick={() => {
                          // setStartDate(null);
                          // setEndDate(null);
                        }}
                      />
                    </>
                  ) : (
                    <div className="p-2 md:w-[40%] "></div>
                  )}
                </div>
              </div>

              <div
                //click handler

                onClick={openModalHandler}
                className="    flex items-center border rounded-md md:w-1/2  p-3 md:p-0 min-w-[230px] "
              >
                <div className=" text-[2rem]  ">
                  <MdAirlineSeatReclineExtra />
                </div>
                <div className="flex flex-col w-[80%] ">
                  <h5 className="text-xs font-semibold text-gray-500 ">
                    Passenger and Class
                  </h5>
                  <input
                    className="font-bold outline-none "
                    type="text"
                    value={`${
                      Number(formData.ADULT) + Number(formData.CHILD)
                    } | ${formData.cabinClass}`}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
          {typeOfTravel === "multi-city" && (
            <MultiCityForm
              getCountriesHandlerOne={getCountriesHandlerOne}
              getCountriesHandlerTwo={getCountriesHandlerTwo}
              defaultOptions={defaultOptions}
              dynamicFormData={dynamicFormData}
              setDynamicFormData={setDynamicFormData}
              formData={formData}
            />
          )}
        </div>

        {/* fare type with submit button section  */}
        <div className="w-full md:items-center flex flex-col md:flex-row    h-full  ">
          <div className="    flex  flex-col md:flex-row  md:w-3/4 gap-2 md:gap-0">
            <div className="md:w-1/3 ">
              <select
                id="fare-type"
                className="h-full outline-none border rounded-md w-full md:w-auto p-2 md:p-1  bg-white"
                name="fare_type"
                value={formData.pft}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    pft: e.target.value,
                  }))
                }
              >
                <option disabled selected value="">
                  Fare Type
                </option>
                <option value="REGULAR">Regular Fares</option>
                <option value="STUDENT">Student Fares</option>
                <option value="SENIOR_CITIZEN">Senior Citizen Fares</option>
              </select>
            </div>
            <div className="lg:w-1/3">
              <select
                name=""
                className="border w-full md:w-auto rounded-md h-full p-2 md:p-1    bg-white"
                id=""
              >
                <option value="" disabled selected>
                  select prefered airlines
                </option>
                <option value="">ethiad</option>
              </select>
            </div>
            <div className="flex gap-2 p-1 w-full items-center md:w-1/3  ">
              <label>Direct flights</label>
              <input
                type="checkbox"
                //state change
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isDirectFlight: e.target.checked,
                  }))
                }
                checked={formData?.isDirectFlight}
                className="h-4 w-4"
              />
            </div>
          </div>
          <div className="w-full md:w-1/4 items-start  flex  md:justify-center ">
            <button
              disabled={Loading}
              // form submition
              onClick={submitHandler}
              className=" flex items-center  space-x-2  text-white bg-[#1F61BC] p-3 rounded"
            >
              <FaTelegramPlane className="text-white text-lg" />
              <span>{Loading ? "Searching..." : "Search Flights"}</span>
            </button>
          </div>
        </div>

        {/* {custom-modal} */}

        <Modal
          formData={formData}
          setFormData={setFormData}
          modalIsOpen={modalIsOpen}
          setModelIsOpen={setModelIsOpen}
        />
      </div>
      <div
        className="lg:h-[15vh] px-4 flex flex-col md:flex-row
       md:flex leading-[1]   justify-between lg:px-24 max-w-[1900px] mx-auto mb-2 w-[90%]   relative top-[-50px]"
      >
        <div className="flex flex-col items-start gap-4 2xl:gap-6 ">
          <h2 className="font-semibold text-[1.3rem]  md:text-4xl 2xl:text-[2.2rem] ">
            Explore places together
          </h2>
          <h4 className="font-light text-sm md:text-lg 2xl:text-2xl">
            Discover the latest offers and news and start planning your next
            trip with us.
          </h4>
        </div>

        <div className="flex items-center  rounded-lg w-full md:w-1/4 2xl:h-full ">
          <select
            className="flex justify-center relative  items-center p-2 w-full  outline-none sm:w-1/2 sm:mx-auto rounded-lg border border-blue-500 mt-1 font-roboto text-center font-light  bg-white md:w-3/4 2xl:w-3/4 2xl:p-4"
            name=""
            id=""
          >
            <option value="Nithin">International</option>
            <option value="Nithin">Domestic</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
