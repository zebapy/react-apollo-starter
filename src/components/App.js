import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Header';
import Container from './Container';
import Home from './Home';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import Logout from './Logout';

class App extends Component {
  state = {
    token: '',
    user: null
  };

  handleLogin = ({ user, token }) => {
    this.setState({
      user,
      token
    });
  };

  handleLogout = () => {
    this.setState({
      token: '',
      user: null
    });
  };

  render() {
    const { user } = this.state;

    return (
      <div>
        <Header username={user ? user.username : ''} />
        <Container fluid>
          <div className="row">
            <div className="col-md-4">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route
                  path="/signup"
                  render={() => <SignupForm onLogin={this.handleLogin} />}
                />
                <Route
                  path="/login"
                  render={() => <LoginForm onLogin={this.handleLogin} />}
                />
                <Route
                  path="/logout"
                  render={() => <Logout onLogout={this.handleLogout} />}
                />
              </Switch>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
