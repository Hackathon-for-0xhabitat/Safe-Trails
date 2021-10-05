import { useEffect, useState } from "react";
import "./App.css";

import MapDisplay from "./components/MapDisplay";
import UserInput from "./components/UserInput";
import SideBar from "./components/SideBar";
import Login from "./components/Login";
import "./components/MapDisplay.css";


function App() {
  const [latLng, setLatLng] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const [isSidebar, setIsSidebar] = useState(false);
  const [isCoord, setIsCoord] = useState(false)


  const loginCloseHandler = () => {
    setIsSidebar(false)
    // setIsCoord(true);
    //markers.length > 0 && setMarkers([...markers.pop()])
  }

  const sidebarCloseHandler = () => {
    setIsSidebar(false)
    // setIsCoord(true);
    //markers.length > 0 && setMarkers([...markers.pop()])
  }

  const coOrdinates = (value) => {
    setLatLng(value);
    setIsCoord(true);
    setIsSidebar(true);
  };
  const userLogin = (value) => {
    setIsLogged(value);
  };
  useEffect(() => {
    !isSidebar && setLatLng({})  
  }, [isSidebar])


  return (
    <>
      {isLogged && 
      <button className="avatar">
        <img
          classNname=""
          src="https://clickmedical.co/wp-content/uploads/2018/08/Nick-Gibb-1-1024x596.jpg"
          alt="Profileimage"
        />
      </button>}
      <div className="relative">
        <MapDisplay marker={latLng} coOrdinates={coOrdinates}/>
        {/* <UserInput/> */}

        {isLogged && isCoord && isSidebar
          ?  <SideBar
                lat={latLng.lat}
                lng={latLng.lng}
            coOrdinates={coOrdinates}
            sidebarCloseHandler={sidebarCloseHandler}
              />
          : (isCoord && isSidebar) &&
            <Login userLogin={userLogin}
            loginCloseHandler={loginCloseHandler} />
        }
     
        
      </div>
    </>
  );
}

export default App;
