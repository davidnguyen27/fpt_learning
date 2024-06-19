import React from "react";
import { useSider } from "../../app/context/SiderContext";
import StudentUser from "./StudentUser";

const StudentHeader: React.FC = () => {
  const { toggleSider } = useSider();

  return (
    <>
      <div className="wrapper-50">
        <div className="styles-x-axis">
          <div className="menu-bar" onClick={toggleSider}>
            <i className="fa-solid fa-bars"></i>
          </div>
          <div className="logo-box">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/FPT_Education_logo.svg/2560px-FPT_Education_logo.svg.png"
              alt="FPT Education"
            />
          </div>
          <div className="styles-x-axis search-box">
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="Search for courses, tutorials..."
              className="search-item"
            />
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
          </div>
        </div>
      </div>
      <div className="styles-x-axis justify-end">
        <div className="cart-styles">
          <i className="fa-solid fa-cart-shopping"></i>
        </div>
        <div className="cart-styles user-icon-container">
          <StudentUser />
        </div>
      </div>
    </>
  );
};

export default StudentHeader;
