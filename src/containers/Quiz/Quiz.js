import React, {useEffect, useState} from 'react';
import classes from './Quiz.module.scss'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import {useParams} from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";

const Quiz = (props) => {

    const params = new useParams()
    useEffect(()=> { //Аналог Didmount
        props.fetchQuizById(params.id)

        return () => { //Аналог unmount
            props.retryQuiz()
        }
    },[])


    return (
        <div className={classes.Quiz}>
            <div className={classes.Quiz__wrapper}>
                <h1>Ответьте на все вопросы</h1>
                {props.loading || !props.quiz
                    ? <Loader/>
                    : props.isFinished
                        ? <FinishedQuiz
                            results={props.results}
                            quiz={props.quiz}
                            onRetry={props.retryQuiz}
                        />
                        : <ActiveQuiz
                            question={props.quiz[props.activeQuestion].question}
                            answers={props.quiz[props.activeQuestion].answers}
                            onAnswerClick = {props.quizAnswerClick}
                            quizLength={props.quiz.length}
                            answerNumber={props.activeQuestion +1}
                            state={props.answerState}
                        />
                }
            </div>
        </div>

    );
};


function mapStateToProps(state){    //переводит стейт в пропсы компонента
    return{
        results:state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion:state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading:state.quiz.loading,
    }

}

function mapDispatchToProps(dispatch){
    return{
        fetchQuizById: (id)=> dispatch(fetchQuizById(id)),
        quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);