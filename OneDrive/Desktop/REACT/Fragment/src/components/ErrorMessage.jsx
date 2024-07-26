const ErrorMessage = () => {


  let foodItems = ["Waran", "Bhath", "poli", "Bhaji", "tup"] ;
    
  return <>{ foodItems.length === 0 && <h3> I am still Hungry </h3>}</>;
};

export default ErrorMessage;