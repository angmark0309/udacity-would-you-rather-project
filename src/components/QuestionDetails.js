import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import CardMedia from '@material-ui/core/CardMedia'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import RadioGroup  from '@material-ui/core/RadioGroup'
import FormControlLabel  from '@material-ui/core/FormControlLabel'
import Radio  from '@material-ui/core/Radio' 
import  WhereToVote  from '@material-ui/icons/WhereToVote'
import Avatar from '@material-ui/core/Avatar'
import { handleSaveAnsweredQuestion } from '../actions/questions'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class QuestionDetails extends Component {

    state = {
      value : ""
    }

    handleChange = (event) => {
      this.setState({ value: event.target.value });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { dispatch, authedUser, id } = this.props;
      const answer = this.state.value
      dispatch(handleSaveAnsweredQuestion({ authedUser, qid: id , answer }));
    }
    render() {
      const { authorName, avatarURL, questionDetails, classes, id, optionOneVotes, optionTwoVotes } = this.props
      const optionOneVoteCount = questionDetails.optionOne.votes.length
      const optionTwoVoteCount = questionDetails.optionTwo.votes.length
      const optionOneAndTwoCount = optionOneVoteCount + optionTwoVoteCount

      return (
        <Grid item key={id} xs={12} md={6} style={{ margin: "auto", marginTop : 30 }}>
          <Card style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
             {
                (!optionOneVotes && !optionTwoVotes) ?  
                  <form onSubmit={(e) => this.handleSubmit(e)}>
                    <CardContent>
                      <Typography variant="headline">{authorName} asks:</Typography>
                      <Typography variant="subheading" color="textSecondary">
                        Would You Rather...
                      </Typography>
                      <FormControl component="fieldset" className={classes.formControl}>
                        <RadioGroup
                          value={this.state.value}
                          onChange={this.handleChange}
                        >
                          <FormControlLabel value="optionOne" control={<Radio color="primary" />} label={questionDetails.optionOne.text} />
                          <FormControlLabel value="optionTwo" control={<Radio color="primary" />} label={questionDetails.optionTwo.text} />
                        </RadioGroup>
                      </FormControl>
                    </CardContent>
                    <CardActions >
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        Submit
                </Button>
                    </CardActions>
                  </form> 
                :
                  <CardContent>
                    <Typography variant="headline">{authorName} asks:</Typography>
                    <Typography variant="subheading" color="textSecondary">
                      Would You Rather...
                    </Typography>
                    <ul>
                      <div style={{ display: "flex" }}>
                        <Typography color="textPrimary">
                        <li style={{marginBottom : 15}}>
                            {
                              `${questionDetails.optionOne.text}  (${optionOneVoteCount} of 
                               ${optionOneAndTwoCount} votes | ${((optionOneVoteCount / optionOneAndTwoCount) * 100).toFixed(2) } %)` 
                            }
                        </li>
                        </Typography>
                        {
                          (optionOneVotes) ?
                            <Avatar style={{
                              backgroundColor: "green",
                              marginBottom: -26,
                              marginTop: -10,
                              marginLeft: 14
                            }}>
                              <WhereToVote />
                            </Avatar>
                            :
                            null
                        }
                      </div>
                      <div style={{ display: "flex" }}>
                        <Typography color="textPrimary">
                        <li>
                            {
                              `${questionDetails.optionTwo.text}  (${optionTwoVoteCount} of 
                               ${optionOneAndTwoCount} votes | ${((optionTwoVoteCount / optionOneAndTwoCount) * 100).toFixed(2)} %)`
                            }
                        </li>
                        </Typography>
                        {
                          (optionTwoVotes) ?
                            <Avatar style={{ 
                              backgroundColor: "green" ,
                              marginBottom: -26,
                              marginTop: -10,
                              marginLeft: 14
                              }}>
                              <WhereToVote />
                            </Avatar>
                            :
                            null
                        }
                      </div>
                    </ul>
                  </CardContent>
             }
              
            </div>
            <Hidden xsDown>
              <CardMedia
                style={{
                  width: 80,
                  marginTop: 13,
                  height: 80
                }}
                image={avatarURL}
                title="Image title"
              />
            </Hidden>
          </Card>
        </Grid>
      )
    }

}

function mapStateToProps({ authedUser, users, questions }, props) {
  const {id} = props.match.params
  const questionDetails = questions[id]
  const authorName = users[questionDetails.author].name
  const avatarURL = users[questionDetails.author].avatarURL
  const optionOneVotes = questionDetails.optionOne.votes.includes(authedUser)
  const optionTwoVotes = questionDetails.optionTwo.votes.includes(authedUser)
  return {
    authedUser,
    avatarURL,
    questionDetails,
    authorName,
    id,
    optionOneVotes,
    optionTwoVotes
  }
}

export default withStyles(styles)(connect(mapStateToProps)(QuestionDetails))