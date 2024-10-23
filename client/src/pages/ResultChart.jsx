import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const ResultChart = () => {
    const { user } = useAuth(); // Get the authenticated user from the context
    const [submittedData, setSubmittedData] = useState([]);
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

        const activityData = submittedData.map(result => ({
            date: new Date(result.created_at).toLocaleDateString(),
            activities: result.activities || { aerobics: 0, yoga: 0, meditation: 0 }
        }));

        const commonOptions = {
            chart: {
                type: 'line',
                height: 200,
                toolbar: { show: false },
            },
            xaxis: {
                categories: dates,
                title: { text: 'Date' },
                labels: { style: { fontSize: '10px' } },
            },
            stroke: {
                width: 2,
                curve: 'smooth',
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
                categories: dates,
                title: { text: 'Date' },
            },
            colors: ['#00E396'],
            title: { text: 'Sleep Duration Over Time' },
        };

        // Chart options for activity levels as a stacked bar chart
        const activityGrowthOptions = {
            chart: {
                type: 'bar',
                stacked: true,
                height: 300,
                toolbar: { show: false },
            },
            series: [
                {
                    name: 'Aerobics',
                    data: activityData.map(act => act.activities.aerobics),
                },
                {
                    name: 'Yoga',
                    data: activityData.map(act => act.activities.yoga),
                },
                {
                    name: 'Meditation',
                    data: activityData.map(act => act.activities.meditation),
                },
            ],
            xaxis: {
                categories: activityData.map(act => act.date),
                title: { text: 'Date' },
            },
            colors: ['#FF6384', '#36A2EB', '#FFCE56'], // Custom colors for each activity
            title: { text: 'Activity Levels Over Time' },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
                floating: true,
                offsetY: 5,
                offsetX: 30,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '50%',
                    endingShape: 'rounded',
                },
            },
        };

        // Function to create or update a chart
        const createOrUpdateChart = (selector, options) => {
            const chartElement = document.querySelector(selector);
            if (chartElement) {
                // Create and render the new chart
                const chart = new ApexCharts(chartElement, options);
                chart.render();

                // Store the chart instance for potential updates
                chartElement.ApexCharts = chart;
            }
        };

        // Create charts for each data set
        createOrUpdateChart("#skinTensionChart", skinTensionOptions);
        createOrUpdateChart("#bodyTemperatureChart", bodyTemperatureOptions);
        createOrUpdateChart("#bloodPressureChart", bloodPressureOptions);
        createOrUpdateChart("#heartRateChart", heartRateOptions);
        createOrUpdateChart("#sleepChart", sleepOptions); // Updated sleep chart as a bar chart
        createOrUpdateChart("#activityGrowthChart", activityGrowthOptions); // Activity growth chart

        // Clean up the charts on component unmount
        return () => {
            ['#skinTensionChart', '#bodyTemperatureChart', '#bloodPressureChart', '#heartRateChart', '#sleepChart', '#activityGrowthChart'].forEach(chartId => {
                const chartElement = document.querySelector(chartId);
                if (chartElement && chartElement.ApexCharts) {
                    chartElement.ApexCharts.destroy();
                }
            });
        };
    }, [submittedData]);

    // Handle loading and error states
    if (loading) return <p className="text-center text-lg">Loading...</p>;
    if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

    // Render the charts with explanatory labels
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
            <div className="bg-white shadow rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Skin Tension Chart</h3>
                <div id="skinTensionChart"></div>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Body Temperature Chart</h3>
                <div id="bodyTemperatureChart"></div>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Blood Pressure Chart</h3>
                <div id="bloodPressureChart"></div>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Heart Rate Chart</h3>
                <div id="heartRateChart"></div>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Sleep Time Chart</h3>
                <div id="sleepChart"></div>
            </div>
            {/* <div className="bg-white shadow rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Activity Growth Chart</h3>
                <div id="activityGrowthChart"></div>
            </div> */}
        </div>
    );
};

export default ResultChart;
