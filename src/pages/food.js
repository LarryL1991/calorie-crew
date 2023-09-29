import Navbar from "@/components/Navbar";

function food() {
  return (
    <div>
      <Navbar/>
      <h1>Food</h1>
      <ul>
        <li><strong>Apple:</strong> Calories: 95, Carbohydrates: 25g, Dietary Fiber: 4g, Sugars: 19g, Vitamin C: 14% DV, Potassium: 6% DV</li>
        <li><strong>Grilled Chicken Breast (3 oz, cooked):</strong> Calories: 165, Protein: 31g, Total Fat: 3.6g, Saturated Fat: 1g, Cholesterol: 85mg</li>
        <li><strong>Brown Rice (1 cup, cooked):</strong> Calories: 216, Carbohydrates: 45g, Dietary Fiber: 4g, Protein: 5g, Magnesium: 21% DV, Phosphorus: 8% DV</li>
        <li><strong>Salmon (3 oz, cooked):</strong> Calories: 175, Protein: 23g, Total Fat: 9g, Omega-3 Fatty Acids: 1,000-2,000mg</li>
        <li><strong>Spinach (1 cup, cooked):</strong> Calories: 41, Carbohydrates: 7g, Dietary Fiber: 4g, Protein: 5g, Vitamin A: 377% DV, Vitamin K: 1,110% DV</li>
      </ul>
    </div>
 
  )
}

export default food;