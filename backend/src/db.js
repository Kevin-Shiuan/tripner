import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    public_trips: [{
        type: String,
        ref: "Trip"
    }],
    private_trips: [{
        type: String,
        ref: "Trip"
    }],
    rank: {
        type: Number
    }
});

const TripSchema = new Schema({
    tripID: {
        type: String,
        required: true
    },
    trip_name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    date_start: {
        type: String,
        required: true
    },
    date_end: {
        type: String,
        required: true
    },
    open_to_public: {
        type: Boolean,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    tripmate: [{
        type: String,
        required: true,
        ref: "User"
    }],    
    unscheduled_locations: [{
        type: String,
        required: true,
        ref: "Location"
    }],
    scheduled_locations: [{
        type: String,
        required: true,
        ref: "Location"
    }]
});

const LocationSchema = new Schema({
    googleMapID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model('User', UserSchema);
const TripModel = mongoose.model('Trip', TripSchema);
const LocationModel = mongoose.model('Location', LocationSchema);

export {UserModel, TripModel, LocationModel}