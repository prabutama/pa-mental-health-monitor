import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import ResultTable from "./ResultTable";
import ResultChart from "./ResultChart";

function UserDetail() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:5000/admin/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })
            .then((response) => {
                setUser(response.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Gagal mengambil data pengguna");
                setLoading(false);
                console.error(err);
            });
    }, [id]);

    if (loading) {
        return <div className="text-center text-lg text-gray-600">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-lg text-red-500">{error}</div>;
    }

    if (!user) {
        return <div className="text-center text-lg text-gray-600">User data not found!</div>;
    }

    return (
        <>
            <Navbar />
            
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-32">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* User Info Section */}
                    <Card className="col-span-1 bg-white shadow-lg rounded-xl overflow-hidden">
                        <div className="flex items-center justify-center p-6 bg-gray-100">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center text-3xl font-bold">
                                {user.name[0]}
                            </div>
                        </div>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <div className="mt-4 space-y-2">
                                <div className="text-sm text-gray-600">
                                    <strong>Jenis Kelamin:</strong> {user.gender}
                                </div>
                                <div className="text-sm text-gray-600">
                                    <strong>Usia:</strong> {user.age}
                                </div>
                                <div className="text-sm text-gray-600">
                                    <strong>Riwayat Kesehatan:</strong> {user.mental_health_history_count || 0}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Visualization Section */}
                    <div className="col-span-2 space-y-8">
                        <Card className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <CardHeader className="p-6">
                                <CardTitle className="text-lg font-semibold text-gray-800">
                                    Grafik Kesehatan Mental
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <ResultChart userData={user} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <Card className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="p-6">
                        <CardTitle className="text-lg font-semibold text-gray-800">
                            Riwayat Kesehatan Mental
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <ResultTable userData={user} />
                    </CardContent>
                </Card>
            </main>
        </>
    );
}

export default UserDetail;
