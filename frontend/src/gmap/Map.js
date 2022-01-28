import React, { useState, useEffect, useRef, useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import { Button } from '@mui/material';
import { debounce } from 'lodash'
import { mapContext } from '../context/mapContext';


const ActualMap = () => {

    // //default position & zoomIndex
    // let defaultProps = {
    //     center: {
    //       lat: 25.0173405,
    //       lng: 121.5375631
    //     },
    //     zoom: 15
    // };
    const [mapInfo, setMapInfo] = useContext(mapContext)
    
    // user current view position
    const [myPosition, setMyPosition] = useState(mapInfo.center)

    //do if user moved the map, not include zoom in or out
    const handleCenterChange = () => {
        if(mapApiLoaded) {
        setMyPosition({
            // change user 
            lat: mapInstance.center.lat(),
            lng: mapInstance.center.lng()
        })
        }
    }

    // storing maps application info, for the sake of god, so that google knows we are the same map
    const [mapApiLoaded, setMapApiLoaded] = useState(false)
    const [mapInstance, setMapInstance] = useState(null)
    const [mapApi, setMapApi] = useState(null)

    // to update the state above when the map is successfully loaded
    const apiHasLoaded = (map, maps) => {
        setMapInstance(map)
        setMapApi(maps)
        setMapInfo({ ...mapInfo, mapApi: maps, mapInstance: map });
        setMapApiLoaded(true)
    };

    //get user input
    let inputRef = useRef(null);
    //syn date with inputRef, but useState will triggle useEffect then ask google
    const [inputText, setInputText] = useState('')

    // //ask google when inputText is synned with inputRef
    // useEffect(()=>{
    //     handleAutocomplete();
    // },[inputText])

    useEffect(()=>{
        handleAutocomplete();
    },[mapInfo.inputValue])

    // ask google and return suggestion from google
    const handleAutocomplete = () => {
        if(mapApiLoaded) {
        const service = new mapApi.places.AutocompleteService()
        const request = {
            input: mapInfo.inputValue
        }
    
        service.getPlacePredictions(request, (results, status)=> {
            //according to ref, this is used to prevent over query and null result
            if(status === mapApi.places.PlacesServiceStatus.OK) {
            // console.log(results)
            setAutocompleteResults(results)
            setMapInfo({ ...mapInfo, searchResults: results });
            }
        });
        }
    }

    // //Action to syn input data, triggling useEffect
    // const handleInput = () => {
    //     setInputText(inputRef.current.value)
    // }

    //storing search results
    const [autocompleteResults, setAutocompleteResults] = useState([])

    //state to store change the view center
    const [currentCenter, setCurrentCenter] = useState(mapInfo.center)

    // //do when click on the search result 
    // const handleResultClick = e => {
    //     const placeId = e.target.getAttribute('dataid')

    //     const service = new mapApi.places.PlacesService(mapInstance)
    //     const request = {
    //         placeId,
    //         ffields: [
    //             'name',
    //             'rating',
    //             'formatted_address',
    //             'formatted_phone_number',
    //             'geometry',
    //             'opening_hours',
    //         ]
    //       }

    //     service.getDetails(request, (results, status)=>{
    //         if( status === mapApi.places.PlacesServiceStatus.OK) {
    //             console.log(results) 
    //         const newPosition = {
    //             lat: results.geometry.location.lat(),
    //             lng: results.geometry.location.lng()
    //         }
    //         setCurrentCenter(newPosition)
    //         setMyPosition(newPosition)
    //         setAutocompleteResults([])
    //         // setMapInfo({ ...mapInfo, searchResults: [] });
    //         inputRef.current.value = ''
    //         }
    //     })
    // }

    const handleDetailSearch = (placeId) => {
        let result

        const service = new mapApi.places.PlacesService(mapInstance)
        const request = {
            placeId,
            ffields: [
                'name',
                // 'rating',
                // 'formatted_address',
                // 'formatted_phone_number',
                // 'geometry',
                // 'opening_hours',
            ]
          }

        service.getDetails(request, (results, status)=>{
            if( status === mapApi.places.PlacesServiceStatus.OK) {
                // console.log(results) 
            const newPosition = {
                lat: results.geometry.location.lat(),
                lng: results.geometry.location.lng()
            }
            setCurrentCenter(newPosition)
            result=results
            // setMyPosition(newPosition)
            // setAutocompleteResults([])
            // setMapInfo({ ...mapInfo, idtosearch: '', placeResult: results });
            // inputRef.current.value = ''
            }
        })
        return result
    }


    // useEffect(()=>{ 
    //   mapInfo.userLocations.forEach(element=>{
    //     element.details?handleSearch(element.placeId)
    //   })
    // },[mapInfo.userLocations])







    

  return (
    <div style={{ height: '100%', width: '100%' }}>
        {/* <input ref={inputRef} type="text" onChange={ debounce(handleInput, 500) } />
        <Button onClick={()=>handleAutocomplete()}>test</Button>
        <div onClick={handleResultClick}>
            {(autocompleteResults && inputText) ?
            autocompleteResults.map(({ place_id, description })=>(
            <div key={place_id} dataid={place_id}>
                {description}
            </div>
            )) : null}
        </div> */}
      <GoogleMapReact
        bootstrapURLKeys={{ 
            key: process.env.REACT_APP_MAP_API_KEY,
            libraries:['places']
          }}
        onChange={()=>{console.log("onChange");handleCenterChange()}}
        defaultCenter={mapInfo.center}
        defaultZoom={mapInfo.zoom}
        //uopdate center
        center={currentCenter}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
      >
{/* 
        {places.map(item=>(
          <Marker
            // icon={item.icon}
            // key={item.id}
            lat={item.geometry.location.lat()}
            lng={item.geometry.location.lng()}
            text={item.name}
            placeId={item.place_id}
          />
        ))} */}

        {mapInfo.userLocations.map((location)=>
          location.placeId!==""?
          <Marker
            // icon={item.icon}
            key={location.placeId}
            lat={location.details.geometry.location.lat()}
            lng={location.details.geometry.location.lng()}
            text={location.details.name}
            placeId={location.placeId}
          />:null
          )}

      </GoogleMapReact>
    </div>
  );
}


// React component
function Map() {
  return (
      <ActualMap />
  );
}

export default Map;