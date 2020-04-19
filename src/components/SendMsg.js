import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Textfield from '@material-ui/core/Textfield';

import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

axios.defaults.withCredentials = true;

/******************** material-ui/style ************************/
// style
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  background_image: {
    backgroundImage:
      'url(https://source.unsplash.com/user/hy0212/likes/2400x1200)',
    backgroundRepeat: 'no-repeat',
  },
  cardContent: {
    paddingTop: theme.spacing(1),
    paddingButtom: theme.spacing(10),
    display: 'block', // 한 줄 차지
  },
  // textfield 줄바꿈
  cardInput: {
    whiteSpace: 'pre-wrap',
  },
  countText: {
    fontSize: '11pt',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '5px',
  },
}));
// theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#388e3c',
    },
  },
});

/***************************************************************/

// SendMsg
function SendMsg({ history }) {
  const [value, setValue] = useState('');
  const [countText, setCount] = useState(0);

  /********************* input 관리 *****************************/
  function handleInputValue(e) {
    if (e.target.value.length <= 150) {
      setValue(e.target.value);
      setCount(e.target.value.length);
      console.log(value);
    }
  }

  function handleSubmit() {
    axios({
      method: 'post',
      url: 'http://15.164.164.204:4000/message/sendMessage',
      data: {
        inputText: value,
      },
    }).then((res) => {
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
    <div className="SendMsg">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container component="main" className={classes.background_image}>
          <Container maxWidth="sm" className={classes.root}>
            <Card>
              <CardContent className={classes.cardContent} variant="outlined">
                <Textfield
                  className={classes.cardInput}
                  fullWidth
                  name="contents"
                  multiline
                  rows="25"
                  area-label="응원 메세지 입력창"
                  defaultValue="응원 메세지를 입력하세요:)"
                  variant="outlined"
                  onChange={handleInputValue}
                >
                  {value}
                </Textfield>

                <div className={classes.countText}>
                  <span className="currCount">{countText}/최대 150자</span>
                </div>
              </CardContent>

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
            </Card>
          </Container>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default withRouter(SendMsg);
