import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import Header from '../components/Header';
import './MessageListPage.css';

function MessageListPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get('/messages')
      .then((res) => {
        setMessages(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Mesajları çekerken hata:', err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />

      <div className="container mt-5">
        <h2 className="text-center mb-4">Yardım Mesajları</h2>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" />
            <p className="mt-2">Yükleniyor...</p>
          </div>
        ) : messages.length === 0 ? (
          <p className="text-center">Henüz mesaj yok.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {messages.map((msg) => (
              <div key={msg.id} className="col">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{msg.type}</h5>
                    <p className="card-text">
                      <strong>Konum:</strong> {msg.city}, {msg.district}
                      <br />
                      <strong>Adres:</strong> {msg.street} No: {msg.buildingNumber}
                      <br />
                      <strong>Açıklama:</strong> {msg.description}
                      <br />
                      <strong>Kişi Sayısı:</strong> {msg.personCount}
                      <br />
                      <strong>Durum:</strong>{' '}
                      {msg.fulfilled ? (
                        <span className="badge bg-success">Karşılandı</span>
                      ) : (
                        <span className="badge bg-warning text-dark">Bekleniyor</span>
                      )}
                    </p>
                  </div>
                  <div className="card-footer text-muted small">
                    Gönderen: {msg.senderName} | {new Date(msg.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MessageListPage;
