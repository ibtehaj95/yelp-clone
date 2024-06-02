import React from 'react';
import {Button, Card, CardActions, CardContent, TextField, Select, MenuItem, InputLabel, FormControl, Typography } from '@mui/material';

const NoReviews = () => {
    return (
        <Card sx={{ marginTop: 4, marginBottom: 2, width: 0.2 }} raised={true}>
            <CardContent sx={{ paddingTop: 3, paddingBottom: 3 }}>
                <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
                    No Reviews Yet!
                </Typography>
            </CardContent>
        </Card>
    );
};

export default NoReviews;