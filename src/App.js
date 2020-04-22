import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import GetMsg from './components/GetMsg';
import SendMsg from './components/SendMsg';
import AppBar from './components/AppBar';

import * as firebase from 'firebase/app';

// App
function App({ history }) {
  let [isLogin, setIsLogin] = useState(false); // false
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  // console.log(isLogin);

  // Login
  useEffect(() => {
    setEmail('test@testmail.com');
    setPassword('testpassword');
    setUsername('testuser');
  }, [email, password]);

  function handleInputEmail(e) {
    setEmail(e.target.value);
  }
  function handleInputPassword(e) {
    setPassword(e.target.value);
  }

  // 로그인 시 로그인 상태 변경
  function handleIsLogin() {
    setIsLogin(true);
  }

  // 로그아웃, 회원탈퇴 시 로그인 상태 변경
  function isLoginFalse() {
    setIsLogin(false);
  }

  //* firebase 이메일 & 패스워드 로그인
  function signInEmailPassword() {
    const auth = firebase.auth();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        if (res.user.uid) {
          history.push('/getmsg');
          handleIsLogin();
        }
      })
      .catch((err) => {
        let errorCode = err.code;
        let errorMessage = err.message;
        alert(errorCode, ':', errorMessage);
      });
  }

  //* firebase 익명 로그인
  function signInAnonymous() {
    const auth = firebase.auth();
    auth.signInAnonymously().then((res) => {
      if (res.user.uid) {
        history.push('/getmsg');
        handleIsLogin();
      }
    });
  }

  return (
    <div className="App">
      <AppBar
        isLogin={isLogin}
        email={email}
        password={password}
        username={username}
        isLoginFalse={isLoginFalse}
      />
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
                email={email}
                password={password}
                handleInputEmail={handleInputEmail}
                handleInputPassword={handleInputPassword}
                signInEmailPassword={signInEmailPassword}
                signInAnonymous={signInAnonymous}
              />
            )}
          />
        </Switch>
      )}
    </div>
  );
}

export default withRouter(App);
