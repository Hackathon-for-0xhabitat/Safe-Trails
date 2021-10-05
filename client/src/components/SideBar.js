import { useEffect, useRef, useState } from "react";
import Geocode from "react-geocode";
import { FileDrop } from "react-file-drop";
import { XIcon } from "@heroicons/react/solid";
Geocode.setApiKey("AIzaSyDZm5P_EhxPjg23_BRvxQl6sVUXrW1zSOY");
Geocode.setLanguage("en");

const SideBar = ({ lat, lng, coOrdinates }) => {
  const [address, setAddress] = useState("");
  // Get address from latitude & longitude.
  Geocode.fromLatLng(lat, lng).then(
    (response) => {
      const address = response.results[0].formatted_address;
      setAddress(address);
    },
    (error) => {
      console.error(error);
    }
  );

  const [imageAsFile, setImageAsFile] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    //   fileRef(imageAsFile)
  }, [imageAsFile]);

  const handleImageAsFile = (files, event) => {
    const image = files[0];
    console.log(files);
    setImageAsFile(image);
    console.log(URL.createObjectURL(image));
  };

  const onFileInputChange = (event) => {
    const { files } = event.target;
    const image = files[0];
    console.log(files);
    setImageAsFile(image);
  };

  const onTargetClick = () => {
    fileInputRef.current.click();
  };

  const clearImage = () => {
    setImageAsFile("");
  };
  const closeWindow = () => {
    coOrdinates("");
  };
  return (
    <div className="absolute right-0 top-0 bottom-0 h-full pt-10 pb-3 px-5 z-50">
      <form class="flex h-full max-w-sm space-x-3">
        <div class="w-full max-w-2xl px-5 py-5 mt-20 bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="flex justify-end " onClick={closeWindow}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 "
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div class="mb-6 text-3xl font-light text-center text-gray-800 dark:text-white">
            {address}
          </div>
          <div class="grid max-w-xl grid-cols-2 gap-4 m-auto">
            <div class="col-span-2 lg:col-span-2">
              <div class=" relative ">
                <input
                  type="text"
                  id="contact-form-name"
                  class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Problem Description"
                />
              </div>
            </div>
            {/* <div class="col-span-2 lg:col-span-1">
                    <div class=" relative ">
                        <input type="text" id="contact-form-email" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="email"/>
                        </div>
                    </div> */}

            <div className="relative bg-gray-200 h-full w-full p-4 mb-5 mx-20 rounded-xl ">
              {imageAsFile.name && (
                <button
                  onClick={clearImage}
                  class="absolute top-2 text-xl  right-2"
                >
                  {" "}
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
                  {imageAsFile.name
                    ? imageAsFile.name
                    : "Click or Drop the Image here"}
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
                  class="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  id="comment"
                  placeholder="Enter detailed Description ..."
                  name="comment"
                  rows="5"
                  cols="40"
                ></textarea>
              </label>
            </div>
            <div class="col-span-2 text-right">
              <button
                type="submit"
                class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SideBar;
