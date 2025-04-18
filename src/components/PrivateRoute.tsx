import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { ReactNode } from "react"

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()
  const {isLoading} = useAuth()
  if (isLoading){
    return <div className="flex w-full items-center justify-center min-h-screen bg-gray-100">Loading...</div>
  }
  return isAuthenticated ? children : <Navigate to="/login" replace />
}
