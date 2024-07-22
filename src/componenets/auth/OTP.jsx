import React, { useState, useRef } from "react";
import ReactToast from "../util/ReactToast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OTPInput = ({ value }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]); // State to store OTP digits
  const inputsRef = useRef([]); // Ref to store input elements for focus management
  const [loading, setLoading] = useState(false);

  console.log(otp);
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/[^0-9]/.test(value)) return; // Allow only numeric input

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input
    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Focus previous input if backspace is pressed and the current input is empty
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("Text");
    if (/^\d{4}$/.test(pastedData)) {
      setOtp(pastedData.split(""));
      inputsRef.current[3].focus(); // Focus the last input after paste
    }
  };
  const onSubmit = async () => {
    console.log(value);
    try {
      setLoading(() => true);
      // Join the OTP digits to form the complete OTP string
      const otpString = otp.join(""); // otp is an array of individual OTP digits

      // Optional: Add client-side validation
      if (otpString.length !== 4) {
        ReactToast("enter otp");
        return;
      }

      // Replace with your server URL and endpoint
      const serverUrl = `${import.meta.env.VITE_SERVER_URL}user/verify-otp`;

      // Send OTP to the server for verification
      const response = await axios.post(
        serverUrl,
        {
          otp: otpString,
          phone: value.onlyPhoneNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(() => false);

      // Handle server response
      if (response) {
        console.log(response);
        console.log("OTP verified successfully");

        if (response.data.profile === false)
          navigate(`/enter-detail?token=${response.data.token}`);
        else navigate("/");
        // Redirect or update UI as needed
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (error) {
      setLoading(() => false);
      // Handle errors
      console.log("Error verifying OTP:", error.message);
    }
  };
  return (
    <div>
      <div className="flex gap-2 w-full justify-evenly">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputsRef.current[index] = el)}
            maxLength="1"
            className="w-12 h-12 text-center border rounded-md"
            onPaste={handlePaste}
          />
        ))}
      </div>
      {loading ? (
        <button className="bg-[#007EC4] text-white h-[45px] rounded-md mt-5 w-full">
          Verifying...
        </button>
      ) : (
        <button
          onClick={() => onSubmit()}
          className="bg-[#007EC4] text-white h-[45px] rounded-md mt-5 w-full"
        >
          Verify OTP
        </button>
      )}
    </div>
  );
};

export default OTPInput;
