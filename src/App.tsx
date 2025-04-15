import { Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"

export default function App() {
  return (
    <Routes>
      {/* Login route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Redirect everything else to /login for now */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}
