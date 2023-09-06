import { useEffect, useState } from "react"



export default function Home() {
    
    
    const [calorieCounter, setCalorieCounter] = useState(0);
    const [morningCalories, setMorningCalories] = useState(0);
    const [lunchCalories, setLunchCalories] = useState(0);
    const [dinnerCalories, setDinnerCalories] = useState(0);
    const [snackCalories, setSnackCalories] = useState(0);

    useEffect(() => {
        setCalorieCounter(morningCalories + lunchCalories + dinnerCalories + snackCalories)
    }, [morningCalories, lunchCalories, dinnerCalories, snackCalories])

    function changeColor(e) {
        return(
        e.target.style.backgroundColor = "green"
        )
    }


    return (
    <>
        <div className="page-aligner">
            <div className="box-content">
                This is a test thing ignore it ty
            </div>
        </div>
        
        <div className="calorie-counter">
        {calorieCounter}
        </div>
        <div className="meal-row">
            <div className="meal-icon" onClick={(e) => setMorningCalories(morningCalories + 5)}>
                <div className="prevent-click">
                    <i className="sunrise" ></i>
                    <div>{morningCalories}</div>
                </div>
            </div>
            <div className="meal-icon" onClick={() => setLunchCalories(lunchCalories + 5)}>
                <div className="prevent-click">
                    <i className="fa-regular fa-sun" ></i>
                    <div>{lunchCalories}</div>
                </div>
            </div>
            <div className="meal-icon" onClick={() => setDinnerCalories(dinnerCalories + 5)}>
                <div className="prevent-click">
                    <i className="fa-regular fa-moon" ></i>
                    <div>{dinnerCalories}</div>
                </div>
            </div>
            <div className="meal-icon" onClick={() => setSnackCalories(snackCalories + 5)}>
                <div className="prevent-click">
                    <i className="fa-solid fa-cookie-bite" ></i>
                    <div>{snackCalories}</div>
                </div>
            </div>
        
        {/* <i className="fa-regular fa-sun"></i>
        <i className="fa-regular fa-moon"></i>
        <i class="fa-solid fa-cookie-bite"></i>
        </div>
        <div className="meal-numbers">

        <div>0</div>
        <div>0</div>
        <div>0</div> */}
        </div>
        
    </>
    )
}