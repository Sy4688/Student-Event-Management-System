import { useState } from 'react'

type Event = {
  id: string; studentName: string; studentRollNo: string; eventName: string; 
  eventLocation: string; eventDate: string; eventDescription: string;
}

export default function Events({ studentName, rollNo, events, onLogout }: any) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')

  // Attendance Badge System
  const count = events.length
  let badge = { label: 'Bronze', icon: '🥉', color: 'bg-[#cd7f32]/10 text-[#725e4c] border-[#cd7f32]/20' }
  if (count >= 7) badge = { label: 'Gold', icon: '🥇', color: 'bg-[#FFD700]/10 text-[#857000] border-[#FFD700]/20' }
  else if (count >= 4) badge = { label: 'Silver', icon: '🥈', color: 'bg-[#C0C0C0]/10 text-[#4a4a4a] border-[#C0C0C0]/20' }

  const filtered = events.filter((ev: Event) => {
    const matchesSearch = ev.eventName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMonth = selectedMonth === '' || new Date(ev.eventDate).getMonth().toString() === selectedMonth
    return matchesSearch && matchesMonth
  })

  return (
    <div className="min-h-screen bg-transparent">
      {/* Sticky Bar */}
      <header className="sticky top-0 z-10 bg-[#EFE1D5]/90 backdrop-blur-md border-b border-[#2E0D14]/10 px-8 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <h2 className="text-2xl font-normal text-[#2E0D14] tracking-tight">{studentName}</h2>
              <p className="text-[10px] font-bold text-[#2E0D14]/40 uppercase tracking-widest">{rollNo}</p>
            </div>
            <div className={`px-4 py-1.5 rounded-full border text-xs font-bold tracking-widest uppercase flex items-center gap-2 ${badge.color}`}>
              <span>{badge.icon}</span> {badge.label} Status ({count})
            </div>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <input 
              placeholder="SEARCH EVENTS..." 
              className="bg-white/50 border border-[#2E0D14]/10 rounded-lg px-4 py-2 text-xs outline-none focus:ring-1 focus:ring-[#2E0D14] w-full"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="bg-white/50 border border-[#2E0D14]/10 rounded-lg px-2 py-2 text-xs outline-none text-[#2E0D14]"
              value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="">MONTH</option>
              {['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'].map((m, i) => (
                <option key={m} value={i.toString()}>{m}</option>
              ))}
            </select>
            <button onClick={onLogout} className="bg-[#2E0D14] text-[#EFE1D5] px-4 py-2 rounded-lg text-[10px] font-bold tracking-widest uppercase">Logout</button>
          </div>
        </div>
      </header>

      <main className="p-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((ev: Event, idx: number) => (
            <div key={ev.id} className="bg-white group rounded-[2rem] p-8 shadow-xl shadow-black/5 border border-transparent hover:border-[#2E0D14]/10 transition-all">
              <div className="flex justify-between items-start mb-6">
                <h4 className="text-xl font-normal text-[#2E0D14] leading-tight uppercase tracking-tight">{ev.eventName}</h4>
                <div className="w-8 h-8 rounded-full bg-[#EFE1D5] flex items-center justify-center text-[10px] font-bold text-[#2E0D14]">
                  {idx + 1}
                </div>
              </div>
              <div className="space-y-4 text-[#2E0D14]/70">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#2E0D14]/30">Location</span>
                  <span className="text-sm font-medium">{ev.eventLocation}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#2E0D14]/30">Date</span>
                  <span className="text-sm font-medium">{new Date(ev.eventDate).toDateString()}</span>
                </div>
                <p className="pt-4 border-t border-[#2E0D14]/5 text-xs italic leading-relaxed">"{ev.eventDescription}"</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}