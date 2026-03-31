import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './pages/ApplicationForm';
import ApplicationStatus from './pages/ApplicationStatus';
import { UserProvider } from './context/userContext';

export default function App() {
  return (
    <UserProvider>
      
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="application-form" element={<ApplicationForm />} />
            <Route path="application-status" element={<ApplicationStatus />} />
          </Route>
        </Routes>
      </HashRouter>
    </UserProvider>
  );
}
