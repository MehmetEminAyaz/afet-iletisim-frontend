import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axiosInstance from '../api/axiosInstance';
import 'leaflet/dist/leaflet.css';
import '../styles/MapPage.css';

const iconByType = {
  ARAMA: new L.Icon({ iconUrl: '/pins/search.png', iconSize: [40, 40] }),
  SAGLIK: new L.Icon({ iconUrl: '/pins/health.png', iconSize: [40, 40] }),
  MALZEME: new L.Icon({ iconUrl: '/pins/supply.png', iconSize: [40, 40] }),
  HAYATTAYIM: new L.Icon({ iconUrl: '/pins/alive.png', iconSize: [40, 40] }),
  DEFAULT: new L.Icon({ iconUrl: '/pins/default.png', iconSize: [40, 40] }),
};

function MapPage() {
  const [messages, setMessages] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    axiosInstance.get('/messages')
      .then(res => setMessages(res.data))
      .catch(err => console.error('Veri çekme hatası:', err));
  }, []);

  const filteredMessages = selectedType
    ? messages.filter(msg => msg.type === selectedType)
    : messages;

  return (
    <div className="map-page">
      <div className="map-sidebar">
        <h3>Mesaj Türü</h3>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="filter-select"
        >
          <option value="">Tümü</option>
          <option value="ARAMA">Arama</option>
          <option value="SAGLIK">Sağlık</option>
          <option value="MALZEME">Malzeme</option>
          <option value="HAYATTAYIM">Hayattayım</option>
        </select>

        <div className="message-list">
          {filteredMessages.map(msg => (
            <div className="message-card" key={msg.id}>
              <div className="msg-type">{msg.type}</div>
              <div className="msg-location">{msg.city}, {msg.district}</div>
              <div className="msg-date">{msg.timestamp?.split('T')[0]}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="map-content">
        <MapContainer center={[39.9208, 32.8541]} zoom={12} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {filteredMessages.map((msg) => (
            msg.latitude && msg.longitude && (
              <Marker
                key={msg.id}
                position={[msg.latitude, msg.longitude]}
                icon={iconByType[msg.type] || iconByType.DEFAULT}
              >
                <Popup>
                  <div className="popup-content">
                    <h4>{msg.type}</h4>
                    <p><strong>Tarih:</strong> {msg.timestamp?.split('T')[0]}</p>
                    <p><strong>Adres:</strong> {msg.street}, {msg.neighborhood}, {msg.district}, {msg.city}</p>
                    {msg.description && <p><strong>Açıklama:</strong> {msg.description}</p>}
                    {msg.personCount && <p><strong>Kişi Sayısı:</strong> {msg.personCount}</p>}
                    {msg.victimNames?.length > 0 && (
                      <p><strong>Mağdurlar:</strong> {msg.victimNames.join(', ')}</p>
                    )}
                    {msg.healthType && <p><strong>Sağlık Durumu:</strong> {msg.healthType}</p>}
                    {msg.aidQuantities && Object.entries(msg.aidQuantities).map(([key, val]) => (
                      <p key={key}><strong>{key}:</strong> {val}</p>
                    ))}
                    <p><strong>Gönderen:</strong> {msg.senderName} ({msg.senderEmail})</p>
                  </div>
                </Popup>
              </Marker>
            )
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapPage;
