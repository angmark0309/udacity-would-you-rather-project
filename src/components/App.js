import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import LeaderBoard from './LeaderBoard'
import Nav from './Nav'
import Home from './Home'
import QuestionDetails from './QuestionDetails'
import AddQuestion from './AddQuestion'
import LoadingBar from 'react-redux-loading'
import NoMatch from './NoMatch'

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed
        ? <Component {...props} />
        : <Redirect to='/login' />}
    />
  )
}

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Nav/>
         <LoadingBar/> 
          <div className='container'>
              <div>
              <Switch>
                <Route path='/login' component={Login} />
                <PrivateRoute authed={this.props.authedUser} path='/questions/:id' component={QuestionDetails} />
                <PrivateRoute authed={this.props.authedUser}   exact path='/' component={Home}/>
                <PrivateRoute authed={this.props.authedUser} exact path='/leaderboard' component={LeaderBoard} />
                <PrivateRoute authed={this.props.authedUser} exact path='/add' component={AddQuestion} />
                <Route component={NoMatch} />
              </Switch> 
              </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps ({authedUser}) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App);
