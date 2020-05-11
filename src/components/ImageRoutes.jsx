import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom';
import Images from '../views/Images';
import UploadImage from '../views/images/UploadImage';
// import EditImage from '../views/images/EditImage';

export default function ImageRoutes() {
  const { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route
          exact
          path={`${path}/`}
          component={Images}
        />
        <Route path={`${path}/upload`} component={UploadImage} />
        {/* <Route path={`${path}/edit`} component={EditImage} /> */}
      </Switch>
    </div>
  );
}
