


const SidebarVoting = (props) => {
   
   console.log("propsfromvoting", props)
   



   return (
      <>
      <div className="absolute right-0 top-0 bottom-0 h-full pt-10 pb-3 px-5 z-50">
         <form class="flex h-full max-w-sm space-x-3">
            <div class="w-full max-w-2xl px-5 py-5 mt-20 bg-white rounded-lg shadow dark:bg-gray-800">
               <div className="flex justify-end " >
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
              
               <div class="grid max-w-xl grid-cols-2 gap-4 m-auto">
                  <div class="col-span-2 lg:col-span-2">
                     <div class=" relative ">
                           <p>{props.title}</p>
                     </div>
                  </div>
                 
                  <div class="col-span-2">
                     <p> Image</p>
                  </div>
                   <div class="col-span-2 text-right">
                     <button
                        // onClick={() => setUpVote(upVote + 1)}
                        class="py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                     >
                        Up Vote
                     </button>

                     <button
                        // onClick={() => setDownVote(downVote - 1)}
                        class="py-2 px-4  bg-blue-600 hover:bg-blue700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                     >
                        Down Vote
                     </button>
                  </div> 
                  {/* <div class="col-span-2 text-right">
                     <button
                        type="submit"
                        class="py-2 px-4  bg-red-400 hover:bg-red-600 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                     >
                        Submit
                     </button>
                  </div> */}
               </div>
            </div>
         </form>
      </div>
      <div className="w-screen h-screen bg-black bg-opacity-10 absolute z-10 top-0"></div>
   </>








   )

}

 export default SidebarVoting