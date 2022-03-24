import { Route, Routes } from 'react-router-dom';
import Games from './components/Games';
import Homepage from './components/Homepage';
import Logout from './components/Logout';
import NavBar from './components/NavBar';
import NoLogin from './components/NoLogin';
import RequireLogin from './components/RequireLogin';
import LoginForm from './forms/LoginForm';
import RegisterForm from './forms/RegisterForm';
import EditProfileForm from './forms/EditProfileForm';

function App() {
  return (
    <>
      <NavBar>
        <Routes>
          <Route path="/" element={<Homepage />}/>

          <Route path="/login" element={<NoLogin redirectTo={"/games"}><LoginForm /></NoLogin>}/>
          <Route path="/register" element={<NoLogin redirectTo={"/games"}><RegisterForm /></NoLogin>}/>

          <Route path="/logout" element={<RequireLogin redirectTo={"/login"}><Logout /></RequireLogin>}/>
          <Route path="/games" element={<RequireLogin redirectTo={"/login"}><Games /></RequireLogin>}/>
          <Route path="/profile" element={<RequireLogin redirectTo={"/login"}><EditProfileForm /></RequireLogin>}/>

          <Route path="*" element={<Homepage />}/>
        </Routes>
      </NavBar>
    </>
  );
};

export default App;
