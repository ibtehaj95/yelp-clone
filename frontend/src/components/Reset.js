import React, { useEffect, useState } from "react";
import logo from "../../public/logo_size.jpg";
import { Card, TextField } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Reset = (props) => {

    const navigateTo = useNavigate();
    // const [apiURL] = useState("http://127.0.0.1:3000/api/v1");
    // const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTI0MWIwNWJkYzg1Yzg2ZmMxZTNhNjgiLCJuYW1lIjoiQWxleCIsImlhdCI6MTY5NzIwODQ1NywiZXhwIjoxNjk5ODAwNDU3fQ.UNRrwtmrwPYna77Wqv2p4JJzStoRW90E5a0pj3ZA8Zo");
    const [location] = useState(useLocation());
    const [emailRegExp] = useState(new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/)); //https://stackoverflow.com/a/201378/17235798
    const [emailFormError, setEmailFormError] = useState(false);
    const [formVals, setFormVals] = useState({
        email: "username@domain.com",
    });

    const updateForm = (value, key) => {
        if(key === "email"){
            setEmailFormError(false);
        }
        //important lesson: changing one value needs prev for other value, otherwise controlled to uncontrolled bug
        setFormVals((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const processData = () => {
        console.log("Process Data");
        console.log(formVals);
        //validate
        //email regex
        if(emailRegExp.test(formVals.email) !== true){
            setEmailFormError(true);
            return
        }
        //send
    };

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
        console.log("Reset Password");
        if(location){
            props.setLocation(location.pathname.split("/")[1].toUpperCase());
        }
    }, []);

    // useEffect(() => {
    //     console.log(lists);
    // }, [lists]);

    return(
        <div className="login-container">
            <Card sx={{ minHeight: 250, minWidth: 250, display: "flex", flexDirection: "column", justifyContent: "center"}} raised={true}>
                <CardContent sx={{ paddingY: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src={logo}></img>
                    <Typography variant="h5" component="div">
                        Reset Password
                    </Typography>
                    <div className="login-uname-grp">
                        <div className="name-area">
                            <Typography variant="body1" sx = {{ marginTop: 2, minWidth: 0.1 }}>
                                Email:
                            </Typography>
                        </div>
                        <div className="form-area">
                            <TextField
                                required
                                error={emailFormError}
                                helperText={ emailFormError === true ? "Invalid Format" : ""}
                                id="outlined-required"
                                value={formVals.email}
                                size="small"
                                fullWidth
                                sx={{ marginTop: 2}}
                                onChange={(event) => {updateForm(event.target.value, "email")}}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button size="medium" variant="contained" color="primary" onClick={() => processData()}>Submit</Button>
                    <Button size="medium" variant="contained" color="primary" onClick={() => navigateTo(`/login`)}>Login</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default Reset;