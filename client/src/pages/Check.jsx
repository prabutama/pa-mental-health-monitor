import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import Logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Check() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    skin_tension: '',
    sleep_time: '',
    body_temp: '',
    activity: '',
    heart_rate: '',
    mood: '',
    systolic: '',
    diastolic: '',
  });

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    const { skin_tension, sleep_time, body_temp, heart_rate, systolic, diastolic } = formData;
    if (!skin_tension || !sleep_time || !body_temp || !heart_rate || !systolic || !diastolic) {
      console.error('All fields must be filled');
      return;
    }

    // Get token from localStorage
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Token not found. Please login again.');
      return;
    }

    try {
      // Send request with form data
      const response = await axios.post(
        'http://127.0.0.1:5000/check',
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Response:', response.data);
      navigate('/result/health-table');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="bg-white p-6 lg:p-8 rounded-lg shadow-lg">
          <img src={Logo} alt="Logo" className="mx-auto w-24 md:w-32 mb-6" />

          <div className="bg-primaryGreen p-4 rounded-lg shadow-md mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-[#006A4E]">Ikuti Tes Kesehatan Mental</h1>
            <p className="text-gray-700 mt-2">
              Pemeriksaan daring adalah salah satu cara tercepat dan termudah untuk menentukan apakah Anda
              mengalami gejala kondisi kesehatan mental.
            </p>
            <p className="text-gray-700 font-semibold mt-1">
              Kondisi kesehatan mental, seperti depresi atau kecemasan, adalah nyata, umum, dan dapat diobati.
              Pemulihan pun dimungkinkan.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Skin Tension */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Ketegangan Kulit</label>
                <Input
                  name="skin_tension"
                  type="number"
                  placeholder="Masukkan ketegangan kulit"
                  value={formData.skin_tension}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              {/* Sleep Time */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Waktu Tidur</label>
                <Input
                  name="sleep_time"
                  type="number"
                  placeholder="Masukkan waktu tidur"
                  value={formData.sleep_time}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Body Temperature */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Suhu Tubuh</label>
                <Input
                  name="body_temp"
                  type="number"
                  placeholder="Masukkan suhu tubuh"
                  value={formData.body_temp}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Activity */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Apa yang telah kamu lakukan?</label>
                <select
                  name="activity"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.activity}
                  onChange={handleChange}
                >
                  <option value="">Pilih kegiatan kamu</option>
                  <option value="membaca buku">Membaca buku</option>
                  <option value="mendengarkan musik">Mendengarkan Musik</option>
                  <option value="tiduran">Tiduran</option>
                  <option value="santai">Berkerja</option>
                  <option value="berjalan">Berjalan</option>
                  <option value="berolahraga">Olahraga</option>
                  <option value="berenang">berenang</option>
                </select>
              </div>

              {/* Heart Rate */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Detak Jantung</label>
                <Input
                  name="heart_rate"
                  type="number"
                  placeholder="Masukkan detak jantung"
                  value={formData.heart_rate}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Mood */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Bagaimana perasaanmu hari ini?</label>
                <select
                  name="mood"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.mood}
                  onChange={handleChange}
                >
                  <option value="">Pilih perasaan kamu</option>
                  <option value="bahagia">Bahagia</option>
                  <option value="tenang">Tenang</option>
                  <option value="netral">Netral</option>
                  <option value="marah">Marah</option>
                  <option value="cemas">Cemas</option>
                  <option value="sedih">Sedih</option>
                </select>
              </div>

              {/* Blood Pressure */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Tekanan Darah Systolic</label>
                <Input
                  name="systolic"
                  type="number"
                  placeholder="Masukkan tekanan darah"
                  value={formData.systolic}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Tekanan Darah Diastolic</label>
                <Input
                  name="diastolic"
                  type="number"
                  placeholder="Masukkan tekanan darah"
                  value={formData.diastolic}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Submit and Back Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => navigate('/')}
                className="h-10 w-10 border-2 border-green-500 text-green-500 rounded-full hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 text-xl"
              >
                ←
              </button>
              <Button
                type="submit"
                className="text-white py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-[#006A4E] hover:bg-opacity-90"
              >
                Kirim
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
