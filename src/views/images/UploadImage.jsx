import React, { useCallback, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useAuth0 } from '../../utils/react-auth0-spa';

export default function UploadImage() {
  const [files, setFiles] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const { getTokenSilently } = useAuth0();

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      !files.includes(file) && setFiles(files => [...files, file]);
    });
  }, []); // eslint-disable-line
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async() => {
    const data = new FormData();
    data.append(
      'image',
      files[0],
      files[0].name
    );
    try {
      const token = await getTokenSilently();
      const instance = axios.create({
        baseURL: 'https://api.ogamba.com/paint/private',
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': 'https://api.ogamba.com'
        }
      });
      const response = await instance.post('/upload/single', data);
      console.log(response.data);
      setUploaded(true);
    } catch (error) {
      console.error(error);
      setUploaded(false);
    }
  };

  const resetUpload = () => {
    setUploaded(false);
    setFiles([]);
  };

  const fileData = () => {
    if (files[0]) {
      return (
        <div>
          <h6>File Info</h6>
          <p>File Name: {files[0].name}</p>
          <p>File Path: {files[0].path}</p>
          <p>File Type: {files[0].type}</p>
        </div>
      );
    }
  };

  // const RenderUploadPrompt = () => {
  //   return (
  //     <div className='content'>
  //       <div className='dropzone' {...getRootProps()}>
  //         <input className='col-9' {...getInputProps()} />
  //         {
  //           isDragActive
  //             ? <p>Drop the file here...</p>
  //             : <p>Drag n&apos; Drop a file here, or click here to select file</p>
  //         }
  //       </div>
  //       <div className='btn-group'>
  //         <button className='btn btn-primary animated' onClick={handleUpload}>Upload</button>
  //         <button className='btn btn-dark animated' onClick={resetUpload}>Reset File</button>
  //       </div>
  //       {fileData()}
  //     </div>
  //   );
  // };

  // const CompleteUploadPrompt = () => {
  //   return (
  //     <div className='content'>
  //       <div className='btn-group'>
  //         <button className='btn-dark' onClick={resetUpload}>Upload Another</button>
  //         <button className='btn-dark'>Done Uploading</button>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div>
      <div className='content'>
        <h5>Upload Image</h5>
        <p>You can upload an image by clicking the prompt below, or draggin a file onto it.</p>
        <p>The app accepts the following file types</p>
        <ul>
          <li>png</li>
          <li>jpg/jpeg</li>
          <li>gif</li>
          <li>bmp</li>
          <li>svg</li>
        </ul>
      </div>
      {uploaded && (
        <div className='content'>
          <div className='btn-group'>
            <button className='btn-dark' onClick={resetUpload}>Upload Another</button>
            <button className='btn-dark' onClick={() => <Redirect to='/admin/images' />}>Done Uploading</button>
          </div>
        </div>
      )}
      {!uploaded && (
        <div className='content'>
          <div className='dropzone' {...getRootProps()}>
            <input className='col-9' {...getInputProps()} />
            {
              isDragActive
                ? <p>Drop the file here...</p>
                : <p>Drag n&apos; Drop a file here, or click here to select file</p>
            }
          </div>
          <div className='btn-group'>
            <button className='btn btn-primary animated' onClick={handleUpload}>Upload</button>
            <button className='btn btn-dark animated' onClick={resetUpload}>Reset File</button>
          </div>
          {fileData()}
        </div>
      )}
    </div>
  );
}
