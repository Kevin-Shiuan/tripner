import { useState, useEffect } from 'react'
import CreateTrip from "./CreateTrip";
import SignIn from "./SignIn";
import TripGallery from "./TripGallery";
import TripInvite from "./TripInvite";
import TripPlanner from "./TripPlanner";
import { Routes, Route, Navigate } from 'react-router-dom';
import ResponsiveAppBar from "./AppBar/ResponsiveAppBar";
import SignUp from './SignUp';
import {userContext, passwordContext, signInContext} from '../context/userContext';
import Protected from './Protected';
import LogOut from './LogOut';

//remember user
const LOCALSTORAGE_KEY = "save-user";

function Tripner() {
  const savedUser = localStorage.getItem(LOCALSTORAGE_KEY);
  const [user, setUser] = useState(savedUser||'');
  const [password, setPassword] = useState('');
  const [signIn, setSignIn] = useState(false);
  const [hideAppBar, setHideAppBar] = useState(false);

  //improve
  // const [userInfo, setUserInfo] = useState({
  //   user: '',
  //   password: '',
  //   signIn: false
  // })

  // setUserInfo({user: 'Kevin', ...userInfo})


  useEffect(() => {
    if (signIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, user);
    }
  }, [signIn]);

    return (
      <userContext.Provider value={[user, setUser]}>
      <passwordContext.Provider value={[password, setPassword]}>
      <signInContext.Provider value={[signIn, setSignIn]}>
            <>  
                    <Routes>
                        {/* {signIn?<></>:<Route path="*" element={<SignIn />}/>} */}
                        <Route exact path="/sign_in" element={<SignIn />} />
                        <Route exact path="/sign_up" element={<SignUp />} />
                        <Route exact path="/log_out" element={<LogOut />} />


                        <Route element={<Protected />}>
                          <Route exact path="/my_trips" element={<><ResponsiveAppBar/><TripGallery /></>} />
                          <Route path="/trip_planner" >
                            <Route path=":tripId" element={<TripPlanner />} />
                            <Route index element={<TripPlanner />} />
                          </Route>
                          <Route exact path="/create_trip" element={<><ResponsiveAppBar/><CreateTrip /></>} />
                          <Route exact path="/trip_invite" element={<><ResponsiveAppBar/><TripInvite /></>} />
                        </Route>

                        
                        <Route path="*" element={!signIn?<SignIn />:<Navigate to="/my_trips" />} />
                    </Routes>
            </>
      </signInContext.Provider>
      </passwordContext.Provider>
      </userContext.Provider>
    )
  }
  

export default Tripner;
