import './App.css';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AppRouter from "./components/AppRouter";


function App() {
  return (
      <div className="App">
          <Navbar/>
          <AppRouter/>
      </div>
  );
}

export default App;
