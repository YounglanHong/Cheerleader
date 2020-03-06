import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
// import { BottomNavigation } from '@material-ui/core';
// import { BottomNavigationAction } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';
import { grey } from '@material-ui/core/colors';

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
    paddingTop: theme.spacing(20),
    paddingButtom: theme.spacing(10),
    paddingRight: theme.spacing(7),
    paddingLeft: theme.spacing(7),
    display: 'block', // 한 줄 차지
    width: '50vw',
    height: '38vw',
  },
  // bottom: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   height: 100,
  //   backgroundColor:
  //     theme.palette.type === 'dark'
  //       ? theme.palette.grey[800]
  //       : theme.palette.grey[50],
  // },
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

// GetMsg
function GetMsg({ history }) {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://15.164.164.204:4000/message/getMessage',
    }).then(res => {
      setText(res.data.data.inputText);
      setDate(res.data.data.createdAt);
    });
  }, []);
  // }, [text]);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm">
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardHeader
                  className={classes.cardHeader}
                  // title="Message Page"
                ></CardHeader>

                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    align="center"
                    justify="center"
                    alignItems="center"
                  >
                    <div className={classes.cardContent} variant="outlined">
                      <Grid>
                        <Box
                          m="auto"
                          name="contents"
                          style={{
                            fontSize: '20pt',
                            color: green[700],
                            fontWeight: 'bold',
                          }}
                        >
                          {text}
                        </Box>
                        <Box
                          m="auto"
                          name="created_at"
                          style={{
                            fontSize: 15,
                            fontStyle: 'italic',
                            float: 'right',
                            padding: '20px',

                            color: grey[500],
                          }}
                        >
                          {date.slice(0, 10)}
                        </Box>
                      </Grid>
                    </div>
                  </Grid>
                </CardContent>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <CardActions>
                    <Button
                      color="primary"
                      type="submit"
                      fullWidth
                      value="응원메세지 작성하러 가기"
                      style={{ fontSize: '17px' }}
                      onClick={() => history.push('/sendmsg')}
                    >
                      응원메세지 작성하러 가기
                    </Button>
                  </CardActions>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Container>
        {/* <Grid container spacing={5}>
          <Grid lg={12} md={12} sm={12} xs={12}>
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

export default withRouter(GetMsg);
