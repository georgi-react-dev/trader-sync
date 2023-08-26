import "./App.css";
import Calendar from "./components/calendar/Calendar";
import Chart from "./components/chart/TradingViewWidget";
function App() {
  return (
    <div className="App">
      <Calendar />
      <Chart />
    </div>
  );
}

export default App;
