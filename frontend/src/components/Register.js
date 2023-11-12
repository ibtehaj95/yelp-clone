import React, { useEffect, useState } from "react";
import logo from "../../public/logo_size.jpg";
import { Card, TextField } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Register = (props) => {

    const navigateTo = useNavigate();
    const [apiURL] = useState("http://127.0.0.1:3000/api/v1");
    const [passVis, setPassVis] = useState(false);
    const [location] = useState(useLocation());
    const [emailRegExp] = useState(new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/)); //https://stackoverflow.com/a/201378/17235798
    const [passRegExp] = useState(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)); //Min 8 chars, >=1 uppercase letter, lowercase letter, number and one special character
    const [nameRegExp] = useState(new RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u));
    const [emailFormError, setEmailFormError] = useState(false);
    const [passwordFormError, setPasswordFormError] = useState(false);
    const [nameFormError, setNameFormError] = useState(false);
    const [formVals, setFormVals] = useState({
        email: "username@domain.com",
        password: "",
        name: "",
    });

    const updateForm = (value, key) => {
        if(key === "email"){
            setEmailFormError(false);
        }
        else if(key === "password"){
            setPasswordFormError(false);
        }
        else if(key === "name"){
            setNameFormError(false);
        }
        //important lesson: changing one value needs prev for other value, otherwise controlled to uncontrolled bug
        setFormVals((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const processData = () => {
        console.log("Process Data");
        //validate
        //email regex
        if(emailRegExp.test(formVals.email) !== true){
            setEmailFormError(true);
            return
        }
        //pass regex
        else if(passRegExp.test(formVals.password) !== true){
            setPasswordFormError(true);
            return
        }
        //name regex
        else if(nameRegExp.test(formVals.name) !== true){
            setNameFormError(true);
            return
        }
        //send
        register();
    };

    const register = async () => {
        try{
            const resp = await fetch(`${apiURL}/auth/register`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    },
                body: JSON.stringify(formVals),
            });
            if(resp.ok === true){
                const {token, user: {email}} = await resp.json();
                // console.log(email, token);
                navigateTo(`/login`);
                // toast.success('Fetched');
            }
            else{
                toast.warn("Invalid Credentials!");
                const error = await resp.json();
                console.log("Invalid Credentials!", error);
            }
        }
        catch (error){
            console.log("Failed to Login", error);
            toast.error("Failed to Login");
        }
    };

    useEffect(() => {
        console.log("Register");
        if(location){
            props.setLocation(location.pathname.split("/")[1].toUpperCase());
        }
    }, []);

    return(
        <div className="login-container">
            <Card sx={{ minHeight: 250, minWidth: 250, display: "flex", flexDirection: "column", justifyContent: "center"}} raised={true}>
                <CardContent sx={{ paddingY: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src={logo}></img>
                    <Typography variant="h5" component="div">
                        Register
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
                                id="outlined-required-email"
                                placeholder="username@domain.com"
                                fullWidth
                                value={formVals.email}
                                size="small"
                                sx={{ marginTop: 2 }}
                                onChange={(event) => {updateForm(event.target.value, "email")}}
                            />
                        </div>
                    </div>
                    <div className="login-pass-grp">
                        <div className="name-area">
                            <Typography variant="body1" sx = {{ marginTop: 2, minWidth: 0.1 }}>
                                Password:
                            </Typography>
                        </div>
                        <div className="form-area">
                            <TextField
                                required
                                error={passwordFormError}
                                helperText={ passwordFormError === true ? "Invalid Format" : ""}
                                id="outlined-password-input"
                                placeholder="password"
                                type={ passVis ? "text" : "password"}
                                value={formVals.password}
                                size="small"
                                sx={{ marginTop: 2, width: 0.83 }}
                                onChange={(event) => {updateForm(event.target.value, "password")}}
                            />
                            <IconButton 
                                aria-label="visibility" 
                                size="small" 
                                sx={{ marginTop: 2, marginLeft: 1 }} 
                                onClick={(event) => {setPassVis((prev) => !prev)}}
                            >
                                {passVis ? <VisibilityIcon></VisibilityIcon> : <VisibilityOffIcon></VisibilityOffIcon>}
                            </IconButton>
                        </div>
                    </div>
                    <div className="login-uname-grp">
                        <div className="name-area">
                            <Typography variant="body1" sx = {{ marginTop: 2, minWidth: 0.1 }}>
                                Name:
                            </Typography>
                        </div>
                        <div className="form-area">
                            <TextField
                                required
                                error={nameFormError}
                                helperText={ nameFormError === true ? "Invalid Format" : ""}
                                id="outlined-required-name"
                                placeholder="User Name"
                                value={formVals.name}
                                fullWidth
                                size="small"
                                sx={{ marginTop: 2 }}
                                onChange={(event) => {updateForm(event.target.value, "name")}}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button size="medium" variant="contained" color="primary" onClick={() => processData()}>Create Account</Button>
                    <Button size="medium" variant="contained" color="primary" onClick={() => navigateTo(`/login`)}>Login</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default Register;