import './App.css';
import { HashRouter, Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';

import {LoginPage} from './Views/LoginPage';
import { ReimbursementPage } from './Views/ReimbursementPage';
import { ProfilePage } from './Views/ProfilePage';

function App ()  {

  return (
    <div>
      <div className="topnav">
        <ul>
          <li className="home"><a href="/login">ERS</a></li>
          <li id="nav-1"><a href="#">Profile</a></li>
          <li id="nav-1"><a href="/reimbursements">Reimbursements</a></li>
        </ul>
      </div>

      <BrowserRouter>
        <Routes >
            <Route path="/" element={<Navigate to="/login" replace/>}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/reimbursements" element={<ReimbursementPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    // <HashRouter>
    //     <Routes >
    //         <Route path="*" element={<Navigate to="/login" replace />} />
    //         <Route path="/login" element={<LoginPage />}/>
    //         <Route path="/feed" element={<UserHomePage />}/>
    //         <Route path="/user/view" element={<UserView />}/>
    //         <Route path="/manager/view" element={<ManagerView />}/>
    //         <Route path="/manager/feed" element={<ManagerHomePage />}/>
    //     </Routes>
    //   </HashRouter>
  );
}

export default App;
