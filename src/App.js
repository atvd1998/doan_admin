import React from 'react';
import './App.css';
import routes from './routes';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Switch>
        {routes.length > 0
          ? routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
                />
              );
            })
          : null}
      </Switch>
    </>
  );
}

export default App;
