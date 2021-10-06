import { useContext, useEffect, useRef, useState } from 'react'
import Geocode from 'react-geocode'
import { FileDrop } from 'react-file-drop'
import { DataContext } from '../context/DataProvider'
import { XIcon } from '@heroicons/react/solid'
import axios from 'axios'
Geocode.setApiKey('AIzaSyDZm5P_EhxPjg23_BRvxQl6sVUXrW1zSOY')
Geocode.setLanguage('en')
const jwt = require('jsonwebtoken')

const SideBar = ({
  lat,
  lng,
  coOrdinates,
  sidebarCloseHandler,
  setSaved,
  isLogged,
}) => {
  // const [upVote, setUpVote] = useState(0);
  // const [downVote, setDownVote] = useState(0);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const { addItem } = useContext(DataContext)

  let token = localStorage.authToken ? localStorage.authToken : false
  const [address, setAddress] = useState('')
  // Get address from latitude & longitude.
  Geocode.fromLatLng(lat, lng).then(
    (response) => {
      const address = response.results[0].formatted_address
      setAddress(address)
    },
    (error) => {
      console.error(error)
    }
  )
  //FORM DATA
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [imageAsFile, setImageAsFile] = useState('')
  const fileInputRef = useRef(null)
  useEffect(() => {
    //   fileRef(imageAsFile)
  }, [imageAsFile])
  const handleImageAsFile = (files, event) => {
    const image = files[0]
    console.log(files)
    setImageAsFile(image)
    console.log(URL.createObjectURL(image))
  }
  const onFileInputChange = (event) => {
    const { files } = event.target
    const image = files[0]
    console.log(files)
    setImageAsFile(image)
  }
  const onTargetClick = () => {
    fileInputRef.current.click()
  }
  const clearImage = () => {
    setImageAsFile('')
  }

  const closeWindow = () => {
    coOrdinates('')
    sidebarCloseHandler()
  }

  const handleForm = async (e) => {
    e.preventDefault()
    setLoading(true)
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    const data = {
      title,
      description,
      lat,
      lng,
      address,
      username: isLogged.username,
    }
    const result = await axios.post('/api/marks/create', data, config)
    try {
      if (result.data.error) {
        setLoading(false)
        setError(result.data.error)
        setTimeout(() => {
          setError('')
        }, 5000)
      } else {
        //Close Sidebar and reload array of marks
        closeWindow()
        setSaved(true)
      }
    } catch (err) {
      setLoading(false)
      setError(err.message)
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  return (
    <>
      <div className="absolute right-0 top-0 bottom-0 pt-10 pb-3 px-5 z-50">
        <form class="flex max-w-sm space-x-3" onSubmit={handleForm}>
          <div class="w-full max-w-2xl px-5 py-5 mt-20 bg-white rounded-lg shadow dark:bg-gray-800">
            <div
              className="flex justify-end hover:text-red-500"
              onClick={closeWindow}
            >
              <XIcon className="h-5 w-5 fill-current" />
            </div>
            <div class="mb-6 text-lg md:text-2xl font-normal text-center text-gray-800 dark:text-white">
              {address}
            </div>
            <div class="grid max-w-xl grid-cols-2 gap-4 m-auto">
              <div class="col-span-2 lg:col-span-2">
                <div class=" relative ">
                  <input
                    type="text"
                    id="contact-form-name"
                    class=" rounded-lg border-transparent  border-2 flex-1 appearance-none  border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Problem Description"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>
              </div>
              {/* <div class="col-span-2 lg:col-span-1">
                    <div class=" relative ">
                        <input type="text" id="contact-form-email" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="email"/>
                        </div>
                    </div> */}

              <div className="relative bg-red-50 h-full w-full p-4 mb-5 mx-20 rounded-xl ">
                {imageAsFile.name && (
                  <button
                    onClick={clearImage}
                    class="absolute top-2 text-xl  right-2"
                  >
                    Close
                    {/* <HiXCircle class="text-xl text-white" /> */}
                  </button>
                )}
                <FileDrop
                  className="h-full w-full"
                  targetClassName="flex flex-col cursor-pointer items-center justify-center h-full w-full"
                  draggingOverFrameClassName="h-full w-full bg-gray-400 p-4 animate-pulse"
                  onTargetClick={onTargetClick}
                  onDrop={(files, event) => handleImageAsFile(files, event)}
                >
                  {imageAsFile.name && (
                    <img
                      class="w-full p-4 "
                      src={URL.createObjectURL(imageAsFile)}
                      alt="imagetag"
                    />
                  )}
                  <p class="text-center text-xl">
                    {imageAsFile.name ? (
                      imageAsFile.name
                    ) : (
                      <div className="flex flex-col">
                        <p>Click or Drop the Image here </p>{' '}
                        <div className="flex justify-center text-gray-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>{' '}
                        </div>
                      </div>
                    )}
                  </p>
                </FileDrop>
              </div>

              <input
                onChange={onFileInputChange}
                ref={fileInputRef}
                type="file"
                className="hidden"
              />

              <div class="col-span-2">
                <label class="text-gray-700" for="name">
                  <textarea
                    class="flex-1 appearance-none border-2 border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    id="comment"
                    placeholder="Enter detailed Description ..."
                    name="comment"
                    rows="3"
                    cols="40"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  ></textarea>
                </label>
              </div>
              {/* <div class="col-span-2 text-right">
                        <button
                           onClick={() => setUpVote(upVote + 1)}
                           class="py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                        >
                           Up Vote
                        </button>

                        <button
                           onClick={() => setDownVote(downVote - 1)}
                           class="py-2 px-4  bg-blue-600 hover:bg-blue700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                        >
                           Down Vote
                        </button>
                     </div> */}
              <div class="col-span-2 text-right">
                <button
                  type="submit"
                  class="py-2 px-4  bg-red-400 hover:bg-red-600 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  {loading ? (
                    <div className="flex justify-center">
                      <div
                        style={{ borderTopColor: 'transparent' }}
                        className="w-6 h-6 border-4 border-white border-dotted rounded-full animate-spin"
                      ></div>
                    </div>
                  ) : error.length ? (
                    <span className="text-white animate-pulse">{error}</span>
                  ) : (
                    'Save'
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="w-screen h-screen bg-black bg-opacity-10 absolute z-10 top-0"></div>
    </>
  )
}

export default SideBar
