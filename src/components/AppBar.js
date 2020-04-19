import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import Modal from './Modal';

import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { AppBar as AppBarBox } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccountCircle from '@material-ui/icons/AccountCircle';

import axios from 'axios';

/******************** material-ui/style ************************/

const useStyles = makeStyles((theme) => ({
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

function AppBar({ isLogin, username, email, history }) {
  console.log(isLogin);
  let [isLogged, setIsLogged] = useState(isLogin);
  const [modal, setModal] = useState(false);

  function handleLogout() {
    axios({
      method: 'post',
      url: 'http://15.164.164.204:4000/user/logout',
    });
  }

  function handleSignout() {
    setIsLogged(!isLogin);
    axios({
      method: 'post',
      url: 'http://15.164.164.204:4000/user/withDrawal',
    });
  }

  function handleOpenModal() {
    setModal(true);
  }

  function handleCloseModal() {
    setModal(false);
  }

  const classes = useStyles();

  return (
    <div className="AppBar">
      <div className={classes.root}>
        <ThemeProvider theme={theme}>
          <AppBarBox position="static">
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={() => {
                  history.push('/');
                }}
              >
                <SentimentSatisfiedAltIcon />
              </IconButton>

              <Typography
                variant="h6"
                className={classes.title}
                onClick={() => {
                  history.push('/');
                }}
              >
                Cheerleader
              </Typography>
              {isLogged ? (
                <Tooltip title="로그 아웃" placement="bottom">
                  <IconButton
                    color="inherit"
                    onClick={() => {
                      window.sessionStorage.clear(); // 저장된 세션스토리지를 비우고 로그인으로 이동
                      setIsLogged(false);
                      handleLogout();
                      history.push('/');
                    }}
                  >
                    <LockOpenIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                ''
              )}
              <Tooltip title="사용자 정보" placement="bottom">
                <IconButton
                  aria-label="userinfo"
                  color="inherit"
                  onClick={handleOpenModal}
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Modal
                isLogged={isLogged}
                username={username}
                email={email}
                handleSignout={handleSignout}
                modal={modal}
                handleCloseModal={handleCloseModal}
              />
            </Toolbar>
          </AppBarBox>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default withRouter(AppBar);
