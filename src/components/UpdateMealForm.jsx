import React, { useState, useEffect } from "react";
import { Box, Paper, TextField, Button, Typography, Grid } from "@mui/material";

const UpdateMealForm = ({ userId, date, mealType }) => {
  const [mealData, setMealData] = useState(null);
  const [editedData, setEditedData] = useState(null);

  useEffect(() => {
    // Fetch meal data from the API based on userId and date
    fetch(`/api/meals/${userId}/${date}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMealData(data);
        setEditedData(data); // Initialize edited data with fetched data
      })
      .catch((error) => {
        console.error("Error fetching meal data:", error);
      });
  }, [userId, date]);

  const handleInputChange = (event, field) => {
    // Update the editedData state when an input field changes
    setEditedData({
      ...editedData,
      [field]: event.target.value,
    });
  };

  const handleSave = () => {
    // Send an update call to the API with the editedData
    // You should implement this part based on your API structure
    console.log("Saving edited data:", editedData);
  };

  return (
    <div>
      {mealData ? (
        <Paper elevation={3}>
          <Typography variant="h5" align="center" gutterBottom>
            Meal Details
          </Typography>
          <Box p={2}>
            <TextField
              label="User ID"
              variant="outlined"
              fullWidth
              value={editedData.user_id}
              onChange={(event) => handleInputChange(event, "user_id")}
            />
          </Box>
          <Box p={2}>
            <TextField
              label="Date"
              variant="outlined"
              fullWidth
              value={editedData.date}
              onChange={(event) => handleInputChange(event, "date")}
            />
          </Box>
          <Box p={2}>
            <TextField
              label="Meal Type"
              variant="outlined"
              fullWidth
              value={editedData.meal_type}
              onChange={(event) => handleInputChange(event, "meal_type")}
            />
          </Box>
          <Box p={2}>
            <Typography variant="h6">Food Items:</Typography>
            {editedData.food_items.map((foodItem, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={6}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={foodItem.name}
                    onChange={(event) =>
                      handleInputChange(event, `food_items[${index}].name`)
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    label="Calories"
                    variant="outlined"
                    fullWidth
                    value={foodItem.calories}
                    onChange={(event) =>
                      handleInputChange(event, `food_items[${index}].calories`)
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    label="Measurement"
                    variant="outlined"
                    fullWidth
                    value={foodItem.measurement}
                    onChange={(event) =>
                      handleInputChange(
                        event,
                        `food_items[${index}].measurement`
                      )
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    label="Quantity"
                    variant="outlined"
                    fullWidth
                    value={foodItem.quantity}
                    onChange={(event) =>
                      handleInputChange(event, `food_items[${index}].quantity`)
                    }
                  />
                </Grid>
              </Grid>
            ))}
          </Box>
          <Box p={2}>
            <TextField
              label="Total Calories"
              variant="outlined"
              fullWidth
              value={editedData.total_calories}
              onChange={(event) => handleInputChange(event, "total_calories")}
            />
          </Box>
          <Box p={2} display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Paper>
      ) : (
        <Typography variant="h5" align="center">
          Loading...
        </Typography>
      )}
    </div>
  );
};

export default UpdateMealForm;
