import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import CardMedia from '@material-ui/core/CardMedia'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'; 
import { Link } from 'react-router-dom'

const styles = theme => ({
    cardMedia: {
        width: 80,
        marginTop: 13,
        height: 80
    }
})

class Question extends Component {
 render() {
     const { authorName, avatarURL, questionDetails, classes, id } = this.props
     return (
         <Grid item key={id} xs={12} md={6}>
             <Card style={{ display : "flex" }}>
                 <div style={{flex : 1}}>
                     <CardContent>
                         <Typography variant="headline">{authorName} asks:</Typography>
                         <Typography variant="subheading" color="textSecondary">
                             Would You Rather
                                    </Typography>
                         <Typography variant="subheading" paragraph>
                             {questionDetails.optionOne.text} or {questionDetails.optionTwo.text} ?
                     </Typography>
                     </CardContent>
                     <CardActions >
                         <Button 
                            fullWidth 
                            variant="outlined" 
                            color="primary"
                            component={Link} 
                            to={`questions/${id}`}
                        >
                             View Poll
                         </Button>
                     </CardActions>
                </div>
                 <Hidden xsDown>
                     <CardMedia
                         image={avatarURL}
                         title="Image title"
                         className={classes.cardMedia}
                     />
                 </Hidden>
             </Card>
         </Grid>
     )
 }
}

function mapStateToProps({ authedUser, users, questions },{id}) {
    const questionDetails = questions[id]
    const authorName = users[questionDetails.author].name
    const avatarURL = users[questionDetails.author].avatarURL
    return {
        authedUser,
        avatarURL,
        questionDetails,
        authorName,
        id
    }
}

export default withStyles(styles)(connect(mapStateToProps)(Question))