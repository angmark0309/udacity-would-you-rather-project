import { saveAnswerQuestion, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading';
import { addUserAnswer, addUserQuestion } from './users';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

function answerQuestion({authedUser, qid, answer}) {
    return {
        type: SAVE_QUESTION_ANSWER,
        authedUser,
        qid,
        answer
    }
}

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        id: question.id,
        question
    }
}

export function handleSaveQuestion (info) {
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestion(info).then((formattedQuestion)=>{
            dispatch(addUserQuestion(formattedQuestion))
            dispatch(addQuestion(formattedQuestion))
            dispatch(hideLoading())
        })
    }
}

export function handleSaveAnsweredQuestion (info) {
    return (dispatch) => {
        dispatch(showLoading())
        return saveAnswerQuestion(info).then(()=>{
            dispatch(addUserAnswer(info))
            dispatch(answerQuestion(info))
            dispatch(hideLoading())
        })
    }
}