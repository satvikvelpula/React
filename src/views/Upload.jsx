import { useState } from 'react';
import { useFile } from '../hooks/apiHooks';
import { useMedia } from '../hooks/apiHooks';
import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/formHooks';

const Upload = () => {
  const { postFile } = useFile();
  const { postMedia } = useMedia();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);


  const initValues = {
    title: '',
    description: '',
  };

  const doUpload = async () => {
    try {
      setError(null); // reset previous errors
  
      const token = localStorage.getItem('token');
  
      const fileResult = await postFile(file, token);
  
      if (!fileResult?.data) {
        throw new Error('File upload failed');
      }
  
      const mediaResult = await postMedia(fileResult, inputs, token);
  
      if (!mediaResult) {
        throw new Error('Media creation failed');
      }
  
      console.log('Media created:', mediaResult);
  
      navigate('/');
    } catch (e) {
      console.log(e.message);
      setError(e.message || 'Upload failed');
    }
  };
  
  

  const { inputs, handleInputChange, handleSubmit } =
    useForm(doUpload, initValues);

  const handleFileChange = (evt) => {
    const selectedFile = evt.target.files[0];
    setFile(selectedFile);
  };

  return (
    <>
      <h1>Upload</h1>
  
      {/* ✅ ERROR MESSAGE GOES HERE */}
      {error && <p className="error">{error}</p>}
  
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            name="title"
            type="text"
            onChange={handleInputChange}
          />
        </div>
  
        <div>
          <label>Description</label>
          <textarea
            name="description"
            onChange={handleInputChange}
          />
        </div>
  
        <div>
          <label>File</label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
        </div>
  
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://placehold.co/200?text=Preview'
          }
          alt="preview"
          width="200"
        />
  
        <button
          type="submit"
          disabled={!file || inputs.title.length < 3}
        >
          Upload
        </button>
      </form>
    </>
  );
  
};

export default Upload;