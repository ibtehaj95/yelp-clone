import React, { useEffect, useState } from "react";
import "./Restaurant.css";
import { useParams } from "react-router-dom";
import { useSharedContext } from "../utils/SharedContext";
import {Button, Card, CardActions, CardContent, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';
import * as DOMPurify from 'dompurify';

const Restaurant = (props) => {

    const [apiURL] = useState("http://127.0.0.1:3000/api/v1");
    const [restaurantName, setRestaurantName] = useState(null);
    const [restaurantLocation, setRestaurantLocation] = useState(null);
    const [restaurantPriceRange, setRestaurantPriceRange] = useState(null);
    const [restaurantNameOld, setRestaurantNameOld] = useState(null);
    const [restaurantLocationOld, setRestaurantLocationOld] = useState(null);
    const [restaurantPriceRangeOld, setRestaurantPriceRangeOld] = useState(null);
    const [restaurantID] = useState(useParams().id);
    const [disableSubmit, setDisableSubmit] = useState(true);
    const navigateTo = useNavigate();
    const [location] = useState(useLocation());
    const displayDollarSigns = useSharedContext().displayDollarSigns;

    const theme = useTheme();

    const goHome = () => {
        navigateTo(`/home`);
    };

    const getRestaurant = async () => {
        try{
            const resp = await fetch(`${apiURL}/restaurants/${restaurantID}`, {
                method: "GET",
                // credentials: 'include',
                // headers: {
                //     "Content-Type": "application/json",
                //     },
            });
            if(resp.ok === true){
                const respBody = await resp.json();
                setRestaurantName(respBody.restaurant_name);
                setRestaurantLocation(respBody.restaurant_location);
                setRestaurantPriceRange(respBody.price_range);
                setRestaurantNameOld(respBody.restaurant_name);
                setRestaurantLocationOld(respBody.restaurant_location);
                setRestaurantPriceRangeOld(respBody.price_range);
                toast.success('Fetched');
            }
            // else if(resp.status === 401){
            //     navigateTo(`/login`);
            //     toast.warn("Session Expired. Please Login");
            // }
            else{
                toast.warn("Response Not Okay!");
                const error = await resp.json();
                console.log("Failed to Create", error);
            }
        }
        catch{
            console.log("Failed to Fetch");
            toast.warn("Response Not Okay!");
        }
    };

    const updateRestaurant = async () => {
        // console.log("Update Restaurant");
        const data = {
            name: restaurantName,
            location: restaurantLocation,
            price_range: restaurantPriceRange,
        };
        try{
            const resp = await fetch(`${apiURL}/restaurants/${restaurantID}`, {
                method: "PATCH",
                // credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    },
                body: JSON.stringify(data),
            });
            if(resp.ok === true){
                toast.success('Updated!');
                getRestaurant(); //update view
            }
            // else if(resp.status === 401){
            //     navigateTo(`/login`);
            //     toast.warn("Session Expired. Please Login");
            // }
            else{
                toast.warn("Response Not Okay!");
                const error = await resp.json();
                console.log("Failed to Create", error);
            }
        }
        catch (error){
            console.log("Failed to Fetch", error);
            toast.warn("Response Not Okay!");
        }
    };

    const cancelChanges = () => {
        setRestaurantName(restaurantNameOld);
        setRestaurantLocation(restaurantLocationOld);
        setRestaurantPriceRange(restaurantPriceRangeOld);
    };

    const sameValsCheck = () => {
        //check if same as old vals, disable/enable submit accordingly
        // console.log({
        //     restaurantName,
        //     restaurantNameOld,
        //     restaurantLocation,
        //     restaurantLocationOld,
        //     restaurantPriceRange,
        //     restaurantPriceRangeOld,
        // });
        if(restaurantName===restaurantNameOld && restaurantLocation===restaurantLocationOld && restaurantPriceRange=== restaurantPriceRangeOld){
            setDisableSubmit(true);
        }
        else{
            setDisableSubmit(false);
        }
    }

    useEffect(() => {
        getRestaurant();
        if(location){
            props.setLocation(location.pathname.split("/")[1].toUpperCase());
        }
    }, []);

    useEffect(() => {
        // console.log({
        //     restaurantID,
        //     restaurantName,
        //     restaurantLocation,
        //     restaurantPriceRange,
        // });
        sameValsCheck();
    }, [restaurantName, restaurantLocation, restaurantPriceRange]);

    useEffect(() => {
        sameValsCheck();
    }, [restaurantNameOld, restaurantLocationOld, restaurantPriceRangeOld]);

    return(
        <div>
            <Button size="small" variant="contained" color="primary" onClick={goHome}>Go to Home</Button>
            <div className="card-container">
                {restaurantName !== null && (
                    <Card sx={{ minHeight: 250, minWidth: 250, margin: 2, display: "flex", flexDirection: "column", justifyContent: "center"}} raised={true}>
                    <CardContent sx={{ paddingY: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {
                            restaurantName && (
                                <div className="textfield-div">
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Name"
                                        value={restaurantName}
                                        onChange={(event) => setRestaurantName(DOMPurify.sanitize(event.target.value))}
                                        sx={{ marginTop: 2 }}
                                    />
                                </div>
                            )
                        }
                        {
                            restaurantLocation && (
                                <div className="textfield-div">
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Location"
                                        value={restaurantLocation}
                                        onChange={(event) => setRestaurantLocation(DOMPurify.sanitize(event.target.value))}
                                        sx={{ marginTop: 2 }}
                                    />
                                </div>
                            )
                        }
                        {
                            restaurantPriceRange && (
                                <FormControl sx={{ minWidth: 100, marginTop:2 }}>
                                    <InputLabel id="demo-simple-select-label">Price Range</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={restaurantPriceRange}
                                        label="PriceRange"
                                        onChange={(event) => setRestaurantPriceRange(DOMPurify.sanitize(event.target.value))}
                                    >
                                        <MenuItem value={1}>{displayDollarSigns(1)}</MenuItem>
                                        <MenuItem value={2}>{displayDollarSigns(2)}</MenuItem>
                                        <MenuItem value={3}>{displayDollarSigns(3)}</MenuItem>
                                        <MenuItem value={4}>{displayDollarSigns(4)}</MenuItem>
                                        <MenuItem value={5}>{displayDollarSigns(5)}</MenuItem>
                                    </Select>
                                </FormControl>
                            )
                        }
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center" }}>
                        <Button size="small" variant="contained" color="success" disabled={disableSubmit} onClick={updateRestaurant}>Submit</Button>
                        <Button size="small" variant="contained" color="error" onClick={cancelChanges} sx={{ marginLeft: 1 }}>Cancel</Button>
                    </CardActions>
                </Card>
                )}
            </div>
        </div>
    );
}

export default Restaurant;