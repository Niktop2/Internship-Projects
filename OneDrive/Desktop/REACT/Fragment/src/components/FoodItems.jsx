import Item from "./Item"
const FoodItems = () => {

  let foodItems = ["Waran", "Bhath", "poli", "Bhaji", "tup"] ;

  return (
    <ul className="list-group">
      {foodItems.map((item) => (
        <Item key={ item }foodItem={item}></Item>
      ))}
    </ul>
  );
};

export default FoodItems;