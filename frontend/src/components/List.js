import React, { useEffect, useState } from "react";
import "./List.css";
import { useParams } from "react-router-dom";
import { Card, TextField } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';
import * as DOMPurify from 'dompurify';

const List = (props) => {

    const [apiURL] = useState("http://127.0.0.1:3000/api/v1");
    const [listTitle, setListTitle] = useState(null);
    const [listItems, setListItems] = useState([]);
    const [listCompleted, setListCompleted] = useState(null);
    const [listTitleOld, setListTitleOld] = useState(null);
    const [listItemsOld, setListItemsOld] = useState([]);
    const [listCompletedOld, setListCompletedOld] = useState(null);
    const [listID] = useState(useParams().id);
    const [editable, setEditable] = useState(false);
    const navigateTo = useNavigate();
    const [location] = useState(useLocation());

    const theme = useTheme();

    const goHome = () => {
        navigateTo(`/home`);
    };

    const getList = async () => {
        try{
            const resp = await fetch(`${apiURL}/lists/${listID}`, {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    },
            });
            if(resp.ok === true){
                const respBody = await resp.json();
                setListItems(respBody.list.items);
                setListTitle(respBody.list.title);
                setListCompleted(respBody.list.completed);
                setListItemsOld(respBody.list.items);
                setListTitleOld(respBody.list.title);
                setListCompletedOld(respBody.list.completed);
                // toast.success('Fetched');
            }
            else if(resp.status === 401){
                navigateTo(`/login`);
                toast.warn("Session Expired. Please Login");
            }
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

    const editList = async () => {
        console.log("Edit List");
        //distinguish b/w edit start and edit save to DB
        // console.log("Editable", editable); //false when edit start, true when save
        if(editable === false){
            setListItemsOld(listItems);
            setListTitleOld(listTitle);
            setListCompletedOld(listCompleted);
            setEditable((prev) => !prev);
            return;
        }
        try{
            const data = {
                title: listTitle,
                items: listItems,
                completed: listCompleted,
            };
            // console.log(data);
            const resp = await fetch(`${apiURL}/lists/${listID}`, {
                method: "PATCH",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    },
                body: JSON.stringify(data),
            });
            if(resp.ok === true){
                setEditable((prev) => !prev);
                toast.success('Updated!');
            }
            else if(resp.status === 401){
                navigateTo(`/login`);
                toast.warn("Session Expired. Please Login");
            }
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

    const deleteList = async () => {
        console.log("Delete List");
        try{
            const resp = await fetch(`${apiURL}/lists/${listID}`, {
                method: "DELETE",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    },
            });
            if(resp.ok === true){
                toast.success('Deleted');
                goHome();
            }
            else if(resp.status === 401){
                navigateTo(`/login`);
                toast.warn("Session Expired. Please Login");
            }
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

    const checkIfListComplete = () => {
        // console.log("Checking List Completion");
        const res = listItems.every((item) => item.completed === true);
        if(res === true){
            setListCompleted(true);
        }
        else{
            setListCompleted(false);
        }
    };

    const handleItemCompleted = (index) => {
        console.log("Change Completed Status - Item");
        let updatedListItems = [...listItems];
        updatedListItems[index] = {
            ...updatedListItems[index],
            completed: !updatedListItems[index].completed,
        };
        setListItems(updatedListItems);
        // checkIfListComplete(updatedListItems); //needed to pass argument. Less elegant
    };

    const cancelChanges = () => {
        console.log("Cancel Changes");
        setListTitle(listTitleOld);
        setListItems(listItemsOld);
        setListCompleted(listCompletedOld);
        setEditable((prev) => !prev);
    };

    const addItem = () => {
        // console.log("Add Item to List");
        setListItems((prev) => [
            ...prev,
            {
                name: "Item",
                completed: false,
            },
        ]);
    };

    const editItem = (value, index) => {
        // console.log("Edit List Item");
        let updatedListItems = [...listItems];
        updatedListItems[index] = {
            name: value,
            completed: false,
        };
        setListItems(updatedListItems);
    };

    const removeItem = (pIndex) => {
        // console.log("Remove List Item", pIndex);
        const updatedListItems = listItems.filter((item, index) => (index !== pIndex && item));
        setListItems(updatedListItems);
    };

    useEffect(() => {
        getList();
        if(location){
            props.setLocation(location.pathname.split("/")[1].toUpperCase());
        }
    }, []);

    useEffect(() => {
        console.log({
            listTitle,
            listItems,
            listCompleted,
        });
        checkIfListComplete();
    }, [listItems]);

    return(
        <div className="list-container">
            {listTitle !== null && (
                <Card sx={{ minHeight: 250, minWidth: 250, margin: 2, display: "flex", flexDirection: "column", justifyContent: "center"}} raised={true}>
                <CardContent sx={{ paddingY: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {
                        listTitle !== undefined && editable === false && (
                            <div className="title-div">
                                <Typography variant="h5" component="div">
                                    {listTitle}
                                </Typography>
                                <Button variant="contained" color={listCompleted ? "success" : "error"} size="small" disableElevation sx={{ margin: 1, paddingX: 1, "pointerEvents": "none"}}>{listCompleted ? "Complete" : "Incomplete"}</Button>
                                {/* In the line above, disabling pointer events takes care of click disable and point change, hence no need for "&:hover": { backgroundColor: theme.palette.success.main, cursor: "default"}*/}
                            </div>
                        )
                    }
                    {
                        listTitle !== undefined && editable === true && (
                            <div className="title-div">
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="List Name"
                                    value={listTitle}
                                    onChange={(event) => setListTitle(DOMPurify.sanitize(event.target.value))}
                                    sx={{ marginTop: 2 }}
                                />
                                <Button size="small" variant="contained" color={listCompleted ? "success" : "error"} disableElevation sx={{ marginX: 1, marginTop: 1.5, paddingX: 1, "pointerEvents": "none"}}>{listCompleted ? "Complete" : "Incomplete"}</Button>
                            </div>
                        )
                    }
                    {
                        <div className="list-body">
                        {
                            listItems.length > 0 && editable === false && listItems.map((item, index) => (
                                <Typography key={index} variant="subtitle1" style = {{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                                    {`${index+1} - ${item.name}`}
                                </Typography>
                            ))
                        }
                        {
                            listItems.length > 0 && editable === true && listItems.map((item, index) => (
                                <div className="item-group" key={index}>
                                    <Typography variant="body1" sx = {{ marginTop: 2, minWidth: 0.1 }}>
                                        {`${index+1} - `}
                                    </Typography>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="List Item"
                                        value={item.name}
                                        size="small"
                                        sx={{ marginTop: 2 }}
                                        onChange={(event) => {editItem(DOMPurify.sanitize(event.target.value), index)}}
                                    />
                                    <IconButton 
                                        aria-label="delete" 
                                        size="small" 
                                        sx={{ marginTop: 2, marginLeft: 1 }} 
                                        onClick={(event) => {removeItem(index)}}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton 
                                        aria-label="delete" 
                                        size="small" 
                                        sx={{ marginTop: 2, marginLeft: 1 }} 
                                        onClick={ (event) => {handleItemCompleted(index)} }
                                    >
                                        {item.completed === true ? <CheckIcon color="success"></CheckIcon> : <PendingOutlinedIcon></PendingOutlinedIcon>}
                                    </IconButton>
                                </div>
                            ))
                        }   
                        </div>
                    }
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button size="small" variant="contained" color="success" onClick={editList}>{ editable === false ? "Edit" : "Save" }</Button>
                    {
                        editable === false ?
                        (<Button size="small" variant="contained" color="error" onClick={deleteList}>Delete</Button>):
                        (
                            <div>
                                <Button size="small" variant="contained" color="primary" onClick={addItem} sx={{ marginLeft: 1 }}>Add Item</Button>
                                <Button size="small" variant="contained" color="error" onClick={cancelChanges} sx={{ marginLeft: 1 }}>Cancel</Button>
                            </div>
                        )
                    }
                </CardActions>
            </Card>
            )}
        </div>
    );
}

export {List};