import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const scrollToProduct = () => {
    const productSection = document.getElementById('product-section');
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <div className="logo-title" onClick={() => navigate('/')}>
          <img src="/logo.png" alt="AfetNet Logo" className="logo-image" />
          <span className="title-text">Afet Yardım</span>
        </div>
        <nav className="nav-links">
          <button className="nav-button" onClick={scrollToProduct}>Product</button>
          <button className="nav-button" onClick={() => navigate('/login')}>Log In</button>
          <button className="signup-button" onClick={() => navigate('/register')}>Sign Up Now</button>
        </nav>
      </header>

      <main>
        <section id="product-section">
          {/* Sayfanın product kısmı buraya gelecek */}
        </section>
      </main>
    </div>
  );
}

export default HomePage;
