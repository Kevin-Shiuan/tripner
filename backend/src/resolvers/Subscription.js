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

const Subscription = {
    tripCreated: {
      async subscribe(parent, {user_name}, { db, pubsub }, info) {
        let user = await checkUser(db, user_name, "subscription");
        console.log(`Trip Create on: user ${user_name}`);
        if (!user) {
            throw new Error(`Subcribe fail because of no user ${user_name}`);
        }
        return pubsub.asyncIterator(`Trip Create on: user ${user_name}`);
      }
    }
  }

export default Subscription;
