import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { useNavigate } from "react-router-dom"

interface AuthContextType {
  isAuthenticated: boolean
  login: (token: string, username: string, email: string ) => void
  logout: () => void
  isLoading: boolean
  username: string | null
  email: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [isLoading, setLoading] = useState(true)
  
  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    const savedUsername = localStorage.getItem("username")
    const savedEmail = localStorage.getItem("email")
    if (token && savedUsername && savedEmail) {
      setIsAuthenticated(true)
      setUsername(savedUsername)
      setEmail(savedEmail)
    }
    setLoading(false)
  }, [])

  const login = (token: string, username: string, email: string) => {
    localStorage.setItem("accessToken", token)
    localStorage.setItem("username", username)
    localStorage.setItem("email", email)
    setUsername(username)
    setEmail(email)
    setIsAuthenticated(true)
    navigate("/dashboard")
  }

  const logout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("usernmame")
    localStorage.removeItem("email")
    setIsAuthenticated(false)
    navigate("/login")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading, username, email }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
