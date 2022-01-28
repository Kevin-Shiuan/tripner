import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
    mutation createUser ($name: String!, $password: String!){
        createUser (name: $name, password: $password){
            success
            errorMessage
        }
    }
`;

export const CREATE_TRIP_MUTATION = gql`
    mutation createTrip(
        $trip_name: String!
        $city: String!
        $date_start: String!
        $date_end: String!
        $image:    String!
        $tripmate: [String!]!
        $open_to_public: Boolean!
    ) {
        createTrip (
            input: {
                trip_name: $trip_name
                city: $city
                date_start: $date_start
                date_end: $date_end
                image:    $image
                tripmate: $tripmate
                open_to_public: $open_to_public
            }
        ) {
            success
            errorMessage
        }
    }
`;

export const UPDATE_TRIP_MUTATION = gql`
    mutation updateTrip(
        $tripID:     ID!
        $trip_name: String!
        $city: String!
        $date_start: String!
        $date_end: String!
        $tripmate: [String!]!
        $open_to_public: Boolean!
        $unscheduled_locations:  [String!]
        $scheduled_locations:    [String!]
    ) {
        updateTrip (
            input: {
                tripID: $tripID
                trip_name: $trip_name
                city: $city
                date_start: $date_start
                date_end: $date_end
                tripmate: $tripmate
                open_to_public: $open_to_public
                unscheduled_locations:  $unscheduled_locations
                scheduled_locations:    $scheduled_locations
            }
        ) {
            success
            errorMessage
        }
    }
`;

export const TEST_MUTATION = gql`
mutation {
  createTrip (input: {
  trip_name:  "trip4"
  city:       "jp"
  tripmate: ["tyler", "ric"]  
  date_start: "2022/01/27"
  date_end:   "2022/02/06"
    open_to_public: true
  }) {
    success
    errorMessage
  }
}
`

export const SIGN_IN = gql`
    mutation SignIn($name: String!, $password: String!){
        SignIn(name: $name, password: $password){
            success
            errorMessage
        }
    }
`