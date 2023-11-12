import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Root = () => {
    
    const navigateTo = useNavigate();

    useEffect(() => {
        // console.log("Root");
        navigateTo(`/login`);
    }, []);

    return(
        <div>
            Root Page
        </div>
    );
}

export default Root;