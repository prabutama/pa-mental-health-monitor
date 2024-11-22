import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function MentalHealthResult() {
  const { user } = useAuth();
  const [mentalCondition, setMentalCondition] = useState("Loading...");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchMentalCondition = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/result/${user?.id}`);
        const results = response.data?.mental_health_results || [];
        const latestResult = results[results.length - 1]?.mental_condition || "No data";
        setMentalCondition(latestResult);
        updateSuggestions(latestResult);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMentalCondition("Error fetching data.");
      }
    };
    fetchMentalCondition();
  }, [user]);

  const updateSuggestions = (condition) => {
    const mapping = {
      normal: [
        "Jaga pola makan sehat.",
        "Tetap aktif dengan olahraga ringan.",
        "Cobalah teknik relaksasi seperti meditasi.",
      ],
      stress: [
        "Luangkan waktu untuk me-time.",
        "Kurangi beban kerja jika memungkinkan.",
        "Cobalah konseling atau berbicara dengan teman.",
      ],
      cemas: [
        "Batasi asupan kafein.",
        "Latih pernapasan dalam untuk relaksasi.",
        "Jaga pola tidur yang teratur.",
      ],
    };
    setSuggestions(mapping[condition.toLowerCase()] || ["Tidak ada saran khusus."]);
  };

  const renderStatusIcon = () => {
    if (mentalCondition.toLowerCase().includes("normal")) {
      return <span className="text-green-500 text-5xl">😊</span>;
    }
    if (mentalCondition.toLowerCase().includes("stress")) {
      return <span className="text-yellow-500 text-5xl">😟</span>;
    }
    if (mentalCondition.toLowerCase().includes("cemas")) {
      return <span className="text-red-500 text-5xl">😰</span>;
    }
    return <span className="text-gray-500 text-5xl">❓</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-teal-200 flex flex-col items-center justify-center py-10">
      {/* Main Section */}
      <main className="flex-1 w-full max-w-4xl mt-20 p-6">
        <div className="bg-white shadow-xl rounded-lg p-8 text-center space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800">Hasil Analisis</h2>
          <div className="flex flex-col items-center">
            {/* Status Icon */}
            <div className="p-6 bg-gray-100 rounded-full shadow-md">{renderStatusIcon()}</div>
            <p className="text-xl font-medium text-gray-700 mt-4">
              {mentalCondition}
            </p>
          </div>

          {/* Suggestions */}
          <div className="bg-gray-50 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-teal-700">Saran untuk Anda:</h3>
            <ul className="mt-4 space-y-2">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="text-gray-600 flex items-start space-x-2"
                >
                  <span className="text-teal-600 font-bold">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
