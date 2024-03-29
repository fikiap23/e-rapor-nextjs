'use client'
import authService from '@/services/auth.service'
import React, { useState } from 'react'

const Tespage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    try {
      const payload = { username, password }
      const result = await authService.login(payload)
      console.log(`Login result: ${result.access_token}`)
    } catch (error) {
      console.log(`Login error: ${error}`)
      setError(error)
    }
  }

  return (
    <div>
      <h1>Login Page</h1>

      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button onClick={handleSubmit}>Login</button>

      {error && <p>{error}</p>}
    </div>
  )
}

export default Tespage
