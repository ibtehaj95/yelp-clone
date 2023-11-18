import React, { useEffect, useState } from "react";
import ListWidget from "./ListWidget";
import "./Home.css";
import Button from '@mui/material/Button';
import NewList from "./NewList";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = (props) => {

    const navigateTo = useNavigate();
    const [apiURL] = useState("http://127.0.0.1:3000/api/v1");
    const [lists, setLists] = useState([]);
    const [showNewList, setShowNewList] = useState(false);
    const [location] = useState(useLocation());
    
    const openNewListCreate = () => setShowNewList(true);

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
        getAllLists();
    }, []);

    return(
        <div>
            <Button variant="contained" onClick={openNewListCreate} startIcon={<AddIcon></AddIcon>}>New List</Button>
            <div className="card-container">
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
            </div>
            {
                showNewList === true && <NewList
                    showModal = {showNewList}
                    setShowModal = {setShowNewList}
                ></NewList>
            }
        </div>
    );
}

export default Home;