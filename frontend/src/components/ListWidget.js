import React, { useEffect } from "react";
import { Card } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

const ListWidget = (props) => {

    const navigateTo = useNavigate();

    const buttonClick = () => {
        // console.log(props);
        navigateTo(`/list/${props.id}`);    //take the user to the specific list page
    };

    // useEffect(() => {
    //     console.log("Props", props);
    // }, [props]);
    
    return(
        <Card sx={{ minWidth: 250, maxWidth: 500, margin: 2 }} raised={true}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.title}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button size="small" variant="contained" onClick={buttonClick} sx={{ margin: 1, paddingX: 1 }}>Open</Button>
                <Button variant="contained" color={props.completed === true ? "success" : "error"} size="small" disableElevation sx={{ margin: 1, paddingX: 1, "pointerEvents": "none"}}>{props.completed === true ? "Complete" : "Incomplete"}</Button>
            </CardActions>
        </Card>
    );
}

export default ListWidget;