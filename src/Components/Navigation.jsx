import React, { useContext } from "react";
import { IoMoonOutline } from "react-icons/io5";
import { CiSun } from "react-icons/ci";
import { modeContext } from "../App";

const Navigation = () => {
  const { switchTheme, getTheme } = useContext(modeContext);
  return (
    <div
      style={{
        height: "3rem",
        width: "100%",
        padding: "0 1rem 0 1rem",
        backgroundColor: "white",
        position: "sticky",
        top: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <h1>Where in the world?</h1>
      <div style={{ display: "flex" }} onClick={() => switchTheme()}>
        {getTheme ? (
          <>
            <CiSun />
            <span>Light mode</span>
          </>
        ) : (
          <>
            <IoMoonOutline />
            <span>Dark mode</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Navigation;
