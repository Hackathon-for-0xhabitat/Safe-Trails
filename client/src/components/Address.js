// import Geocode from "react-geocode";
// Geocode.setApiKey("AIzaSyDZm5P_EhxPjg23_BRvxQl6sVUXrW1zSOY");
// Geocode.setLanguage("en");

// const Address = ({lat,lng}) => {
   

// // Get address from latitude & longitude.
// Geocode.fromLatLng("48.8583701", "2.2922926").then(
//    (response) => {
//      const address = response.results[0].formatted_address;
//      console.log(address);
//    },
//    (error) => {
//      console.error(error);
//    }
//  );
 
//  // Get formatted address, city, state, country from latitude & longitude when
//  // Geocode.setLocationType("ROOFTOP") enabled
//  // the below parser will work for most of the countries
//  Geocode.fromLatLng("48.8583701", "2.2922926").then(
//    (response) => {
//      const address = response.results[0].formatted_address;
//      let city, state, country;
//      for (let i = 0; i < response.results[0].address_components.length; i++) {
//        for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
//          switch (response.results[0].address_components[i].types[j]) {
//            case "locality":
//              city = response.results[0].address_components[i].long_name;
//              break;
//            case "administrative_area_level_1":
//              state = response.results[0].address_components[i].long_name;
//              break;
//            case "country":
//              country = response.results[0].address_components[i].long_name;
//                break;
//             default:
//                break;
//          }
//        }
//      }
//      console.log(city, state, country);
//      console.log(address);
//    },
//    (error) => {
//      console.error(error);
//    }
//    );

//    return(
//       <div>

//       </div>
//    )

   
// }
// export default Address