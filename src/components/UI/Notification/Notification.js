import React from 'react';
import classes from './Notification.module.scss'

const Notification = (props) => {
    return (
        <p className={classes.Notification}>
            Auth Error - {props.text}
        </p>
    );
};

export default Notification;