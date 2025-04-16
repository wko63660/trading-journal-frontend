import { Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import PrivateRoute from "./components/PrivateRoute"

export default function App() {
  return (
    <div className="App min-h-screen bg-gray-100 flex items-center justify-center">
      <Routes>
        {/* Login route */}
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  )
}
