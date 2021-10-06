import { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import './App.css'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import RegisterForm from './components/RegisterForm';
import MapDisplay from './components/MapDisplay'
import SideBar from './components/SideBar'
import Login from './components/Login'
import './components/MapDisplay.css'
import SidebarVoting from './components/SidebarVoting'

function App() {
  const [register, setRegister] = useState(false)
  const [latLng, setLatLng] = useState({})
  const [isLogged, setIsLogged] = useState(false)
  const [isSidebar, setIsSidebar] = useState(false)
  const [isCoord, setIsCoord] = useState(false)
  const [selectedIssue, setSelectedIssue] = useState({})
  let token = localStorage.authToken ? localStorage.authToken : false

  const votingHandler = (value) => {
    setSelectedIssue(value)
  }

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
    setLatLng(value)
    setIsCoord(true)
    setIsSidebar(true)
  }
  const userLogin = (value) => {
    setIsLogged(value)
  }
  useEffect(() => {
    !isSidebar && setLatLng({})
  }, [isSidebar])

  useEffect(() => {
    
    if (token || token === undefined) {
      var decode = jwt.decode(localStorage.authToken)
      userLogin({ id: decode.id, username: decode.username })
    }
  }, [token])

  const logout = () => {
    localStorage.authToken = ''
    token = false
    setIsLogged(false)
  }
  return (
    <>
      {Object.keys(selectedIssue).length !== 0 && <SidebarVoting />}
      {isLogged && (
        <Menu as="div" className="avatar ">
          <Menu.Button className="flex items-center space-x-3 relative focus:outline-none bg-white py-2 px-4 rounded-xl shadow transition duration-100 hover:shadow-xl">
            <h2 className="text-gray-800 font-bold text-lg hidden xl:block">
              Hey {isLogged.username}!
            </h2>
            <div
              className={`rounded-full w-10 h-10 md:w-12 md:h-12 bg-gradient-to-t from-cyan-300 to-cyan-500 flex justify-center items-center`}
            >
              <p className="text-2xl md:text-3xl font-bold uppercase">
                {isLogged.username[0]}
              </p>
            </div>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute w-40 bg-white overflow-hidden shadow-xl right-0">
              <Menu.Item
                as="button"
                className="w-full appearrance-none px-4 py-2 font-bold appearance-none outline-none text-sm text-gray-800 hover:bg-red-500 hover:text-white"
                onClick={() => logout()}
              >
                Logout
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
      <div className="relative">
        <MapDisplay
          marker={latLng}
          coOrdinates={coOrdinates}
          votingHandler={votingHandler}
        />
            {isLogged && isCoord && isSidebar ? (
               <SideBar
                  lat={latLng.lat}
                  lng={latLng.lng}
                  coOrdinates={coOrdinates}
                  sidebarCloseHandler={sidebarCloseHandler}
               />
            ) : register ?  (<RegisterForm  userLogin={userLogin}/>) : (
               isCoord &&
               isSidebar && (
                  <Login
                     userLogin={userLogin}
                     loginCloseHandler={loginCloseHandler}
                     setRegister={setRegister}
                  />
               )
            )}
         </div>
         {/* <Footer /> */}
      </>
   );
}

export default App
