import "./NewRestaurant.css";
import React, { useEffect, useState } from "react";
import { Card, Modal, TextField, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import * as DOMPurify from 'dompurify';

const NewRestaurant = (props) => {

    const [apiURL] = useState("http://127.0.0.1:3000/api/v1");
    const [newRestName, setNewRestName] = useState("Unnamed");
    const [newRestLoc, setNewRestLoc] = useState("Nowhere");
    const [newPriceRange, setNewPriceRange] = useState(1);
    const navigateTo = useNavigate();

    const style = {
        minHeight: 250, 
        minWidth: 250,
        margin: 2,
    };

    const addNewRestaurant = async () => {
        // console.log("Create New Restaurant");
        const data = {
            name: newRestName,
            location: newRestLoc,
            price_range: newPriceRange,
        };

        if(!data.name || !data.location || !data.price_range){
            toast.warn("Invalid Data!");
            console.log("Invalid Data");
            return;
        }
        
        try{
            const resp = await fetch(`${apiURL}/restaurants`, {
                method: "POST",
                // credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    },
                body: JSON.stringify(data),
            });
            if(resp.ok === true){
                toast.success('Added');
                setNewRestName("Unnamed");
                setNewRestLoc("Nowhere");
                setNewPriceRange(1);
                props.updateRestaurants(); //reload parent view
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

    // useEffect(() => {
    //     console.log(newListItems);
    // }, [newListItems]);
    
    return(
        <div className="add-new-container">
            <Paper elevation={0} sx={{ display: "flex", justifyContent: "space-around", width: "50%" }}>
                <TextField
                    required
                    id="outlined-required"
                    label="Restaurant Name"
                    value={newRestName}
                    onChange={(event) => setNewRestName(DOMPurify.sanitize(event.target.value))}
                    sx={{ marginTop: 2 }}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Restaurant Location"
                    value={newRestLoc}
                    onChange={(event) => setNewRestLoc(DOMPurify.sanitize(event.target.value))}
                    sx={{ marginTop: 2 }}
                />
                 <FormControl sx={{ minWidth: 100, marginTop:2 }}>
                    <InputLabel id="demo-simple-select-label">Price Range</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={newPriceRange}
                        label="PriceRange"
                        onChange={(event) => setNewPriceRange(DOMPurify.sanitize(event.target.value))}
                    >
                        <MenuItem value={1}>{props.dollarSigns(1)}</MenuItem>
                        <MenuItem value={2}>{props.dollarSigns(2)}</MenuItem>
                        <MenuItem value={3}>{props.dollarSigns(3)}</MenuItem>
                        <MenuItem value={4}>{props.dollarSigns(4)}</MenuItem>
                        <MenuItem value={5}>{props.dollarSigns(5)}</MenuItem>
                    </Select>
                 </FormControl>
                
                <Button size="small" variant="contained" onClick={addNewRestaurant} sx={{ margin: 1, marginTop:3 }}>Add</Button>
            </Paper>
        </div>
        
    );
}

export default NewRestaurant;