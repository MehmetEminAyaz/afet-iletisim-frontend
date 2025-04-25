import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      navigate('/messages');
    } catch (err) {
      setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    }
  };

  return (
    <>
      <Header />

      <div className="login-container d-flex justify-content-center align-items-center">
        <div className="login-card p-4 shadow rounded-4">
          <h2 className="text-center fw-bold mb-4">Hesabınıza Giriş Yapın</h2>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">E-posta adresi</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="ornek@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">Şifre</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="alert alert-danger mt-2">{error}</div>}

            <button type="submit" className="btn btn-primary w-100 mt-3">Giriş Yap</button>
          </form>

          <div className="text-center mt-3">
            <small>Hesabınız yok mu? <a href="/register" className="text-decoration-none">Kayıt Ol</a></small>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
