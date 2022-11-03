import './App.css';
import { Routes, Route } from 'react-router-dom';

import Error404 from "./components/error404";
import Home from "./components/home";
import Homelog from "./components/homelog";
import Login from "./components/login";
import Postnr from "./components/postnr";
import Signup from "./components/singnup";
import Upload from "./components/upload";
import Edit from "./components/edit";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:uid" element={<Homelog />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />


      <Route path="/post/:pid" element={<Postnr />} />



      <Route path="/upload" element={<Upload />} />
      <Route path="/post/:pid/edit" element={<Edit />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
