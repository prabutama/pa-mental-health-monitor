import { Link, Outlet } from "react-router-dom";
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext'; // Import useAuth dari AuthContext

export default function ResultLayout() {
    const { user } = useAuth(); // Ambil user dari context

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            {/* Profile Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex items-center mb-8">
                <FaUserCircle className="text-gray-500 text-6xl mr-4" />
                <div>
                    <h2 className="text-2xl font-semibold">{user?.name || 'User Name'}</h2>
                    <p className="text-gray-600">Age: {user?.age || 'N/A'}</p>
                    <p className="text-gray-600">Email: {user?.email || 'N/A'}</p>
                    <p className="text-gray-600">Occupation: {user?.occupation || 'N/A'}</p>
                </div>
            </div>

            <div>
                <Link to="/result/health-table" className="text-blue-600 hover:underline">
                    Table
                </Link> ||
                <Link to="/result/health-charts" className="text-blue-600 hover:underline">
                    Charts
                </Link>
            </div>

            <p></p>

            <Outlet />

            {/* Recommendations Section */}
            <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Hasil Kesehatan</h3>
                <div className="border-l-4 border-blue-500 pl-4 mb-4">
                    <p className="text-gray-600">
                        Anda dinyatakan sedikit stres bulan ini. Direkomendasikan agar Anda menjaga asupan makanan, olahraga teratur, serta rutin meditasi dan yoga.
                    </p>
                </div>
                <h3 className="text-lg font-semibold mb-2">Saran Kesehatan</h3>
                <div className="border-l-4 border-green-500 pl-4">
                    <ul className="list-disc list-inside">
                        <li>Perbanyak konsumsi sayuran dan buah-buahan.</li>
                        <li>Lakukan olahraga minimal 30 menit setiap hari.</li>
                        <li>Rutin melakukan pemeriksaan kesehatan.</li>
                        <li>Manfaatkan teknik relaksasi untuk mengurangi stres.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
