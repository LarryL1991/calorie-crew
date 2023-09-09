import { Autocomplete, Backdrop, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react"



export default function Home() {
    
    
    const [calorieCounter, setCalorieCounter] = useState(0);
    const [addedCalories, setAddedCalories] = useState(0);

    const [morningCalories, setMorningCalories] = useState(0);
    const [lunchCalories, setLunchCalories] = useState(0);
    const [dinnerCalories, setDinnerCalories] = useState(0);
    const [snackCalories, setSnackCalories] = useState(0);

    const [meal, setMeal] = useState('Snack');

    const [color, setColor] = useState('black');
    const [popup, setPopup] = useState('hidden');

    const options = ['Breakfast', 'Lunch', 'Dinner', 'Snack']

    useEffect(() => {
        setCalorieCounter(morningCalories + lunchCalories + dinnerCalories + snackCalories) 
        changeColor(); 
    }, [morningCalories, lunchCalories, dinnerCalories, snackCalories])

    function changeColor() {
        if (calorieCounter > 0 && calorieCounter <= 200){
            setColor("green");
        }
        else if (calorieCounter >= 800 && calorieCounter < 2000){
            setColor("yellow");
        }
        else if (calorieCounter >= 2000){
            setColor("red");
        }

    }

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        console.log(addedCalories);
        setOpen(false);
      };
      const handleOpen = () => {
        setOpen(true);
      };

      function handleMealChange(event, value) {
        setMeal(value);
        console.log(value);
      }

      function handleCalorieAdd(event, value) {
        setAddedCalories(event.target.value);
        console.log(event.target.value);
      }


    return (
    <>
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
            onInput={handleCalorieAdd}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add Calories</Button>
        </DialogActions>
      </Dialog>
    </div>
                
        <div className="calorie-counter" style={{color: color}} onClick={handleOpen}>
        {calorieCounter}
        </div>
        <div className="meal-row">
            <div className="meal-icon" onClick={(e) => setMorningCalories(morningCalories + 100) }>
                <div className="prevent-click">
                    <i className="sunrise" ></i>
                    <div className="daily-calories">{morningCalories}</div>
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