import { gql } from '@apollo/client';

export const USER_QUERY = gql`
    query User($name: String!) {
        User(name: $name) {
            name
        }
    }
`;

export const TRIP_QUERY = gql`
    query Trip($tripID: ID!) {
        Trip(tripID: $tripID) {
            tripID
            trip_name
            city
            date_start
            date_end
            open_to_public
            tripmate
            unscheduled_locations
            scheduled_locations
        }
    }
`;

export const TRIPS_QUERY = gql`
    query Trips($tripIDs: [ID!]) {
        Trips(tripIDs: $tripIDs) {
            trip_name
            city
        }
    }
`

export const USERTRIPS_QUERY = gql`
    query UserTrips($name: String!) {
        UserTrips(name: $name) {
            tripID
            trip_name
            city
            image
        }
    }
`

export const ALLUSER_QUERY = gql`
    query AllUsers {
        AllUsers {
            name
        }
    }
`
// export const SIGN_IN_QUERY = gql`
//     query SignIn($name: String!, $password: String!){
//         SignIn(name: $name, password: $password){
//             success
//             errorMessage
//         }
//     }
// `
