import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useAuth0 } from '../../utils/react-auth0-spa';
import axiosConfig from '../../utils/axiosConfig';

export default function UploadImage() {
  const [files, setFiles] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [image, setImage] = useState(null);
  const { getTokenSilently } = useAuth0();

  const onDrop = useCallback(acceptedFiles => {
    // acceptedFiles.forEach(file => {
    //   !files.includes(file) && setFiles(files => [...files, file]);
    // });
    setFiles(acceptedFiles);
  }, []); // eslint-disable-line
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async() => {
    const data = new FormData();
    data.append(
      'image',
      files[0],
      files[0].name
    );
    const token = await getTokenSilently();
    const instance = axios.create(axiosConfig(token, 'POST'));
    await instance({
      method: 'post',
      url: '/svgs',
      data: data
    })
      .then(response => {
        console.log(response.data);
        console.log(response.status);
        setUploaded(true);
      })
      .catch(error => {
        console.log(error);
        setUploaded(false);
      });
  };

  const resetUpload = () => {
    setUploaded(false);
    setFiles([]);
  };

  const fileData = () => {
    const data = new FileReader();
    data.onload = e => setImage(e.target.result);
    data.readAsDataURL(files[0]);
    return (
      <div className='col-8 h-100 u-flex u-flex-column'>
        <div className='row'>
          <h6>File Info</h6>
        </div>
        <div className='row'>
          <div className='col-6'>
            <p>File Name: {files[0].name}</p>
            <p>File Type: {files[0].type}</p>
          </div>
          <div className='col-6'>
            <img src={image} width='100%'/>
          </div>
        </div>
      </div>
    );
  };

  return (
      <div className='content'>
        <div className='section'>
          <h5>Upload Image</h5>
          <p>You can upload an image by clicking the prompt below, or draggin a file onto it.</p>
        </div>
        <div className='section row'>
          <div className='col-4 h-100 u-flex u-flex-column'>
            <h6>Types accepted</h6>
            <ul>
              <li>png</li>
              <li>jpg/jpeg</li>
              <li>gif</li>
              <li>bmp</li>
              <li>svg</li>
            </ul>
          </div>
          {(Array.isArray(files) && files.length > 0) && fileData()}
        </div>
      {uploaded
        ? (
          <div className='section'>
            <div className='btn-group'>
              <button className='btn-dark' onClick={() => resetUpload}>Upload Another</button>
              <button className='btn-dark'>Done Uploading</button>
            </div>
          </div>
        )
        : (
          <div className='section'>
            <div className='dropzone' {...getRootProps()}>
              <input className='col-9' {...getInputProps()} />
              {
                isDragActive
                  ? <p>Drop the file here...</p>
                  : <p>Drag n&apos; Drop a file here, or click here to select file</p>
              }
            </div>
            <div className='btn-group'>
              <button className='btn btn-primary animated' onClick={() => handleUpload}>Upload</button>
              <button className='btn btn-dark animated' onClick={() => resetUpload}>Reset File</button>
            </div>
          </div>
        )
      }
    </div>
  );
}
