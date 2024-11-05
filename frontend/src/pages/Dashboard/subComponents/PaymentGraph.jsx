import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PaymentGraph = () => {
  const { monthlyRevenue } = useSelector((state) => state.superAdmin);

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Total Payment Received",
        data: monthlyRevenue,
        backgroundColor: "rgba(214, 72, 43, 0.7)", // Semi-transparent background for modern look
        borderColor: "#D6482B", // Border color to enhance visibility
        borderWidth: 2,
        hoverBackgroundColor: "rgba(214, 72, 43, 1)", // Stronger color on hover
        hoverBorderColor: "rgba(214, 72, 43, 1)",
        barPercentage: 0.6, // Adjusting the bar width
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 5000,
        title: {
          display: true,
          text: 'Total Payments (in USD)',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          callback: function (value) {
            return `$${value.toLocaleString()}`; // Formatting ticks as currency
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Monthly Total Payments Received",
        font: {
          size: 18,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      legend: {
        position: 'top',
        labels: {
          boxWidth: 20,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || '';
            const value = context.raw;
            return `${label}: $${value.toLocaleString()}`; // Custom tooltip formatting
          },
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <Bar data={data} options={options} />
    </div>
  );
};

export default PaymentGraph;
