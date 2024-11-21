import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const ResultChart = () => {
    const { user } = useAuth(); // Get the authenticated user from the context
    const [submittedData, setSubmittedData] = useState([]);
    const [mentalConditions, setMentalConditions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch health results for the authenticated user
    const fetchHealthResults = async () => {
        const userId = user?.id;
        if (!userId) {
            setLoading(false);
            return;
        }
        try {
            const response = await axios.get(`http://127.0.0.1:5000/result/${userId}`);
            setSubmittedData(response.data.mental_health_results || []);
            setMentalConditions(response.data.mental_health_results.map(result => result.mental_condition));
        } catch (error) {
            setError(error.response?.data?.error || error.message || "An error occurred while fetching data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHealthResults();
    }, [user]); // Fetch data again when the user changes

    useEffect(() => {
        if (submittedData.length === 0) return;

        // Extract the data for charting
        const dates = submittedData.map(result => new Date(result.created_at).toLocaleDateString());
        const skinTensionData = submittedData.map(result => result.skin_tension || 0);
        const bodyTemperatureData = submittedData.map(result => result.body_temperature);
        const heartRateData = submittedData.map(result => result.heart_rate);
        const systolicData = submittedData.map(result => result.systolic);
        const diastolicData = submittedData.map(result => result.diastolic);
        const sleepData = submittedData.map(result => result.sleep_time || 0); // Assuming sleep_time is in hours

        // Ensure that mentalConditions is populated correctly
        const mentalConditionMapped = mentalConditions.map(condition => {
            if (condition === 'Normal') return 0;
            if (condition === 'Anxious') return 1;
            if (condition === 'Stress') return 2;
            return -1; // In case of unexpected values
        });

        const mentalConditionCounts = [0, 0, 0]; // [Normal, Anxious, Stress]
        mentalConditionMapped.forEach(condition => {
            if (condition >= 0 && condition <= 2) mentalConditionCounts[condition]++;
        });

        const mentalConditionData = [{
            name: 'Mental Condition',
            data: mentalConditionCounts,
        }];

        const commonOptions = {
            chart: {
                type: 'bar',
                height: 300,
                toolbar: { show: false },
            },
            xaxis: {
                categories: dates, // Use the extracted dates for X-axis categories
                title: { text: 'Date' },
                labels: { style: { fontSize: '10px' } },
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '50%',
                    endingShape: 'rounded',
                },
            },
            tooltip: {
                shared: true,
                intersect: false,
            },
        };

        // Chart options for Skin Tension
        const skinTensionOptions = {
            ...commonOptions,
            series: [{ name: 'Skin Tension', data: skinTensionData }],
            colors: ['#FF5733'],
            title: { text: 'Skin Tension Over Time' },
        };

        // Chart options for Body Temperature
        const bodyTemperatureOptions = {
            ...commonOptions,
            series: [{ name: 'Body Temperature (°C)', data: bodyTemperatureData }],
            colors: ['#1E90FF'],
            title: { text: 'Body Temperature Over Time' },
        };

        // Chart options for Blood Pressure (Systolic and Diastolic)
        const bloodPressureOptions = {
            ...commonOptions,
            series: [
                { name: 'Systolic', data: systolicData },
                { name: 'Diastolic', data: diastolicData },
            ],
            colors: ['#FF6384', '#36A2EB'],
            title: { text: 'Blood Pressure Over Time' },
        };

        // Chart options for Heart Rate
        const heartRateOptions = {
            ...commonOptions,
            series: [{ name: 'Heart Rate (bpm)', data: heartRateData }],
            colors: ['#4CAF50'],
            title: { text: 'Heart Rate Over Time' },
        };

        // Updated options for sleep time as a bar chart
        const sleepOptions = {
            chart: {
                type: 'bar',
                height: 250,
                toolbar: { show: false },
            },
            series: [
                {
                    name: 'Sleep Duration (hours)',
                    data: sleepData,
                },
            ],
            xaxis: {
                categories: dates, // Use the extracted dates for X-axis categories
                title: { text: 'Date' },
            },
            colors: ['#00E396'],
            title: { text: 'Sleep Duration Over Time' },
        };

        // Chart options for Mental Condition
        const mentalConditionOptions = {
            ...commonOptions,
            chart: {
                type: 'line',  // Change to line chart
                height: 300,
                toolbar: { show: false },
            },
            series: [
                {
                    name: 'Mental Condition',
                    data: mentalConditionMapped,
                },
            ],
            colors: ['#FF5733'],
            title: { text: 'Mental Condition Over Time' },
            xaxis: {
                categories: dates, // Use the extracted dates for X-axis categories
                title: { text: 'Date' },
                labels: {
                    style: { fontSize: '10px' },
                },
            },
            yaxis: {
                min: 0,
                max: 2,
                tickAmount: 3,  // Mengatur jumlah tick
                labels: {
                    formatter: function (value) {
                        // Mengganti angka dengan label yang sesuai
                        const labels = ['Normal', 'Anxious', 'Stress'];
                        return labels[value] || '';
                    }
                }
            },
            markers: {
                size: 5,  // Add markers to points
                colors: ['#FF5733'],
            },
            stroke: {
                curve: 'smooth', // Smooth line
                width: 3,
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
                floating: true,
                offsetY: 5,
                offsetX: 30,
            },
        };

        const createOrUpdateChart = (selector, options) => {
            const chartElement = document.querySelector(selector);
            if (chartElement) {
                const chart = new ApexCharts(chartElement, options);
                chart.render();
                chartElement.ApexCharts = chart;
            }
        };

        createOrUpdateChart("#skinTensionChart", skinTensionOptions);
        createOrUpdateChart("#bodyTemperatureChart", bodyTemperatureOptions);
        createOrUpdateChart("#bloodPressureChart", bloodPressureOptions);
        createOrUpdateChart("#heartRateChart", heartRateOptions);
        createOrUpdateChart("#sleepChart", sleepOptions);
        createOrUpdateChart("#mentalConditionChart", mentalConditionOptions);

        return () => {
            ['#skinTensionChart', '#bodyTemperatureChart', '#bloodPressureChart', '#heartRateChart', '#sleepChart', '#mentalConditionChart'].forEach(chartId => {
                const chartElement = document.querySelector(chartId);
                if (chartElement && chartElement.ApexCharts) {
                    chartElement.ApexCharts.destroy();
                }
            });
        };
    }, [submittedData, mentalConditions]);

    if (loading) return <p className="text-center text-lg">Loading...</p>;
    if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

    return (
        <div className="mt-10 w-full px-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="chart-container">
                <div id="skinTensionChart"></div>
            </div>
            <div className="chart-container">
                <div id="bodyTemperatureChart"></div>
            </div>
            <div className="chart-container">
                <div id="bloodPressureChart"></div>
            </div>
            <div className="chart-container">
                <div id="heartRateChart"></div>
            </div>
            <div className="chart-container">
                <div id="sleepChart"></div>
            </div>
            <div className="chart-container">
                <div id="mentalConditionChart"></div>
            </div>
        </div>
    );
};

export default ResultChart;
