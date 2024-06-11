import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import About from './components/About';
import Main1 from './components/Main1';
import Main2 from './components/Main2';
import Main3 from './components/Main3';
import Main4 from './components/Main4';
import Main5 from './components/Main5';
import Main6 from './components/Main6';
import Main7 from './components/Main7';
import Main8 from './components/Main8';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/main1" element={<Main1 />} />
        {/* Define route for Main2 with ID parameter */}
        <Route path="/main2/:communityId" element={<Main2 />} />
        <Route path="/main2" element={<Main2 />} />
        <Route path="/main3" element={<Main3 />} />
        <Route path="/main4" element={<Main4 />} />
        <Route path="/main5" element={<Main5 />} />
        <Route path="/main6" element={<Main6 />} />
        <Route path="/main7" element={<Main7 />} />
        <Route path="/main8" element={<Main8 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
