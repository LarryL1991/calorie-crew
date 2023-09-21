import Navbar from "@/components/Navbar";
import { Autocomplete, Backdrop, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react"


export default function Home() {
    
    const [calorieCounter, setCalorieCounter] = useState(0);
    const [addedCalories, setAddedCalories] = useState(0);

    const [breakfastCalories, setBreakfastCalories] = useState(0);
    const [lunchCalories, setLunchCalories] = useState(0);
    const [dinnerCalories, setDinnerCalories] = useState(0);
    const [snackCalories, setSnackCalories] = useState(0);

    const [meal, setMeal] = useState('Snack');

    const [color, setColor] = useState('black');
    const [numSize, setNumSize] = useState('64px');
    const [calorieGoal, setCalorieGoal] = useState(2000);

    const options = ['Breakfast', 'Lunch', 'Dinner', 'Snack']

    useEffect(() => {
        setCalorieCounter(breakfastCalories + lunchCalories + dinnerCalories + snackCalories) 
        changeColor();
        changeNumSize();
    }, [breakfastCalories, lunchCalories, dinnerCalories, snackCalories, calorieCounter])

    function changeColor() {
      if (calorieCounter > 0 && calorieCounter <= calorieGoal / 3){
          setColor("green");
      }
      else if (calorieCounter >= calorieGoal / 3 && calorieCounter < calorieGoal){
          setColor("yellow");
      }
      else if (calorieCounter >= calorieGoal){
          setColor("red");
      }
    }

    function changeNumSize() {
      if(calorieCounter >= 10000){
        setNumSize('53px');
      }
    }

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        console.log(addedCalories);
        handleCalorieInput;
        setOpen(false);
      };
      const handleOpen = () => {
        setOpen(true);
      };

      function handleMealChange(event, value) {
        setMeal(value);
        console.log(value);
      }

      function handleCalorieInput(event, value) {
        setAddedCalories(Number(event.target.value));
        console.log(event.target.value);
      }

      function addCalories () {
        if (meal === "Breakfast"){
          setBreakfastCalories(breakfastCalories + addedCalories);
        }
        else if (meal === "Lunch"){
          setLunchCalories(lunchCalories + addedCalories);
        }
        else if (meal === "Dinner"){
          setDinnerCalories(dinnerCalories + addedCalories);
        }
        else {
          setSnackCalories(snackCalories + addedCalories);
        }
      }

    return (
    <>
        <Navbar/>
        <div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Calories</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{marginBottom: "10px"}}>
                What meal was this for?
              </DialogContentText>
              <Autocomplete
                id="combo-box-demo"
                options={options}
                onChange={(handleMealChange)}
                renderInput={(params) => <TextField {...params} label="Meal" />}
                onKeyDown={(e) => {e.preventDefault();}}
              />
              <TextField
                autoFocus
                margin="dense"
                id="calories"
                label="calories"
                type="number"
                fullWidth
                variant="standard"
                autoComplete="off"
                onInput={handleCalorieInput}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" onClick={addCalories}>Add Calories</Button>
            </DialogActions>
          </Dialog>
        </div>

        <div className="pot"  onClick={handleOpen}>
        <img src="/icons/pot.svg"/>
          <div className="liquid">
            <div className="calorie-counter" style={{color: color, fontSize: numSize}}>
            {calorieCounter} 
            </div>
          </div>
        </div>

        <div className="meal-row">
            <div className="meal-icon" onClick={(e) => setBreakfastCalories(breakfastCalories + 100) }>
                <div className="prevent-click">
                    <i className="sunrise" ></i>
                    <div className="daily-calories">{breakfastCalories}</div>
                </div>
            </div>
            <div className="meal-icon" onClick={() => setLunchCalories(lunchCalories + 100)}>
                <div className="prevent-click">
                    <i className="fa-regular fa-sun" ></i>
                    <div className="daily-calories">{lunchCalories}</div>
                </div>
            </div>
            <div className="meal-icon" onClick={() => setDinnerCalories(dinnerCalories + 100)}>
                <div className="prevent-click">
                    <i className="fa-regular fa-moon" ></i>
                    <div className="daily-calories">{dinnerCalories}</div>
                </div>
            </div>
            <div className="meal-icon" onClick={() => setSnackCalories(snackCalories + 100)}>
                <div className="prevent-click">
                    <i className="fa-solid fa-cookie-bite" ></i>
                    <div className="daily-calories">{snackCalories}</div>
                </div>
            </div>
        </div>
        
    </>
    )
}