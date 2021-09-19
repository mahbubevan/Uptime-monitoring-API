import Clock from "./Component/Clock";

function App() {
  const element = <h1>Hello World</h1>

  return (
    <div className="App">
      {element}
      <Clock />
    </div>
  );
}

export default App;
