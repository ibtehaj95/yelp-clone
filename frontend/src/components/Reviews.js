import React, { useEffect, useState } from "react";
import NewReview from "./NewReview";
import NoReviews from "./NoReviews";
import Review from "./Review";
import "./Reviews.css";
import { useParams } from "react-router-dom";
// import { useSharedContext } from "../utils/SharedContext";
import {Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Reviews = (props) => {

    const [apiURL] = useState("http://127.0.0.1:3000/api/v1");
    const [restaurantReviews, setRestaurantReviews] = useState([]);
    const [restaurantID] = useState(useParams().id);
    const navigateTo = useNavigate();
    const [location] = useState(useLocation());

    const goHome = () => {
        navigateTo(`/home`);
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

    // get reviews for a restaurant
    const getReviewsOneRestaurant = async () => {
        try{
            const resp = await fetch(`${apiURL}/reviews/${restaurantID}`, {
                method: "GET",
                // credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    },
            });
            // console.log("Response", resp);
            if(resp.ok === true){
                // console.log("Fetched Reviews", await resp.json());
                const respBody = await resp.json();
                setRestaurantReviews(respBody);
                toast.success('Fetched');
            }
            else if(resp.status === 404){
                toast.warn("No Reviews Found!");
                const error = await resp.json();
                console.log("Failed to Fetch", error);
                // do not update reviews
            }
            // else if(resp.status === 401){
            //     navigateTo(`/login`);
            //     toast.warn("Session Expired. Please Login");
            // }
            else{
                toast.warn("Response Not Okay!");
                const error = await resp.json();
                console.log("Failed to Fetch", error);
            }
        }
        catch (error){
            console.log("Failed to Fetch", error);
            toast.warn("Response Not Okay!");
        }
    };

    // useful for later when we add edit own review functionality
    // const cancelChanges = () => {
    //     setRestaurantName(restaurantNameOld);
    //     setRestaurantPriceRange(restaurantPriceRangeOld);
    // };

    // // useful for later when we add edit own review functionality
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
    // };

    // // useful for later when we add edit own review functionality
    // useEffect(() => {
    //     // console.log({
    //     //     restaurantID,
    //     //     restaurantName,
    //     //     restaurantLocation,
    //     //     restaurantPriceRange,
    //     // });
    //     sameValsCheck();
    // }, [restaurantName, restaurantLocation, restaurantPriceRange]);

    // // useful for later when we add edit own review functionality
    // useEffect(() => {
    //     sameValsCheck();
    // }, [restaurantNameOld, restaurantLocationOld, restaurantPriceRangeOld]);

    useEffect(() => {
        console.log("Reviews", restaurantReviews);
    }, [restaurantReviews]);

    useEffect(() => {
        getReviewsOneRestaurant();
        if(location){
            props.setLocation(location.pathname.split("/")[1].toUpperCase());
        }
    }, []);

    return(
        <div>
            <Button size="small" variant="contained" color="primary" onClick={goHome}>Go to Home</Button>
            {
                <div className="reviews-div">
                    {
                        // restaurantReviews.length == 0 && <NoReviews></NoReviews>
                        restaurantReviews.length === 0 ? <NoReviews></NoReviews> : (
                            restaurantReviews.map((review) => (
                                <Review
                                    key = {review.review_id}
                                    user_id = {review.user_id}
                                    rating = {review.rating}
                                    review = {review.review}
                                    updateReviews = {getReviewsOneRestaurant}
                                ></Review>
                            ))
                        )
                    }
                </div>
            }
            <NewReview
                restaurantID = {restaurantID}
                updateReviews = {getReviewsOneRestaurant}
            ></NewReview>
        </div>
    );
}

export default Reviews;