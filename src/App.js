import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { routers } from 'router';

function App() {
  let token = localStorage.getItem('token');

  return (
    <Router>
      <Switch>
        {
          routers.map((route, key) => {
            if (route.exact) {
              return <Route key={key} exact path={route.path} component={route.component} />
            } else {
              return <Route key={key} path={route.path} render={props => (
                token ? <route.component {...props} rouers={route.routes} /> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
              )} />
            }
          })
        }
      </Switch>
    </Router>
  )
}

export default App;