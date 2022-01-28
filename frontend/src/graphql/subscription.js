import { gql } from '@apollo/client';

export const TRIP_CREATED_SUBSCRIPTION = gql`
    subscription tripCreated($user_name: String!){
        tripCreated(user_name: $user_name)
    }
`;