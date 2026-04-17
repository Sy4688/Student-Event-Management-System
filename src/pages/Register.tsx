import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    studentName: '',
    rollNo: '',
    email: '',
    password: ''
  })
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:8082/api/students/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    if (res.ok) navigate('/login')
    else setMessage('Registration failed. Please try again.')
  }

  const inputCls = "w-full bg-white/40 border border-[#2E0D14]/10 rounded-xl px-4 py-3 mb-3 focus:outline-none focus:ring-1 focus:ring-[#2E0D14] focus:bg-white transition-all text-[#2E0D14] placeholder-[#2E0D14]/40"

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent p-6">
      <div className="bg-[#EFE1D5] p-10 rounded-[2.5rem] shadow-2xl shadow-black/20 w-full max-w-md border border-[#d6c9bc]">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-normal text-[#2E0D14] tracking-tight">Join the Community</h2>
          <div className="h-0.5 bg-[#2E0D14]/10 w-12 mx-auto mt-4"></div>
        </div>

        <div className="space-y-1">
          <input name="studentName" placeholder="FULL NAME" value={form.studentName} onChange={handleChange} className={inputCls} />
          <input name="rollNo" placeholder="ROLL NUMBER" value={form.rollNo} onChange={handleChange} className={inputCls} />
          <input name="email" placeholder="EMAIL ID" value={form.email} onChange={handleChange} className={inputCls} />
          <input name="password" type="password" placeholder="PASSWORD" value={form.password} onChange={handleChange} className={inputCls} />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#2E0D14] text-[#EFE1D5] py-4 rounded-xl mt-6 text-sm font-bold hover:opacity-90 transition-all tracking-[0.2em] uppercase shadow-lg shadow-black/10"
        >
          Create Account
        </button>

        {message && <p className="text-red-700 text-xs mt-4 text-center italic">{message}</p>}

        <p className="text-center text-xs mt-8 text-[#2E0D14]/60 font-medium tracking-widest uppercase">
          Already registered?{' '}
          <button onClick={() => navigate('/login')} className="text-[#2E0D14] font-bold underline decoration-1 underline-offset-4">
            Sign In
          </button>
        </p>
      </div>
    </div>
  )
}