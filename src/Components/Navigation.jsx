import React, { useContext } from "react";
import { IoMoon } from "react-icons/io5";
import { modeContext } from "../App";

const Navigation = () => {
  const { switchTheme, getTheme } = useContext(modeContext);
  return (

    
    <>
    {getTheme ? <div className="bg-darkModeElements w-full h-[4rem] flex justify-center items-center  shadow sticky top-0 cursor-pointer">
      <div className="w-[80%] flex justify-between items-center sticky top-0"  onClick={() => switchTheme()}>
      <h1 className={`text-DarkModeText&LightModeElements`}>Where in the world?</h1>
      <div className="flex justify-center items-center gap-2">
              <IoMoon className={`text-DarkModeText&LightModeElements`}/>
            <span className={`text-DarkModeText&LightModeElements`}>Dark mode</span>
      </div>
</div>
    </div> :
    
    <div className="bg-lightModeBackground w-full h-[4rem] flex justify-center items-center  shadow sticky top-0 cursor-pointer">
 <div className="w-[80%] flex justify-between items-center sticky top-0">
<h1 className={`text-lightModeText`}>Where in the world?</h1>
      <div className="flex justify-center items-center gap-2" onClick={() => switchTheme()}>
            <IoMoon className={`text-lightModeText`}/>
            <span className={`text-lightModeText`}>Dark mode</span>
      </div>
  </div>
    </div>
   }
    </>
  );
};

export default Navigation;
