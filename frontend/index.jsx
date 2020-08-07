import React from 'react';
import { render } from 'react-dom';
import App from './App';
import * as serviceWorker from './utils/serviceWorker';
import { Auth0Provider } from './utils/react-auth0-spa';
import config from './utils/authConfig.json';
import history from './utils/history';
import 'cirrus-ui/dist/cirrus.css';
import './index.css';

const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
    audience={config.audience}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
