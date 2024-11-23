import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userData = localStorage.getItem("user");
                const token = localStorage.getItem("access_token");

                if (!userData || !token) {
                    console.error("Data pengguna atau token tidak ditemukan.");
                    setLoading(false);
                    return;
                }

                const user = JSON.parse(userData);
                console.log("User role:", user.role);

                if (user.role !== "admin") {
                    console.error("Akses tidak diizinkan: Anda bukan admin.");
                    setLoading(false);
                    return;
                }

                // Kirim permintaan ke backend
                const response = await axios.get("http://127.0.0.1:5000/admin/users", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Pastikan data respons memiliki struktur yang benar
                setUsers(response.data.data || []); // Mengambil data dari 'data' jika struktur seperti contoh di atas
            } catch (error) {
                // Menangani error dengan lebih baik
                if (error.response && error.response.status === 400) {
                    console.error("Akses tidak diizinkan: Anda bukan admin.");
                } else {
                    console.error("Error fetching users:", error.response?.data || error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-500 h-12 w-12 mb-4"></div>
                    <p className="text-lg font-semibold text-gray-700">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 pt-32">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                        Daftar Pengguna
                    </h2>
                    {/* Jumlah Data Pengguna */}
                    <p className="mb-4 text-lg text-gray-600">
                        Jumlah Pengguna: {users.length}
                    </p>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse bg-white rounded-lg shadow">
                            <thead className="bg-blue-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">
                                        Nama
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">
                                        Email
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 border-b">
                                        Jumlah Hasil Kesehatan Mental
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 border-b">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user, index) => (
                                        <tr
                                            key={user.id}
                                            className={`transition duration-200 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                                } hover:bg-blue-50`}
                                        >
                                            <td className="px-6 py-4 text-sm text-gray-800 border-b">
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 border-b">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 text-center text-sm text-gray-800 border-b">
                                                {user.mental_health_history_count || 0} {/* Menampilkan jumlah hasil kesehatan */}
                                            </td>
                                            <td className="px-6 py-4 text-sm flex justify-center items-center space-x-2 border-b">
                                                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 shadow">
                                                    Lihat Detail
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-4">Tidak ada data pengguna</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
