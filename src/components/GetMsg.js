import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { green } from '@material-ui/core/colors';
import { grey } from '@material-ui/core/colors';

//* firebase
import database from '../firebase';

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
    paddingTop: theme.spacing(20),
    paddingButtom: theme.spacing(10),
    paddingRight: theme.spacing(7),
    paddingLeft: theme.spacing(7),
    display: 'block', // 한 줄 차지
  },

  cardText: {
    fontSize: '20pt',
    color: green[700],
    fontWeight: 'bold',
  },

  cardDate: {
    fontSize: 15,
    fontStyle: 'italic',
    padding: '20px',
    margin: '20px 10px 10px 0px',
    color: grey[500],
  },
  cardButton: {
    color: green[700],
    fontSize: '17px',
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

// GetMsg
function GetMsg({ history }) {
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');

  // media query
  const media_theme = useTheme();
  const matches = useMediaQuery(media_theme.breakpoints.up('sm'));

  let md_style = {
    width: '50vw',
    height: '60vh',
  };

  let sm_style = {
    width: '50vw',
    height: '50vh',
  };

  useEffect(() => {
    let messageRef = database.ref('messages');

    messageRef.on('value', (snapshot) => {
      let values = Object.values(snapshot.val());
      if (snapshot) {
        return values.map((data, i) => {
          let random_index = Math.floor(Math.random() * (i + 1));
          return (
            setMessage(values[random_index].message),
            setDate(new Date(values[random_index].createdAt).toDateString())
          );
        });
      }
    });
  }, []);
  // }, [text]);

  const classes = useStyles();

  return (
    <div className="GetMsg">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container component="main" className={classes.background_image}>
          <Container maxWidth="sm" className={classes.root}>
            <Card>
              <CardContent
                className={classes.cardContent}
                variant="outlined"
                style={matches ? md_style : sm_style}
              >
                <Box className={classes.cardText} name="contents">
                  {message}
                </Box>
                <Box className={classes.cardDate}>{date}</Box>
              </CardContent>

              <CardActions>
                <Button
                  className={classes.cardButton}
                  type="submit"
                  fullWidth
                  value="응원메세지 작성하러 가기"
                  onClick={() => history.push('/sendmsg')}
                >
                  응원메세지 작성하러 가기
                </Button>
              </CardActions>
            </Card>
          </Container>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default withRouter(GetMsg);
