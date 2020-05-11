import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function EditImage() {
  const [image, setImage] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { getTokenSilently } = useAuth0();

  const fetchImage = async() => {
    try {
      const token = await getTokenSilently();
      const instance = axios.create({
        baseURL: 'https:// api.ogamba.com/paint/private',
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': 'https://api.ogamba.com'
        }
      });
      const result = await instance(`/svgs/${id}`);
      console.log(result);
      setImage(result.data);
      setLoaded(true);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchImage();
    if (error) console.error(error);
    // eslint-disable-next-line
  }, []);

  return (
    <div className='content'>
      {loaded && <h6>{image.name}</h6>}
    </div>
  );
}
