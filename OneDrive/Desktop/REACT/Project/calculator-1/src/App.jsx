import Display from "./components/Display";

import styles from "./App.module.css";
import ButtonsContainer from "./components/ButtonContainer";

function App() {
  return (
    <div className={styles.calculator}>
      <Display></Display>
      <ButtonsContainer></ButtonsContainer>
    </div>
  );
}

export default App;
