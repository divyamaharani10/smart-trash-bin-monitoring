import { useState } from "react"
import "./App.css"
import LoginPage from "./views/login_page"
import BinLevel from "./views/binLevel"
import BinMap from "./views/Map"
// import Test from "./views/testFirebase"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/map" element={<BinMap />}/>
        <Route path="/level" element={<BinLevel />}/>
        {/* <Route path="/test" element={<Test />}/> */}
      </Routes>
    </Router>
    // <div>
      // <LoginPage/>
      // <BinLevel/>
    // {/* </div> */}
  );
};

export default App;