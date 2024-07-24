import React, { useEffect, useState } from "react";
import NewReview from "./NewReview";
import NoReviews from "./NoReviews";
import Review from "./Review";
import "./Reviews.css";
import { useParams } from "react-router-dom";
// import { useSharedContext } from "../utils/SharedContext";
import {Button, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Reviews = (props) => {

    const [apiURL] = useState("http://127.0.0.1:3000/api/v1");
    const [restaurantReviews, setRestaurantReviews] = useState([]);
    const [reviewFirst, setReviewFirst] = useState(0);
    const [reviewLast, setReviewLast] = useState(4);
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

    const renderReviews = () => {
        if(restaurantReviews.length <= 4){
            return(
                <div className="reviews-div">
                    {
                        restaurantReviews.map((review) => (
                            <Review
                                key = {review.review_id}
                                user_id = {review.user_id}
                                rating = {review.rating}
                                review = {review.review}
                                updateReviews = {getReviewsOneRestaurant}
                            ></Review>
                        ))    
                    }
                </div>
            );
        }
        else{
            // show only 4 reviews, arrow to show 4 more
            return(
                <div className="reviews-div">
                    {
                        reviewFirst>0 && 
                        <IconButton aria-label="reviews-prev" sx={{alignSelf: "center", marginLeft: 0}} onClick={showMoreReviewsLeft}>
                            <ArrowBackIosNewIcon sx={{ fontSize: 60 }} />
                        </IconButton>
                    }
                    {
                        restaurantReviews.slice(reviewFirst, reviewLast).map((review) => (
                            <Review
                                key = {review.review_id}
                                user_id = {review.user_id}
                                rating = {review.rating}
                                review = {review.review}
                                updateReviews = {getReviewsOneRestaurant}
                            ></Review>
                        ))
                    }
                    {
                        reviewLast<restaurantReviews.length && 
                        <IconButton aria-label="reviews-next" sx={{alignSelf: "center", marginLeft: 0}} onClick={showMoreReviewsRight}>
                            <ArrowForwardIosIcon sx={{ fontSize: 60 }} />
                        </IconButton>
                    }
                </div>
            );
        }
    };

    const showMoreReviewsRight = () => {
        console.log("Show More Reviews Right");
        if(reviewLast+1 <= restaurantReviews.length){
            setReviewFirst(reviewFirst+1);
            setReviewLast(reviewLast+1);
        }
        else{
            toast.warn("No More Reviews");
        }
    };

    const showMoreReviewsLeft = () => {
        console.log("Show More Reviews Left");
        if(reviewFirst-1 >= 0){
            setReviewFirst(reviewFirst-1);
            setReviewLast(reviewLast-1);
        }
        else{
            toast.warn("No More Reviews");
        }
    };

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
                <div>
                    {
                        restaurantReviews.length === 0 ? <NoReviews></NoReviews> : renderReviews()
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