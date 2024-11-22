import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { TrashIcon } from '@heroicons/react/24/outline';

const ResultTable = () => {
    const { user } = useAuth(); // Ambil user dari context
    const [submittedData, setSubmittedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchHealthResults = async () => {
        const userId = user?.id;
        if (!userId) {
            setLoading(false);
            return;
        }
        try {
            const response = await axios.get(`http://127.0.0.1:5000/result/${userId}`);
            setSubmittedData(response.data.mental_health_results || []);
        } catch (error) {
            setError(error.response?.data?.error || error.message || "Terjadi kesalahan saat mengambil data.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (inputId) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/result/${inputId}`);
            setSubmittedData((prevData) => prevData.filter((item) => item.input_id !== inputId));
        } catch (error) {
            setError(error.response?.data?.error || error.message || "Terjadi kesalahan saat menghapus data.");
        }
    };


    useEffect(() => {
        fetchHealthResults();
    }, [user]); // Tambahkan user sebagai dependensi

    if (loading) return <p className="text-center text-lg">Loading...</p>;
    if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

    return (
        <div className="overflow-x-auto my-10 px-0">
            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Date</th>
                        <th className="py-3 px-6 text-left">Activities</th>
                        <th className="py-3 px-6 text-left">Activity Category</th>
                        <th className="py-3 px-6 text-left">Body Temperature</th>
                        <th className="py-3 px-6 text-left">Heart Rate</th>
                        <th className="py-3 px-6 text-left">Diastolic</th>
                        <th className="py-3 px-6 text-left">Systolic</th>
                        <th className="py-3 px-6 text-left">Mood</th>
                        <th className="py-3 px-6 text-left">Mental Condition</th>
                        <th className="py-3 px-6 text-left">Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {submittedData.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="py-4 px-6 text-center">No data available</td>
                        </tr>
                    ) : (
                        submittedData.map((result) => (
                            <tr key={result.input_id} className="border-b hover:bg-gray-100">
                                <td className="py-4 px-6">{new Date(result.created_at).toLocaleDateString()}</td>
                                <td className="py-4 px-6">{result.activities}</td>
                                <td className="py-4 px-6">{result.activity_category}</td>
                                <td className="py-4 px-6">{result.body_temperature} °C</td>
                                <td className="py-4 px-6">{result.heart_rate} bpm</td>
                                <td className="py-4 px-6">{result.diastolic} mmHg</td>
                                <td className="py-4 px-6">{result.systolic} mmHg</td>
                                <td className="py-4 px-6">{result.mood}</td>
                                <td className="py-4 px-6">{result.mental_condition}</td>
                                <td className="py-4 px-6">
                                    <button
                                        onClick={() => handleDelete(result.input_id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ResultTable;
