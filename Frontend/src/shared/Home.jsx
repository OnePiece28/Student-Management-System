import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar"; // Import the NavBar component

const Home = () => {
  return (
    <div className="container">
      {/* Include the NavBar component */}
      <NavBar />
      {/* Render the appropriate component based on the active route */}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
