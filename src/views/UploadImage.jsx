import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export default function UploadImage() {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      !files.includes(file) && setFiles(files => [...files, file]);
    });
  }, []); // eslint-disable-line
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = () => {
    const data = new FormData();
    data.append(
      'image',
      files[0],
      files[0].name
    );
    axios.post('https://api.ogamba.com/paint/image', data);
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

  return (
    <div>
      <div className='row ignore-screen level dropzone' {...getRootProps()}>
        <input className='col-9 ignore-screen level-item' {...getInputProps()} />
        {
          isDragActive
            ? <p>Drop the files here...</p>
            : <p>Drag n&apos; Drop some files here, or click here to select files</p>
        }
      </div>
      <div className='row ignore-screen level-item btn-container'>
        <button className='btn btn-primary animated' onClick={handleUpload}>Upload</button>
      </div>
      {fileData()}
    </div>
  );
}
