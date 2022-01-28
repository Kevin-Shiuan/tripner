import 
{ 
    checkUser, 
    newUser,
    newTrip,
    checkTrip,
    newLocation,
    checkLocation,
} 
from "./utility";
import uuidv4 from 'uuid/v4';
import bcrypt from "bcrypt";  
const saltRounds = 10;

const Mutation = {
    // User
    // async createUser(parent, args, {db, pubsub}, info) {
    //     if (!args.name) {
    //         throw new Error("Missing name for createUser");
    //     }
    //     if (!args.password) {
    //         throw new Error("Missing password for createUser")
    //     }
    //     let user = await checkUser(db, args.name, "createUser");
    //     if (!user) { 
    //         user = await newUser(db, args);
    //     }
    //     else {
    //         // [TODO] tell frontend to block this user name
    //         throw new Error(`User name: "${args.name}" already exist, please try a different one.`)
    //     }
    //     return user;


    // added by Kevin in midnight, because catching error will make frontend stop working
        async createUser(parent, args, {db, pubsub}, info) {
            let success = false;
            let errMsg = "";

            if (!args.name) {
                errMsg = "Missing name for createUser";
            }
            else {
                if (!args.password) {
                    errMsg = "Missing password for createUser";
                }
                else {
                    let user = await checkUser(db, args.name, "createUser");
                    if (!user) { 
                        user = await newUser(db, args);
                        success = true;
                    }
                    else {
                        // [TODO] tell frontend to block this user name
                        errMsg = `User name: "${args.name}" already exist, please try a different one.`
                    }
                }
            }
            return {
                success: success,
                errorMessage: errMsg
            };
    },
    async updateUser(parent, args, {db, pubsub}, info) {
        let data = args.input;
        console.log(data)
        if (!data.name) {
            throw new Error("Missing name for updateUser");
        }
        let old_user = await checkUser(db, data.name, "");
        let user = await db.UserModel.findOneAndUpdate({name: data.name}, {...data}, {new: true});
        // remove 
        for (let pbt_id of old_user.public_trips) {
            let pbt = await checkTrip(db, pbt_id, "");
            await db.TripModel.findOneAndUpdate({tripID: pbt_id}, {tripmate: pbt.tripmate.filter((name) => {
                return name != old_user.name;
            })});
        }
        for (let pvt_id of old_user.private_trips) {
            let pvt = await checkTrip(db, pvt_id, "");
            await db.TripModel.findOneAndUpdate({tripID: pvt_id}, {tripmate: pvt.tripmate.filter((name) => {
                return name != old_user.name;
            })});
        }
        // add
        for (let pbt_id of user.public_trips) {
            let pbt = await checkTrip(db, pbt_id, "");
            await db.TripModel.findOneAndUpdate({tripID: pbt_id}, {tripmate: [...pbt.tripmate, user.name]})
        }
        for (let pvt_id of user.private_trips) {
            let pvt = await checkTrip(db, pvt_id, "");
            await db.TripModel.findOneAndUpdate({tripID: pvt_id}, {tripmate: [...pvt.tripmate, user.name]})
        }
        if (!user) {
            throw new Error("User not exist for updateUser");
        }
        return user;
    },
    // Trip
    async createTrip(parent, args, {db, pubsub}, info) {
        console.log("start create trip");
        let success = true;
        let errMsg = "";
        let data = args.input;
        console.log(data)
        if (!data.trip_name) {
            errMsg = "Missing trip_name for createTrip";
            success = false;
        }
        if (!data.city) {
            errMsg = "Missing city for createTrip";
            success = false;
        }
        if (!data.date_start) {
            errMsg = "Missing date_start for createTrip";
            success = false;
        }
        if (!data.date_end) {
            errMsg = "Missing date_end for createTrip";
            success = false;
        }
        for (let tm of data.tripmate) {
            let user = await checkUser(db, tm, "");
            if (!user) {
                success = false;
                errMsg = "tripmate is not exist, you should create user first" 
            }    
        }
        if (!success) {
            return {
                success: success,
                errorMessage: errMsg,
            };
        }

        let trip = await newTrip(db, data);
        console.log(trip);
        // modify user (add trip into each tripmates)
        let id = trip.tripID;
        if (trip.open_to_public) {
            for (let tm of trip.tripmate) {
                let user = await checkUser(db, tm, "");
                console.log(user);
                if (!user.public_trips.includes(id)) {
                    await db.UserModel.updateMany({name: tm}, {public_trips: [...user.public_trips, id]});
                }        
            }
        }
        else {
            for (let tm of trip.tripmate) {
                let user = await checkUser(db, tm, "");
                console.log(user);
                if (!user.private_trips.includes(id)) {
                    await db.UserModel.updateMany({name: tm}, {private_trips: [...user.private_trips, id]});
                }
            }
        }
        // publish subscription 
        for (let tm of trip.tripmate) {
            pubsub.publish(`Trip Create on: user ${tm}`, {
                tripCreated: id,
            });
            console.log(`Trip Create on: user ${tm}`);
        }
        return {
            success: success,
            errorMessage: errMsg,
        };
    },
    async updateTrip(parent, args, {db, pubsub}, info) {
        let data = args.input;
        let success = true;
        let errMsg = "";
        console.log(data)
        if (!data.trip_name) {
            success = false;
            errMsg = "Missing name for updateTrip";
        }
        let old_trip = await checkTrip(db, data.tripID, "");
        let trip = await db.TripModel.findOneAndUpdate({tripID: data.tripID}, {...data}, {new: true});
        if (!trip) {
            success = false;
            errMsg = "User not exist for updateTrip";
        }
        if (!success) {
            return {
                success: success,
                errorMessage: errMsg,
            };
        }
        let id = trip.tripID;
        // remove old tripmate
        for (let otm of old_trip.tripmate) {            
            let user = await checkUser(db, otm, "");
            if (old_trip.open_to_public) {
                await db.UserModel.updateMany({name: otm}, {public_trips: user.public_trips.filter((tid) => {
                    return tid != id;
                })});
            }
            else {
                await db.UserModel.updateMany({name: otm}, {private_trips: user.private_trips.filter((tid) => {
                    return tid != id;
                })});
            }            
        }
        // insert new tripmate
        if (trip.open_to_public) {
            for (let tm of trip.tripmate) {
                let user = await checkUser(db, tm, "");
                if (!user) {
                    success = false;
                    errMsg = "tripmate error in updateTrip";
                }
                console.log(user);
                if (!user.public_trips.includes(id)) {
                    await db.UserModel.updateMany({name: tm}, {public_trips: [...user.public_trips, id]});
                }        
            }
        }
        else {
            for (let tm of trip.tripmate) {
                let user = await checkUser(db, tm, "");
                if (!user) {
                    success = false;
                    errMsg = "tripmate error in updateTrip";
                }
                console.log(user);
                if (!user.private_trips.includes(id)) {
                    await db.UserModel.updateMany({name: tm}, {private_trips: [...user.private_trips, id]});
                }
            }
        }
        return {
            success: success,
            errorMessage: errMsg,
        };
    },
    async addLocation4Trip(parent, {tripID, locations}, {db, pubsub}, info) {
        if (!tripID) {
            throw new Error("Missing tripID for addLocation4Trip");
        }
        if (!locations) {
            throw new Error("location should be at least 1 for addLocation4Trip");
        }
        let trip = await checkTrip(db, tripID, "addLocation4Trip");
        return await db.TripModel.findOneAndUpdate({tripID: tripID}, 
            {unscheduled_locations: [...trip.unscheduled_locations, ...locations]}, {new: true});
    },
    // Location
    async createLocation(parent, args, {db, pubsub}, info) {
        let data = args.input;
        if (!data.name) {
            throw new Error("Missing name for location");
        }
        if (!data.googleMapID) {
            throw new Error("Missing googleMapID for location");
        }
        // [TODO] ... should be more when connect to google map API
        // [TODO] should check if this location has been created.
        let location = await newLocation(db, data);
        return location;
    },

    // Login
    async SignIn(parent, {name, password}, {db}, info) {
        let success = false;
        let errMsg = "";
        let user = await checkUser(db, name, "signIn");
        if (!user) {
            errMsg = `Name ${name} not found!!`;
        }
        else {
            // const hashedInput = await bcrypt.hash(password, saltRounds);
            const res = await bcrypt.compare(password, user.password);
            if (res) {
                success = true;
            }
            else {
                errMsg = "The password is not correct";
            }
        }
        return {
            success: success,
            errorMessage: errMsg
        };
    },
};

export default Mutation;
