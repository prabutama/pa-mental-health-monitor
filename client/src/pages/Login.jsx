import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2'; // Import SweetAlert2

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Ambil fungsi login dari AuthContext
  const navigate = useNavigate();

  // Fungsi untuk validasi email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const loginUser = async (event) => {
    event.preventDefault(); // Mencegah pengiriman form default

    // Validasi: pastikan email dan password tidak kosong
    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please enter both email and password',
      });
      return; // Hentikan eksekusi lebih lanjut jika salah satu field kosong
    }

    // Validasi: pastikan format email benar
    if (!validateEmail(email)) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
      });
      return; // Hentikan eksekusi jika email tidak valid
    }

    try {
      // Proses login via API
      const res = await axios.post(
        'http://127.0.0.1:5000/login',
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json', // Mengatur header Content-Type
          },
        }
      );

      // Ambil token dan user dari respons
      const { access_token, refresh_token, user } = res.data.data;

      // Simpan token dan user di localStorage
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('user', JSON.stringify(user));

      // Gunakan login dari AuthContext
      login(access_token, user); // Panggil fungsi login

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'You have successfully logged in!',
      }).then(() => {
        // Redirect after alert is dismissed
        navigate('/');
      });
    } catch (error) {
      // Tampilkan SweetAlert2 jika login gagal
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response?.data?.message || 'Incorrect email or password. Please try again.',
      });
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
      {/* Card Login */}
      <div className="relative bg-white rounded-[40px] shadow-lg p-8 mt-5 w-[577px] scale-[0.85] h-[680px] max-w-md z-10">
        <h2 className="text-3xl font-semibold text-center mt-2 mb-4">Log In</h2>
        <p className="text-center text-black-500 mb-12">Hi! Welcome back, you've been missed</p>
        <form className="space-y-6" onSubmit={loginUser}>
          <div className="relative mb-6">
            <input name="email" type="email" id="email" className="input-underline w-full mb-5" placeholder="Enter your username or email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="relative mb-70">
            <input name="password" type="password" id="password" className="input-underline w-full" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <a href="#" className="absolute right-0 top-full text-sm text-green-600 hover:text-green-500 mt-1">
              Forgot Password?
            </a>
          </div>
          <div className="flex items-center justify-between mb-4 mt-2">
            <div className="flex items-center mt-5">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
          </div>

          <div>
            <Button
              className="w-full mt-10 flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-customGreen hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              variant="primary"
              size="large"
              type="submit"
            >
              Login
            </Button>
          </div>
        </form>
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="mt-5 relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign in with</span>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4">
            <div>
              <button className="w-full inline-flex items-center justify-center py-1 px-3 border border-gray-300 rounded-md shadow-sm bg-white text-xs font-medium text-black-500 hover:bg-gray-50">
                <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" alt="Google" className="h-5 w-5 mr-2" />
                Sign in with Google
              </button>
            </div>
            <div>
              <button className="w-full inline-flex items-center justify-center py-1 px-3 border border-gray-300 rounded-md shadow-sm bg-white text-xs font-medium text-black-500 hover:bg-gray-50">
                <img src="https://www.vectorlogo.zone/logos/apple/apple-icon.svg" alt="Apple" className="h-5 w-5 mr-2" />
                Sign in with Apple
              </button>
            </div>
          </div>
        </div>
        <div className="mt-16 text-sm text-center">
          <a href="/register" className="font-medium text-black hover:text-green-500">
            Don't have an account? <span className="text-custom-blue">Sign Up</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
