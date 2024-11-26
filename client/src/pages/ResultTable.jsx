import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { TrashIcon } from '@heroicons/react/24/outline';
import * as Dialog from '@radix-ui/react-dialog';

const ResultTable = (props) => {
    const { user } = useAuth();
    const [submittedData, setSubmittedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedInputId, setSelectedInputId] = useState(null);

    const fetchHealthResults = async () => {
        const userId = props.userData ? props.userData.id : user?.id;
        console.log("User ID:", userId);
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

    const token = localStorage.getItem('access_token');
    const handleDelete = async () => {
        if (selectedInputId) {
            try {
                await axios.delete(`http://127.0.0.1:5000/result/${selectedInputId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSubmittedData((prevData) => prevData.filter((item) => item.input_id !== selectedInputId));
                setOpen(false); // Close dialog after successful delete
            } catch (error) {
                setError(error.response?.data?.error || error.message || "Terjadi kesalahan saat menghapus data.");
                console.error("Terjadi kesalahan saat menghapus data:", error);
            }
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
                        {
                            user?.role === "user" && (
                                <th className="py-3 px-6 text-left">Action</th>
                            )
                        }
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
                                {
                                    user?.role === "user" && (
                                        <td className="py-4 px-6">
                                            <button onClick={() => { setSelectedInputId(result.input_id); setOpen(true); }}>
                                                <TrashIcon className="h-6 w-6 text-red-500" />
                                            </button>
                                        </td>
                                    )
                                }
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Dialog for Deleting */}
            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                <Dialog.Content className="fixed inset-1/4 bg-white p-6 rounded-lg shadow-lg h-fit">
                    <Dialog.Title className="text-xl font-bold text-gray-800">Delete Record</Dialog.Title>
                    <Dialog.Description className="text-gray-600">
                        Are you sure you want to delete this entry? This action cannot be undone.
                    </Dialog.Description>
                    <div className="mt-4 flex justify-end space-x-4">
                        <button
                            onClick={() => setOpen(false)}
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                        >
                            Confirm
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Root>
        </div>
    );
};

export default ResultTable;
