import React, { useEffect, useState } from "react";
import DailyCard from "./DailyCard"; // Import your DailyCard component
import { useAuth } from "@clerk/nextjs";
import { Stack } from "@mui/material";

const WeeklyDisplay = ({ onRefreshData }) => {
  const [weeklyData, setWeeklyData] = useState([]);
  const startDate = "2023-09-24"; // Replace with the start date of the week
  const endDate = "2023-09-30"; // Replace with the end date of the week
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    if (!isLoaded) {
      console.log("hi");
      return;
    }
    const fetchWeeklyData = async () => {
      try {
        const response = await fetch(
          `/api/weeklyData?userId=${userId}&startDate=${startDate}&endDate=${endDate}`
        );

        const data = await response.json();

        setWeeklyData(calculateTotalCalories(data));
        console.log("bye");
      } catch (error) {
        console.error("Error fetching weekly data:", error);
      }
    };

    fetchWeeklyData();
  }, [userId, startDate, endDate, onRefreshData]);

  // Function to generate an array of dates within the specified range
  const generateDateRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dateArray = [];

    while (startDate <= endDate) {
      dateArray.push(startDate.toISOString().split("T")[0]);
      startDate.setDate(startDate.getDate() + 1);
    }

    return dateArray;
  };

  let dailyCards;

  if (Object.keys(weeklyData).length > 0) {
    console.log("hit");
    // Sort the keys (dates) of the weeklyData object in chronological order

    const dateRange = generateDateRange(startDate, endDate);

    dailyCards = dateRange.map((date) => {
      const dayData = weeklyData[date] || {
        breakfastCalories: 0,
        lunchCalories: 0,
        dinnerCalories: 0,
        snackCalories: 0,
        totalCalories: 0,
      };
      const sortedDates = Object.keys(weeklyData).sort();

      return (
        <DailyCard
          key={date}
          date={date}
          breakfastCalories={dayData.breakfastCalories}
          lunchCalories={dayData.lunchCalories}
          dinnerCalories={dayData.dinnerCalories}
          snackCalories={dayData.snackCalories}
          totalCalories={dayData.totalCalories}
        />
      );
    });
  }

  const calculateTotalCalories = (data, startDate, endDate) => {
    const dailyCalories = {}; // Object to store total calories for each date

    // Create a Date object for the start date and end date
    const currentDate = new Date(startDate);
    const end = new Date(endDate);

    // Iterate through all dates in the specified range
    while (currentDate <= end) {
      // Format the current date as yyyy-mm-dd
      const formattedDate = currentDate.toISOString().split("T")[0];

      dailyCalories[formattedDate] = {
        date: formattedDate,
        breakfastCalories: 0,
        lunchCalories: 0,
        dinnerCalories: 0,
        snackCalories: 0,
        totalCalories: 0,
      };

      // Increment the currentDate to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Iterate through the fetched data
    data.forEach((meal) => {
      const { date, meal_type, total_calories } = meal;

      // Format the date from the fetched data as yyyy-mm-dd
      const formattedDate = new Date(date).toISOString().split("T")[0];

      // Ensure that the date exists in dailyCalories
      if (!dailyCalories[formattedDate]) {
        dailyCalories[formattedDate] = {
          date: formattedDate,
          breakfastCalories: 0,
          lunchCalories: 0,
          dinnerCalories: 0,
          snackCalories: 0,
          totalCalories: 0,
        };
      }

      // Update the total calories for the respective meal type
      if (meal_type === "breakfast") {
        dailyCalories[formattedDate].breakfastCalories += total_calories;
      } else if (meal_type === "lunch") {
        dailyCalories[formattedDate].lunchCalories += total_calories;
      } else if (meal_type === "dinner") {
        dailyCalories[formattedDate].dinnerCalories += total_calories;
      } else if (meal_type === "snack") {
        dailyCalories[formattedDate].snackCalories += total_calories;
      }

      // Update the total calories for the day
      dailyCalories[formattedDate].totalCalories += total_calories;
    });

    console.log(JSON.stringify(dailyCalories));

    return dailyCalories;
  };

  // Calculate total calories for each date
  //const dailyCaloriesData = calculateTotalCalories(fetchedData);

  //console.log(dailyCaloriesData);

  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        flexWrap="wrap"
      >
        {Object.keys(weeklyData).length > 0 ? (
          dailyCards
        ) : (
          <p>Loading data...</p>
        )}
      </Stack>
    </div>
  );
};

export default WeeklyDisplay;
