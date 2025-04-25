import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import Header from '../components/Header';

function StatisticsPage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get('/stats');
        setStats(res.data);
      } catch (err) {
        console.error('İstatistikler alınamadı:', err);
        setError('İstatistikler alınamadı.');
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <Header />

      <div className="container mt-5">
        <h2 className="mb-4">Sistem İstatistikleri</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        {!stats ? (
          <div className="text-center">Yükleniyor...</div>
        ) : (
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card text-white bg-primary h-100">
                <div className="card-body">
                  <h5 className="card-title">Toplam Mesaj</h5>
                  <p className="card-text display-6">{stats.totalMessages}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card text-white bg-success h-100">
                <div className="card-body">
                  <h5 className="card-title">Karşılanan Mesaj</h5>
                  <p className="card-text display-6">{stats.fulfilledMessages}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card text-white bg-danger h-100">
                <div className="card-body">
                  <h5 className="card-title">Karşılanmayan Mesaj</h5>
                  <p className="card-text display-6">{stats.unfulfilledMessages}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card text-white bg-dark h-100">
                <div className="card-body">
                  <h5 className="card-title">Toplam Kullanıcı</h5>
                  <p className="card-text display-6">{stats.totalUsers}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {stats?.messageTypeDistribution && (
          <div className="mt-5">
            <h4>Mesaj Tipi Dağılımı</h4>
            <ul className="list-group">
              {Object.entries(stats.messageTypeDistribution).map(([type, count]) => (
                <li key={type} className="list-group-item d-flex justify-content-between align-items-center">
                  {type}
                  <span className="badge bg-primary rounded-pill">{count}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default StatisticsPage;
