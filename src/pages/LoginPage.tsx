import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      })
      const token = response.data.accessToken
      localStorage.setItem("accessToken", token)
      navigate("/dashboard")
    } catch (err) {
      setError("Invalid credentials. Try again.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-extrabold text-center mb-6">Trading Journal</h1>
      <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

      <form>
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
