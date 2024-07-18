import React, { useState } from "react";

//icons
import { FaTimes } from "react-icons/fa";
import { RiFlightLandLine, RiFlightTakeoffFill } from "react-icons/ri";
import { MdOutlineDateRange } from "react-icons/md";

// libraries 
import DatePicker from "react-datepicker";

// custom components 
import CustomInput from "./DatePickerCustom";
import CustomSelect from "./CustomSelect";



const DynamicForm = () => {
  const [typeOfTravel, setTypeOfTravel] = useState("one-way");

  const [startDate, setStartDate] = useState(new Date());

  
  const [endDate, setEndDate] = useState(new Date());


  const [dummyData, setDummyData] = useState([
    { value: "nithin", label: "nithin" },
    { value: "nithin", label: "nithin" },
    { value: "nithin", label: "nithin" },
    { value: "nithi", label: "nithi" },
  ]);
  return (
    <div
      className="flex flex-col  p-3 md:p-0  md:flex-row justify-between relative 
  border border-slate-400 rounded-lg gap-2 md:border-none"
    >
      <div className="flex   md:w-1/3 items-center border rounded p-2   ">
        <div>
          <RiFlightLandLine className=" text-2xl md:text-3xl " />
        </div>
        <div className="w-full ">
          <CustomSelect
            options={dummyData}
            placeholder="Where From ?"
            icon={<RiFlightTakeoffFill />}
          />
        </div>
      </div>

      <div className="flex  md:w-1/3 items-center border rounded p-2 ">
        <div>
          <RiFlightLandLine className=" text-2xl md:text-3xl " />
        </div>
        <div className="w-full">
          <CustomSelect
            options={dummyData}
            placeholder="Where To ?"
            // icon={<RiFlightLandLine />}
          />
        </div>
      </div>
      <div className="flex   md:w-[36%]  flex-col md:flex-row     ">
        <div className="  rounded  flex items-center border w-full  ">
          <div className=" flex items-center justify-between w-full  ">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              customInput={<CustomInput CustomIcon={MdOutlineDateRange} />}
              dateFormat="dd-MM-yyyy"
            />
            {typeOfTravel !== "multi-city" ? (
              <>
                {" "}
                <span className="">|</span>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  customInput={<CustomInput />}
                  dateFormat="dd-MM-yyyy"
                  disabled={typeOfTravel !== "round-trip"}
                />
                <FaTimes
                  className="text-transparent   cursor-pointer"
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
      </div>
    </div>
  );
};

export default DynamicForm;
