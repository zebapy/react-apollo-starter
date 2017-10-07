import React, { Component } from 'react';
import { gql, graphql, compose } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import Form from 'smalldots/lib/Form';

import TextField from './TextField';
import Button from './Button';
import Alert from './Alert';

import { withLogin } from './LoginForm';

class SignupForm extends Component {
  state = {
    error: null,
    done: false,
    loading: false
  };

  handleSignup = ({ username, email, password }) => {
    const { signup, login, onLogin } = this.props;

    this.setState({ loading: true, error: null });

    signup({
      username,
      email,
      password
    })
      .then(result => {
        return login({ email, password });
      })
      .then(result => {
        console.log(result);

        onLogin(result.data.signinUser);

        this.setState({ loading: false, done: true });
      })
      .catch(error => {
        console.log(error);

        this.setState({
          loading: false,
          error
        });
      });
  };

  render() {
    const { loading, error, done } = this.state;

    if (done) {
      return <Redirect to="/" />;
    }

    return (
      <Form
        onSubmit={this.handleSignup}
        initialValues={{
          username: '',
          email: '',
          password: ''
        }}>
        {({ values, setValue }) => (
          <fieldset>
            <legend>Sign up</legend>
            {error && <Alert color="warning">{error.message}</Alert>}
            <TextField
              label="Username"
              placeholder="username"
              onChange={e => setValue('username', e.target.value)}
              required
            />
            <TextField
              label="Email"
              type="email"
              placeholder="email"
              onChange={e => setValue('email', e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              placeholder="password"
              onChange={e => setValue('password', e.target.value)}
              required
            />
            <Button
              type="submit"
              color="primary"
              disabled={loading}
              children={loading ? 'Signing up...' : 'Sign up'}
            />
          </fieldset>
        )}
      </Form>
    );
  }
}

const signupMutation = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    createUser(
      username: $username
      authProvider: { email: { email: $email, password: $password } }
    ) {
      id
    }
  }
`;

const withSignup = graphql(signupMutation, {
  props: ({ mutate }) => ({
    signup: ({ username, email, password }) =>
      mutate({
        variables: {
          username,
          email,
          password
        }
      })
  })
});

export default compose(withSignup, withLogin)(SignupForm);
