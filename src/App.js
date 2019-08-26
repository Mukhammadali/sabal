import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from './views/routes';
import store from './redux/store';
import Header from './components/Header';
import NotFound from './components/NotFound';


function App() {
  const getRoutes = () => {
    return routes.map((route) => (
      <Route exact={route.exact || false} key={route.path} path={route.path} component={route.component} />
    ));
  };
  return (
    <Provider store={store}>
      <Router>
        <div className="container fluid">
          <Header />
          <Switch>
            {getRoutes()}
            <Route component={NotFound}/>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
