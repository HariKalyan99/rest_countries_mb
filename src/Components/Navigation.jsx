import React, { useContext } from "react";
import { IoMoon } from "react-icons/io5";
import { modeContext } from "../App";

const Navigation = () => {
  const { switchTheme, getTheme } = useContext(modeContext);
  return (
    <>
      {getTheme ? (
        <div className="bg-darkModeElements w-full h-[4rem] flex justify-center items-center  shadow sticky top-0 cursor-pointer">
          <div
            className="w-[80%] flex justify-between items-center sticky top-0"
            onClick={() => switchTheme()}
          >
            <h1 className={`text-DarkModeText&LightModeElements font-bolder sm:text-lg`}>
              Where in the world?
            </h1>
            <div className="flex justify-center items-center gap-2">
              <IoMoon className={`text-DarkModeText&LightModeElements sm:text-sm`} />
              <span className={`text-DarkModeText&LightModeElements font-bol  sm:text-sm`}>
                Dark mode
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-lightModeBackground w-full h-[4rem] flex justify-center items-center  shadow sticky top-0 cursor-pointer">
          <div className="w-[80%] flex justify-between items-center sticky top-0">
            <h1 className={`text-lightModeText font-bold sm:text-lg`}>Where in the world?</h1>
            <div
              className="flex justify-center items-center gap-2"
              onClick={() => switchTheme()}
            >
              <IoMoon className={`text-lightModeText sm:text-sm`} />
              <span className={`text-lightModeText font-bold sm:text-sm`}>Dark mode</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
