import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const DailyCard = ({
  date,
  breakfastCalories,
  lunchCalories,
  dinnerCalories,
  snackCalories,
  totalCalories,
}) => {
  return (
    <Card sx={{ minWidth: 140, backgroundColor: "#f0f0f0", margin: "1rem" }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontSize: 16, fontWeight: "bold" }}>
          {date}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 14 }}>
          Breakfast: {breakfastCalories}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 14 }}>
          Lunch: {lunchCalories}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 14 }}>
          Dinner: {dinnerCalories}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 14 }}>
          Snack: {snackCalories}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 14 }}>
          Daily: {totalCalories}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DailyCard;
