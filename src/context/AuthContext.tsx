import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { useNavigate } from "react-router-dom"

interface AuthContextType {
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setLoading] = useState(true)
  
  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if(token){
        setIsAuthenticated(true)
        setLoading(false)
    }
  }, [])

  const login = (token: string) => {
    localStorage.setItem("accessToken", token)
    setIsAuthenticated(true)
    navigate("/dashboard")
  }

  const logout = () => {
    localStorage.removeItem("accessToken")
    setIsAuthenticated(false)
    navigate("/login")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
