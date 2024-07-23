import DynamicForm from "./DynamicForm";
import { useState } from "react";
import ReactToast from "./ReactToast";

const MultiCityForm = ({
  getCountriesHandlerOne,
  getCountriesHandlerTwo,
  defaultOptions,
  dynamicFormData,
  setFormData,
}) => {
  console.log("dynamicFormData", dynamicFormData);
  const dynamicFormIncreseHandler = () => {
    if (dynamicFormData.length < 5) {
      setFormData((prev) => [
        ...prev,
        { fromCity: "", toCity: "", travelDate: new Date() },
      ]);
    } else {
      ReactToast("Maximum of 5 forms allowed");
    }
  };

  const handleFormDataChange = (index, data) => {
    setFormData((prev) => {
      const newData = [...prev];
      newData[index] = { ...newData[index], ...data };
      return newData;
    });
  };

  return (
    <div className="flex bg-[#ffffff] flex-col lg:flex-row w-full gap-2">
      <div className="lg:w-[75%] flex flex-col gap-3">
        {dynamicFormData.map((form, index) => (
          <DynamicForm
            key={index}
            defaultOptions={defaultOptions}
            getCountriesHandlerOne={getCountriesHandlerOne}
            getCountriesHandlerTwo={getCountriesHandlerTwo}
            form={form}
            setForm={(data) => handleFormDataChange(index, data)}
          />
        ))}
      </div>

      <div className="flex md:justify-center lg:w-[25%] items-center md:items-end">
        <button
          className="bg-[#1F61BC] p-3 rounded text-white"
          onClick={() => dynamicFormIncreseHandler()}
        >
          ADD ONE MORE.
        </button>
      </div>
    </div>
  );
};

export default MultiCityForm;
