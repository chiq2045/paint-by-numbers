import React, { useState } from 'react';

export default function UploadForm() {
  const [inputFile, setInputFile] = useState(null);
  const [outputFileName, setOutputFileName] = useState(null);

  return (
    <form>
      <label>output</label>
      <input type='text' name='output' placeholder='output.svg' />
      <label>input file</label>
      <input type='file' name='input' />
      <input type='submit' />
    </form>
  );
}
