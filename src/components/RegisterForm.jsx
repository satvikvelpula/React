import useForm from '../hooks/formHooks';
import { useAuthentication } from '../hooks/apiHooks';
import { useState } from 'react';

const RegisterForm = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { postUser } = useAuthentication();

  const initValues = {
    username: '',
    email: '',
    password: '',
  };

  const doRegister = async () => {
    try {
      const result = await postUser(inputs);

      setSuccess('User registered successfully!');
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Registration failed');
      setSuccess(null);
    }
  };

  const { inputs, handleInputChange, handleSubmit } =
    useForm(doRegister, initValues);

  return (
    <div className="auth-container">
      <h1>Register</h1>

      {/* feedback messages */}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reguser">Username</label>
          <input
            name="username"
            id="reguser"
            type="text"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>

        <div>
          <label htmlFor="regemail">Email</label>
          <input
            name="email"
            id="regemail"
            type="email"
            onChange={handleInputChange}
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="regpassword">Password</label>
          <input
            name="password"
            id="regpassword"
            type="password"
            onChange={handleInputChange}
            autoComplete="new-password"
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
