import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Image from './Image'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Image/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
           