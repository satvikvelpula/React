import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import { useState } from 'react';
import { useMedia } from '../hooks/apiHooks';


  const Home = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const { mediaArray } = useMedia();
  
    return (
      <>
        <h2>My Media</h2>
  
        {selectedItem && (
          <SingleView
            item={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        )}
  
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Owner</th>
              <th>Description</th>
              <th>Created</th>
              <th>Size</th>
              <th>Type</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {mediaArray.map((item) => (
              <MediaRow
                key={item.media_id}
                item={item}
                setSelectedItem={setSelectedItem}
              />
            ))}
          </tbody>
        </table>
        </div>
      </>
      
    );
  };
  
  export default Home;