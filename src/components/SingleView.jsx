import PropTypes from 'prop-types';

const SingleView = ({ item, setSelectedItem }) => {
  if (!item) return null;

  const isVideo = item.media_type.startsWith('video');

  return (
    <dialog open>
      <h2>{item.title}</h2>

      <p>{item.description || 'No description'}</p>

      {/* MEDIA CONTENT */}
      {isVideo ? (
        <video width="600" controls>
          <source src={item.filename} type={item.media_type} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src={item.filename}
          alt={item.title}
          style={{ maxWidth: '600px' }}
        />
      )}

      <br />

      <button onClick={() => setSelectedItem(null)}>
        Close
      </button>
    </dialog>
  );
};

SingleView.propTypes = {
  item: PropTypes.object,
  setSelectedItem: PropTypes.func.isRequired,
};

export default SingleView;
