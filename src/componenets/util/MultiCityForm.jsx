import DynamicForm from "./DynamicForm";

import { useState } from "react";

const MultiCityForm = ({
  getCountriesHandlerOne,
  getCountriesHandlerTwo,
  defaultOptions,
  
}) => {
  //state for dynamically rendering form elements
  const [numberOfElements, setNumberOfElements] = useState([DynamicForm]);

  const [formData, setFormData] = useState([
    { fromCity: "", toCity: "", travelDate: new Date() },
  ]);
  // const dynamicFormIncreseHandler = () => {

  //   setNumberOfElements((prev) => [...prev, DynamicForm]);
  // };
  const dynamicFormIncreseHandler = () => {
    if (formData.length < 5) {
      setFormData((prev) => [
        ...prev,
        { fromCity: "", toCity: "", travelDate: new Date() },
      ]);
    } else {
      alert("Maximum of 5 forms allowed");
    }
  };

  return (
    <div className="flex bg-[#ffffff]  flex-col lg:flex-row  w-full  gap-2 ">
      <div className="  lg:w-[75%] flex flex-col gap-3  ">
        {numberOfElements.map((Value) => (
          <Value
            defaultOptions={defaultOptions}
            getCountriesHandlerOne={getCountriesHandlerOne}
            getCountriesHandlerTwo={getCountriesHandlerTwo}
            formData={formData}
          />
        ))}
      </div>

      <div className=" flex md:justify-center lg:w-[25%] items-center  md:items-end  ">
        <button
          className="bg-[#1F61BC] p-3 rounded  text-white"
          onClick={() => dynamicFormIncreseHandler()}
        >
          ADD ONE MORE.
        </button>
      </div>
    </div>
  );
};

export default MultiCityForm;
