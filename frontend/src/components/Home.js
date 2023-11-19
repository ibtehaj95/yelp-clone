import React, { useEffect, useState } from "react";
import "./Home.css";
import { useSharedContext } from "../utils/SharedContext";
import { Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from 'react-router-dom';
import NewRestaurant from "./NewRestaurant";

const Home = (props) => {

    const navigateTo = useNavigate();
    const [apiURL] = useState("http://127.0.0.1:3000/api/v1");
    const [restaurants, setRestaurants] = useState([]);
    const [location] = useState(useLocation());
    const displayDollarSigns = useSharedContext().displayDollarSigns;

    const getAllRestaurants = async () => {
        try{
            const resp = await fetch(`${apiURL}/restaurants`, {
                method: "GET",
                // credentials: 'include',
                // headers: {
                //     "Content-Type": "application/json",
                //     },
            });
            if(resp.ok === true){
                const respBody = await resp.json();
                setRestaurants(respBody);
                // toast.success('Fetched');
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
            toast.error("Failed to Fetch");
        }
    };

    const deleteRestaurant = async (index) => {
        // console.log("Delete Restaurant", restaurants[index]);
        const id = restaurants[index].restaurant_id;
        try{
            const resp = await fetch(`${apiURL}/restaurants/${id}`, {
                method: "DELETE",
                // credentials: 'include',
                // headers: {
                //     "Content-Type": "application/json",
                //     },
            });
            if(resp.ok === true){
                toast.success('Deleted');
                getAllRestaurants();
            }
            // else if(resp.status === 401){
            //     navigateTo(`/login`);
            //     toast.warn("Session Expired. Please Login");
            // }
            else{
                toast.warn("Response Not Okay!");
                const error = await resp.json();
                console.log("Failed to Delete", error);
            }
        }
        catch (error){
            console.log("Failed to Fetch", error);
            toast.warn("Response Not Okay!");
        }
    };

    const gotoRestaurant = (index) => {
        // console.log("Navigate To", restaurants[index].restaurant_id);
        navigateTo(`/restaurant/${restaurants[index].restaurant_id}`);
    };

    useEffect(() => {
        console.log("Home");
        if(location){
            props.setLocation(location.pathname.split("/")[1].toUpperCase());
        }
        getAllRestaurants();
    }, []);

    // useEffect(() => {
    //     console.log(restaurants);
    // }, [restaurants]);

    return(
        <div>
            <Typography variant="h4" component="div" sx = {{ textAlign: "center" }}>
                Restaurant Finder
            </Typography>
            <NewRestaurant
                updateRestaurants = {getAllRestaurants}
                dollarSigns = {displayDollarSigns}
            ></NewRestaurant>
            {
                restaurants!==undefined && restaurants.length>1 && (
                    <TableContainer component={Paper} sx={{ marginY: 2 }} >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead sx={{ backgroundColor: "#035afc" }}>
                            <TableRow>
                                <TableCell width={"20%"} sx={{ color: 'white', padding: 1 }} align="center">Restaurant</TableCell>
                                <TableCell width={"20%"} sx={{ color: 'white', padding: 1 }} align="center">Location</TableCell>
                                <TableCell width={"10%"} sx={{ color: 'white', padding: 1 }} align="center">Price Range</TableCell>
                                <TableCell width={"20%"} sx={{ color: 'white', padding: 1 }} align="center">Rating</TableCell>
                                <TableCell width={"30%"} sx={{ color: 'white', padding: 1 }} align="center">Actions</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {restaurants.map((restaurant, index) => (
                                <TableRow
                                key={restaurant.restaurant_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#333131" }}
                                >
                                <TableCell sx={{ color: 'white', fontSize: "0.9rem", paddingY: 1 }} align="center" component="th" scope="row">{restaurant.restaurant_name}</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: "0.9rem", paddingY: 1 }} align="center">{restaurant.restaurant_location}</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: "0.9rem", paddingY: 1 }} align="center">{displayDollarSigns(restaurant.price_range)}</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: "0.9rem", paddingY: 1 }} align="center">0</TableCell>
                                <TableCell sx={{ color: 'white', fontSize: "0.9rem", paddingY: 1 }} align="center">
                                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <Button size="small" variant="contained" color="warning" onClick={() => gotoRestaurant(index)}>
                                            Edit
                                        </Button>
                                        <Button size="small" variant="contained" color="error" onClick={ () => deleteRestaurant(index)}>
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            }
        </div>
    );
}

export default Home;