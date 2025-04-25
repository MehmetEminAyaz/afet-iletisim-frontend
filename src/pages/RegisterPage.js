import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './RegisterPage.css';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER'); // USER veya ADMIN
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/register', {
        name,
        email,
        password,
        role
      });
      navigate('/login');
    } catch (err) {
      setError('Kayıt sırasında bir hata oluştu.');
    }
  };

  return (
    <>
      <Header />
      <div className="register-container d-flex justify-content-center align-items-center">
        <div className="register-card p-4 shadow rounded-4">
          <h2 className="text-center fw-bold mb-4">Yeni Hesap Oluştur</h2>

          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label">Ad Soyad</label>
              <input
                type="text"
                className="form-control"
                placeholder="Adınız Soyadınız"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">E-posta</label>
              <input
                type="email"
                className="form-control"
                placeholder="ornek@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Şifre</label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Rol</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="USER">Kullanıcı</option>
                <option value="ADMIN">Yönetici</option>
              </select>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button type="submit" className="btn btn-primary w-100 mt-2">
              Kayıt Ol
            </button>
          </form>

          <div className="text-center mt-3">
            <small>Zaten hesabınız var mı? <a href="/login" className="text-decoration-none">Giriş Yap</a></small>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
