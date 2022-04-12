import React, {useEffect, useState} from 'react';
import classes from './QuizList.module.scss'
import {Link, NavLink} from "react-router-dom";

import Loader from "../../components/UI/Loader/Loader";
import {fetchQuizes} from "../../store/actions/quiz";

import {connect} from "react-redux";



const QuizList = (props) => {

    useEffect(()=> {
        props.fetchQuizes()
    },[])

    function renderQuizes (){

        if (props.quizes.length === 0)
            return (
                <>
                <p><Link to={'/quiz-creator'} >
                         Create
                    </Link>
                    &nbsp;your first quiz
                </p>
                </>

            )

        return props.quizes.map((quiz)=>{
            return(
                <li
                    key={quiz.id}
                >
                    <NavLink
                        to={'/quiz/'+ quiz.id}
                    >
                    {quiz.name}
                    </NavLink>
                </li>
            )

        })
    }

    return (
        <div className={classes.QuilList}>
            <div>
                <h1>Список тестов</h1>
                {props.loading
                    ? <Loader/>
                    :<ul>
                        { renderQuizes() }
                    </ul>
                }

            </div>
        </div>
    );
};


//connect()(App) // принимает в себя 2 параметра // соединяет компонент со стором Redux

function mapStateToProps(state){    //переводит стейт в пропсы компонента
    // console.log('State', state)
    return{
        quizes: state.quiz.quizes,
        loading: state.quiz.loading,
        error: state.quiz.error
    }

}

function mapDispatchToProps(dispatch){
    return{
        fetchQuizes: ()=> dispatch(fetchQuizes())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(QuizList);