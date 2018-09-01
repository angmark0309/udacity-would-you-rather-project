import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import { handleSaveQuestion } from '../actions/questions'


class AddQuestion extends Component {

    state = {
        optionOne : '',
        optionTwo : '',
    }

    handleChange = e => {
        const { id, value } = e.target
        this.setState({[id]: value})
    }

    handleSubmit = e => {
        e.preventDefault()
        const { dispatch, authedUser } = this.props
        const { optionOne, optionTwo } = this.state
        const optionOneText = optionOne
        const optionTwoText = optionTwo
        const author = authedUser
        dispatch(handleSaveQuestion({ optionOneText, optionTwoText, author}))
        this.props.history.push("/")
    }

    render() {
        const {optionOne, optionTwo} = this.state
        return(
            <Grid item  xs={12} md={6} style={{ margin: "auto", marginTop: 30 }}>
                <Card style={{ display: "flex" }}>
                    <div style={{ flex: 1 }}>
                        <form onSubmit={this.handleSubmit}>
                            <CardContent>
                                <Typography variant="headline">
                                    Would You Rather...
                                    </Typography>
                                <Divider/>
                                <TextField
                                    id="optionOne"
                                    label="option 1"
                                    fullWidth
                                    margin="normal"
                                    onChange={this.handleChange}
                                    value={optionOne}
                                />
                                <TextField
                                    id="optionTwo"
                                    label="option 2"
                                    fullWidth
                                    margin="normal"
                                    onChange={this.handleChange}
                                    value={optionTwo}
                                />
                            </CardContent>
                            <CardActions >
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={!(!!this.state.optionOne && !!this.state.optionTwo)}
                                >
                                    Submit
                                </Button>
                            </CardActions>
                        </form>
                    </div>
                </Card>
            </Grid>
        )
    }
}

function mapStateToProps ({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(AddQuestion)