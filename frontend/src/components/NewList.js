import React, { useEffect, useState } from "react";
import { Card, Modal, TextField } from '@mui/material';
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

const NewList = (props) => {

    const [apiURL] = useState("http://127.0.0.1:3000/api/v1");
    const [newListTitle, setNewListTitle] = useState("Untitled");
    const [newListItems, setNewListItems] = useState([]);
    const navigateTo = useNavigate();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: 24,
        minHeight: 250, 
        minWidth: 250,
        margin: 2, 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center"
    };

    const closeNewListCreate = () => props.setShowModal(false);

    const createNewList = async () => {
        // console.log("Create New List");
        const data = {
            title: newListTitle,
            items: newListItems,
        };
        // if(newListItems.length > 0){

        //     data.items = newListItems
        // }
        // console.log(data);
        
        try{
            const resp = await fetch(`${apiURL}/lists`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    },
                body: JSON.stringify(data),
            });
            if(resp.ok === true){
                closeNewListCreate();
                // toast.success('Created'); //toast won't appear, since we reload page
                navigateTo(0); //reload homepage
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
            console.log("Failed to Create", error);
            toast.warn("Response Not Okay!");
        }
    };

    const addItem = () => {
        // console.log("Add Item to List");
        setNewListItems((prev) => [
            ...prev,
            {
                name: "Item",
                completed: false,
            },
        ]);
    };

    const editItem = (value, index) => {
        // console.log("Edit List Item");
        let updatedNewListItems = [...newListItems];
        updatedNewListItems[index] = {
            name: value,
            completed: false,
        };
        setNewListItems(updatedNewListItems);
    };

    const removeItem = (pIndex) => {
        // console.log("Remove List Item", pIndex);
        const updatedNewListItems = newListItems.filter((item, index) => (index !== pIndex && item));
        setNewListItems(updatedNewListItems);
    };

    useEffect(() => {

        console.log(newListItems);

    }, [newListItems]);
    
    return(
        <Modal
            open={props.showModal}
            onClose={closeNewListCreate}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            
                <Card sx={ style } raised={true}>
                    <CardContent sx={{ paddingY: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography variant="h5" component="div">
                            Create a New List
                        </Typography>
                        <TextField
                            required
                            id="outlined-required"
                            label="List Name"
                            value={newListTitle}
                            onChange={(event) => setNewListTitle(DOMPurify.sanitize(event.target.value))}
                            sx={{ marginTop: 2 }}
                        />
                        {
                            <div className="list-body">
                            {
                                newListItems.length > 0 && newListItems.map((item, index) => (
                                    <div className="item-group" key={index}>
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
                                            <ClearIcon />
                                        </IconButton>
                                    </div>
                                    
                                ))
                            }    
                            </div>
                        }
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center" }}>
                        <Button size="small" variant="contained" onClick={addItem}>Add Item</Button>
                        <Button size="small" variant="contained" onClick={createNewList}>Create</Button>
                    </CardActions>
                </Card>
        </Modal>
    );
}

export default NewList;