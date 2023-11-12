import React, { useEffect, useState } from "react";
import ListWidget from "./ListWidget";
// import "./Login.css";
import Button from '@mui/material/Button';
import NewList from "./NewList";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from 'react-router-dom';

const Manage = (props) => {

    // const [apiURL] = useState("http://127.0.0.1:3000/api/v1");
    // const [lists, setLists] = useState([]);
    const [location] = useState(useLocation());
    const navigateTo = useNavigate();

    // const getAllLists = async () => {
    //     try{
    //         const resp = await fetch(`${apiURL}/lists`, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`,
    //                 },
    //         });
    //         if(resp.ok === true){
    //             const respBody = await resp.json();
    //             setLists(respBody.lists);
    //             // toast.success('Fetched');
    //         }
    //         else{
    //             toast.warn("Response Not Okay!");
    //             const error = await resp.json();
    //             console.log("Failed to Fetch", error);
    //         }
    //     }
    //     catch (error){
    //         console.log("Failed to Fetch", error);
    //         toast.error("Failed to Fetch");
    //     }
    // };

    useEffect(() => {
        console.log("Manage");
        if(location){
            props.setLocation(location.pathname.split("/")[1].toUpperCase());
        }
    }, []);

    return(
        <div>
            Manage Page
        </div>
    );
}

export default Manage;