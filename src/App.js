import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import GetMsg from './components/GetMsg';
import SendMsg from './components/SendMsg';
import AppBar from './components/AppBar';

import axios from 'axios';

// App
export default function App() {
  const [isLogin, setIsLogin] = useState(true); // false
  const [store, setStore] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  console.log(store);

  function handleIsLogin() {
    setIsLogin(true);
  }

  function storeCollector() {
    // 로그인상태 갱신 메서드
    let store = JSON.parse(window.sessionStorage.getItem('login'));
    if (store && store.login) {
      setStore(store.token);
      setIsLogin(true);
    }
  }

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://15.164.164.204:4000/user/info',
    })
      .then((res) => {
        setEmail(res.data.email);
        setUsername(res.data.username);
      })
      .then(() => {
        storeCollector();
      });
  });

  return (
    <div className="App">
      <AppBar isLogin={isLogin} username={username} email={email} />
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
