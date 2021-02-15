import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from './interface/auth/Login';
import Signup from './interface/auth/Signup';
import Board from './interface/Board';
import Game from './interface/Board';
import Index from './interface/Index';
import Table from './interface/Table';
import { loadUser, guestAuth, logout } from './store/actions/user/auth';
import setAuthToken from './utils/setAuthToken';

const App = ({ history, auth, loadUser, guestAuth, logout }: any) => {

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
      loadUser()
    }
    
    return () => {
      loadUser()
    }
  }, [loadUser, localStorage.token])




  return (
    <div className="App">
      <header className="header-content">
        <p className="page-title"><span onClick={e=> history.push('/')}>Chess</span></p>
        
        {
          auth.isAuthenticated && <button onClick={e=> logout(history)}>Logout</button>
        }
        
      </header>

      <main className="output">
      
        {
          auth.isAuthenticated ? <Fragment>
            <Switch>
              <Route exact path="/">
                <Index />
              </Route>

              <Route exact path="/table">
                <Table />
              </Route>

            </Switch>
          </Fragment> : <Fragment>
            <Switch>

              <Route exact path="/">
                <button onClick={e=> guestAuth(history)}>Join as a Guest</button>

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
          </Fragment>
        }

      </main>

    </div>
  );
}
const mapStateToProps = (state: any) => ({
  auth: state.auth
})
export default connect(mapStateToProps, { loadUser, guestAuth, logout })(withRouter(App));
