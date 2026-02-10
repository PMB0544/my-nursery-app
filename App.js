// --- CONSTANTS ---
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

const initialStaff = [
  { id: '1', name: 'Jessica Smith', role: 'Lead Teacher', status: 'checked-in', checkinTime: '08:30' },
  { id: '2', name: 'Maria Garcia', role: 'Assistant', status: 'checked-in', checkinTime: '09:00' },
  { id: '3', name: 'Tom Anderson', role: 'Teacher', status: 'checked-out' },
  { id: '4', name: 'Lisa Chen', role: 'Teaching Assistant', status: 'checked-in', checkinTime: '08:45' },
];

const initialObservations = [
  { id: '1', childId: '1', childName: 'Emma Wilson', date: '2026-02-06', time: '10:30', observer: 'Jessica Smith', area: 'Physical Development', activity: 'Outdoor Play', observation: 'Emma demonstrated excellent balance while navigating the climbing frame.', photos: 2 },
  { id: '2', childId: '2', childName: 'Oliver Brown', date: '2026-02-05', time: '14:15', observer: 'Maria Garcia', area: 'Expressive Arts', activity: 'Painting', observation: 'Oliver spent 20 minutes creating a detailed painting of his family.', photos: 3 }
];

const initialMessages = [
  { id: '1', from: 'Sarah Wilson', to: 'Admin', subject: 'Pickup Change', preview: 'Emma will be picked up by her grandmother today at 4pm...', date: '2026-02-07', read: false },
  { id: '2', from: 'Admin', to: 'All Parents', subject: 'Half Term Reminder', preview: 'Reminder that we will be closed next week for half term...', date: '2026-02-06', read: true },
];

const initialSessions = [
  { id: '1', title: 'Music Time', room: 'Teddy Bears', startTime: '10:00', endTime: '10:30', staff: 'Jessica Smith' },
  { id: '2', title: 'Story Circle', room: 'Sunshine Room', startTime: '14:00', endTime: '14:30', staff: 'Tom Anderson' },
];

const initialScheduleHistory = [
  { id: '1', childId: '1', childName: 'Emma Wilson', startDate: '2026-01-01', endDate: null, locked: true, schedule: { monday: 'full', tuesday: 'full', wednesday: 'full', thursday: 'full', friday: 'full' } },
  { id: '2', childId: '2', childName: 'Oliver Brown', startDate: '2026-01-01', endDate: null, locked: true, schedule: { monday: 'afternoon', tuesday: 'afternoon', wednesday: null, thursday: 'afternoon', friday: 'afternoon' } },
  { id: '3', childId: '3', childName: 'Sophia Davis', startDate: '2026-01-15', endDate: null, locked: false, schedule: { monday: null, tuesday: 'morning', wednesday: 'morning', thursday: 'morning', friday: null } },
  { id: '4', childId: '4', childName: 'Liam Johnson', startDate: '2026-01-01', endDate: null, locked: true, schedule: { monday: 'full', tuesday: null, wednesday: 'full', thursday: null, friday: 'full' } },
];

const initialStaffSchedule = [
  { id: '1', staffId: '1', staffName: 'Jessica Smith', startDate: '2026-01-01', endDate: null, locked: true, schedule: { monday: true, tuesday: true, wednesday: true, thursday: true, friday: true } },
  { id: '2', staffId: '2', staffName: 'Maria Garcia', startDate: '2026-01-01', endDate: null, locked: true, schedule: { monday: true, tuesday: true, wednesday: false, thursday: true, friday: true } },
  { id: '3', staffId: '3', staffName: 'Tom Anderson', startDate: '2026-01-01', endDate: null, locked: false, schedule: { monday: true, tuesday: false, wednesday: true, thursday: true, friday: false } },
  { id: '4', staffId: '4', staffName: 'Lisa Chen', startDate: '2026-01-01', endDate: null, locked: true, schedule: { monday: true, tuesday: true, wednesday: true, thursday: true, friday: true } },
];

const initialAttendance = [
  { id: '1', childId: '1', childName: 'Emma Wilson', date: '2026-02-08', status: 'present', sessionType: 'full', arrivedAt: '08:45' },
  { id: '2', childId: '2', childName: 'Oliver Brown', date: '2026-02-08', status: 'present', sessionType: 'afternoon', arrivedAt: '08:50' },
  { id: '3', childId: '4', childName: 'Liam Johnson', date: '2026-02-08', status: 'present', sessionType: 'full', arrivedAt: '08:45' },
];

function EducationalPlatform() {
  // --- STATE ---
  const [currentRole, setCurrentRole] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [children, setChildren] = React.useState(initialChildren);
  const [staff, setStaff] = React.useState(initialStaff);
  const [observations, setObservations] = React.useState(initialObservations);
  const [messages, setMessages] = React.useState(initialMessages);
  const [sessions, setSessions] = React.useState(initialSessions);
  const [scheduleHistory, setScheduleHistory] = React.useState(initialScheduleHistory);
  const [staffSchedule, setStaffSchedule] = React.useState(initialStaffSchedule);
  const [attendance, setAttendance] = React.useState(initialAttendance);
  const [selectedDate, setSelectedDate] = React.useState('2026-02-08');
  
  // Dialog States
  const [showScheduleHistoryDialog, setShowScheduleHistoryDialog] = React.useState(false);
  const [showAddObservationDialog, setShowAddObservationDialog] = React.useState(false);

  // --- LOGIC ---
  const handleLogin = (role) => {
    setCurrentRole(role);
    if (role === 'parent') setCurrentUser({ name: 'Sarah Wilson', childName: 'Emma Wilson', childId: '1' });
    else if (role === 'teacher') setCurrentUser({ name: 'Jessica Smith' });
    else setCurrentUser({ name: 'Admin User' });
    setActiveTab('dashboard');
  };

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

  // --- RENDER HELPERS ---
  const renderSidebar = () => (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-6 border-b border-gray-200 flex items-center gap-3">
        <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center">
          <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
        </div>
        <div><h1 className="font-bold text-gray-900 leading-tight">Little Learners</h1><p className="text-xs text-gray-500 capitalize">{currentRole} Portal</p></div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {['dashboard', 'register', 'observations', 'messages'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
        ))}
        {currentRole === 'admin' && (
          <div className="pt-4 border-t mt-4">
             <p className="px-3 text-xs font-bold text-gray-400 uppercase mb-2">Admin</p>
             <button onClick={() => setActiveTab('childrens-schedule')} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${activeTab === 'childrens-schedule' ? 'bg-indigo-600 text-white' : 'text-gray-700'}`}>Children's Schedule</button>
             <button onClick={() => setActiveTab('staff')} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${activeTab === 'staff' ? 'bg-indigo-600 text-white' : 'text-gray-700'}`}>Staff Schedule</button>
             <button onClick={() => setActiveTab('finance')} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${activeTab === 'finance' ? 'bg-indigo-600 text-white' : 'text-gray-700'}`}>Finance</button>
          </div>
        )}
      </nav>
      <div className="p-4 border-t"><button onClick={() => setCurrentRole(null)} className="w-full py-2 bg-gray-100 rounded-lg text-sm font-medium">Logout</button></div>
    </div>
  );

  if (!currentRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Little Learners</h1>
            <p className="text-gray-600">Early Years Platform</p>
          </div>
          <div className="space-y-3">
            <button className="w-full h-14 bg-indigo-600 text-white font-bold rounded-xl" onClick={() => handleLogin('admin')}>Login as Admin</button>
            <button className="w-full h-14 bg-purple-600 text-white font-bold rounded-xl" onClick={() => handleLogin('teacher')}>Login as Teacher</button>
            <button className="w-full h-14 bg-green-600 text-white font-bold rounded-xl" onClick={() => handleLogin('parent')}>Login as Parent</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {renderSidebar()}
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeTab.replace('-', ' ')}</h1>
        </header>
        <main className="p-8">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
               <div className="bg-white p-6 rounded-xl border"><h3>Total Children</h3><p className="text-3xl font-bold">{children.length}</p></div>
               <div className="bg-white p-6 rounded-xl border"><h3>Observations</h3><p className="text-3xl font-bold">{observations.length}</p></div>
               <div className="bg-white p-6 rounded-xl border"><h3>Unread Messages</h3><p className="text-3xl font-bold">{messages.filter(m=>!m.read).length}</p></div>
               <div className="bg-white p-6 rounded-xl border"><h3>Staff On-Site</h3><p className="text-3xl font-bold">{staff.filter(s=>s.status==='checked-in').length}</p></div>
            </div>
          )}
          
          {activeTab === 'register' && (
            <div className="bg-white rounded-xl border">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr><th className="p-4">Child</th><th className="p-4">Session</th><th className="p-4">Arrived</th><th className="p-4">Status</th></tr>
                </thead>
                <tbody>
                  {children.map(c => {
                    const day = getDayOfWeek(selectedDate);
                    const sched = getCurrentSchedule(c.id, selectedDate);
                    const sessionType = sched?.schedule[day];
                    const att = attendance.find(a => a.childId === c.id && a.date === selectedDate);
                    return (
                      <tr key={c.id} className="border-t">
                        <td className="p-4 font-medium">{c.name}</td>
                        <td className="p-4">{sessionType || 'Not Scheduled'}</td>
                        <td className="p-4">{att?.arrivedAt || '--:--'}</td>
                        <td className="p-4"><span className={`px-2 py-1 rounded text-xs ${att?'bg-green-100 text-green-700':'bg-gray-100 text-gray-500'}`}>{att?.status || 'Absent'}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'observations' && (
            <div className="space-y-4">
              <button onClick={() => setShowAddObservationDialog(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold">Add Observation</button>
              {observations.map(o => (
                <div key={o.id} className="bg-white p-6 rounded-xl border shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{o.childName}</h3>
                    <span className="text-xs text-gray-400">{o.date}</span>
                  </div>
                  <p className="text-indigo-600 text-sm font-bold uppercase mb-2">{o.area}</p>
                  <p className="text-gray-700">{o.observation}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'finance' && (
             <div className="bg-white p-12 rounded-2xl border text-center shadow-sm">
               <h2 className="text-4xl font-black mb-2">£14,890.00</h2>
               <p className="text-gray-500 font-medium">Projected Revenue for February 2026</p>
               <div className="mt-8 flex justify-center gap-4">
                 <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold">Generate Invoices</button>
                 <button className="bg-white border border-gray-200 px-6 py-3 rounded-xl font-bold">Export CSV</button>
               </div>
             </div>
          )}
        </main>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<EducationalPlatform />);
