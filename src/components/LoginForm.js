import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import Form from 'smalldots/lib/Form';

import TextField from './TextField';
import Button from './Button';
import Alert from './Alert';

class LoginForm extends Component {
  state = {
    error: null,
    done: false,
    loading: false
  };

  handleLogin = ({ email, password }) => {
    this.setState({ loading: true, error: null });

    this.props
      .login({
        email,
        password
      })
      .then(result => {
        console.log(result);

        this.props.onLogin(result.data.signinUser);

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
        onSubmit={this.handleLogin}
        initialValues={{
          email: '',
          password: ''
        }}>
        {({ values, setValue }) => (
          <fieldset>
            <legend>Log in</legend>
            {error && <Alert color="warning">{error.message}</Alert>}
            <TextField
              label="Email"
              type="email"
              name="email"
              placeholder="email"
              onChange={e => setValue('email', e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              placeholder="password"
              onChange={e => setValue('password', e.target.value)}
              required
            />
            <Button
              type="submit"
              color="primary"
              disabled={loading}
              children={loading ? 'Logging in...' : 'Log in'}
            />
          </fieldset>
        )}
      </Form>
    );
  }
}

const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const withLogin = graphql(loginMutation, {
  props: ({ mutate }) => ({
    login: ({ email, password }) =>
      mutate({
        variables: {
          email,
          password
        }
      })
  })
});

export default withLogin(LoginForm);
