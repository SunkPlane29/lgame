import "./App.css";
import Game from "./Game";

// @ts-ignore
import gameDataFile from "./game_data/game.yml";

function App() {
  return (
    <div className="App">
      <Game gameDataFile={gameDataFile} />
    </div>
  );
}

export default App;
