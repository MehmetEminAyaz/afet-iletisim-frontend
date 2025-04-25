import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

function CreateMessagePage() {
  const [formData, setFormData] = useState({
    type: 'ARAMA',
    description: '',
    city: '',
    district: '',
    neighborhood: '',
    street: '',
    buildingNumber: '',
    personCount: 1,
    foodNeeded: false,
    waterNeeded: false,
    shelterNeeded: false,
    healthNeeded: false,
    healthType: '',
    victimNames: '',
    emergencyContactEmails: '',
    aidQuantities: '' // JSON format bekleniyor: {"food":2,"water":1}
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        victimNames: formData.victimNames.split(',').map(v => v.trim()),
        emergencyContactEmails: formData.emergencyContactEmails.split(',').map(e => e.trim()),
        aidQuantities: JSON.parse(formData.aidQuantities || '{}')
      };
      await axiosInstance.post('/messages', payload);
      alert('Mesaj başarıyla gönderildi.');
    } catch (error) {
      console.error('Gönderme hatası:', error);
      alert('Bir hata oluştu.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Yardım Mesajı Gönder</h2>
      <form onSubmit={handleSubmit}>
        <label>Yardım Türü:
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="ARAMA">ARAMA</option>
            <option value="SAĞLIK">SAĞLIK</option>
            <option value="MALZEME">MALZEME</option>
            <option value="HAYATTAYIM">HAYATTAYIM</option>
          </select>
        </label>
        <br />

        <label>Açıklama:
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <br />

        <label>Şehir: <input name="city" value={formData.city} onChange={handleChange} /></label><br />
        <label>İlçe: <input name="district" value={formData.district} onChange={handleChange} /></label><br />
        <label>Mahalle: <input name="neighborhood" value={formData.neighborhood} onChange={handleChange} /></label><br />
        <label>Sokak/Cadde: <input name="street" value={formData.street} onChange={handleChange} /></label><br />
        <label>Apartman No: <input name="buildingNumber" value={formData.buildingNumber} onChange={handleChange} /></label><br />
        <label>Kişi Sayısı: <input type="number" name="personCount" value={formData.personCount} onChange={handleChange} /></label><br />

        <label><input type="checkbox" name="foodNeeded" checked={formData.foodNeeded} onChange={handleChange} /> Yiyecek</label><br />
        <label><input type="checkbox" name="waterNeeded" checked={formData.waterNeeded} onChange={handleChange} /> Su</label><br />
        <label><input type="checkbox" name="shelterNeeded" checked={formData.shelterNeeded} onChange={handleChange} /> Barınma</label><br />
        <label><input type="checkbox" name="healthNeeded" checked={formData.healthNeeded} onChange={handleChange} /> Sağlık</label><br />

        {formData.healthNeeded && (
          <label>Sağlık Durumu:
            <input name="healthType" value={formData.healthType} onChange={handleChange} />
          </label>
        )}
        <br />

        <label>Mağdur İsimleri (virgül ile): <input name="victimNames" value={formData.victimNames} onChange={handleChange} /></label><br />
        <label>Acil Kişi E-mailleri (virgül ile): <input name="emergencyContactEmails" value={formData.emergencyContactEmails} onChange={handleChange} /></label><br />
        <label>Malzeme Miktarları (JSON): <input name="aidQuantities" value={formData.aidQuantities} onChange={handleChange} /></label><br />

        <button type="submit">Gönder</button>
      </form>
    </div>
  );
}

export default CreateMessagePage;
