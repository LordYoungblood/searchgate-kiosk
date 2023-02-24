import { DailyBarGraph } from "./dailyBarGraph";
import { MonthlyBarGraph } from "./monthlyBarGraph";
import { CustomBarGraph } from "./customBarGraph";
import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { VehicleContext } from "../VehicleContext";

export const Data = () => {
  const { visitorDetails } = useContext(VehicleContext);

  var today = new Date();

  var priorDate = new Date(new Date().setDate(today.getDate() - 30));
  var PriorYear = new Date(new Date().setFullYear(today.getFullYear() - 1));
  const lastMonth = priorDate.toISOString().slice(0, 10);
  const lastYear = PriorYear.toISOString().slice(0, 7);

  return (
    <Box sx={{ mt: 5, width: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ width: "50%" }}>
          <Typography> 30 Day Trend</Typography>
          <DailyBarGraph element={{ visitorDetails, lastMonth }} />
        </Box>
        <Box sx={{ width: "50%" }}>
          <Typography> Current Year</Typography>
          <MonthlyBarGraph element={{ visitorDetails, lastYear }} />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "75%" }}>
          <CustomBarGraph
            
            visitorDetails={{ visitorDetails }}
          />
        </Box>
      </Box>
    </Box>
  );
};
