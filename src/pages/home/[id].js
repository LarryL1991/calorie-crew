import { Autocomplete, Backdrop, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, keyframes } from "@mui/material";
import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar";
import AddMealForm from "@/components/AddMealForm";
import {useRouter} from 'next/router';

export async function getServerSideProps(context) { //Allows slug to persist on refresh. Code yoinked from https://stackoverflow.com/questions/65859612/id-is-gone-when-i-refresh-a-nextjs-dynamic-route-page
  return {
      props: {},
  };
}

export default function Home() {
  const router = useRouter()
  const {id} = router.query;
  

  const [date, setDate] = useState("2023-09-28"); // State for date input

  const [data, setData] = useState('');

  async function fetchData() {
    const response = await fetch(`/api/home/${id}/${date}`)
    setData(await response.json());
  }

  useEffect(() => {
    fetchData();
  }, [])

  console.log(data);
    
    
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

    const [openCalorieForm, setOpenCalorieForm] = useState(false);

    const handleCloseCalorieForm = () => {
        console.log(addedCalories);
        handleCalorieInput;
        setOpenCalorieForm(false);
      };

      const handleOpenCalorieForm = () => {
        setMeal("Snack")
        setAddedCalories(0);
        setOpenCalorieForm(true);
      };

      function handleMealChange(event, value) {
        setMeal(value);
        console.log(value);
      }

      function handleCalorieInput(event, value) {
        setAddedCalories(Number(event.target.value));
        console.log(event.target.value);
      }

      async function addCalories () {
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
        console.log((calorieCounter + addedCalories) - calorieGoal)
        console.log((((calorieCounter + addedCalories) / calorieGoal)).toLocaleString(undefined, {style: 'percent'}));
      }
      
      const [openMealForm, setOpenMealForm] = useState(false);

      const handleCloseMealForm = () => {
          setOpenMealForm(false);
        };
        const handleOpenMealForm = () => {
          setOpenMealForm(true);
        };

    return (
    <>
     <Navbar/>
        <div>
          <Dialog open={openCalorieForm} onClose={handleCloseCalorieForm}>
            <DialogTitle>Add Calories</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{marginBottom: "10px"}}>
                What meal was this for?
              </DialogContentText>
              <Autocomplete
                id="combo-box-demo"
                options={options}
                value={meal}
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
                onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                onInput={handleCalorieInput}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseCalorieForm}>Cancel</Button>
              <Button type="submit" onClick={addCalories}>Add Calories</Button>
            </DialogActions>
          </Dialog>
        </div>

        <Dialog open={openMealForm} onClose={handleCloseMealForm}>
          <AddMealForm currentMeal={meal}/>
        </Dialog>

        
        

        <div className="pot"  onClick={handleOpenCalorieForm}>
        <img src="/icons/pot.svg"/>
          <div className="liquid">
            <div className="calorie-counter" style={{fontSize: numSize}}>
            {calorieCounter} 
            </div>
          </div>
        </div>

        <div className="calories-remaining">
          <h2 style={{marginRight: 10}}>Calories Remaining:</h2>
          <h2 style={{color: color, textShadow: '0px 0px 1px black'}}>{calorieGoal - calorieCounter}</h2>
        </div>

        <div className="meal-row">
            <div className="meal-icon" onClick={(e) => {handleOpenMealForm(); setMeal("Breakfast")}}>
                <div className="prevent-click">
                    <i className="sunrise" ></i>
                    <div className="daily-calories">{breakfastCalories}</div>
                </div>
            </div>
            <div className="meal-icon" onClick={(e) => {handleOpenMealForm(); setMeal("Lunch")}}>
                <div className="prevent-click">
                    <i className="fa-regular fa-sun" ></i>
                    <div className="daily-calories">{lunchCalories}</div>
                </div>
            </div>
            <div className="meal-icon" onClick={(e) => {handleOpenMealForm(); setMeal("Dinner")}}>
                <div className="prevent-click">
                    <i className="fa-regular fa-moon" ></i>
                    <div className="daily-calories">{dinnerCalories}</div>
                </div>
            </div>
            <div className="meal-icon" onClick={(e) => {handleOpenMealForm(); setMeal("Snack")}}>
                <div className="prevent-click">
                    <i className="fa-solid fa-cookie-bite" ></i>
                    <div className="daily-calories">{snackCalories}</div>
                </div>
            </div>
        </div>
        
    </>
    )
}