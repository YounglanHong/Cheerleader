import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import AccountModal from './Modal/AccountModal';

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

import * as firebase from 'firebase/app';

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

function AppBar({ isLogin, isLoginFalse, username, email, history }) {
  const [modal, setModal] = useState(false);

  //* firebase 로그아웃
  function handleLogout() {
    const auth = firebase.auth();
    auth
      .signOut()
      .then(() => {
        isLoginFalse();
        history.push('/');
      })
      .catch((err) => {
        alert(err);
      });
  }

  //* firebase 회원탈퇴
  function handleWithdrawal() {
    let user = firebase.auth().currentUser;

    user
      .delete()
      .then(() => {
        console.log('Withdrawal');
        isLoginFalse();
        history.push('/');
        setModal(false);
      })
      .catch((err) => {
        alert(err);
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
              {isLogin ? (
                <Tooltip title="로그 아웃" placement="bottom">
                  <IconButton color="inherit" onClick={handleLogout}>
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
              <AccountModal
                isLogin={isLogin}
                username={username}
                email={email}
                handleWithdrawal={handleWithdrawal}
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
