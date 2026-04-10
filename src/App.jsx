/*import { BrowserRouter, Routes, Route } from 'react-router'; */
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import { UserProvider } from './contexts/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Home from './views/Home';
import Profile from './views/Profile';
import Upload from './views/Upload';
import Single from './views/Single';
import Login from './views/Login';
import Logout from './views/Logout';


const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
            <Route path="/upload" element={<Upload />} />
            <Route path="/single/:id" element={<Single />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;