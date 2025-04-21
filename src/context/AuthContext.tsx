import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { useNavigate } from "react-router-dom"

interface AuthContextType {
  isAuthenticated: boolean
  login: (token: string, user: { username: string, email: string, role: string}) => void
  logout: () => void
  isLoading: boolean
  username: string | null
  email: string | null
  role: string | null
  // id: number | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [isLoading, setLoading] = useState(true)
  
  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    const savedUsername = localStorage.getItem("username")
    const savedEmail = localStorage.getItem("email")
    const savedRole = localStorage.getItem("role")
    // const savedId = localStorage.getItem("id")
    if (token && savedUsername && savedEmail) {
      setIsAuthenticated(true)
      setUsername(savedUsername)
      setEmail(savedEmail)
      setRole(savedRole)
    }
    setLoading(false)
  }, [])

  const login = (token: string, user: { username: string, email: string, role:string }) => {
    localStorage.setItem("accessToken", token)
    localStorage.setItem("username", user.username)
    localStorage.setItem("email", user.email)
    localStorage.setItem("role", user.role)
    setUsername(user.username)
    setEmail(user.email)
    setRole(user.role)
    setIsAuthenticated(true)
    navigate("/dashboard")
  }

  const logout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("usernmame")
    localStorage.removeItem("email")
    localStorage.removeItem("role")
    setIsAuthenticated(false)
    navigate("/login")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading, username, email, role}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
