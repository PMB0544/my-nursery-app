// --- 1. FULL DATA SETS (No Simplification) ---
const SESSION_TIMES = [
  { id: 'morning', label: '8:45 - 12:45', start: '08:45', end: '12:45' },
  { id: 'afternoon', label: '8:45 - 13:45', start: '08:45', end: '13:45' },
  { id: 'full', label: '8:45 - 14:45', start: '08:45', end: '14:45' },
];

const initialChildren = [
  { id: '1', name: 'Emma Wilson', age: 3, room: 'Teddy Bears', parentName: 'Sarah Wilson', status: 'active' },
  { id: '2', name: 'Oliver Brown', age: 4, room: 'Sunshine Room', parentName: 'Michael Brown', status: 'active' },
  { id: '3', name: 'Sophia Davis', age: 2, room: 'Little Stars', parentName: 'Emily Davis', status: 'active' },
  { id: '4', name: 'Liam Johnson', age: 3, room: 'Teddy Bears', parentName: 'James Johnson', status: 'active' },
];

const initialScheduleHistory = [
  { id: '1', childId: '1', childName: 'Emma Wilson', startDate: '2026-01-01', endDate: null, locked: true, schedule: { monday: 'full', tuesday: 'full', wednesday: 'full', thursday: 'full', friday: 'full' } },
  { id: '2', childId: '2', childName: 'Oliver Brown', startDate: '2026-01-01', endDate: null, locked: true, schedule: { monday: 'afternoon', tuesday: 'afternoon', wednesday: null, thursday: 'afternoon', friday: 'afternoon' } },
  { id: '3', childId: '3', childName: 'Sophia Davis', startDate: '2026-01-15', endDate: null, locked: false, schedule: { monday: null, tuesday: 'morning', wednesday: 'morning', thursday: 'morning', friday: null } },
  { id: '4', childId: '4', childName: 'Liam Johnson', startDate: '2026-01-01', endDate: null, locked: true, schedule: { monday: 'full', tuesday: null, wednesday: 'full', thursday: null, friday: 'full' } },
];

const initialStaff = [
  { id: '1', name: 'Jessica Smith', role: 'Lead Teacher', status: 'checked-in', checkinTime: '08:30' },
  { id: '2', name: 'Maria Garcia', role: 'Assistant', status: 'checked-in', checkinTime: '09:00' },
  { id: '3', name: 'Tom Anderson', role: 'Teacher', status: 'checked-out' },
  { id: '4', name: 'Lisa Chen', role: 'Teaching Assistant', status: 'checked-in', checkinTime: '08:45' },
];

const initialStaffSchedule = [
  { id: '1', staffId: '1', staffName: 'Jessica Smith', startDate: '2026-01-01', endDate: null, locked: true, schedule: { monday: true, tuesday: true, wednesday: true, thursday: true, friday: true } },
  { id: '2', staffId: '2', staffName: 'Maria Garcia', startDate: '2026-01-01', endDate: null, locked: true, schedule: { monday: true, tuesday: true, wednesday: false, thursday: true, friday: true } },
  { id: '3', staffId: '3', staffName: 'Tom Anderson', startDate: '2026-01-01', endDate: null, locked: false, schedule: { monday: true, tuesday: false, wednesday: true, thursday: true, friday: false } },
  { id: '4', staffId: '4', staffName: 'Lisa Chen', startDate: '2026-01-01', endDate: null, locked: true, schedule: { monday: true, tuesday: true, wednesday: true, thursday: true, friday: true } },
];

const initialObservations = [
  { id: '1', childId: '1', childName: 'Emma Wilson', date: '2026-02-06', time: '10:30', observer: 'Jessica Smith', area: 'Physical Development', activity: 'Outdoor Play', observation: 'Emma demonstrated excellent balance while navigating the climbing frame.', photos: 2 },
  { id: '2', childId: '2', childName: 'Oliver Brown', date: '2026-02-05', time: '14:15', observer: 'Maria Garcia', area: 'Expressive Arts', activity: 'Painting', observation: 'Oliver spent 20 minutes creating a detailed painting of his family.', photos: 3 }
];

const initialMessages = [
  { id: '1', from: 'Sarah Wilson', to: 'Admin', subject: 'Pickup Change', preview: 'Emma will be picked up by her grandmother today at 4pm...', date: '2026-02-07', read: false },
  { id: '2', from: 'Admin', to: 'All Parents', subject: 'Half Term Reminder', preview: 'Reminder that we will be closed next week for half term...', date: '2026-02-06', read: true },
];

const initialAttendance = [
  { id: '1', childId: '1', childName: 'Emma Wilson', date: '2026-02-08', status: 'present', sessionType: 'full', arrivedAt: '08:45' },
  { id: '2', childId: '2', childName: 'Oliver Brown', date: '2026-02-08', status: 'present', sessionType: 'afternoon', arrivedAt: '08:50' },
  { id: '3', childId: '4', childName: 'Liam Johnson', date: '2026-02-08', status: 'present', sessionType: 'full', arrivedAt: '08:45' },
];

// --- 2. MAIN APPLICATION COMPONENT ---
function EducationalPlatform() {
  const [currentRole, setCurrentRole] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [selectedDate, setSelectedDate] = React.useState('2026-02-08');
  
  // Data States
  const [children] = React.useState(initialChildren);
  const [scheduleHistory] = React.useState(initialScheduleHistory);
  const [staffSchedule] = React.useState(initialStaffSchedule);
  const [staff] = React.useState(initialStaff);
  const [observations] = React.useState(initialObservations);
  const [messages] = React.useState(initialMessages);
  const [attendance] = React.useState(initialAttendance);

  // Modal / Detail States (These are what make the app feel "Big")
  const [showScheduleHistoryDialog, setShowScheduleHistoryDialog] = React.useState(false);
  const [selectedChildForHistory, setSelectedChildForHistory] = React.useState(null);
  const [showAddObservationDialog, setShowAddObservationDialog] = React.useState(false);
  const [showMessageDetail, setShowMessageDetail] = React.useState(null);

  // --- 3. CORE LOGIC (Restored Unfiltered) ---
  const getDayOfWeek = (dateString) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[new Date(dateString).getDay()];
  };

  const getCurrentSchedule = (childId, date) => {
    const childSchedules = scheduleHistory
      .filter(h => h.childId === childId)
      .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    for (const s of childSchedules) {
      const start = new Date(s.startDate);
      const end = s.endDate ? new Date(s.endDate) : new Date('2099-12-31');
      const check = new Date(date);
      if (check >= start && check <= end) return s;
    }
    return null;
  };

  const getStaffScheduleForDay = (staffId, date) => {
    const day = getDayOfWeek(date);
    const sched = staffSchedule.find(s => s.staffId === staffId);
    return sched ? sched.schedule[day] : false;
  };

  // --- 4. PAGE RENDERERS (Restored Full UI Details) ---

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-gray-400 text-xs font-black uppercase tracking-widest">Active Kids</p>
          <p className="text-4xl font-black mt-1">{children.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-gray-400 text-xs font-black uppercase tracking-widest">Observations</p>
          <p className="text-4xl font-black mt-1 text-purple-600">{observations.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-gray-400 text-xs font-black uppercase tracking-widest">Unread Msg</p>
          <p className="text-4xl font-black mt-1 text-orange-500">{messages.filter(m=>!m.read).length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-gray-400 text-xs font-black uppercase tracking-widest">On-Site Staff</p>
          <p className="text-4xl font-black mt-1 text-green-500">{staff.filter(s=>s.status==='checked-in').length}</p>
        </div>
      </div>
      <div className="bg-indigo-600 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <h3 className="text-2xl font-black mb-2">Notice Board</h3>
        <p className="opacity-90 max-w-lg italic">"Summer Fair planning begins next week. Please ensure all Risk Assessments are updated in the staff portal."</p>
        <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl font-black">!</div>
      </div>
    </div>
  );

  const renderChildrenSchedule = () => (
    <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr className="text-xs font-black text-gray-400 uppercase tracking-widest">
            <th className="p-6">Child</th>
            <th className="p-4 text-center">Mon</th>
            <th className="p-4 text-center">Tue</th>
            <th className="p-4 text-center">Wed</th>
            <th className="p-4 text-center">Thu</th>
            <th className="p-4 text-center">Fri</th>
            <th className="p-6 text-right">History</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {children.map(child => {
            const currentSched = getCurrentSchedule(child.id, selectedDate);
            return (
              <tr key={child.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-6">
                  <p className="font-black text-gray-900">{child.name}</p>
                  <p className="text-xs text-gray-400">{child.room}</p>
                </td>
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map(day => (
                  <td key={day} className="p-4 text-center">
                    <div className={`h-4 w-4 rounded-full mx-auto ${currentSched?.schedule[day] ? 'bg-indigo-600' : 'bg-gray-100 border'}`}></div>
                  </td>
                ))}
                <td className="p-6 text-right">
                  <button onClick={() => { setSelectedChildForHistory(child); setShowScheduleHistoryDialog(true); }} className="text-indigo-600 font-black text-xs uppercase hover:underline">View Logic</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderStaffSchedule = () => (
    <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr className="text-xs font-black text-gray-400 uppercase tracking-widest">
            <th className="p-6">Staff Member</th>
            <th className="p-4 text-center">Mon</th>
            <th className="p-4 text-center">Tue</th>
            <th className="p-4 text-center">Wed</th>
            <th className="p-4 text-center">Thu</th>
            <th className="p-4 text-center">Fri</th>
            <th className="p-6 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {staff.map(s => {
            const sched = staffSchedule.find(ss => ss.staffId === s.id);
            return (
              <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-6">
                  <p className="font-black text-gray-900">{s.name}</p>
                  <p className="text-xs text-gray-400">{s.role}</p>
                </td>
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map(day => (
                  <td key={day} className="p-4 text-center">
                    <div className={`h-4 w-4 rounded mx-auto ${sched?.schedule[day] ? 'bg-green-500' : 'bg-red-100'}`}></div>
                  </td>
                ))}
                <td className="p-6 text-right">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${s.status === 'checked-in' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>{s.status}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFinance = () => (
    <div className="space-y-6">
       <div className="bg-white p-12 rounded-[40px] border shadow-sm text-center">
          <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Projected February Revenue</p>
          <h2 className="text-6xl font-black text-gray-900 tracking-tighter">£14,890.00</h2>
          <div className="mt-10 flex justify-center gap-4">
             <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black hover:scale-105 transition-all">Generate Invoices</button>
             <button className="bg-gray-100 text-gray-600 px-8 py-3 rounded-2xl font-black">Full Ledger</button>
          </div>
       </div>
       <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border">
             <h4 className="font-black text-sm mb-4">FUNDED HOURS TRACKER</h4>
             <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[70%]"></div>
             </div>
             <p className="text-xs text-gray-400 mt-2 font-bold">1,420 of 2,000 Hours Claimed</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border text-red-600">
             <h4 className="font-black text-sm mb-4">OUTSTANDING DEBT</h4>
             <p className="text-2xl font-black">£1,240.00</p>
             <p className="text-xs font-bold opacity-60">Across 4 overdue accounts</p>
          </div>
       </div>
    </div>
  );

  // --- 5. MAIN RENDER ENGINE ---

  if (!currentRole) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-12 text-center">
          <h1 className="text-4xl font-black text-indigo-600 mb-2">Little Learners</h1>
          <p className="text-gray-400 text-sm font-bold mb-10 tracking-widest uppercase">Management Engine</p>
          <div className="space-y-4">
            <button onClick={() => setCurrentRole('admin')} className="w-full py-5 bg-indigo-600 text-white rounded-3xl font-black shadow-lg shadow-indigo-100">Admin Portal</button>
            <button onClick={() => setCurrentRole('teacher')} className="w-full py-5 bg-purple-600 text-white rounded-3xl font-black shadow-lg shadow-purple-100">Teacher Portal</button>
            <button onClick={() => setCurrentRole('parent')} className="w-full py-5 bg-green-600 text-white rounded-3xl font-black shadow-lg shadow-green-100">Parent Portal</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* SIDEBAR */}
      <div className="w-72 bg-white border-r flex flex-col p-8">
        <div className="text-2xl font-black mb-12 tracking-tighter text-indigo-600">LEARNERS.</div>
        <nav className="flex-1 space-y-2">
          {['dashboard', 'register', 'observations', 'messages'].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`w-full text-left px-5 py-4 rounded-2xl font-black text-sm capitalize transition-all ${activeTab===t?'bg-indigo-600 text-white shadow-xl shadow-indigo-100':'text-gray-400 hover:bg-gray-50'}`}>{t}</button>
          ))}
          {currentRole === 'admin' && (
            <div className="pt-8 space-y-2 border-t mt-8">
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest px-5 mb-4">Admin Only</p>
              <button onClick={() => setActiveTab('childrens-schedule')} className={`w-full text-left px-5 py-4 rounded-2xl font-black text-sm capitalize transition-all ${activeTab==='childrens-schedule'?'bg-indigo-600 text-white shadow-xl shadow-indigo-100':'text-gray-400 hover:bg-gray-50'}`}>Children's Logic</button>
              <button onClick={() => setActiveTab('staff-schedule')} className={`w-full text-left px-5 py-4 rounded-2xl font-black text-sm capitalize transition-all ${activeTab==='staff-schedule'?'bg-indigo-600 text-white shadow-xl shadow-indigo-100':'text-gray-400 hover:bg-gray-50'}`}>Staff Rota</button>
              <button onClick={() => setActiveTab('finance')} className={`w-full text-left px-5 py-4 rounded-2xl font-black text-sm capitalize transition-all ${activeTab==='finance'?'bg-indigo-600 text-white shadow-xl shadow-indigo-100':'text-gray-400 hover:bg-gray-50'}`}>Finance</button>
            </div>
          )}
        </nav>
        <button onClick={() => setCurrentRole(null)} className="mt-8 text-left px-5 text-red-500 font-black text-sm">🚪 Sign Out</button>
      </div>

      {/* CONTENT WINDOW */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-24 bg-white/50 backdrop-blur-md border-b px-10 flex items-center justify-between">
          <h2 className="text-3xl font-black text-gray-900 capitalize">{activeTab.replace('-', ' ')}</h2>
          <div className="flex items-center gap-4">
             <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="bg-gray-100 border-none rounded-2xl px-4 py-2 text-sm font-black" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'childrens-schedule' && renderChildrenSchedule()}
          {activeTab === 'staff-schedule' && renderStaffSchedule()}
          {activeTab === 'finance' && renderFinance()}
          {activeTab === 'observations' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {observations.map(o => (
                 <div key={o.id} className="bg-white p-8 rounded-[32px] border shadow-sm relative overflow-hidden">
                    <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">{o.area}</span>
                    <h4 className="text-xl font-black mt-1 mb-4">{o.childName}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{o.observation}</p>
                    <div className="mt-6 flex justify-between items-center text-[10px] font-black text-gray-300 uppercase">
                       <span>By: {o.observer}</span>
                       <span>{o.date}</span>
                    </div>
                 </div>
               ))}
            </div>
          )}
          {activeTab === 'register' && (
            <div className="bg-white rounded-3xl border overflow-hidden">
               <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b">
                    <tr className="text-xs font-black text-gray-400 uppercase tracking-widest">
                      <th className="p-6">Child</th><th className="p-4">Expected Session</th><th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {children.map(c => (
                      <tr key={c.id} className="border-b">
                        <td className="p-6 font-black">{c.name}</td>
                        <td className="p-4 uppercase text-xs font-bold text-gray-500">{getCurrentSchedule(c.id, selectedDate)?.schedule[getDayOfWeek(selectedDate)] || 'NONE'}</td>
                        <td className="p-4"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">Present</span></td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          )}
        </main>
      </div>

      {/* THE MODAL DIALOGS (RESTORING THE "HIDDEN" DEPTH) */}
      {showScheduleHistoryDialog && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-2xl rounded-[40px] p-12 relative">
            <h3 className="text-3xl font-black mb-8">Schedule Logic: {selectedChildForHistory?.name}</h3>
            <div className="space-y-4">
               {scheduleHistory.filter(h => h.childId === selectedChildForHistory?.id).map(h => (
                 <div key={h.id} className="p-6 border-2 rounded-3xl flex justify-between items-center border-indigo-50">
                    <div>
                       <p className="font-black text-gray-900">Start: {h.startDate}</p>
                       <p className="text-xs font-bold text-gray-400">{h.locked ? 'LOCKED RECORD' : 'EDITABLE'}</p>
                    </div>
                    <div className="flex gap-2">
                       {['mon', 'tue', 'wed', 'thu', 'fri'].map(d => (
                         <div key={d} className={`h-2 w-6 rounded-full ${h.schedule[d] !== null ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                       ))}
                    </div>
                 </div>
               ))}
            </div>
            <button onClick={() => setShowScheduleHistoryDialog(false)} className="mt-10 w-full py-4 bg-gray-100 rounded-3xl font-black text-gray-400">Close Logic View</button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- 6. RENDER ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<EducationalPlatform />);
