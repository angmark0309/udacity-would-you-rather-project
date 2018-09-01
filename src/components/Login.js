
import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {setAuthedUser} from '../actions/authedUser'
import {Redirect} from 'react-router-dom'


const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
        width: 100,
        height: 100
    },
    lock: {
        fontSize : "60px"
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    userAvatar: {
        marginRight: 10
    }
});

class Login extends Component {

    state = {
        authedUser: '',
        loggedIn : false
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault()
        this.state.authedUser.length > 0 
        ? this.props.dispatch(setAuthedUser(this.state.authedUser))
        : null;
    }

    render() {
        const {classes, authedUser} = this.props

        if(authedUser !== null) {
            return <Redirect to='/'/>
        }
        return (
            <Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockIcon className={classes.lock}/>
                        </Avatar>
                        <Typography variant="headline">Sign in</Typography>
                        <form className={classes.form} onSubmit={(e)=>this.handleSubmit(e)}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="authedUser">Select User</InputLabel>
                                <Select
                                    value={this.state.authedUser}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'authedUser',
                                        id: 'authedUser',
                                    }}
                                >
                                    {this.props.userIds.map((id) => (
                                        
                                        <MenuItem key={id} value={id} style={{ display: "flex" }} >
                                            <Avatar
                                                src={this.props.users[id].avatarURL}
                                                className={classes.userAvatar}
                                            />
                                            <em>{this.props.users[id].name}</em> 
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="raised"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign in
                             </Button>
                        </form>
                    </Paper>
                </main>
        </Fragment>
        );
    }
}
function mapStateToProps({ users ,authedUser}) {
    return { userIds: Object.keys(users), users, authedUser } 
}

export default withStyles(styles)(connect(mapStateToProps)(Login));