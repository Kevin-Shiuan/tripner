import { debounce } from 'lodash'
import { mapContext } from '../context/mapContext';
import { Grid, Box, Typography, Paper, Avatar, Chip, Input, TextField, Button, Tooltip, Autocomplete } from '@mui/material';
import { useRef, useContext, useState, useEffect } from 'react';
// import { handleSearch } from './PlaceDetailsSearch';


function Search() {

    const [mapInfo, setMapInfo] = useContext(mapContext)
    const [details, setDetails] = useState({})
    const [dataId, setDataId] = useState("")

    let inputRef = useRef(null);

    const handleInput = () => {
        // console.log(inputRef.current.children[1].children[0].value)
        setMapInfo({ ...mapInfo, inputValue: inputRef.current.children[1].children[0].value });
    }

    const handleSearch = async (placeId) => {

        const service = new mapInfo.mapApi.places.PlacesService(mapInfo.mapInstance)
        const request = {
            placeId,
            ffields: [
                'name',
                // 'rating',
                'formatted_address',
                // 'formatted_phone_number',
                // 'geometry',
                // 'opening_hours',
            ]
          }
    
        service.getDetails(request, (results, status)=>{
            if( status === mapInfo.mapApi.places.PlacesServiceStatus.OK) {
                // setDetails({
                //     name: results.name
                // })
                setDetails(results);
                // console.log(results)
            // const newPosition = {
            //     lat: results.geometry.location.lat(),
            //     lng: results.geometry.location.lng()
            // }
            // setCurrentCenter(newPosition)
            // setMyPosition(newPosition)
            // setAutocompleteResults([])
            // setMapInfo({ ...mapInfo, idtosearch: '', placeResult: results });
            // inputRef.current.value = ''

            }
        })
    }

    useEffect(()=>{
        // console.log(details);
        setMapInfo({ ...mapInfo, userLocations: [...mapInfo.userLocations,{placeId: dataId, details: details }], inputValue: '', searchResults:[] });
    },[details])

    const handleResultClick = async(dataid)=>{
        setDataId(dataid);
        handleSearch(dataid);
        // inputRef.current.children[1].children[0].value = '';
    }
    return (
        <Autocomplete
            id="free-solo-demo"
            freeSolo
            clearOnBlur
            options={(mapInfo.searchResults && mapInfo.inputValue)?mapInfo.searchResults:[]}
            getOptionLabel={(option) => option.description}
            renderOption={(props, option, { selected }) => (
                <Box {...props} dataid={option.place_id} onClick={(e) => {
                    e.preventDefault();
                    // console.log(option.place_id);
                    handleResultClick(option.place_id);
                }} >
                    <Typography variant="body2" >
                        {option.description}
                    </Typography>
                </Box>
            )}
            renderInput={(params) => <TextField {...params} ref={inputRef} label="Search" />}
            onInputChange={ debounce(handleInput, 1000) }
            // onChange={(e,v)=>console.log(e.target)}
        />
    )
  }
  
  export default Search;