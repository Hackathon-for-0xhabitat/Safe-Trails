import { createContext, useState, useEffect } from 'react'

// creating a context and exporting it
export const DataContext = createContext(null)

const defaultData = [
   {
     title: 'Dangerous intersection',
     description: 'Many accidents occuring in this intersection',
     _id: { $oid: '615b4e5f65f9e95b15087a01' },
     lat: 52.520008,
     lng: 13.484954,
     date: '05/11/20',
     votesup: ['615b4e5f65f9e95b15087a01', '615b4e5f65f9e95b15087a07'],
     votesdown: ['615b4e5f65f9e95b15787a01'],
     img: 'https://sfbike.org/wp-content/uploads/2018/04/mixing-zone-1000px.jpg',
   },
   {
     title: 'Unclear Lane Markings',
     description: 'No proper lane markings in this area',
     lat: 52.520008,
     lng: 13.394954,
     date: '12/11/20',
     __v: 0,
     _id: { $oid: '615c733dfd1a8509a54f7971' },
      img: 'https://thumbs.dreamstime.com/b/white-worn-out-road-marking-gray-asphalt-can-be-used-as-abstract-background-152285785.jpg',
      votesup: ['615b4e5f65f9e95b15087a05', '615b4e5f65f9e95b15087a07'],
     votesdown: ['615b4e5f65f9e95b15787a10'],
   },
   {
     title: 'Potholes',
     description: 'A dangerous pothole at the end of the street',
     lat: 52.520008,
     lng: 13.444954,
     date: '21/11/07',
     __v: 0,
     _id: { $oid: '615c733dfd1a8509a54f7873' },
      img: 'https://d1ix0byejyn2u7.cloudfront.net/drive/images/uploads/headers/ws_cropper/26_0x158_1200x629_1200x630_potholes_galore.jpg',
      votesup: ['615b4e5f65f9e95b15087a08', '615b4e5f65f9e95b15087a17'],
     votesdown: ['615b4e5f65f9e95b15787a12'],
   },
   {
     title: 'Road Blocked',
     description: 'Street has been blocked since two weeks',
     lat: 52.5208789,
     lng: 13.477709940957715,
     date: '12/08/20',
     __v: 0,
     _id: { $oid: '615c733dfd1a8509a54f7874' },
      img: 'https://i2.wp.com/resultsempowerment.com/wp-content/uploads/2017/04/BlockedRoad.jpg?resize=630%2C315',
      votesup: ['615b4e5f65f9e95b15087a07', '615b4e5f65f9e95b15087a27'],
      votesdown: ['615b4e5f65f9e95b15787a19'],
   },
   {
     title: 'Fallen tree',
     description: 'A tree has fallen down on the street ',
     lat: 52.53084917978288,
     lng: 13.357709940957715,
     date: '09/05/21',
     __v: 0,
     _id: { $oid: '615c733dfd1a8509a54f779' },
      img: 'https://ak.picdn.net/shutterstock/videos/7969018/thumb/1.jpg',
      votesup: ['615b4e5f65f9e95b15087a21', '615b4e5f65f9e95b15087a27'],
      votesdown: ['615b4e5f65f9e95b15787a33'],
   },
 ]
const DataProvider = ({ children }) => {
   const [data, setdata] = useState(defaultData)


   
   const upVote = (userId, objectId) => {
      for (const item of data) {
         if (item._id.$oid === objectId) {
            item.votesup.push(userId)
         }
      }
      setdata([...data])
   }

   const downVote = (userId, objectId) => {
      for (const item of data) {
         if (item._id.$oid === objectId) {
            item.votesdown.push(userId)
         }
      }
      setdata([...data])
   }


   const addItem = (item) => {
      data.push(item)
      console.log("submit",data)
      setdata([...data] )
   }
   
   
return (
   //  Providing the context
   <DataContext.Provider
      value={{
         data: data,
         upVote: upVote,
         downVote: downVote,
         addItem:addItem
      }}
   
   
   >
      
        {children}
   </DataContext.Provider>
)
}

export default DataProvider
