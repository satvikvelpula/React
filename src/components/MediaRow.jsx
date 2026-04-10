import PropTypes from 'prop-types';
import { Link } from 'react-router';


const MediaRow = ({ item }) => {
    return (
      <tr>
        <td>
          <img src={item.thumbnail} alt={item.title} />
        </td>
        <td>{item.title}</td>
        <td>{item.username}</td>
        <td>{item.description}</td>
        <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
        <td>{item.filesize}</td>
        <td>{item.media_type}</td>
        <td>
        <Link to={`/single/${item.media_id}`} state={{ item }} className="view-link">Show</Link>
        </td>
      </tr>
    );
  };  

  
MediaRow.propTypes = {
  item: PropTypes.shape({
    media_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    thumbnail: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    filesize: PropTypes.number.isRequired,
    media_type: PropTypes.string.isRequired,
  }).isRequired,
};

export default MediaRow;
