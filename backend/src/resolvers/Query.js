// const Query = {
//   async chatBox(parent, {name1, name2},{db}, info){
//     let chatBoxName = makeName(name1, name2);
//     let chatBox = await checkChatBox(db, chatBoxName, "query")
//     console.log(chatBox);
//     if(!chatBox){
//       throw new Error("Chat Box not exist while query");
//     }
//     return chatBox;
//   },
// };

import 
{ 
    checkUser, 
    newUser,
    newTrip,
    checkTrip,
    newLocation,
    checkLocation,
    checkAllUsers,
} 
from "./utility";

const Query = {
    async User(parent, {name}, {db}, info) {
        if (!name) throw new Error("Missing user name for QuerybyName");
        let user = await checkUser(db, name, "QuerybyName");
        if (!user) {
            throw new Error("User not exist while Query");
        }
        return user;
    },
    async AllUsers(parent, args, {db}, info) {
        return await checkAllUsers(db);
    },
    async Trip(parent, {tripID}, {db}, info) {
        if (!tripID) throw new Error("Missing user id for QuerybyId");
        // console.log(tripID);
        let trip = await checkTrip(db, tripID, "Querybyid");
        // console.log(trip);
        if (!trip) {
            throw new Error("Trip not exist while Query");
        }
        return trip;
    },
    async Trips(parent, {tripIDs}, {db}, info) {
        let retList = [];
        for(let id of tripIDs) {
            if (!id) throw new Error("Missing user id for QuerybyId");
            // console.log(tripID);
            let trip = await checkTrip(db, id, "Querybyid");
            // console.log(trip);
            if (!trip) {
                throw new Error("Trip not exist while Query");
            }
            retList = [...retList, trip];
        }
        return retList;
    },
    async UserTrips(parent, {name}, {db}, info) {
        console.log("query from gallary");
        if (!name) throw new Error("Missing user name for QuerybyName");
        let user = await checkUser(db, name, "QuerybyName");
        if (!user) {
            throw new Error("User not exist while Query");
        }
        let retList = [];
        for(let id of user.public_trips) {
            if (!id) throw new Error("Missing user id for QuerybyId");
            // // console.log(tripID);
            let trip = await checkTrip(db, id, "Querybyid");
            // console.log(trip);
            if (!trip) {
                throw new Error("Trip not exist while Query");
            }
            retList = [...retList, trip];
        }
        for(let id of user.private_trips) {
            if (!id) throw new Error("Missing user id for QuerybyId");
            // console.log(tripID);
            let trip = await checkTrip(db, id, "Querybyid");
            // console.log(trip);
            if (!trip) {
                throw new Error("Trip not exist while Query");
            }
            retList = [...retList, trip];
        }
        return retList;
    },
    async Location(parent, {googleMapID}, {db}, info) {
        if (!googleMapID) throw new Error("Missing googleMapID for QuerybyID");
        // console.log(googleMapID);
        let location = await checkLocation(db, googleMapID, "Querybyid");
        // console.log(location);
        if (!location) {
            throw new Error("Location not exist while Qurey");
        }
        return location;
    },
}

export default Query;
