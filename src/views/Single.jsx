import { useLocation, useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { mediaArray } from '../data/media';



const Single = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();


  // Try state first, fallback to array lookup
  const item = state?.item || mediaArray.find(
    (media) => media.media_id === Number(id)
  );

  if (!item) {
    return <p>Item not found</p>;
  }

  const isVideo = item.media_type.startsWith('video');

  return (
    <div className="single-container">
      <h2>{item.title}</h2>

      <p>Owner: {item.username}</p>

      <p>{item.description || 'No description'}</p>

      <div className="media-wrapper">
        {isVideo ? (
          <video controls>
            <source src={item.filename} type={item.media_type} />
          </video>
        ) : (
          <img src={item.filename} alt={item.title} />
        )}
      </div>

      <button onClick={() => navigate(-1)}>
        Go back
      </button>
    </div>
  );
};

export default Single;