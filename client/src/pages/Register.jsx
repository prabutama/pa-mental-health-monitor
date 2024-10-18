import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    age: '',
    role: 'user',
  });
  const [agreed, setAgreed] = useState(false); // Untuk menyimpan status checkbox "I agree"
  const navigate = useNavigate();

  const registerUser = async (event) => {
    event.preventDefault(); // Mencegah pengiriman form default

    // Validasi jika ada field yang kosong
    if (!formData.name || !formData.email || !formData.password || !formData.gender || !formData.age) {
      Swal.fire({
        icon: 'error',
        title: 'Incomplete Form',
        text: 'Please fill in all the fields',
      });
      return; // Hentikan eksekusi jika ada field yang kosong
    }

    // Validasi password harus minimal 8 karakter
    if (formData.password.length < 8) {
      Swal.fire({
        icon: 'warning',
        title: 'Password Too Short',
        text: 'Password must be at least 8 characters long',
      });
      return; // Hentikan eksekusi jika password kurang dari 8 karakter
    }

    // Validasi jika checkbox "I agree" belum dicentang
    if (!agreed) {
      Swal.fire({
        icon: 'warning',
        title: 'Terms Not Accepted',
        text: 'You must agree to the terms & policy',
      });
      return; // Hentikan eksekusi jika checkbox belum dicentang
    }

    try {
      const res = await axios.post('http://127.0.0.1:5000/register', formData, {
        headers: {
          'Content-Type': 'application/json', // Mengatur header Content-Type
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have registered successfully!',
      });
      navigate('/'); // Menggunakan useNavigate untuk navigasi
    } catch (error) {
      // Tampilkan SweetAlert2 jika email sudah digunakan
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: 'error',
          title: 'Email Already Registered',
          text: 'This email is already in use. Please try another one.',
        });
      } else {
        console.error('register failed: ', error.response ? error.response.data : error.message);
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Email Sudah Digunakan!.',
        });
      }
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center">
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-[#ACE1AF]"></div>
        <div className="w-1/2 bg-white"></div>
      </div>
      {/* IMAGE */}
      <img src="https://res.cloudinary.com/dizrlkdhe/image/upload/v1726550999/ahgj1i5ewnq3kl3qtoju.png" alt="Logo" className="absolute top-[76px] left-[96px] h-10" />
      <img src="https://res.cloudinary.com/dizrlkdhe/image/upload/v1726552642/e1cmdel32akcxjmun49a.png" alt="Icon 1" style={{ position: 'absolute', top: '140px', left: '60px', width: '450px', height: '350px' }} />
      <img src="https://res.cloudinary.com/dizrlkdhe/image/upload/v1726552642/dpwkmdrbfkuupuadbejy.png" alt="Icon 2" style={{ position: 'absolute', bottom: '40px', right: '60px', width: '350px', height: '250px' }} />
      {/* Card Register */}
      <div className="relative bg-white rounded-[40px] scale-[0.85] shadow-lg p-8 w-full max-w-md z-10">
        <h2 className="text-3xl font-semibold text-center mb-4">Get Started Now</h2>
        <form onSubmit={registerUser} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-customGreen rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-customGreen rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                name="usia"
                type="number"
                id="age"
                className="mt-1 block w-full px-3 py-2 border border-customGreen rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="kelamin"
                id="option"
                className="mt-1 block w-full px-3 py-2 border border-customGreen rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                required
              >
                <option value="" disabled selected hidden>
                  Enter your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-customGreen rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="terms" className="h-4 w-4 text-green-600 focus:ring-green-500 border-customGreen rounded" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} required />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the terms & policy
            </label>
          </div>
          <div>
            <Button
              className="w-full mt-10 flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-customGreen hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              variant="primary"
              size="large"
              type="submit"
            >
              Register
            </Button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <a href="/login" className="font-medium text-black hover:text-green-500">
            have an account? <span className="text-custom-blue">Sign In</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
