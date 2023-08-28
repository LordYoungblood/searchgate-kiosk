import { useState, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { Box, Typography, Item } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

export const CustomBarGraph = (props) => {
  const vehicleData = props.visitorDetails.visitorDetails;
  const [selectedDate, handleDateChange] = useState(dayjs());
  const [selectedDate1, handleDateChange1] = useState(dayjs());

  const combineDates = [];
  const numberOFVehicles = [];

  useMemo(() => {
    const date = vehicleData.map((data) => {
      const newDay = data.date.slice(0, 10);
      if (newDay >= selectedDate && newDay <= selectedDate1) {
        if (!combineDates.includes(newDay)) {
          combineDates.push(newDay);
        }
        return;
      }
    });
  }, [selectedDate, selectedDate1]);

  useMemo(() => {
    for (let i = 0; i < combineDates.length; i++) {
      let count = 0;
      for (let j = 0; j < vehicleData.length; j++) {
        if (combineDates[i] === vehicleData[j].date.slice(0, 10)) {
          count++;
        }
      }
      numberOFVehicles.push(count);
    }
  }, [combineDates, vehicleData, selectedDate, selectedDate1]);

  const chartData = {
    chart: {
      type: "line",
      id: "apexchart-example",
      color: "#000",
      // width: '25%',
      // height: '25%'
      //   foreColor: theme.palette.primary.main
    },
    xaxis: {
      categories: combineDates,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 100],
        // colorStops: []
      },
    },

    legend: {
      // position: '',
      width: 300,
      // position: 'top',
    },
    series: [
      {
        name: "Number of Vehicles",
        type: "column",
        data: numberOFVehicles,
      },
      // {
      //   name: "Time Traveled",
      //   type: "line",
      //   data: [10],
      // },
    ],
  };

  return (
    <span>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 4,
        }}
      >
        <Typography>Custom Analysis</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-evenly", pt: 2 }}>
        <DateTimePicker
          value={selectedDate}
          onChange={handleDateChange}
          label="Start Date"
        />
        <DateTimePicker
          value={selectedDate1}
          onChange={handleDateChange1}
          label="End Date"
          //   showTodayButton
        />
      </Box>

      <ReactApexChart options={chartData} series={chartData.series} />
    </span>
  );
};
