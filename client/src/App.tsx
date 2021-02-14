import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from './interface/auth/Login';
import Signup from './interface/auth/Signup';
import Game from './interface/Game';

const App = ({ history, auth }: any) => {
  return (
    <div className="App">
      <header className="header-content">
        <p className="page-title"><span onClick={e=> history.push('/')}>Chess</span></p>
      </header>

      <main className="output">
      
        {
          auth.isAuthenticated ? <Fragment>
            <Switch>

            <Route exact path="/">
              <button>Join as a Guest</button>

              <button onClick={e=> history.push('/login')}>Log in</button>

              <button onClick={e=> history.push('/signup')}>Sign up</button>


            </Route>


            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>

            </Switch>
          </Fragment> : <Fragment>
            <Switch>
              <Route exact path="/game">
                <Game />
              </Route>

            </Switch>
          </Fragment>
        }

      </main>

    </div>
  );
}
const mapStateToProps = (state: any) => ({
  auth: state.auth
})
export default connect(mapStateToProps, { })(withRouter(App));
