import React, { useEffect, useState } from "react";
import "./Reviews.css";
import { useParams } from "react-router-dom";
import { useSharedContext } from "../utils/SharedContext";
import {Button, Card, CardActions, CardContent, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as DOMPurify from 'dompurify';

const Reviews = (props) => {

    const [apiURL] = useState("http://127.0.0.1:3000/api/v1");
    const [restaurantName, setRestaurantName] = useState(null);
    const [restaurantRating, setRestaurantRating] = useState(null);
    const [restaurantReview, setRestaurantReview] = useState(null);
    // const [restaurantNameOld, setRestaurantNameOld] = useState(null);
    // const [restaurantPriceRangeOld, setRestaurantPriceRangeOld] = useState(null);
    const [restaurantID] = useState(useParams().id);
    const [disableSubmit, setDisableSubmit] = useState(false);  //change later when we add edit own review functionality
    const navigateTo = useNavigate();
    const [location] = useState(useLocation());

    const goHome = () => {
        navigateTo(`/home`);
    };

    const submitReview = async () => {
        // console.log("Submit Review");
        const data = {
            rest_id: restaurantID,
            user_id: 0,  //change later when we add user functionality
            rating: restaurantRating,
            review: restaurantReview,
        };

        if(!data.rest_id || !data.rating || !data.review){
            toast.warn("Invalid Data!");
            console.log("Invalid Data");
            return;
        }
        
        try{
            const resp = await fetch(`${apiURL}/reviews`, {
                method: "POST",
                // credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    },
                body: JSON.stringify(data),
            });
            if(resp.ok === true){
                toast.success('Added');
                fillDummyValues();
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
            toast.warn("Response Not Okay!");
            console.log("Failed to Create", error);
        }
    };

    // useful for later when we add edit own review functionality
    // const updateRestaurant = async () => {
    //     // console.log("Update Restaurant");
    //     const data = {
    //         name: restaurantName,
    //         location: restaurantLocation,
    //         price_range: restaurantPriceRange,
    //     };
    //     try{
    //         const resp = await fetch(`${apiURL}/restaurants/${restaurantID}`, {
    //             method: "PATCH",
    //             // credentials: 'include',
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 },
    //             body: JSON.stringify(data),
    //         });
    //         if(resp.ok === true){
    //             toast.success('Updated!');
    //             getRestaurant(); //update view
    //         }
    //         // else if(resp.status === 401){
    //         //     navigateTo(`/login`);
    //         //     toast.warn("Session Expired. Please Login");
    //         // }
    //         else{
    //             toast.warn("Response Not Okay!");
    //             const error = await resp.json();
    //             console.log("Failed to Create", error);
    //         }
    //     }
    //     catch (error){
    //         console.log("Failed to Fetch", error);
    //         toast.warn("Response Not Okay!");
    //     }
    // };

    const resetForm = () => {
        setRestaurantRating(3);
        setRestaurantReview("Please tell us about your experience here");
    };

    // useful for later when we add edit own review functionality
    // const cancelChanges = () => {
    //     setRestaurantName(restaurantNameOld);
    //     setRestaurantPriceRange(restaurantPriceRangeOld);
    // };

    // useful for later when we add edit own review functionality
    // const sameValsCheck = () => {
    //     //check if same as old vals, disable/enable submit accordingly
    //     // console.log({
    //     //     restaurantName,
    //     //     restaurantNameOld,
    //     //     restaurantLocation,
    //     //     restaurantLocationOld,
    //     //     restaurantPriceRange,
    //     //     restaurantPriceRangeOld,
    //     // });
    //     if(restaurantName===restaurantNameOld && restaurantLocation===restaurantLocationOld && restaurantPriceRange=== restaurantPriceRangeOld){
    //         setDisableSubmit(true);
    //     }
    //     else{
    //         setDisableSubmit(false);
    //     }
    // }

    const fillDummyValues = () => {
        setRestaurantRating(3);
        setRestaurantReview("Please tell us about your experience here");
    };

    useEffect(() => {
        // getRestaurant();
        fillDummyValues();
        if(location){
            props.setLocation(location.pathname.split("/")[1].toUpperCase());
        }
    }, []);

    // useful for later when we add edit own review functionality
    // useEffect(() => {
    //     // console.log({
    //     //     restaurantID,
    //     //     restaurantName,
    //     //     restaurantLocation,
    //     //     restaurantPriceRange,
    //     // });
    //     sameValsCheck();
    // }, [restaurantName, restaurantLocation, restaurantPriceRange]);

    // useful for later when we add edit own review functionality
    // useEffect(() => {
    //     sameValsCheck();
    // }, [restaurantNameOld, restaurantLocationOld, restaurantPriceRangeOld]);

    return(
        <div>
            <Button size="small" variant="contained" color="primary" onClick={goHome}>Go to Home</Button>
            <div className="card-container">
                {restaurantRating !== null && (
                    <Card sx={{ minHeight: 300, minWidth: 1500, margin: 2, display: "flex", flexDirection: "column", justifyContent: "center"}} raised={true}>
                    <CardContent sx={{ paddingY: 0, display: "flex", flexDirection: "column" }}>
                        <div className="header-div" style={{ display: 'flex' }}>
                            {
                                restaurantRating !== null && (
                                    <FormControl sx={{ minWidth: 100, marginTop:2 }}>
                                        <InputLabel id="demo-simple-select-label">Rating</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={restaurantRating}
                                            label="PriceRange"
                                            onChange={(event) => setRestaurantRating(DOMPurify.sanitize(event.target.value))}
                                        >
                                            <MenuItem value={1}>{1}</MenuItem>
                                            <MenuItem value={2}>{2}</MenuItem>
                                            <MenuItem value={3}>{3}</MenuItem>
                                            <MenuItem value={4}>{4}</MenuItem>
                                            <MenuItem value={5}>{5}</MenuItem>
                                        </Select>
                                    </FormControl>
                                )
                            } 
                        </div>
                        <div className="review-div">
                            {
                                restaurantReview !== null && (
                                    <div className="textfield-div">
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Review"
                                            multiline
                                            rows={4}
                                            value={restaurantReview}
                                            onChange={(event) => setRestaurantReview(DOMPurify.sanitize(event.target.value))}
                                            sx={{ marginTop: 2, width: 1500}}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button size="small" variant="contained" color="success" disabled={disableSubmit} onClick={submitReview}  sx={{marginLeft: 1}}>Submit Review</Button>
                        <Button size="small" variant="contained" color="error" onClick={resetForm} >Reset Form</Button>
                    </CardActions>
                </Card>
                )}
            </div>
        </div>
    );
}

export default Reviews;