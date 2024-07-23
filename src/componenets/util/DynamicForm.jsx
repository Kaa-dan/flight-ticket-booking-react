import React, { useState, useEffect } from "react";
// icons
import { RiFlightLandLine, RiFlightTakeoffFill } from "react-icons/ri";
import { MdOutlineDateRange } from "react-icons/md";
// libraries
import DatePicker from "react-datepicker";
// custom components
import CustomInput from "./DatePickerCustom";
import CustomSelect from "./CustomSelect";

const DynamicForm = ({
  defaultOptions,
  getCountriesHandlerOne,
  getCountriesHandlerTwo,
  setForm,
  dynamicFormData,
  index,
  formData,
  setDynamicFormData,
}) => {
  console.log("dynamicFormdata", dynamicFormData);
  console.log("formDate", formData);

  const [startDate, setStartDate] = useState(() =>
    index === 0 ? formData.travelDate : dynamicFormData[index]?.travelDate
  );

  console.log("startDate", startDate, index);

  useEffect(() => {
    if (index === 0 && formData.travelDate > startDate) {
      setStartDate(formData.travelDate);
    } else if (index > 0 &&dynamicFormData[index].travelDate>startDate) {
      setStartDate(dynamicFormData[index]?.travelDate);
    }
  }, [index, formData.travelDate, dynamicFormData]);

  const handleDateChange = (date) => {
    setStartDate(date);
    setForm((prevState) => {
      const newState = { ...prevState, travelDate: date };
      if (date > prevState.returnDate) {
        newState.returnDate = date;
      }
      return newState;
    });

    setDynamicFormData((prevState) => {
      const newState = [...prevState];
      if (index + 1 < newState.length) {
        newState[index + 1] = {
          ...newState[index + 1],
          travelDate: date,
        };
      }
      return newState;
    });
  };

  return (
    <div className="flex flex-col p-3 md:p-0 md:flex-row justify-between relative border border-slate-400 rounded-lg gap-2 md:border-none">
      <div className="flex md:w-1/3 items-center border rounded p-2">
        <div>
          <RiFlightTakeoffFill className="text-2xl md:text-3xl" />
        </div>
        <div className="w-full">
          <CustomSelect
            loadOptions={getCountriesHandlerOne}
            defaultOptions={defaultOptions}
            placeholder="Where From ?"
            icon={<RiFlightTakeoffFill />}
            setFormData={(value) =>
              setForm((prevState) => ({ ...prevState, fromCity: value }))
            }
          />
        </div>
      </div>

      <div className="flex md:w-1/3 items-center border rounded p-2">
        <div>
          <RiFlightLandLine className="text-2xl md:text-3xl" />
        </div>
        <div className="w-full">
          <CustomSelect
            loadOptions={getCountriesHandlerTwo}
            defaultOptions={defaultOptions}
            placeholder="Where To ?"
            setFormData={(value) =>
              setForm((prevState) => ({ ...prevState, toCity: value }))
            }
          />
        </div>
      </div>

      <div className="flex md:w-[36%] flex-col md:flex-row">
        <div className="rounded flex items-center border w-full">
          <div className="flex items-center justify-between w-full">
            <DatePicker
              selected={startDate}
              minDate={startDate}
              onChange={handleDateChange}
              customInput={<CustomInput CustomIcon={MdOutlineDateRange} />}
              dateFormat="dd-MM-yyyy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;
