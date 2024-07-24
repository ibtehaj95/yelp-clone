import React, { useEffect, useState } from "react";
import "./NewReview.css";
import {Button, Card, CardActions, CardContent, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import * as DOMPurify from 'dompurify';
import { toast } from 'react-toastify';

const NewReview = (props) => {

    const [restaurantRating, setRestaurantRating] = useState(null);
    const [restaurantReview, setRestaurantReview] = useState(null);
    // const [restaurantRatingOld, setRestaurantRatingOld] = useState(null);    //useful for later when we add own review
    // const [restaurantReviewOld, setRestaurantReviewOld] = useState(null);    //useful for later when we add own review
    const [disableSubmit, setDisableSubmit] = useState(false);  //change later when we add edit own review functionality
    const [apiURL] = useState("http://127.0.0.1:3000/api/v1");

    const fillDummyValues = () => {
        setRestaurantRating(3);
        setRestaurantReview("Please tell us about your experience here");
    };

    const resetForm = () => {
        setRestaurantRating(3);
        setRestaurantReview("Please tell us about your experience here");
    };

    const submitReview = async () => {
        // console.log("Submit Review");
        const data = {
            user_id: 1,  //change later when we add user functionality
            rest_id: props.restaurantID,
            rating: restaurantRating,
            review: restaurantReview,
        };
        // console.log(data);

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
                props.updateReviews();
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

    useEffect(() => {
        fillDummyValues();
    }, []);

    return(
        <div className="card-container">
                {restaurantRating !== null && (
                    <Card sx={{ minHeight: 300, width: 1450, margin: 2, display: "flex", flexDirection: "column", justifyContent: "center"}} raised={true}>
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
    );
};

export default NewReview;