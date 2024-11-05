import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const BiddersAuctioneersGraph = () => {
  const { totalAuctioneers, totalBidders } = useSelector(
    (state) => state.superAdmin
  );

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
        label: "Number of Bidders",
        data: totalBidders,
        borderColor: "#D6482B", // Bidders line color
        backgroundColor: "rgba(214, 72, 43, 0.1)", // Light fill for Bidders
        borderWidth: 2,
        pointBackgroundColor: "#D6482B",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#D6482B",
        fill: true, // Fill under the line for better visibility
      },
      {
        label: "Number of Auctioneers",
        data: totalAuctioneers,
        borderColor: "#fdba88", // Auctioneers line color
        backgroundColor: "rgba(253, 186, 136, 0.1)", // Light fill for Auctioneers
        borderWidth: 2,
        pointBackgroundColor: "#fdba88",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#fdba88",
        fill: true, // Fill under the line for better visibility
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
        max: 50,
        title: {
          display: true,
          text: 'Number of Registrations',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          callback: function (value) {
            return value.toLocaleString();
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Number of Bidders and Auctioneers Registered",
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
            return `${label}: ${value}`; // Custom tooltip formatting
          },
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <Line data={data} options={options} />
    </div>
  );
};

export default BiddersAuctioneersGraph;
