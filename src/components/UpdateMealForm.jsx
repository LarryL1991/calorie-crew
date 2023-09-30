import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import FoodSelector from "./FoodSelector"; // Import your FoodSelector component
import DeleteIcon from "@mui/icons-material/Delete"; // Import the delete icon
import { useAuth } from "@clerk/nextjs";

const AddMealForm = ({ closeDialog, currentMeal }) => {
  const [selectedFoods, setSelectedFoods] = useState([
    {
      name: "", // User-selected food
      calories: 0, // Calories for the selected food (fetched from the database)
      measurement: "",
      quantity: 1, // Quantity set by the user (initially set to 1)
    },
  ]);
  const [oldSelectedFoods, setOldSelectedFoods] = useState([
    {
      name: "", // User-selected food
      calories: 0, // Calories for the selected food (fetched from the database)
      measurement: "",
      quantity: 1, // Quantity set by the user (initially set to 1)
    },
  ]);

  const [selectedMealType, setSelectedMealType] = useState(currentMeal);

  const [date, setDate] = useState("1900-01-01");
  const [dateError, setDateError] = useState(null); // Added dateError state
  const [isValidInput, setIsValidInput] = useState(true); // Flag for valid input
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isCompleteMealDisabled, setIsCompleteMealDisabled] = useState(true);
  const { isLoaded, userId } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddItem = () => {
    setSelectedFoods([
      ...selectedFoods,
      { name: "", calories: 0, measurement: "", quantity: 1 },
    ]);
  };

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");

    setDate(`${year}-${month}-${day}`);
    setIsFormOpen(!isFormOpen);
  }, []);

  const handleRemoveItem = (index) => {
    const updatedSelectedFoods = [...selectedFoods];
    updatedSelectedFoods.splice(index, 1); // Remove the food item at the specified index
    setSelectedFoods(updatedSelectedFoods);
  };

  const handleFoodSelection = (food, index) => {
    const updatedSelectedFoods = [...selectedFoods];
    updatedSelectedFoods[index] = {
      name: food?.name || "", // Update name if food is not null, otherwise, reset to an empty string
      calories: food?.calories || 0, // Update calories if food is not null, otherwise, reset to 0
      measurement: food?.measurement || "",
      quantity: selectedFoods[index].quantity,
    };
    setSelectedFoods(updatedSelectedFoods);
  };

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    if (newDate.match(dateRegex) || newDate === "") {
      // Valid date format or empty string
      setDateError(null); // Clear any previous error
      setIsValidInput(true); // Set input as valid
    } else {
      // Invalid date format
      setDateError("Invalid date format (YYYY-MM-DD)");
      setIsValidInput(false); // Set input as invalid
    }
    setDate(newDate);
  };

  const handleMealTypeChange = (event) => {
    setSelectedMealType(event.target.value);
  };

  useEffect(() => {
    if (selectedMealType !== "" && isValidInput) {
      setSelectedFoods([
        { name: "", calories: 0, measurement: "", quantity: 1 },
      ]);
      fetchMeal();
    }
  }, [selectedMealType, date, isFormOpen]);

  useEffect(() => {
    setIsFormChanged(
      JSON.stringify(selectedFoods) === JSON.stringify(oldSelectedFoods)
    );

    // Check if any values in any object are empty
    const hasEmptyValue = selectedFoods.some((food) =>
      Object.values(food).some((value) => value === "")
    );

    // Set isCompleteMealDisabled based on the result
    setIsCompleteMealDisabled(hasEmptyValue);
    setIsFormChanged(hasEmptyValue);
  }, [selectedFoods, oldSelectedFoods]);

  const fetchMeal = async () => {
    try {
      // Make an API request to fetch meals for the specified userId and date
      const response = await fetch(
        `/api/meals/${userId}/${date}/${selectedMealType.toLowerCase()}`
      );

      const data = await response.json();

      if (typeof data === "object" && Object.keys(data).length > 0) {
        await setOldSelectedFoods([...data.meal.food_items]);
        await setSelectedFoods([...data.meal.food_items]);
        setIsDataFetched(true);
      } else {
        setIsDataFetched(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameChange = (event, index) => {
    const updatedSelectedFoods = [...selectedFoods];
    updatedSelectedFoods[index] = {
      ...updatedSelectedFoods[index],
      name: event.target.value,
    };
    setSelectedFoods(updatedSelectedFoods);
  };

  const handleMeasurementChange = (event, index) => {
    const updatedSelectedFoods = [...selectedFoods];
    updatedSelectedFoods[index] = {
      ...updatedSelectedFoods[index],
      measurement: event.target.value,
    };
    setSelectedFoods(updatedSelectedFoods);
  };

  const handleCaloriesChange = (event, index) => {
    const updatedSelectedFoods = [...selectedFoods];
    const inputValue = event.target.value;
    updatedSelectedFoods[index] = {
      ...updatedSelectedFoods[index],
      calories: inputValue === "" ? null : parseInt(inputValue) || 1,
    };
    setSelectedFoods(updatedSelectedFoods);
  };

  const handleQuantityChange = (event, index) => {
    const updatedSelectedFoods = [...selectedFoods];
    const inputValue = event.target.value;
    updatedSelectedFoods[index] = {
      ...updatedSelectedFoods[index],
      quantity: inputValue === "" ? null : parseInt(inputValue) || 1,
    };
    setSelectedFoods(updatedSelectedFoods);
  };

  const handleCompleteMeal = async () => {
    if (!isLoaded || !userId || !selectedMealType || dateError) {
      return; // Prevent submission if the conditions are not met
    }

    const formattedDate = new Date(date);
    formattedDate.setHours(0, 0, 0, 0);

    try {
      // Calculate the total calories consumed for the meal
      const totalCalories = selectedFoods.reduce(
        (total, food) => total + food.calories * food.quantity,
        0
      );

      // Prepare the data to send to the API
      const mealData = {
        user_id: userId,
        date,
        meal_type: selectedMealType.toLowerCase(),
        food_items: selectedFoods,
        total_calories: totalCalories,
      };

      //console.log(mealData);

      // Send a POST request to your API endpoint
      const response = await fetch("/api/addMeal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mealData), // Convert data to JSON format
      });

      if (response.ok) {
        // Handle success, e.g., show a success message
        console.log("Meal added successfully!");
        closeDialog();
      } else {
        // Handle error, e.g., show an error message
        console.error("Failed to add meal");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateMeal = async () => {
    if (!isLoaded || !userId || !selectedMealType || dateError) {
      return; // Prevent submission if the conditions are not met
    }

    const formattedDate = new Date(date);
    formattedDate.setHours(0, 0, 0, 0);
    //console.log(formattedDate.toISOString());

    try {
      // Calculate the total calories consumed for the meal
      const totalCalories = selectedFoods.reduce(
        (total, food) => total + food.calories * food.quantity,
        0
      );

      // Prepare the data to send to the API
      const mealData = {
        user_id: userId,
        date,
        meal_type: selectedMealType.toLowerCase(),
        food_items: selectedFoods,
        total_calories: totalCalories,
      };

      console.log(mealData);

      // Send a PUT request to your API endpoint
      const response = await fetch(
        `/api/updateMeal/${userId}/${date}/${selectedMealType.toLowerCase()}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mealData), // Convert data to JSON format
        }
      );

      if (response.ok) {
        // Handle success, e.g., show a success message
        console.log("Meal updated successfully!");
        setOldSelectedFoods(selectedFoods);
        closeDialog();
      } else {
        // Handle error, e.g., show an error message
        console.error("Failed to update meal");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    if (!isLoaded || !userId || !selectedMealType || dateError) {
      return; // Prevent submission if the conditions are not met
    }

    const formattedDate = new Date(date);
    formattedDate.setHours(0, 0, 0, 0);

    try {
      // Calculate the total calories consumed for the meal
      const totalCalories = selectedFoods.reduce(
        (total, food) => total + food.calories * food.quantity,
        0
      );

      // Prepare the data to send to the API
      const mealData = {
        user_id: userId,
        date,
        meal_type: selectedMealType.toLowerCase(),
        food_items: selectedFoods,
        total_calories: totalCalories,
      };

      console.log(mealData);

      // Send a PUT request to your API endpoint
      const response = await fetch(
        `/api/deleteMeal/${userId}/${date}/${selectedMealType.toLowerCase()}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mealData),
        }
      );

      if (response.ok) {
        // Handle success, e.g., show a success message
        console.log("Meal deleted successfully!");
        setOldSelectedFoods(selectedFoods);
        closeDialog();
      } else {
        // Handle error, e.g., show an error message
        console.error("Failed to delete meal");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Paper
        elevation={3}
        style={{ padding: "16px", marginBottom: "16px" }}
        key="date-meal-type-entry"
      >
        <FormControl fullWidth>
          <TextField
            label="Date (YYYY-MM-DD)"
            variant="outlined"
            value={date}
            onChange={handleDateChange}
            fullWidth
            required
            error={!!dateError} // Add error state if dateError is not null
            helperText={dateError} // Display error message if dateError is not null
          />
          <Select
            labelId="meal-type-label"
            id="meal-type"
            defaultValue={currentMeal}
            label="Meal Type"
            onChange={handleMealTypeChange}
          >
            <MenuItem value="Breakfast">Breakfast</MenuItem>
            <MenuItem value="Lunch">Lunch</MenuItem>
            <MenuItem value="Dinner">Dinner</MenuItem>
            <MenuItem value="Snack">Snack</MenuItem>
          </Select>
        </FormControl>
      </Paper>
      {selectedFoods.map((selectedFood, index) => (
        <Paper
          elevation={3}
          style={{ padding: "16px", marginBottom: "16px" }}
          key={index}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FoodSelector
                onFoodSelect={(food) => handleFoodSelection(food, index)}
                disabled={!isValidInput} // Disable the field if input is not valid
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="Name"
                variant="outlined"
                value={selectedFood.name}
                onChange={(event) => handleNameChange(event, index)}
                disabled={!isValidInput} // Disable the field if input is not valid
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Unit"
                variant="outlined"
                value={selectedFood.measurement}
                onChange={(event) => handleMeasurementChange(event, index)}
                disabled={!isValidInput} // Disable the field if input is not valid
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Calories"
                variant="outlined"
                value={selectedFood.calories}
                onChange={(event) => handleCaloriesChange(event, index)}
                disabled={!isValidInput} // Disable the field if input is not valid
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Quantity"
                variant="outlined"
                value={selectedFood.quantity}
                onChange={(event) => handleQuantityChange(event, index)}
                disabled={!isValidInput} // Disable the field if input is not valid
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton
                color="error"
                aria-label="Remove"
                onClick={() => handleRemoveItem(index)}
                disabled={!isValidInput} // Disable the field if input is not valid
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Button variant="outlined" onClick={handleAddItem}>
        Add Item
      </Button>
      <div>
        {!isDataFetched && (
          <Button
            variant="outlined"
            onClick={handleCompleteMeal}
            disabled={isCompleteMealDisabled} // Disable the button based on conditions
          >
            Complete Meal
          </Button>
        )}
        {isDataFetched && (
          <>
            <Button
              variant="outlined"
              onClick={handleUpdateMeal}
              disabled={isFormChanged}
            >
              Update Meal
            </Button>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AddMealForm;
