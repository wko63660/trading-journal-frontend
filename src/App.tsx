import { Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import PrivateRoute from "./components/PrivateRoute"
import NewTradePage from "./pages/NewTradePage"
import Layout from "./layout/Layout"
import TradesPage from "./pages/TradesPage"
import { ToastContainer } from "react-toastify"

export default function App() {
  return (
    <div className="App min-h-screen bg-gray-100  w-full ">
      <Routes>
        {/* Login route */}
        <Route path="/login" element={<LoginPage />} />

        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Layout><DashboardPage /></Layout>
            </PrivateRoute>
          }
        />

        <Route 
          path="/trades" 
          element={
            <PrivateRoute>
              <Layout><TradesPage /></Layout>
            </PrivateRoute>
          }
        />

        <Route 
          path="/trades/new" 
          element={
            <PrivateRoute>
              <Layout><NewTradePage /></Layout>
            </PrivateRoute>
          }
        />
        <Route 
          path="/anaytics" 
          element={
            <PrivateRoute>
              <Layout><DashboardPage /></Layout>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}
