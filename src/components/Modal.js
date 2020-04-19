import React from 'react';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

/******************** material-ui/style ************************/

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    color: 'green',
    marginTop: '5px',
  },
  contents: {
    margin: '10px 0px 30px 0px',
  },
  content: {
    margin: '0px 0px 5px 0px',
  },
  modalButton: {
    margin: theme.spacing(1),
  },
}));

/***************************************************************/

function Modal({
  isLogged,
  username,
  email,
  history,
  handleSignout,
  modal,
  handleCloseModal,
}) {
  const classes = useStyles();
  return (
    <div className="Modal">
      {isLogged ? (
        <Dialog open={modal} onClose={handleCloseModal}>
          <DialogTitle className={classes.title}>
            <Typography align="center">
              <AccountCircleIcon />
            </Typography>
            <Typography variant="h6" align="center">
              사용자 정보
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography className={classes.contents} variant="body1">
              <div className={classes.content}>이름 :{username}</div>
              <div>Email :{email}</div>
            </Typography>

            <Button
              className={classes.modalButton}
              size="small"
              variant="contained"
              onClick={() => {
                handleCloseModal();
                history.push('/');
              }}
            >
              닫기
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
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog open={modal} onClose={handleCloseModal}>
          <DialogTitle className={classes.title}>
            <Typography variant="h6" align="center">
              로그인 먼저 해주세요:)
            </Typography>
          </DialogTitle>
        </Dialog>
      )}
    </div>
  );
}

export default withRouter(Modal);
