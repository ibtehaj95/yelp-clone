import React, { useEffect } from "react";
import {Button, Card, CardHeader, CardActions, CardContent, Typography } from '@mui/material';
import "./Review.css";

const Review = (props) => {

    useEffect(() => {
        console.log(props);
    }, []);

    return(
        props.review.length > 0 && (
            <Card sx={{ minWidth: 250, maxWidth: 500, margin: 2 }} raised={true}>
                <div className="card-header">
                    <Typography variant="body1" component="div" sx={{color: 'white', marginLeft: '1rem'}}>
                        {props.user_id}
                    </Typography>
                    <Typography variant="body1" component="div" sx={{color: 'white', marginRight: '1rem'}}>
                        {props.rating}
                    </Typography>
                </div>
                <CardContent sx={{ padding: 2 }} >
                    <Typography variant="body1" component="div" sx={{ fontStyle: 'italic', fontSize: '1rem', color: 'gray' }}>
                        {props.review}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex" }}>
                    <Button size="small" variant="contained">Helpful</Button>
                    <Button size="small" variant="contained">Not Helpful</Button>
                </CardActions>
            </Card>
        )
    );
};

export default Review;