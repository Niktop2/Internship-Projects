import FoodItems from "./components/FoodItems";
import ErrorMessage from "./components/ErrorMessage";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'


function App() {
    let foodItems = ["Waran", "Bhath", "poli", "Bhaji", "tup"] ;
    

   

  return (
    <>
        <h1>Healthy Food</h1>
        <ErrorMessage></ErrorMessage>
        <FoodItems></FoodItems>
      </>
  );
}

export default App;
