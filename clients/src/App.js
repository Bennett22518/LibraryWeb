import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Userlogin from './Components/Userlogin';
import Userregis from './Components/Userregis';
// import Nav from './Components/Nav';
import Main from './Components/Main';
import BookList from './Components/BookList';
import YourBooks from './Components/YourBooks';
import Manager from './Components/Manager';
import UserDetails from './Components/UserDetails';
// import Footer from './Components/Footer';

function App() {
  const lemail = window.localStorage.getItem("email")
  const role = window.localStorage.getItem("role")

  return (
    <div className="App">
      <HelmetProvider>
      <Routes> 
          <Route path='/home' element={ lemail ? <Home/> : <Navigate to="/" /> }/>
          {/* <Route path="/nav" element={<Nav />} /> */}
          <Route path="/" element={lemail ? <Navigate to="/home" /> : <Main/> } />
          <Route path="/booklist" element={<BookList />} />
          <Route path="/userlogin" element={<Userlogin />} />
          <Route path="/userregis" element={<Userregis />} />
          <Route path="/yourbooks" element={<YourBooks />} />
          <Route path="/manager" element={role === "Manager" ? < Manager />: <Navigate to="/home" />} />
          <Route path="/userdet" element={<UserDetails />} />
          {/* <Route path="/footer" element={<Footer />} /> */}
      </Routes>
      </HelmetProvider>
    </div>
  );
}

export default App;
