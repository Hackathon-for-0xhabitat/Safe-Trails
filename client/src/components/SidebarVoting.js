import { useContext } from 'react'
import { DataContext } from '../context/DataProvider'
import { ChevronDownIcon, ChevronUpIcon, XIcon } from '@heroicons/react/outline'
import moment from 'moment'
const SidebarVoting = ({ data, votingHandler, isLogged }) => {
  const { upVote, downVote } = useContext(DataContext)

  const votingCloseHandler = () => {
    votingHandler({})
  }
  const upVoteHandler = () => {
    if (data.votesup.includes(isLogged.id)) {
      alert('you can vote only once')
    } else {
      upVote(isLogged.id, data._id.$oid)
    }
  }

  const downVoteHandler = () => {
    if (data.votesdown.includes(isLogged.id)) {
      alert('you can vote only once')
    } else {
      downVote(isLogged.id, data._id.$oid)
    }
  }

  return (
    <>
      <div className="absolute w-auto right-0 top-0 bottom-0 pt-10 pb-3 px-5 z-50">
        <div class="flex max-w-lg">
          <div class="w-full px-5 py-5 mt-20 bg-white rounded-lg shadow dark:bg-gray-800">
            <div
              className="flex justify-end hover:text-red-500"
              onClick={votingCloseHandler}
            >
              <XIcon className="h-5 w-5 fill-current" />
            </div>
            <div class="grid max-w-xl grid-cols-2 gap-4 m-auto">
              <div class="col-span-2 lg:col-span-2">
                <div class=" relative ">
                  <p className="text-3xl text-red-500 font-semibold">
                    {data.title}
                  </p>
                  <p className="text-lg mt-2 h-50"> {data.description} </p>
                </div>
              </div>
              <div class="col-span-2 lg:col-span-2">
                <div class=" relative ">
                  <p className="text-lg underline">
                    Reported by
                    <span className="font-bold"> {data.username}</span> on:
                  </p>

                  <p className="text-sm ">{moment(data.date).format('LLLL')}</p>
                </div>
              </div>

              <div class="col-span-2 flex justify-center">
                <img className="w-1/2 h-ful" src={data.img} alt="issue" />
              </div>
              <div class="col-span-2  flex flex-col m-3 justify-around">
                <p className="text-xs py-2 font-bold tracking-wider">
                  Vote on the issue:
                </p>
                <div className="flex items-center justify-between space-x-2">
                  <button
                    class="flex space-x-2 items-center w-1/2 px-2 py-1 bg-red-400 transition ease-in duration-200 rounded-xl hover:bg-gray-800 text-white focus:outline-none shadow hover:shadow-xl "
                    onClick={upVoteHandler}
                  >
                    <ChevronUpIcon className="ml-4 h-8 w-8" />
                    <p className="text-sm">Upvote</p>
                    <p className="font-bold text-lg flex-grow">
                      {data.votesup.length}
                    </p>
                  </button>

                  <button
                    onClick={downVoteHandler}
                    class="flex space-x-2 w-1/2 items-center px-2 py-1 transition bg-cyan-500 ease-in duration-200  rounded-xl hover:bg-gray-800  text-white focus:outline-none shadow hover:shadow-xl"
                  >
                    <ChevronDownIcon className="ml-4 h-8 w-8" />
                    <p className="text-sm">Downvote</p>
                    <p className="font-bold text-lg flex-grow">
                      {data.votesdown.length}
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen h-screen bg-black bg-opacity-10 absolute z-10 top-0"></div>
    </>
  )
}

export default SidebarVoting
