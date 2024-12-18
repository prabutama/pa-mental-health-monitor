import React, { useState } from 'react'
import { Input } from '@/components/ui/Input'
import Logo from '@/assets/logo.svg'
import { Button } from '@/components/ui/button'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

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
        diastolic: ''
    });


    // Function to handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

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
      navigate('/result');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

    return (
        <>
            <body className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="max-w-screen-xl mx-auto p-6 flex-wrap">
                    {/* htmlForm Container */}
                    <div className="bg-white p-8 rounded-lg shadow-lg mx-4 my-8">
                        <img src={Logo} alt="Logo" width="150" />
                        <div className="bg-ace1af p-4 rounded-lg shadow-lg border-0 rounded-r-[40px] rounded-l-[40px] my-2 bg-primaryGreen">
                            <div className="mb-6 text-center">
                                <h1 className="text-4xl font-bold mb-2 text-[#006A4E]">Ikuti Tes Kesehatan Mental</h1>
                                <p className="text-gray-700 text-left">
                                    Pemeriksaan daring adalah salah satu cara tercepat dan termudah untuk menentukan apakah Anda
                                    mengalami gejala kondisi kesehatan mental.
                                </p>
                                <p className="text-gray-700 font-semibold text-left">
                                    Kondisi kesehatan mental, seperti depresi atau kecemasan, adalah nyata, umum, dan dapat diobati.
                                    Pemulihan pun dimungkinkan.
                                </p>
                            </div>
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

              {/* diastolic */}
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

                                    {/* Detak Jantung */}
                                    <div className="-mt-3">
                                        <label className="block text-sm text-black-600 mb-2" htmlFor="detak">Detak Jantung</label>
                                        <Input name='heart_rate' type="number" id="detak"
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Masukkan detak jantung"
                                            value={formData.heart_rate} onChange={handleChange} />
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
                  <option value="relaksasi">Relaksasi</option>
                  <option value="tiduran">Tiduran</option>
                  <option value="berkebun">Berkebun</option>
                  <option value="memasak">Memasak</option>
                  <option value="gym">Gym</option>
                  <option value="berolahraga">Olahraga</option>
                  <option value="berenang">Berenang</option>
                </select>
              </div>

                                    {/* Tekanan Darah */}
                                    <div className="-mt-4">
                                        <label className="block text-sm text-black-600 mb-2" htmlFor="tekanan">Tekanan Darah Systolic</label>
                                        <Input name='systolic' type="number" id="tekanan"
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Masukkan tekanan darah"
                                            value={formData.systolic} onChange={handleChange} />
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
                  <option value="biasa">Biasa</option>
                  <option value="marah">Marah</option>
                  <option value="cemas">Cemas</option>
                  <option value="sedih">Sedih</option>
                </select>
              </div>


            </div>

                            {/* Submit and Back Buttons */}
                            <div className="flex justify-center mt-6">
                                <div className="flex items-center">
                                    <button onClick={() => navigate('/')}
                                        className="inline-block h-10 w-10 border-2 border-green-500 text-green-500 text-center rounded-full leading-9 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 mr-[1030px] cursor-pointer">
                                        ←
                                    </button>
                                    <Button
                                        type="submit"
                                        className="text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-[#006A4E] hover:bg-opacity-90">
                                        Kirim
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </body>
        </>
    )
}
