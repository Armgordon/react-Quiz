import React from 'react';
import classes from './Quiz.module.scss'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import {matchPath} from "react-router-dom";


class Quiz extends React.Component{
    state = {
        results:{}, //{[id]: success error}
        isFinished: false,
        activeQuestion:0,
        answerState: null, //{[id]:'success' 'error'}
        quiz: [
            {
                question:'Какого цвета небо?',
                rightAnswerId:2,
                id:1,
                answers: [
                    { id:1, text:'Черный' },
                    { id:2, text:'Синий' },
                    { id:3, text:'Красный' },
                    { id:4, text:'Зеленый' },
                ]
            },
            {
                question:'В каком году основали Ангарск?',
                rightAnswerId:3,
                id:2,
                answers: [
                    { id:1, text:'1951' },
                    { id:2, text:'1946' },
                    { id:3, text:'1945' },
                    { id:4, text:'1975' },
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {

        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success'){
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswerId === answerId) {

            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]:'success'},
                results : results
            })


            const timeout = window.setTimeout(()=> {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                }else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })

                }

                window.clearTimeout(timeout)
            }, 1000)


        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]:'error'},
                results: results
            })

        }


    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}

        })
    }

    isQuizFinished(){

        return this.state.activeQuestion +1 === this.state.quiz.length
    }



    componentDidMount() {
        // console.log('Quiz ID = ', this.props.match.params.id)
        // console.log('Quiz ID = ', this.props.match.params)
    }

    render() {
        return(
            <div className={classes.Quiz}>

                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.isFinished
                        ? <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                            />
                        : <ActiveQuiz
                                question={this.state.quiz[this.state.activeQuestion].question}
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                onAnswerClick = {this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion +1}
                                state={this.state.answerState}
                        />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz;