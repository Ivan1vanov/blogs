import React from 'react';
import Layout from './layouts/Layouts';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import MainPage from './Pages/Main_Page/MainPage';
import AuthPage from './Pages/Auth_Page/AuthPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Layout>
    
    
      <Routes>
        <Route path='/' element={<MainPage/>} />
        <Route path='/auth' element={<AuthPage/>} />
      </Routes>
      </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
