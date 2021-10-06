import { useContext } from "react";
import { DataContext } from "../context/DataProvider";

const SidebarVoting = ({ data, votingHandler, isLogged }) => {
   
const {upVote,downVote} = useContext(DataContext)
   
   const votingCloseHandler = () => {
      votingHandler({})
     
   }
   const upVoteHandler = () => {
      // console.log(isLogged.id)
      // console.log(data._id.$oid)
     if( (data.votesup).includes(isLogged.id) ){
         alert('you can vote only once')
      }
      else {
         upVote(isLogged.id,data._id.$oid)
      }
   }
   
   const downVoteHandler = () => {
      // console.log(isLogged.id)
      // console.log(data._id.$oid)
     if( (data.votesdown).includes(isLogged.id) ){
         alert('you can vote only once')
      }
      else {
         downVote(isLogged.id,data._id.$oid)
      }
   }
   

  return (
    <>
      <div className="absolute right-0 top-0 bottom-0 h-full pt-10 pb-3 px-5 z-50">
        <div class="flex h-full max-w-sm space-x-3">
          <div class="w-full max-w-2xl px-5 py-5 mt-20 bg-white rounded-lg shadow dark:bg-gray-800">
                 <div className="flex justify-end  " onClick={votingCloseHandler}>
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
                  <p className="text-2xl  text-red-500 font-semibold">
                    {" "}
                    {data.title}
                  </p>
                  {/* <p className="text-lg"> Problem Description : </p> */}
                  <p className="text-lg"> {data.description} </p>
                </div>
              </div>
              <div class="col-span-2 lg:col-span-2">
                <div class=" relative ">
                  <p className="text-xl font-semibold"> Reported Date : </p>

                  <p className="text-xl "> {data.date}</p>
                </div>
              </div>

              <div class="col-span-2 flex justify-center">
                <img className="w-1/2 h-ful" src={data.img} alt="issue" />
              </div>
              <div class="col-span-2  flex m-3 justify-around">
                       <button class="flex items-center px-2 py-2 bg-red-400 w-5/12 transition ease-in duration-200  rounded hover:bg-gray-800  text-white hover:text-white border-2 border-gray-4P00 focus:outline-none" onClick={upVoteHandler} >
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
                      d="M8 7l4-4m0 0l4 4m-4-4v18"
                    />
                  </svg>
               Upvote {data.votesup.length}
                </button>

                <button onClick={downVoteHandler} class="flex items-center px-2 py-2  w-5/12 transition bg-cyan-600 ease-in duration-200  rounded hover:bg-gray-800  text-white hover:text-white border-2 border-gray-4P00 focus:outline-none">
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
                      d="M16 17l-4 4m0 0l-4-4m4 4V3"
                    />
                  </svg>
                 Downvote {data.votesdown.length}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen h-screen bg-black bg-opacity-10 absolute z-10 top-0"></div>
    </>
  );
};

export default SidebarVoting;
