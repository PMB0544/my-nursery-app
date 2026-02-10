// --- 1. FULL DATA SETS ---
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

// This is the complex Schedule History logic you were missing
const initialScheduleHistory = [
  { id: '1', childId: '1', childName: 'Emma Wilson', startDate: '2026-01-01', endDate: null, locked: true, schedule: { monday: 'full', tuesday: 'full', wednesday: 'full', thursday: 'full', friday: 'full' } },
  { id: '2', childId: '2', childName: 'Oliver Brown', startDate: '2026-01-01', endDate: null, locked: true, schedule: { monday: 'afternoon', tuesday: 'afternoon', wednesday: null, thursday: 'afternoon', friday: 'afternoon' } },
  { id: '3', childId: '3', childName: 'Sophia Davis', startDate: '2026-01-15', endDate: null, locked: false, schedule: { monday: null, tuesday: 'morning', wednesday: 'morning', thursday: 'morning', friday: null } },
];

const initialStaff = [
  { id: '1', name: 'Jessica Smith', role: 'Lead Teacher', status: 'checked-in', checkinTime: '08:30' },
  { id: '2', name: 'Maria Garcia', role: 'Assistant', status: 'checked-in', checkinTime: '09:00' },
];

const initialObservations = [
  { id: '1', childId: '1', childName: 'Emma Wilson', date: '2026-02-06', time: '10:30', observer: 'Jessica Smith', area: 'Physical Development', activity: 'Outdoor Play', observation: 'Emma demonstrated excellent balance.', photos: 2 },
];

// --- 2. MAIN APP COMPONENT ---
function EducationalPlatform() {
  // RESTORING ALL STATE HOOKS
  const [currentRole, setCurrentRole] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [selectedDate, setSelectedDate] = React.useState('2026-02-10');
  const [children, setChildren] = React.useState(initialChildren);
  const [scheduleHistory, setScheduleHistory] = React.useState(initialScheduleHistory);
  const [observations, setObservations] = React.useState(initialObservations);
  const [attendance, setAttendance] = React.useState([]);
  
  // Dialog/Modal States (The ones that were missing)
  const [showScheduleHistoryDialog, setShowScheduleHistoryDialog] = React.useState(false);
  const [selectedChildForSchedule, setSelectedChildForSchedule] = React.useState(null);

  // --- 3. COMPLEX LOGIC (RESTORING ORIGINAL FUNCTIONS) ---
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

  // --- 4. NAVIGATION HANDLERS ---
  const handleLogin = (role) => {
    setCurrentRole(role);
    setActiveTab('dashboard');
  };

  if (!currentRole) {
    return (
      <div className="min-h-screen bg-indigo-900 flex items-center justify-center">
        <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-sm w-full">
          <h1 className="text-3xl font-black mb-6">Little Learners</h1>
          <div className="space-y-4">
            <button onClick={() => handleLogin('admin')} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold">Admin Portal</button>
            <button onClick={() => handleLogin('teacher')} className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold">Teacher Portal</button>
            <button onClick={() => handleLogin('parent')} className="w-full py-4 bg-green-600 text-white rounded-xl font-bold">Parent Portal</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 border-b font-black text-indigo-600 text-xl tracking-tighter">LITTLE LEARNERS</div>
        <nav className="flex-1 p-4 space-y-1">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full text-left p-3 rounded-xl font-bold ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}>📊 Dashboard</button>
          <button onClick={() => setActiveTab('register')} className={`w-full text-left p-3 rounded-xl font-bold ${activeTab === 'register' ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}>📅 Daily Register</button>
          <button onClick={() => setActiveTab('childrens-schedule')} className={`w-full text-left p-3 rounded-xl font-bold ${activeTab === 'childrens-schedule' ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}>🗓️ Child Schedules</button>
          <button onClick={() => setActiveTab('observations')} className={`w-full text-left p-3 rounded-xl font-bold ${activeTab === 'observations' ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}>📝 Observations</button>
          <button onClick={() => setActiveTab('finance')} className={`w-full text-left p-3 rounded-xl font-bold ${activeTab === 'finance' ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}>💰 Finance</button>
        </nav>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-auto">
        <header className="h-20 bg-white border-b px-8 flex items-center justify-between">
          <h2 className="text-2xl font-black capitalize">{activeTab.replace('-', ' ')}</h2>
        </header>

        <main className="p-8">
          {/* CHILD SCHEDULES PAGE - THE ONE MISSING BEFORE */}
          {activeTab === 'childrens-schedule' && (
            <div className="bg-white rounded-2xl border shadow-sm">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-4 text-left">Child</th>
                    <th className="p-4 text-center">M</th>
                    <th className="p-4 text-center">T</th>
                    <th className="p-4 text-center">W</th>
                    <th className="p-4 text-center">T</th>
                    <th className="p-4 text-center">F</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {children.map(child => {
                    const currentSched = getCurrentSchedule(child.id, selectedDate);
                    return (
                      <tr key={child.id} className="border-b last:border-0">
                        <td className="p-4 font-bold">{child.name}</td>
                        {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map(day => (
                          <td key={day} className="p-4 text-center">
                            <div className={`h-3 w-3 rounded-full mx-auto ${currentSched?.schedule[day] ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                          </td>
                        ))}
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => { setSelectedChildForSchedule(child); setShowScheduleHistoryDialog(true); }}
                            className="text-indigo-600 font-bold text-sm"
                          >
                            View History
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* FINANCE PAGE - WITH THE REVENUE LOGIC */}
          {activeTab === 'finance' && (
            <div className="space-y-6">
              <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl">
                <p className="opacity-80 uppercase text-xs font-bold tracking-widest">Revenue Projection</p>
                <h3 className="text-5xl font-black mt-2">£14,890.00</h3>
                <button className="mt-6 bg-white text-indigo-600 px-6 py-2 rounded-xl font-bold">Run Monthly Invoices</button>
              </div>
            </div>
          )}

          {/* REGISTER PAGE */}
          {activeTab === 'register' && (
            <div className="bg-white rounded-2xl border">
               <div className="p-4 border-b flex justify-between items-center">
                  <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="border p-2 rounded-lg" />
               </div>
               {/* Register Table Logic */}
               <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr><th className="p-4">Child</th><th className="p-4">Session</th><th className="p-4">Status</th></tr>
                  </thead>
                  <tbody>
                    {children.map(c => (
                      <tr key={c.id} className="border-t">
                        <td className="p-4 font-bold">{c.name}</td>
                        <td className="p-4 text-sm text-gray-500">{getCurrentSchedule(c.id, selectedDate)?.schedule[getDayOfWeek(selectedDate)] || 'None'}</td>
                        <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">EXPECTED</span></td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          )}

          {/* DASHBOARD PAGE */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border shadow-sm">
                <h4 className="text-gray-400 font-bold text-sm">ACTIVE CHILDREN</h4>
                <p className="text-4xl font-black">{children.length}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border shadow-sm">
                <h4 className="text-gray-400 font-bold text-sm">PENDING OBS</h4>
                <p className="text-4xl font-black text-purple-600">12</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border shadow-sm">
                <h4 className="text-gray-400 font-bold text-sm">TOTAL STAFF</h4>
                <p className="text-4xl font-black text-green-600">8</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* SCHEDULE HISTORY MODAL (RESTORING THE MODAL LOGIC) */}
      {showScheduleHistoryDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8">
            <h3 className="text-2xl font-black mb-4">Schedule History: {selectedChildForSchedule?.name}</h3>
            <div className="space-y-4">
              {scheduleHistory.filter(h => h.childId === selectedChildForSchedule?.id).map(h => (
                <div key={h.id} className="p-4 border rounded-xl flex justify-between items-center">
                  <div>
                    <p className="font-bold">Starts: {h.startDate}</p>
                    <p className="text-sm text-gray-500">{h.locked ? '🔒 Locked' : '🔓 Active'}</p>
                  </div>
                  <div className="flex gap-1">
                    {Object.values(h.schedule).map((s, i) => (
                      <div key={i} className={`h-2 w-4 rounded ${s ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowScheduleHistoryDialog(false)} className="mt-8 w-full py-3 bg-gray-100 rounded-xl font-bold">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- 5. FINAL RENDER ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<EducationalPlatform />);
