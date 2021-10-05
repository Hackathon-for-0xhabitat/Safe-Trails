import { useState } from 'react';
import './App.css';

import MapDisplay from './components/MapDisplay';
import UserInput from './components/UserInput';
import SideBar from './components/SideBar';
import Footer from './components/Footer';

function App() {
   const [latLng, setLatLng] = useState({});

   const coOrdinates = (value) => {
      setLatLng(value);
   };
   console.log(latLng);
   return (
      <div>
         <div className="relative">
            <MapDisplay coOrdinates={coOrdinates} />
            {/* <UserInput/> */}
            {Object.entries(latLng).length !== 0 && (
               <div className="w-screen h-screen bg-black bg-opacity-10 absolute z-10 top-0"></div>
            )}

            {Object.entries(latLng).length !== 0 && (
               <SideBar
                  lat={latLng.lat}
                  lng={latLng.lng}
                  coOrdinates={coOrdinates}
               />
            )}
         </div>
         <Footer />
      </div>
   );
}

export default App;
