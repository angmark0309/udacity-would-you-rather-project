import React  from 'react'
import Grid from '@material-ui/core/Grid'
import Question from './Question'

function QuestionContainer(props) {
    const {questions} = props;
    return (
            <Grid container spacing={40} >
            {
                questions.map(((id) =>(
                    <Question key={id} id={id}/>
                )))
            }
            </Grid>
    )

}

export default QuestionContainer