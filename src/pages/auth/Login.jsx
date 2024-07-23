import Logo from "../../assets/home/logo/main_logo.png";
import SliderImg from "../../assets/auth/slider.png";
import google from "../../assets/auth/google.png";
import facebook from "../../assets/auth/facebook.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import axios from "axios";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import OTPInput from "../../componenets/auth/OTP";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState({});
  const [step, setStep] = useState("sent-otp");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnChange = (value, countryData) => {
    console.log({ countryData });
    console.log({ value });
    setPhone(value);
    let newPhno = value
      .split("")
      .filter((e, i) => i >= countryData?.dialCode?.length)
      .join("");
    console.log({ newPhno });
    setCountry({
      dialCode: countryData.dialCode,
      countryCode: countryData.countryCode.toUpperCase(),
      country: countryData.name,
      onlyPhoneNumber: value,
    });
  };

  const validatePhoneNumber = (phoneNumber, countryCode) => {
    const parsedPhoneNumber = parsePhoneNumberFromString(
      phoneNumber,
      countryCode
    );
    return parsedPhoneNumber && parsedPhoneNumber.isValid();
  };

  const handleSubmit = async () => {
    
    try {
      

      if (!validatePhoneNumber(phone, country.countryCode)) {
        setError("Invalid phone number for the selected country.");
        return;
      }

      setError("");

      let query = {
        mobileNumber: country.onlyPhoneNumber,
        country: {
          dialCode: country.dialCode,
          countryCode: country.countryCode,
          countryName: country.country,
        },
      };

      setLoading((prev) => true);
      const data = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}user/send-sms`,
        query,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

    
      if (data) {
        setLoading(false);
        setStep("otp-sent-success");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="h-screen flex">
      <div className="flex w-[90%] mx-auto">
        <div className="bg-blue w-[50%] flex flex-col items-center justify-center">
          <div className="flex flex-col w-[85%] gap-4">
            <div className="flex items-center gap-7">
              <div>
                <img className="h-[80px]" src={Logo} alt="Logo" />
              </div>
              <div className="text-[1.6rem] font-bold text-[#1F61BC]">
                <h3>My Air Deal</h3>
              </div>
            </div>
            <h2 className="font-medium text-[2.3rem]">Login</h2>
            <div className="mb-3">
              <h3 className="font-light text-[#112211] text-[1.2rem]">
                Login to access your Golobe account.
              </h3>
            </div>

            <div className="flex flex-col gap-4">
              {step === "sent-otp" && (
                <PhoneInput
                  country={"in"}
                  value={phone}
                  onChange={handleOnChange}
                  containerClass="h-[45px] border border-black rounded-md"
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                    className:
                      "p-2 border-none w-full text-center h-full outline-none rounded-md",
                  }}
                  buttonClass="bg-red-500"
                  dropdownClass="absolute bg-white border border-gray-300 shadow-lg"
                  enableSearch
                />
              )}
              {step === "otp-sent-success" && <OTPInput value={country} />}

              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            {step === "sent-otp" && (
              <button
                onClick={handleSubmit}
                className="bg-[#007EC4] text-white h-[45px] rounded-md mt-5"
              >
                {loading ? "Loading...." : " Send OTP"}
              </button>
            )}

            <div className="flex items-center w-full justify-center">
              <h2>
                Don't have an account?{" "}
                <a className="text-red-500 font-medium" href="/sign-up">
                  Sign up
                </a>
              </h2>
            </div>

            <div className="flex justify-center my-6 items-center text-slate-500">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="mx-2">Or login with</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <div className="flex justify-between">
              <button className="h-[45px] border border-[#007EC4] bg-white w-[45%] rounded-sm flex justify-center items-center">
                <img className="h-[35px]" src={facebook} alt="Facebook" />
              </button>
              <button className="h-[45px] border border-[#007EC4] bg-white w-[45%] rounded-sm flex justify-center items-center">
                <img className="h-[30px]" src={google} alt="Google" />
              </button>
            </div>
          </div>
        </div>
        <div className="w-[50%] flex items-center h-full">
          <div className="h-full flex w-full justify-center items-center">
            <img className="h-[90%]" src={SliderImg} alt="Slider" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
