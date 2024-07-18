import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const PassengerSelector = ({ onClose }) => {
  const [adultCount, setAdultCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [selectedClass, setSelectedClass] = useState("Premium Economy");

  const handleCountChange = (type, count) => {
    if (type === "adult") setAdultCount(count);
    if (type === "children") setChildrenCount(count);
    if (type === "infant") setInfantCount(count);
  };

  const handleClassChange = (classType) => {
    setSelectedClass(classType);
  };

  const renderCountButtons = (type, count, maxCount) => {
    const start = type === "adult" ? 1 : 0;
    return (
      <div className="flex gap-1 bg-red">
        {Array.from({ length: maxCount - start + 1 }, (_, index) => (
          <button
            key={index + start}
            onClick={() => handleCountChange(type, index + start)}
            className={`${
              count === index + start
                ? "bg-[#1F61BC] text-white"
                : "bg-gray-200 text-black"
            } rounded p-1 w-8`}
          >
            {index + start}
          </button>
        ))}
      </div>
    ); 
  };

  return (
    <div className=" md:p-5 flex flex-col ">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-sm lg:text-lg">SELECT PASSENGER</h3>
        <FaTimes className="cursor-pointer" onClick={onClose} />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-2/3">
          <div className="mb-4">
            <h4 className="font-semibold text-[.8rem] lg:text-[1rem]">
              Adult Age 12+
            </h4>
            {renderCountButtons("adult", adultCount, 9)}
          </div>
          <div className="mb-4">
            <h4 className="font-semibold text-[.8rem] lg:text-[1rem]">
              Children Age 2-12
            </h4>
            {renderCountButtons("children", childrenCount, 8)}
          </div>
          <div className="mb-4">
            <h4 className="font-semibold text-[.8rem] lg:text-[1rem]">
              Infant Age 0-2
            </h4>
            {renderCountButtons("infant", infantCount, 8)}
          </div>
        </div>
        <div className="md:w-1/3">
          <h4 className="font-semibold mb-2">SELECT CLASS</h4>
          <div className="text-[.8rem] lg:text-[1rem]">
            {["Economy", "Premium Economy", "Business", "First"].map(
              (classType) => (
                <div
                  key={classType}
                  className="flex justify-between items-center mb-2 cursor-pointer"
                  onClick={() => handleClassChange(classType)}
                >
                  <span>{classType}</span>
                  <span
                    className={`${
                      selectedClass === classType
                        ? "bg-[#1F61BC] border-black border"
                        : "border-black border"
                    } w-5 h-5 rounded-full flex items-center justify-center`}
                  >
                    {selectedClass === classType && (
                      <div className="w-3 h-3 rounded-full"></div>
                    )}
                  </span>
                </div>
              )
            )}
          </div>
          <button
            className="bg-[#1F61BC] text-white rounded mt-4 p-1 md:p-2 w-full"
            onClick={onClose}
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassengerSelector;
