
import React, {Fragment} from 'react'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { unsetAuthedUser } from '../actions/authedUser'

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    toolbarTitle: {
        flex: 1,
    },
    avatar: {
        marginLeft: "auto"
    },
    typography: {
        paddingRight: 15
    }
})

function Nav(props) {
    const { classes, authedUser, users, dispatch } = props;

    return (
        <AppBar position="static" color="default" className={classes.appBar}>
            <Toolbar>
                <Button component={Link} to="/">Home</Button>
                <Button component={Link} to="/add">New Question</Button>
                <Button component={Link} to="/leaderboard">Leader Board</Button>
                {
                    authedUser ?
                    (
                        <Fragment> 
                            <Avatar
                                src={users[authedUser].avatarURL}
                                className={classes.avatar}
                            />
                                <Typography className={classes.typography}>{users[authedUser].name}</Typography>     
                                <Button color="primary" variant="outlined" onClick={() => (dispatch(unsetAuthedUser()))}>
                                    Logout
                            </Button> 
                        </Fragment>
                    )

                    :
                    null
                }
            </Toolbar>
        </AppBar>
    )

}

function mapStateToProps({authedUser, users }) {
    return { authedUser, users }
}

export default withStyles(styles)(connect(mapStateToProps)(Nav))