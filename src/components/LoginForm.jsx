import useForm from '../hooks/formHooks';
import { useAuthentication } from '../hooks/apiHooks';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useUserContext } from '../hooks/contextHooks';


const LoginForm = () => {
  const { handleLogin } = useUserContext();
  const [error, setError] = useState(null);

  const initValues = {
    username: '',
    password: '',
  };

  const { postLogin } = useAuthentication();
  const navigate = useNavigate();


  const doLogin = async () => {
    try {
      await handleLogin(inputs);
    } catch (e) {
      console.log(e.message);
    }
  };

  const { inputs, handleInputChange, handleSubmit } =
    useForm(doLogin, initValues);

  return (
    <div className="auth-container">
      <h1>Login</h1>

      {/* ✅ Error display belongs here */}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginuser">Username</label>
          <input
            name="username"
            type="text"
            id="loginuser"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>

        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
