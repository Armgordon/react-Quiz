import React, {useEffect, useState} from 'react';
import classes from './QuizList.module.scss'
import {Link, NavLink} from "react-router-dom";

import Loader from "../../components/UI/Loader/Loader";
import axios from "../../axios/axios-quiz";

const QuizList = () => {

    const [quizListState, setQuizListState] = new useState({
        quizes:[],
        loading:true
    })

    useEffect(()=> {
        const fetchData = async () => {
            try{
                const response = await  axios.get('quizes.json')
                // console.log('response data - ',response.data)
                const quizesList = []
                if (response.data === null){

                    setQuizListState({
                        ...quizListState,
                        loading:false
                    })
                    return false

                }


                Object.keys(response.data).forEach((key, index)=>{
                    quizesList.push({
                        id:key,
                        name: `Тест №${index + 1}`
                    })
                })
                setQuizListState({
                    ...quizListState,
                    quizes:quizesList,
                    loading:false
                })
            } catch (e) {
                console.log('error ',e)
            }
        }

        fetchData()
            .catch(console.error)

    },[])

    function renderQuizes (){
        if (quizListState.quizes.length === 0)
            return (
                <>
                <p><Link to={'/quiz-creator'} >
                         Create
                    </Link>
                    &nbsp;your first quiz
                </p>
                </>

            )


        return quizListState.quizes.map((quiz)=>{
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
                {quizListState.loading
                    ? <Loader/>
                    :<ul>
                        { renderQuizes() }
                    </ul>
                }

            </div>
        </div>
    );
};

export default QuizList;