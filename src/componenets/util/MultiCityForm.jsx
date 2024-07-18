import DynamicForm from "./DynamicForm";

import { useState } from "react";

const MultiCityForm = () => {
  //state for dynamically rendering form elements
  const [numberOfElements, setNumberOfElements] = useState([DynamicForm]);

  const dynamicFormIncreseHandler = () => {
    setNumberOfElements((prev) => [...prev, DynamicForm]);
  };

  return (
    <div className="flex bg-[#ffffff]  flex-col lg:flex-row  w-full  gap-2 ">
      <div className="  lg:w-[75%] flex flex-col gap-3  ">
        {numberOfElements.map((Value) => (
          <Value />
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
