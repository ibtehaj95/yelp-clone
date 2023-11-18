import React, { useEffect, useState } from "react";
import ListWidget from "./ListWidget";
import "./Home.css";
import Button from '@mui/material/Button';
import NewRestaurant from "./NewRestaurant";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import NewList from "./NewRestaurant";

const Home = (props) => {

    const navigateTo = useNavigate();
    const [apiURL] = useState("http://127.0.0.1:3000/api/v1");
    const [lists, setLists] = useState([]);
    const [location] = useState(useLocation());

    const getAllLists = async () => {
        try{
            const resp = await fetch(`${apiURL}/lists`, {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    },
            });
            if(resp.ok === true){
                const respBody = await resp.json();
                setLists(respBody.lists);
                // toast.success('Fetched');
            }
            else if(resp.status === 401){
                navigateTo(`/login`);
                toast.warn("Session Expired. Please Login");
            }
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

    useEffect(() => {
        console.log("Home");
        if(location){
            props.setLocation(location.pathname.split("/")[1].toUpperCase());
        }
        // getAllLists();
    }, []);

    return(
        <div>
            <Typography variant="h4" component="div" sx = {{ textAlign: "center" }}>
                Restaurant Finder
            </Typography>
            <NewList></NewList>
            {/* <div className="card-container">
                {lists.length > 0 && (
                    lists.map((list) => (
                        <ListWidget
                            id = {list._id}
                            key = {list._id}
                            title = {list.title}
                            completed = {list.completed}
                        ></ListWidget>
                    ))
                )}
            </div> */}
        </div>
    );
}

export default Home;