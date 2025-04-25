import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      <Link to="/" className="navbar-brand d-flex align-items-center">
        <img
          src="/logo.png"
          alt="Afet Yardım Logo"
          width="30"
          className="me-2"
        />
        <span className="fw-bold text-dark">Afet Yardım</span>
      </Link>

      <div className="collapse navbar-collapse justify-content-between">
        {/* ORTA MENÜ: Harita / Mesajlar / İstatistik */}
        {token && (
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/map" className="nav-link">Harita</Link>
            </li>
            <li className="nav-item">
              <Link to="/messages" className="nav-link">Mesajlar</Link>
            </li>
            <li className="nav-item">
              <Link to="/stats" className="nav-link">İstatistik</Link>
            </li>
          </ul>
        )}

        {/* SAĞ TARAFTAKİ BUTONLAR */}
        <div className="d-flex gap-2">
          {!token ? (
            <>
              <Link to="/login" className="btn btn-outline-dark">Giriş Yap</Link>
              <Link to="/register" className="btn btn-primary">Kayıt Ol</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="btn btn-danger">Çıkış Yap</button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
