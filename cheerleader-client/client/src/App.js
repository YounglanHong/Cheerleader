import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Login from './components/Login';
import Signup from './components/Signup';
import GetMsg from './components/GetMsg';
import SendMsg from './components/SendMsg';

import axios from 'axios';

/******************** material-ui/style ************************/

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  modalButton: {
    margin: theme.spacing(1),
  },
  title: {
    // cheerleader
    flexGrow: 1,
    fontWeight: 'bold',
  },
}));

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

// App
function App({ history }) {
  const [isLogin, setIsLogin] = useState(false);
  const [store, setStore] = useState(false);
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  function handleIsLogin() {
    setIsLogin(true);
  }

  function handleOpenModal() {
    setModal(true);
  }

  function handleCloseModal() {
    setModal(false);
  }

  function handleSignout() {
    setIsLogin(false);
    axios({
      method: 'post',
      url: 'http://15.164.164.204:4000/user/withDrawal',
    });
  }

  function storeCollector() {
    // 로그인상태 갱신 메서드
    let store = JSON.parse(window.sessionStorage.getItem('login'));
    if (store && store.login) {
      setStore(store.token);
      setIsLogin(true);
    }
  }
  function handleLogout() {
    axios({
      method: 'post',
      url: 'http://15.164.164.204:4000/user/logout',
    });
  }
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://15.164.164.204:4000/user/info',
    })
      .then(res => {
        setEmail(res.data.email);
        setUsername(res.data.username);
      })
      .then(() => {
        storeCollector();
      });
  });

  /******************** 유저정보 모달창 ************************/
  function UserInfo() {
    if (isLogin) {
      return (
        <div>
          <DialogTitle>
            <Typography
              variant="h6"
              align="center"
              style={{ fontWeight: 'bold' }}
            >
              사용자 정보
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="subtitle1">
              이름 :{username}
              <br />
              Email :{email}
              <br />
            </Typography>
            <br />
            <Typography align="center">
              {/* <Button
                className={classes.modalButton}
                size="small"
                variant="contained"
              >
                정보 수정
              </Button> */}
              <Button
                className={classes.modalButton}
                size="small"
                variant="contained"
                onClick={() => {
                  handleCloseModal();
                  history.push('/');
                }}
              >
                취소
              </Button>
              <Button
                className={classes.modalButton}
                size="small"
                variant="contained"
                onClick={() => {
                  handleSignout();
                  handleCloseModal();
                  history.push('/');
                }}
              >
                회원 탈퇴
              </Button>
            </Typography>
          </DialogContent>
        </div>
      );
    } else {
      return (
        <DialogTitle>
          <Typography variant="h6" align="center" style={{ color: 'green' }}>
            로그인 먼저 해주세요:)
          </Typography>
        </DialogTitle>
      );
    }
  }
  /***************************************************************/

  const classes = useStyles();
  return (
    <div className="App">
      <div className={classes.root}>
        <ThemeProvider theme={theme}>
          <AppBar position="static">
            <Toolbar>
              <IconButton color="inherit">
                <SentimentSatisfiedAltIcon></SentimentSatisfiedAltIcon>
              </IconButton>

              <Typography variant="h6" className={classes.title}>
                Cheerleader
              </Typography>
              {isLogin ? (
                <Button
                  color="inherit"
                  onClick={() => {
                    window.sessionStorage.clear(); // 저장된 세션스토리지를 비우고 로그인으로 이동
                    setIsLogin(false);
                    handleLogout();
                    history.push('/');
                  }}
                >
                  <LockOpenIcon></LockOpenIcon>
                </Button>
              ) : (
                <div></div>
              )}
              <IconButton
                aria-label="userinfo"
                color="inherit"
                onClick={handleOpenModal}
              >
                <AccountCircle />
              </IconButton>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </div>
      <div className="모달창">
        <Dialog open={modal} onClose={handleCloseModal}>
          <UserInfo />
        </Dialog>
      </div>
      {isLogin ? (
        <Switch>
          <Route path="/getmsg" render={() => <GetMsg isLogin={isLogin} />} />
          <Route path="/sendmsg" render={() => <SendMsg isLogin={isLogin} />} />
          <Route
            path="/"
            render={() => {
              return <Redirect to="/getmsg" />;
            }}
          />
        </Switch>
      ) : (
        <Switch>
          <Route path="/signup" render={() => <Signup isLogin={isLogin} />} />
          <Route
            path="/"
            render={() => (
              <Login
                isLogin={isLogin}
                handleIsLogin={handleIsLogin}
                storeCollector={storeCollector}
              />
            )}
          />
        </Switch>
      )}
    </div>
  );
}

export default withRouter(App);
