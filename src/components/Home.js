
import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import QuestionContainer from './QuestionContainer'
import { connect } from 'react-redux'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    tabs: {
        marginBottom: 25
    }
});

class Home extends Component {

    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };


    render() {
        const { value } = this.state;
        const { classes, answeredQuestions, unansweredQuestions } = this.props;
        return (
            <Paper className={classes.root}>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    className={classes.tabs}
                >
                    <Tab label="Unanswered Questions" />
                    <Tab label="Answered Questions" />
                </Tabs>
                {value === 0 && <QuestionContainer questions={unansweredQuestions}/>}
                {value === 1 && <QuestionContainer questions={answeredQuestions}/>}
            </Paper>
        );
    }
}

function mapStateToProps({ authedUser, users, questions }) {
    const user = users[authedUser];
    const answeredQuestions = Object.keys(user.answers)
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    const unansweredQuestions = Object.keys(questions).filter(qid=> !answeredQuestions.includes(qid))
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    return {
        authedUser,
        answeredQuestions,
        unansweredQuestions
    }
}

export default withStyles(styles)(connect(mapStateToProps)(Home));