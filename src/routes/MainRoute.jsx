import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ViewBooking from "../pages/profile/ViewBooking";
import ViewDetailedBooking from "../pages/profile/ViewDetailedBooking";

const MainRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/enter-detail" element={<Signup />} />
        <Route path="/view-booking" element={<ViewBooking />} />
        <Route
          path="/view-detailed-booking"
          element={<ViewDetailedBooking />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoute;
