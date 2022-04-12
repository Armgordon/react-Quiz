import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {logout} from "../../store/actions/auth";

const Logout = (props) => {

    useEffect(()=>{
        props.logout()
    },[])


    return (
        <Navigate to={'/'}/>

    );
};

function mapDispatchToProps(dispatch){
    return{
        logout: ()=>dispatch(logout())
    }
}

export default connect(null,mapDispatchToProps)(Logout);