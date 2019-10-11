import React, { useEffect } from 'react';
import './Toast.css';

const Toast = props => {

    useEffect(() => {
        const timer = setTimeout(() => {
            props.toastOut();
        }, 2000);
        return () => clearTimeout(timer);
    });

    const toastClass = "myToast flex flc " + (props.toast ? "active" : "");
    return (
        <div className={toastClass}><h4>{props.toastText}</h4></div>
    )
}

export default Toast;