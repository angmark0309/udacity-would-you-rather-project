import React from 'react'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    }
});

function LeaderBoard(props) {
    const { users, sortedUsers, classes } = props
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell numeric>Questions Asked</TableCell>
                        <TableCell numeric>Questions Answered</TableCell>
                        <TableCell numeric>Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedUsers.map(user => {
                        return (
                            <TableRow key={user}>
                                <TableCell>
                                    <Avatar src={users[user].avatarURL}/>
                                        <Typography>{users[user].name}</Typography>
                                </TableCell>
                                <TableCell numeric>{Object.keys(users[user].answers).length}</TableCell>
                                <TableCell numeric>{users[user].questions.length}</TableCell>
                                <TableCell numeric>{users[user].questions.length + Object.keys(users[user].answers).length }</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    )
}

function mapStateToProps({users}) {
 const sortedUsers = Object.keys(users).sort((a,b)=> {
    const answerQuestionSum1 =  Object.keys(users[a].answers).length + users[a].questions.length
    const answerQuestionSum2 = Object.keys(users[b].answers).length + users[b].questions.length
     return answerQuestionSum2 - answerQuestionSum1
    }
 )
   return {
       sortedUsers,
       users
   }
}

export default withStyles(styles)(connect(mapStateToProps)(LeaderBoard))