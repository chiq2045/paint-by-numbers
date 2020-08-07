import React, { useState } from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom';
import Images from '../../views/Images';
import UploadImage from '../../views/images/UploadImage';
import EditImage from '../../views/images/EditImage';
import DeleteAll from '../../views/images/DeleteAll';
// import DeleteImage from '../../views/images/DeleteImage';

export default function ImageRoutes() {
  const { path } = useRouteMatch();
  const [imageId, setImageId] = useState(null);

  return (
    <div>
      <Switch>
        <Route exact path={`${path}`}>
          <Images setImageId={setImageId} />
        </Route>
        <Route exact path={`${path}/delete`}>
          <DeleteAll path={path} />
        </Route>
        <Route path={`${path}/create`}>
          <UploadImage />
        </Route>
        <Route path={`${path}/edit/:id`}>
          <EditImage imageId={imageId} />
        </Route>
        {/* <Route path={`${path}/delete/:id`}> */}
        {/*   <DeleteImage imageId={imageId} /> */}
        {/* </Route> */}
      </Switch>
    </div>
  );
}
