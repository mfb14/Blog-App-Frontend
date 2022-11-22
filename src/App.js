
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import NavBar from './components/NavBar/Navbar';
import Home from './components/Home/Home';
import User from './components/User/User';
import Post from './components/Post/Post';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element = {<Home />}></Route>
        <Route path="/users/:userId" element ={<User />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
