import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Events from './Events'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [events, setEvents] = useState([])
  const [studentName, setStudentName] = useState('')
  const [rollNo, setRollNo] = useState('')
  const [error, setError] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleLogin = async () => {
    setError('')
    try {
      const loginRes = await fetch('http://localhost:8082/api/students/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (!loginRes.ok) {
        setError('Invalid credentials.')
        return
      }

      const student = await loginRes.json()
      setStudentName(student.studentName)
      setRollNo(student.rollNo)

      const eventsRes = await fetch(`http://localhost:8083/api/events/student/${student.rollNo}`)
      const eventsData = await eventsRes.json()
      setEvents(eventsData)
      setLoggedIn(true)
    } catch (err) {
      setError('Connection failed.')
    }
  }

  if (loggedIn) {
    return <Events studentName={studentName} rollNo={rollNo} events={events} onLogout={() => setLoggedIn(false)} />
  }

  const inputCls = "w-full bg-white/40 border border-[#2E0D14]/10 rounded-xl px-4 py-3 mb-3 focus:outline-none focus:ring-1 focus:ring-[#2E0D14] focus:bg-white transition-all text-[#2E0D14] placeholder-[#2E0D14]/40"

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent p-6">
      <div className="bg-[#EFE1D5] p-10 rounded-[2.5rem] shadow-2xl shadow-black/20 w-full max-w-md border border-[#d6c9bc]">
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-white/30 mb-4 border border-[#2E0D14]/10">
             <svg className="w-8 h-8 text-[#2E0D14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
             </svg>
          </div>
          <h2 className="text-4xl font-normal text-[#2E0D14] tracking-tight uppercase">Login</h2>
        </div>

        <input name="email" placeholder="EMAIL ID" value={form.email} onChange={handleChange} className={inputCls} />
        <input name="password" type="password" placeholder="PASSWORD" value={form.password} onChange={handleChange} className={inputCls} />

        <button
          onClick={handleLogin}
          className="w-full bg-[#2E0D14] text-[#EFE1D5] py-4 rounded-xl mt-4 text-sm font-bold hover:opacity-90 transition-all tracking-[0.2em] uppercase shadow-lg shadow-black/10"
        >
          Sign In
        </button>

        {error && <p className="text-red-700 text-xs mt-4 text-center italic">{error}</p>}

        <p className="text-center text-xs mt-8 text-[#2E0D14]/60 font-medium tracking-widest uppercase">
          New Student?{' '}
          <button onClick={() => navigate('/register')} className="text-[#2E0D14] font-bold underline decoration-1 underline-offset-4">
            Register
          </button>
        </p>
      </div>
    </div>
  )
}