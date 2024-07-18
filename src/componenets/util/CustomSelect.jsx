import React from "react";
import Select from "react-select";
import { components } from "react-select";
import { RiFlightTakeoffFill, RiFlightLandLine } from "react-icons/ri";
import { FaArrowsAltH } from "react-icons/fa";

const customStyles = {
  control: (provided) => ({
    ...provided,
    display: "flex",
    // width: "230px",

    boxShadow: "none",
    // padding: "5px",

    border: "none",
  }),
  // dropdownIndicator: (provided) => ({
  //   ...provided,
  //   padding: "0 8px",
  // }),
  // indicatorSeparator: () => ({
  //   display: "none",
  // }),
  // singleValue: (provided) => ({
  //   ...provided,
  //   marginRight: "8px",
  //   color: "black",
  // }),
  // placeholder: (provided) => ({
  //   ...provided,
  //   display: "flex",
  //   alignItems: "center",

  // }),
  // clearIndicator: (provided) => ({
  //   ...provided,
  //   padding: "0 8px",
  // }),
};

const CustomPlaceholder = ({ icon, text }) => (
  <div>
    <span>{text}</span>
  </div>
);

const CustomSelect = ({
  options,
  placeholder,
  icon,
  onInputChange,
  formValue,
  onChange,
}) => {
  return (
    <Select
      options={options}
      isClearable={true}
      styles={customStyles}
      placeholder={<CustomPlaceholder icon={icon} text={placeholder} />}
      
      defaultValue={formValue}
      onChange={onChange}

      // customWidth="2500px"
      // onInputChange={onInputChange}
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  );
};

export default CustomSelect;
