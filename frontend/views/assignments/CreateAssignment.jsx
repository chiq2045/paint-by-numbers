import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosConfig from '../../utils/axiosConfig';
import { useAuth0 } from '../../utils/react-auth0-spa';
import RenderSvg from '../../components/images/RenderSvg';

export default function CreateAssignment(props) {
  const { images, loaded, assignments } = props;
  const [assignmentName, setAssignmentName] = useState('');
  const [svgIds, setSvgIds] = useState([]);
  // const [svg, setSvg] = useState([]);
  const [imageCheck, setImageCheck] = useState([]);
  const { getTokenSilently } = useAuth0();

  const handleChangeName = e => {
    setAssignmentName(e.target.value);
  };

  useEffect(() => {
    loaded && images.forEach(image => {
      setImageCheck(imageCheck => [...imageCheck, { id: image.id, checked: false }]);
    })
  }, [loaded]);

  const handleCreateAssignment = async() => {
    const token = await getTokenSilently();
    const instance = axios.create(axiosConfig(token, 'POST'));
    const data = {
      name: assignmentName,
      svgIds: svgIds
    };
    await instance({
      method: 'post',
      url:'/assignments',
      data: data,
      responseType: 'json'
    })
      .then(response => {
        console.log(response.data);
        console.log(response.status);
      })
      .catch(error => console.log(error));
  }

  const addToAssignment = (id) => {
    setSvgIds([...svgIds, id]);
  }

  const RenderOptions = () => {
    const options = [];
    images.forEach(svg => {
      options.push(
        <div className='col-3' key={svg.id}>
          <div className='card u-flex u-flex-column h-100'>
            <div className='card-container'>
              <RenderSvg svg={svg} />
              <div className='title-container'>
                <p className='title' style={{color: 'black'}}>{svg.name}</p>
              </div>
            </div>
            <div className='action-bar u-center'>
              <button className='btn-clear' onClick={() => addToAssignment(svg.id)}>Add to Assignment</button>
            </div>
          </div>
        </div>,
      );
    });
    return (
      <div className='row'>
        {options}
      </div>
    );
  };


  return (
    <div className='content'>
      <div className='section'>
        <label className='font-formal'>Enter Name of Assignment</label>
        <input type='text' onBlur={handleChangeName}/>
      </div>
      <div className='section'>
        <h6>Add images to assignment</h6>
        <p>Click the button under the images that you want to add to the assignment</p>
        <p>Once you are happy with them, click the Create Assignment button</p>
      </div>
      <div className='section'>
        <button className='btn-dark' onClick={() => handleCreateAssignment()}>Create Assignment</button>
      </div>
      <div className='section'>
        {loaded ? <RenderOptions /> : <div className='loader'>Loading...</div>}
      </div>
    </div>
  );
}
