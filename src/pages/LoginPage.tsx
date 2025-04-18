import { useState } from "react"
import api from "../services/api"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const {login} = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      })
      const token = response.data.accessToken
      login(token, response.data.username, response.data.email)

    } catch (err) {
      setError("Wrong email or password. Try again.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-extrabold text-center mb-6">Trading Journal</h1>
      <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

      <form onSubmit={handleLogin} className="flex flex-col">
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">
            Login
          </button>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}
