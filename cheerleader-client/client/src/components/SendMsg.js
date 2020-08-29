import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Textfield from '@material-ui/core/Textfield';
// import { BottomNavigation } from '@material-ui/core';
// import { BottomNavigationAction } from '@material-ui/core';
// import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
// import { green } from '@material-ui/core/colors';

// import Typography from '@material-ui/core/Typography';

axios.defaults.withCredentials = true;

/******************** material-ui/style ************************/
// style
const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  root: {
    width: '100%',
    height: '100%',
    display: 'block',
    backgroundImage:
      'url(https://source.unsplash.com/user/hy0212/likes/2400x1200)',
    backgroundRepeat: 'no-repeat',
  },
  cardContent: {
    paddingTop: theme.spacing(1),
    paddingButtom: theme.spacing(10),
    display: 'block', // 한 줄 차지
    width: '50vw',
    height: '40vw',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'center',
    height: 50,
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[800]
        : theme.palette.grey[50],
  },
}));
// theme
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#81c784',
      main: '#388e3c',
      dark: '#1b5e20',
      contrastText: '#e8f5e9',
    },
  },
});

/***************************************************************/

// SendMsg
function SendMsg({ history }) {
  const [value, setValue] = useState('');
  const [countText, setCount] = useState(0);

  /*********************인풋 관리 *****************************/
  function handleInputValue(e) {
    if (e.target.value.length <= 150) {
      setValue(e.target.value);
      setCount(e.target.value.length);
    }
  }

  function handleSubmit() {
    axios({
      method: 'post',
      url: 'http://15.164.164.204:4000/message/sendMessage',
      data: {
        inputText: value,
      },
    }).then(res => {
      if (res.data.id) {
        history.push('/getMsg');
      } else {
        alert('중복되는 메세지가 있습니다.');
      }
    });
  }

  // 뒤로가기
  function handleBack() {
    history.goBack();
  }
  /*************************************************/

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm">
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Card>
                {/* <CardHeader
                  className={classes.cardHeader}
                  // title="Send Message Page"
                ></CardHeader> */}

                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    align="center"
                    justify="center"
                    alignItems="center"
                  >
                    <div className={classes.cardContent} variant="outlined">
                      <Grid item xs={12}>
                        <Textfield
                          m="auto"
                          fullWidth
                          name="contents"
                          multiline
                          rows="25"
                          area-label="응원 메세지를 입력창"
                          variant="outlined"
                          onChange={handleInputValue}
                        >
                          {value}
                        </Textfield>

                        <div className="countText" style={{ fontSize: '11pt' }}>
                          <span className="currCount">{countText}</span>
                          <span>/</span>
                          <span className="MaxCount">최대 150자</span>
                        </div>
                      </Grid>
                    </div>
                  </Grid>
                </CardContent>

                <Grid item xs={12}>
                  <CardActions>
                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      value="뒤로 가기"
                      style={{ fontSize: '17px' }}
                      onClick={handleBack}
                    >
                      뒤로 가기
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      value="응원메세지 작성"
                      style={{ fontSize: '17px' }}
                      onClick={handleSubmit}
                    >
                      응원메세지 작성
                    </Button>
                  </CardActions>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Container>
        {/* <Grid container spacing={5}>
          <Grid item xs={12}>
            <BottomNavigation className={classes.bottom}>
              <BottomNavigationAction
                style={{ color: green[500] }}
                value="favorites"
                icon={<FavoriteIcon />}
              />
            </BottomNavigation>
          </Grid>
        </Grid> */}
      </ThemeProvider>
    </div>
  );
}

export default withRouter(SendMsg);
