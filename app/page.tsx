"use client";

import { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [rank, setRank] = useState(1);
  const [percentile, setPercentile] = useState(30);
  const [correctAnswers, setCorrectAnswers] = useState(10);
  const totalQuestions = 15;

  const [newRank, setNewRank] = useState(rank);
  const [newPercentile, setNewPercentile] = useState(percentile);
  const [newCorrectAnswers, setNewCorrectAnswers] = useState(correctAnswers);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateStats = () => {
    setRank(newRank);
    setPercentile(newPercentile);
    setCorrectAnswers(newCorrectAnswers);
    setIsModalOpen(false);
  };

  const [progressData] = useState([
    { category: "HTML Tools, Forms, History", percentage: 80 },
    { category: "Tags & References in HTML", percentage: 60 },
    { category: "Tables & References in HTML", percentage: 24 },
    { category: "Tables & CSS Basics", percentage: 96 },
  ]);

  const comparisonData = {
    labels: ["Your Score", "Average"],
    datasets: [
      {
        label: "Percentile Comparison",
        data: [percentile, 72],
        backgroundColor: ["#4F46E5", "#F87171"],
      },
    ],
  };

  const questionData = {
    labels: ["Correct", "Incorrect", "Unattempted"],
    datasets: [
      {
        data: [correctAnswers, totalQuestions - correctAnswers, 0],
        backgroundColor: ["#34D399", "#F87171", "#FBBF24"],
      },
    ],
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <h1 className="text-2xl font-bold mb-6">WhatBytes</h1>
        <nav className="space-y-4">
          <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600">
            Dashboard
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600">
            Skill Test
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600">
            Internship
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
          {/* Header */}
          <div className="flex justify-end items-center mb-6">
            <div className="p-2 bg-gray-200 rounded-lg shadow-lg border border-gray-300 transform transition-transform hover:scale-105">
              <span className="text-xl font-bold text-gray-800">Syed Nooruddin</span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Metrics */}
            <div className="lg:col-span-2 space-y-6">
              {/* Skill Test Info */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">Skill Test</h2>
                <div className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">
                      HTML Hyper Text Markup Language
                    </h3>
                    <div className="flex flex-wrap gap-4 text-gray-600">
                      <span>Questions: 15</span>
                      <span>Duration: 15 mins</span>
                      <span>Submitted on 5 June 2021</span>
                    </div>
                  </div>
                  <button
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Update
                  </button>
                </div>
              </div>

              {/* Quick Statistics */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Quick Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <h3 className="text-sm text-gray-600 mb-2">YOUR RANK</h3>
                    <p className="text-3xl font-bold text-blue-600">{rank}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <h3 className="text-sm text-gray-600 mb-2">PERCENTILE</h3>
                    <p className="text-3xl font-bold text-green-600">{percentile}%</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg text-center">
                    <h3 className="text-sm text-gray-600 mb-2">CORRECT ANSWERS</h3>
                    <p className="text-3xl font-bold text-yellow-600">{correctAnswers}/{totalQuestions}</p>
                  </div>
                </div>
              </div>

              {/* Comparison Graph */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Comparison Graph
                </h2>
                <div className="h-64">
                  <Bar
                    data={comparisonData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 100,
                          ticks: { color: "#6B7280" },
                        },
                        x: { ticks: { color: "#6B7280" } },
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Skill-wise and Question Analysis */}
            <div className="space-y-6 lg:order-last">
              {/* Syllabus Analysis */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Syllabus Wise Analysis
                </h2>
                <div className="space-y-4">
                  {progressData.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="text-gray-700">{item.category}</span>
                        <span className="text-gray-600">{item.percentage}%</span>
                      </div>
                      <div className="bg-gray-200 h-2 rounded-full">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Question Analysis */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Question Analysis
                </h2>
                <div className="h-64">
                  <Pie
                    data={questionData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { position: "bottom", labels: { color: "#6B7280" } },
                      },
                    }}
                  />
                </div>
                <p className="text-center mt-4 text-gray-600">
                  You scored {correctAnswers} questions correct out of {totalQuestions}.<br />
                  However it still needs some improvements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Update Stats</h2>
              <div className="grid grid-cols-1 gap-4">
                <label className="text-gray-800">
                  Rank
                  <input 
                    type="number" 
                    className="p-2 border rounded w-full mt-1" 
                    value={newRank} 
                    onChange={(e) => setNewRank(Number(e.target.value))} 
                    placeholder="New Rank" 
                  />
                </label>
                <label className="text-gray-800">
                  Percentile
                  <input 
                    type="number" 
                    className="p-2 border rounded w-full mt-1" 
                    value={newPercentile} 
                    onChange={(e) => setNewPercentile(Number(e.target.value))} 
                    placeholder="New Percentile" 
                  />
                </label>
                <label className="text-gray-800">
                  Correct Answers
                  <input 
                    type="number" 
                    className="p-2 border rounded w-full mt-1" 
                    value={newCorrectAnswers} 
                    onChange={(e) => setNewCorrectAnswers(Number(e.target.value))} 
                    placeholder="New Correct Answers" 
                  />
                </label>
              </div>
              <div className="flex justify-end mt-4">
                <button 
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg mr-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                  onClick={updateStats}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}