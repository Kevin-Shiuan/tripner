import uuidv4 from 'uuid/v4';
import bcrypt from "bcrypt";  
const saltRounds = 10;

// const makeName = (name1, name2)=>{
//     return[name1, name2].sort().join("_");
// };

// //return found user, can be null
const checkUser = (db, name, errFunc) => {
    // console.log(db);
    if(!name) throw new Error("Missing user name for " + errFunc);
    return db.UserModel.findOne({ name: name });
};
const checkAllUsers = (db) => {
    return db.UserModel.find({});
}
const checkTrip = (db, id, errFunc) => {
    if (!id) throw new Error("Missing trip id for " + errFunc);
    return db.TripModel.findOne({ tripID: id });
}
const checkLocation = (db, gmid, errFunc) => {
    if (!gmid) throw new Error("Missing location google map id for " + errFunc);
    return db.LocationModel.findOne({ googleMapID: gmid });
}

// //return the found chatBox, can be null
// const checkChatBox = (db, chatBoxName, errFunc)=>{
//     if(!chatBoxName) throw new Error("Missing chatBox name for " + errFunc);
//     return db.ChatBoxModel.findOne({ name: chatBoxName });
// };

// //Make sure (from, to) exists
// //return found {chatbox, sender}(can be null)
// const checkMessage  = async (db, from, to, message, errFunc)=>{
//     const chatBoxName = makeName(from, to);
//     return{
//         chatBox: await checkChatBox(db, chatBoxName, errFunc),
//         sender: await checkUser(db, from, errFunc),
//         to: await checkUser(db, to, errFunc),
//     };
// };

const newUser = async (db, data) => {
    const hashed_password = await bcrypt.hash(data.password, saltRounds)
    return new db.UserModel({name: data.name, password: hashed_password}).save();
};

const newTrip = (db, data) => {
    return new db.TripModel({tripID: uuidv4(), ...data}).save();
}
const newLocation = (db, data) => {
    return new db.LocationModel({...data}).save();
}

// const newMessage = (db, sender, body)=>{
//     return new db.MessageModel({sender, body}).save();
// };

// const newChatBox = (db, chatBoxName)=>{
//     return new db.ChatBoxModel({name: chatBoxName}).save();
// };

export{
    checkUser,
    newUser,
    newTrip,
    checkTrip,
    checkLocation,
    newLocation,
    checkAllUsers,
};