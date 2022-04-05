import React, {useEffect, useState} from 'react';
import classes from './Quiz.module.scss'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import {useParams} from "react-router-dom";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";

const Quiz = (props) => {

    const [state, setState] = new useState({
        results:{}, //{[id]: success error}
        isFinished: false,
        activeQuestion:0,
        answerState: null, //{[id]:'success' 'error'}
        quiz: [],
        loading:true
    })

    const params = new useParams()
    // console.log('params ',params.id)

    useEffect(()=> {
        const fetchData = async () => {
            try{
                const response = await axios.get(`quizes/${params.id}.json`)
                const quiz = response.data

                setState({
                    ...state,
                    quiz:quiz,
                    loading:false

                })

            } catch (error){
                console.log(error)
            }
        }
        fetchData().catch(console.error)

    },[])

    function onAnswerClickHandler (answerId) {
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === 'success'){
                return
            }
        }

        const question = state.quiz[state.activeQuestion]
        const results = state.results

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }



            setState(prev => {
                return{
                    ...prev,
                    answerState: {[answerId]:'success'},
                    results : results

                }
            })


            const timeout = window.setTimeout(()=> {
                if (isQuizFinished()) {
                    setState(prev => {
                        return {
                            ...prev,
                            isFinished: true
                        }
                    })
                }else {
                    setState(
                        prev => {
                            return {
                                ...prev,
                                activeQuestion: state.activeQuestion + 1,
                                answerState: null
                            }
                        })
                }

                window.clearTimeout(timeout)
            }, 1000)


        } else {
            results[question.id] = 'error'
            setState(
                prev => {
                    return {
                        ...prev,
                        answerState: {[answerId]: 'error'},
                        results: results
                    }
                }
            )

        }


    }

    function retryHandler (){
        setState(
            prev => {
                return {
                    ...prev,

                    activeQuestion: 0,
                    answerState: null,
                    isFinished: false,
                    results: {}
                }
        })
    }

    function isQuizFinished(){

        return state.activeQuestion +1 === state.quiz.length
    }

    return (
        <div className={classes.Quiz}>

                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {state.loading
                        ? <Loader/>
                        : state.isFinished
                            ? <FinishedQuiz
                                results={state.results}
                                quiz={state.quiz}
                                onRetry={retryHandler}
                            />
                            : <ActiveQuiz
                                question={state.quiz[state.activeQuestion].question}
                                answers={state.quiz[state.activeQuestion].answers}
                                onAnswerClick = {onAnswerClickHandler}
                                quizLength={state.quiz.length}
                                answerNumber={state.activeQuestion +1}
                                state={state.answerState}
                            />
                    }
                </div>
            </div>

    );
};

export default Quiz;