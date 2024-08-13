import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import login from '../api/auth';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const attemptLogin = async () => {
      const params = new URLSearchParams(location.search);
      const username = params.get('username');
      const password = params.get('password');

      if (username && password) {
        await login(username, password);
      }

      navigate('/home');
    };

    attemptLogin();
  }, [location.search, navigate]);

  return <></>;
};

export default Auth;
