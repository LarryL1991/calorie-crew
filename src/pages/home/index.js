import { useState } from "react"



export default function Home() {
    const [calorieCounter, setCalorieCounter] = useState(0);


    return (
    <>
        <div className="calorie-counter">
        {calorieCounter}
        </div>

    </>
    )
}