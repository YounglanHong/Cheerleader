import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'; // *** 제일 마지막에 import 해야 적용됨

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

axios.defaults.withCredentials = true;

/******************** material-ui/style ************************/
// style
const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage:
      'url(https://source.unsplash.com/user/hy0212/likes/800x700)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: green[700],
  },
  form: {
    width: '90%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#388e3c',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});

/***************************************************************/

// Login
function Login({ handleIsLogin, history, storeCollector }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function handleInputEmail(e) {
    setEmail(e.target.value);
  }
  function handleInputPassword(e) {
    setPassword(e.target.value);
  }
  function handleSubmit() {
    axios({
      method: 'post',
      url: 'http://15.164.164.204:4000/user/signin',
      data: {
        email: email,
        password: password,
      },
    })
      .then(res => {
        handleIsLogin();
        window.sessionStorage.setItem(
          'login',
          JSON.stringify({
            login: true,
            store: res.data.token,
          }),
        );
        storeCollector();
      })
      .catch(err => alert('회원가입이 필요합니다'));
  }

  /*********************************************************************/

  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <form className={classes.form}>
              <ValidatorForm onSubmit={handleSubmit}>
                <TextValidator
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Email"
                  autoFocus
                  name="email"
                  value={email}
                  onChange={handleInputEmail}
                  validators={['required', 'isEmail']}
                  errorMessages={[
                    'Enter your email',
                    'Enter a valid email address',
                  ]}
                />
                <TextValidator
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Password"
                  autoFocus
                  name="password"
                  type="password"
                  value={password}
                  onChange={handleInputPassword}
                  validators={['required']}
                  errorMessages={['Enter your password']}
                />

                <Grid container spacing={2}>
                  <Grid item xs>
                    <Box color="primary.main" component="span" pt={10}>
                      <Button fullWidth onClick={() => history.push('/signup')}>
                        아직 가입하지 않으셨나요?
                      </Button>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs>
                    <Box mx="auto">
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        value="Sign In"
                        // onClick={e => {
                        //   e.preventDefault();
                        //   handleSubmit();
                        // }}
                      >
                        Sign In
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </ValidatorForm>
            </form>
          </div>
        </Grid>
      </ThemeProvider>
    </Grid>
  );
}

export default withRouter(Login);
