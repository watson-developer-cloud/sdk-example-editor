import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';

import { loadFiles } from '../redux/ducks';

import './InputContainer.scss';

const readFileContent = (file) => {
  const fileReader = new FileReader();
  return new Promise((resolve, reject) => {
    fileReader.onload = (event) => resolve(event.target.result);
    fileReader.onerror = (error) => reject(error);
    fileReader.readAsText(file);
  });
};

export default function InputContainer() {
  const dispatch = useDispatch();

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const files = [];
      for (const file of acceptedFiles) {
        try {
          const content = await readFileContent(file);
          files.push({ name: file.name, content });
        } catch (error) {
          console.error(error);
        }
      }
      dispatch(loadFiles(files));
    },
    [dispatch]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <section className="file-input">
      <div className="file-input__dropbox" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the SDK examples here ...</p>
        ) : (
          <p>Drag 'n' drop some SDK examples here, or click to select files</p>
        )}
      </div>
    </section>
  );
}
