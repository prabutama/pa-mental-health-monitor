import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    age: '',
    role: 'user',
  });
  const [agreed, setAgreed] = useState(false); // Untuk status checkbox
  const [alert, setAlert] = useState({ show: false, type: '', title: '', description: '' }); // Untuk menampilkan pesan alert
  const navigate = useNavigate();

  const registerUser = async (event) => {
    event.preventDefault();

    // Validasi jika ada field yang kosong
    if (!formData.name || !formData.email || !formData.password || !formData.gender || !formData.age) {
      setAlert({
        show: true,
        type: 'error',
        title: 'Incomplete Form',
        description: 'Please fill in all the fields.',
      });
      return;
    }

    // Validasi password minimal 8 karakter
    if (formData.password.length < 8) {
      setAlert({
        show: true,
        type: 'error',
        title: 'Password Too Short',
        description: 'Password must be at least 8 characters long.',
      });
      return;
    }

    // Validasi checkbox "I agree"
    if (!agreed) {
      setAlert({
        show: true,
        type: 'error',
        title: 'Terms Not Accepted',
        description: 'You must agree to the terms & policy.',
      });
      return;
    }

    try {
      const res = await axios.post('http://127.0.0.1:5000/register', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setAlert({
        show: true,
        type: 'success',
        title: 'Registration Successful',
        description: 'You have registered successfully!',
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setAlert({
          show: true,
          type: 'error',
          title: 'Email Already Registered',
          description: 'This email is already in use. Please try another one.',
        });
      } else {
        setAlert({
          show: true,
          type: 'error',
          title: 'Registration Failed',
          description: 'An error occurred. Please try again later.',
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
      <img src="https://res.cloudinary.com/dizrlkdhe/image/upload/v1726550999/ahgj1i5ewnq3kl3qtoju.png" alt="Logo" className="absolute top-[76px] left-[96px] h-10" />
      <img src="https://res.cloudinary.com/dizrlkdhe/image/upload/v1726552642/e1cmdel32akcxjmun49a.png" alt="Icon 1" style={{ position: 'absolute', top: '140px', left: '60px', width: '450px', height: '350px' }} />
      <img src="https://res.cloudinary.com/dizrlkdhe/image/upload/v1726552642/dpwkmdrbfkuupuadbejy.png" alt="Icon 2" style={{ position: 'absolute', bottom: '40px', right: '60px', width: '350px', height: '250px' }} />

      {/* Card Register */}
      <div className="relative bg-white rounded-[40px] scale-[0.85] shadow-lg p-8 w-full max-w-md z-10">
        <h2 className="text-3xl font-semibold text-center mb-4">Get Started Now</h2>
        {/* Show Alert based on condition */}
        {alert.show && (
          <Alert type={alert.type} className={`mb-4 ${alert.type === 'error' ? 'bg-red-200' : 'bg-green-200'}`}>
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>{alert.description}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={registerUser} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                name="usia"
                id="age"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="kelamin"
                id="gender"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                required
              >
                <option value="" disabled hidden>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the terms & policy
            </label>
          </div>
          <div>
            <Button className="w-full mt-10 py-3 px-4 text-sm font-medium bg-customGreen text-white rounded-md shadow hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500" type="submit">
              Register
            </Button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <a href="/login" className="font-medium text-black hover:text-green-500">
            Already have an account? <span className="text-green-500">Sign In</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
