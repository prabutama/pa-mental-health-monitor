import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const ResultChart = (props) => {
    const { user } = useAuth();
    const [submittedData, setSubmittedData] = useState([]);
    const [mentalConditions, setMentalConditions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchHealthResults = async () => {
        const userId = props.userData ? props.userData.id : user?.id;
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
    }, [user]);

    useEffect(() => {
        if (submittedData.length === 0) return;

        const dates = submittedData.map(result => new Date(result.created_at).toLocaleDateString());
        const skinTensionData = submittedData.map(result => result.skin_tension || 0);
        const bodyTemperatureData = submittedData.map(result => result.body_temperature);
        const heartRateData = submittedData.map(result => result.heart_rate);
        const systolicData = submittedData.map(result => result.systolic);
        const diastolicData = submittedData.map(result => result.diastolic);
        const sleepData = submittedData.map(result => result.sleep_time || 0);

        const mentalConditionMapped = mentalConditions.map(condition => {
            if (condition === 'Normal') return 2;
            if (condition === 'Anxious') return 1;
            if (condition === 'Stress') return 0;
            return -1;
        });

        const mentalConditionCounts = [0, 0, 0];
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
                categories: dates,
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

        const skinTensionOptions = {
            ...commonOptions,
            series: [{ name: 'Skin Tension', data: skinTensionData }],
            colors: ['#FF5733'],
            title: { text: 'Skin Tension Over Time' },
        };

        const bodyTemperatureOptions = {
            ...commonOptions,
            series: [{ name: 'Body Temperature (°C)', data: bodyTemperatureData }],
            colors: ['#1E90FF'],
            title: { text: 'Body Temperature Over Time' },
        };

        // Chart options for Blood 
        const bloodPressureOptions = {
            ...commonOptions,
            series: [
                { name: 'Systolic', data: systolicData },
                { name: 'Diastolic', data: diastolicData },
            ],
            colors: ['#FF6384', '#36A2EB'],
            title: { text: 'Blood Pressure Over Time' },
        };

        const heartRateOptions = {
            ...commonOptions,
            series: [{ name: 'Heart Rate (bpm)', data: heartRateData }],
            colors: ['#4CAF50'],
            title: { text: 'Heart Rate Over Time' },
        };

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

        const mentalConditionOptions = {
            ...commonOptions,
            chart: {
                type: 'line',
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
                categories: dates,
                title: { text: 'Date' },
                labels: {
                    style: { fontSize: '10px' },
                },
            },
            yaxis: {
                min: 0,
                max: 2,
                tickAmount: 4,
                labels: {
                    formatter: function (value) {
                        const labels = ['Stress', 'Anxious', 'Normal'];
                        return labels[value] || '';
                    }
                }
            },
            markers: {
                size: 5,
                colors: ['#FF5733'],
            },
            stroke: {
                curve: 'smooth',
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
        <div className="mt-10 w-full px-0 grid grid-cols-1 gap-4 md:grid-cols-2">
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
