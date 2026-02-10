// --- 1. CONFIGURATION & CONSTANTS ---
const SESSION_TIMES = [
  { id: 'morning', label: '8:45 - 12:45', start: '08:45', end: '12:45' },
  { id: 'afternoon', label: '8:45 - 13:45', start: '08:45', end: '13:45' },
  { id: 'full', label: '8:45 - 14:45', start: '08:45', end: '14:45' },
];

const ROOMS = ['Teddy Bears', 'Sunshine Room', 'Little Stars', 'Preschool'];

const AREAS_OF_LEARNING = [
  'Personal, Social and Emotional',
  'Communication and Language',
  'Physical Development',
  'Literacy',
  'Mathematics',
  'Understanding the World',
  'Expressive Arts and Design'
];

// --- 2. INITIAL DATA SETS (UNFILTERED) ---
const initialChildren = [
  { id: '1', name: 'Emma Wilson', age: 3, room: 'Teddy Bears', parentName: 'Sarah Wilson', status: 'active', dob: '2023-05-12', allergies: 'None', doctors: 'St. Marys Medical' },
  { id: '2', name: 'Oliver Brown', age: 4, room: 'Sunshine Room', parentName: 'Michael Brown', status: 'active', dob: '2022-01-15', allergies: 'Nuts', doctors: 'Green Valley GP' },
  { id: '3', name: 'Sophia Davis', age: 2, room: 'Little Stars', parentName: 'Emily Davis', status: 'active', dob: '2024-03-20', allergies: 'Dairy', doctors: 'City Health Center' },
  { id: '4', name: 'Liam Johnson', age: 3, room: 'Teddy Bears', parentName: 'James Johnson', status: 'active', dob: '2023-08-05', allergies: 'None', doctors: 'St. Marys Medical' },
];

const initialScheduleHistory = [
  { id: '1', childId: '1', childName: 'Emma Wilson', startDate: '2026-01-01', endDate: null, locked: true, schedule: { monday: 'full', tuesday: 'full', wednesday: 'full', thursday: 'full', friday: 'full' } },
  { id: '2', childId: '2', childName: 'Oliver Brown', startDate: '2026-01-01', endDate: null, locked: true, schedule: { monday: 'afternoon', tuesday: 'afternoon', wednesday: null, thursday: 'afternoon', friday: 'afternoon' } },
  { id: '3', childId: '3', childName: 'Sophia Davis', startDate: '2026-01-15', endDate: null, locked: false, schedule: { monday: null, tuesday: 'morning', wednesday: 'morning', thursday: 'morning', friday: null } },
  { id: '4', childId: '4', childName: 'Liam Johnson', startDate: '2026-01-01', endDate: null, locked: true, schedule: { monday: 'full', tuesday: null, wednesday: 'full', thursday: null, friday: 'full' } },
];

const initialStaff = [
  { id: '1', name: 'Jessica Smith', role: 'Lead Teacher', status: 'checked-in', checkinTime: '08:30', room: 'Teddy Bears', qualifications: 'Level 3 EYFS' },
  { id: '2', name: 'Maria Garcia', role: 'Assistant', status: 'checked-in', checkinTime: '09:00', room: 'Sunshine Room', qualifications: 'Level 2' },
  { id: '3', name: 'Tom Anderson', role: 'Teacher', status: 'checked-out', room: 'Little Stars', qualifications: 'QTS' },
  { id: '4', name: 'Lisa Chen', role: 'Teaching Assistant', status: 'checked-in', checkinTime: '08:45', room: 'Teddy Bears', qualifications: 'Level 3' },
];

const initialStaffSchedule = [
  { id: '1', staffId: '1', staffName: 'Jessica Smith', schedule: { monday: true, tuesday: true, wednesday: true, thursday: true, friday: true } },
  { id: '2', staffId: '2', staffName: 'Maria Garcia', schedule: { monday: true, tuesday: true, wednesday: false, thursday: true, friday: true } },
  { id: '3', staffId: '3', staffName: 'Tom Anderson', schedule: { monday: true, tuesday: false, wednesday: true, thursday: true, friday: false } },
  { id: '4', staffId: '4', staffName: 'Lisa Chen', schedule: { monday: true, tuesday: true, wednesday: true, thursday: true, friday: true } },
];

const initialObservations = [
  { id: '1', childId: '1', childName: 'Emma Wilson', date: '2026-02-06', time: '10:30', observer: 'Jessica Smith', area: 'Physical Development', activity: 'Outdoor Play', observation: 'Emma demonstrated excellent balance while navigating the climbing frame.', photos: 2 },
  { id: '2', childId: '2', childName: 'Oliver Brown', date: '2026-02-05', time: '14:15', observer: 'Maria Garcia', area: 'Expressive Arts', activity: 'Painting', observation: 'Oliver spent 20 minutes creating a detailed painting of his family.', photos: 3 }
];

const initialMessages = [
  { id: '1', from: 'Sarah Wilson', to: 'Admin', subject: 'Pickup Change', preview: 'Emma will be picked up by her grandmother today at 4pm...', date: '2026-02-07', read: false, content: 'Hi, I just wanted to let you know that Emma will be collected by her grandmother, Rose, at 4pm today instead of me. Rose has the password. Thanks!' },
  { id: '2', from: 'Admin', to: 'All Parents', subject: 'Half Term Reminder', preview: 'Reminder that we will be closed next week for half term...', date: '2026-02-06', read: true, content: 'Dear Parents, this is a reminder that the nursery will be closed for the half-term break from Feb 16th to Feb 20th.' },
];

// --- 3. MAIN COMPONENT ---
function EducationalPlatform() {
  // STATE MANAGEMENT
  const [currentRole, setCurrentRole] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [selectedDate, setSelectedDate] = React.useState('2026-02-10');
  
  // Data States
  const [children, setChildren] = React.useState(initialChildren);
  const [staff, setStaff] = React.useState(initialStaff);
  const [observations, setObservations] = React.useState(initialObservations);
  const [messages, setMessages] = React.useState(initialMessages);
  const [scheduleHistory, setScheduleHistory] = React.useState(initialScheduleHistory);
  const [attendance, setAttendance] = React.useState([]);

  // Modal & Focus States
  const [showChildModal, setShowChildModal] = React.useState(false);
  const [selectedChild, setSelectedChild] = React.useState(null);
  const [showObservationModal, setShowObservationModal] = React.useState(false);
  const [showMessageModal, setShowMessageModal] = React.useState(false);
  const [selectedMessage, setSelectedMessage] = React.useState(null);
  const [showScheduleEditor, setShowScheduleEditor] = React.useState(false);

  // --- LOGIC FUNCTIONS ---
  const getDayName = (dateStr) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[new Date(dateStr).getDay()];
  };

  const getCurrentSchedule = (childId, date) => {
    const history = scheduleHistory
      .filter(h => h.childId === childId)
      .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    for (const entry of history) {
      if (new Date(date) >= new Date(entry.startDate) && (!entry.endDate || new Date(date) <= new Date(entry.endDate))) {
        return entry;
      }
    }
    return null;
  };

  const handleLogin = (role) => {
    setCurrentRole(role);
    if (role === 'parent') setCurrentUser({ name: 'Sarah Wilson', childId: '1' });
    else if (role === 'teacher') setCurrentUser({ name: 'Jessica Smith' });
    else setCurrentUser({ name: 'Admin User' });
    setActiveTab('dashboard');
  };

  // --- SUB-COMPONENTS (PAGES) ---

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Children', val: children.length, color: 'text-indigo-600', icon: '👶' },
          { label: 'Staff On-Site', val: staff.filter(s => s.status === 'checked-in').length, color: 'text-green-600', icon: '👩‍🏫' },
          { label: 'Observations', val: observations.length, color: 'text-purple-600', icon: '📝' },
          { label: 'Unread Mail', val: messages.filter(m => !m.read).length, color: 'text-orange-600', icon: '✉️' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">{stat.icon}</span>
              <span className={`text-4xl font-black ${stat.color}`}>{stat.val}</span>
            </div>
            <p className="text-gray-400 text-xs font-black uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <h3 className="text-xl font-black mb-6 flex items-center gap-2">📅 Today's Room Distribution</h3>
          <div className="space-y-4">
            {ROOMS.map(room => {
              const count = children.filter(c => c.room === room).length;
              return (
                <div key={room} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <span className="font-bold text-gray-700">{room}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-indigo-600">{count} Children</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500" style={{ width: `${(count / children.length) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-indigo-600 p-8 rounded-[2rem] text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
          <h3 className="text-xl font-black mb-4">Latest Staff Notice</h3>
          <p className="text-indigo-100 leading-relaxed mb-6">"Reminder: All staff must complete the updated Safeguarding Level 2 module by Friday afternoon. Contact Admin for the login link."</p>
          <button className="bg-white text-indigo-600 px-6 py-2 rounded-xl font-black text-xs uppercase">Mark as Read</button>
          <div className="absolute -bottom-6 -right-6 text-9xl font-black opacity-10 rotate-12">📢</div>
        </div>
      </div>
    </div>
  );

  const AttendanceRegister = () => (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b flex flex-col md:flex-row justify-between items-center bg-gray-50/50 gap-4">
        <div>
          <h3 className="text-2xl font-black text-gray-900">Attendance Register</h3>
          <p className="text-gray-500 font-medium">Auto-populated based on locked schedules</p>
        </div>
        <div className="flex gap-3">
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="px-4 py-2 rounded-xl border-2 border-gray-100 font-bold focus:ring-2 focus:ring-indigo-500 outline-none" />
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-black text-xs uppercase">Export PDF</button>
        </div>
      </div>
      <table className="w-full text-left">
        <thead className="bg-white border-b">
          <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
            <th className="px-8 py-6">Child Details</th>
            <th className="px-8 py-6">Planned Session</th>
            <th className="px-8 py-6">Arrival</th>
            <th className="px-8 py-6">Departure</th>
            <th className="px-8 py-6">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {children.map(child => {
            const day = getDayName(selectedDate);
            const sched = getCurrentSchedule(child.id, selectedDate);
            const session = sched?.schedule[day];
            return (
              <tr key={child.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-indigo-100 rounded-xl flex items-center justify-center font-black text-indigo-600">{child.name[0]}</div>
                    <div>
                      <p className="font-black text-gray-900">{child.name}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{child.room}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  {session ? (
                    <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">{session}</span>
                  ) : (
                    <span className="text-gray-300 text-[10px] font-black uppercase italic">Not Scheduled</span>
                  )}
                </td>
                <td className="px-8 py-5 font-mono text-sm font-bold text-gray-600">--:--</td>
                <td className="px-8 py-5 font-mono text-sm font-bold text-gray-600">--:--</td>
                <td className="px-8 py-5">
                  <select className="bg-white border-2 border-gray-100 rounded-xl px-3 py-1.5 text-xs font-black outline-none focus:border-indigo-500">
                    <option>EXPECTED</option>
                    <option>PRESENT</option>
                    <option>ABSENT</option>
                    <option>SICK</option>
                    <option>HOLIDAY</option>
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const FinanceModule = () => (
    <div className="space-y-8">
      <div className="bg-slate-900 p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em] mb-4">Projected February Revenue</p>
          <h2 className="text-7xl font-black tracking-tighter mb-8">£14,890.00</h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-indigo-500 hover:bg-indigo-400 px-8 py-4 rounded-2xl font-black text-sm transition-all">Batch Invoicing</button>
            <button className="bg-slate-800 hover:bg-slate-700 px-8 py-4 rounded-2xl font-black text-sm transition-all">Funding Claims</button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/20 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100">
          <h4 className="font-black text-xs text-gray-400 uppercase mb-6 tracking-widest">Awaiting Payment</h4>
          <div className="space-y-4">
            {children.slice(0, 3).map(c => (
              <div key={c.id} className="flex justify-between items-center">
                <span className="font-bold text-gray-700">{c.parentName}</span>
                <span className="font-black text-red-500">£420.00</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100">
          <h4 className="font-black text-xs text-gray-400 uppercase mb-6 tracking-widest">30-Hour Funding</h4>
          <p className="text-4xl font-black text-indigo-600">12 Kids</p>
          <p className="text-xs font-bold text-gray-400 mt-2">Eligibility checked this week</p>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100">
          <h4 className="font-black text-xs text-gray-400 uppercase mb-6 tracking-widest">Tax-Free Childcare</h4>
          <p className="text-4xl font-black text-green-500">£4,200</p>
          <p className="text-xs font-bold text-gray-400 mt-2">Pending TFC transfers</p>
        </div>
      </div>
    </div>
  );

  // --- 4. MODALS (THE MISSING PIECES) ---

  const MessageModal = () => (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-3xl font-black text-gray-900">{selectedMessage?.subject}</h3>
            <p className="text-indigo-600 font-bold">From: {selectedMessage?.from}</p>
          </div>
          <button onClick={() => setShowMessageModal(false)} className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center font-black">×</button>
        </div>
        <div className="bg-gray-50 p-8 rounded-3xl mb-8">
          <p className="text-gray-700 leading-relaxed italic">"{selectedMessage?.content}"</p>
        </div>
        <div className="flex gap-4">
          <button className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-black">Reply</button>
          <button onClick={() => setShowMessageModal(false)} className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-2xl font-black">Close</button>
        </div>
      </div>
    </div>
  );

  const ScheduleHistoryModal = () => (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-4xl rounded-[3rem] p-10 shadow-2xl">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-3xl font-black">Schedule Logic: {selectedChild?.name}</h3>
          <button onClick={() => setShowScheduleEditor(false)} className="h-12 w-12 bg-gray-100 rounded-2xl font-black text-xl hover:bg-gray-200 transition-colors">×</button>
        </div>
        
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {scheduleHistory.filter(h => h.childId === selectedChild?.id).map((entry, idx) => (
            <div key={idx} className={`p-8 rounded-[2rem] border-2 transition-all ${entry.locked ? 'bg-gray-50 border-gray-100 opacity-80' : 'bg-white border-indigo-100'}`}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Effective Date</p>
                  <p className="text-xl font-black">{new Date(entry.startDate).toDateString()}</p>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${entry.locked ? 'bg-gray-200 text-gray-500' : 'bg-green-100 text-green-600'}`}>
                  {entry.locked ? '🔒 Historical Record' : '🔓 Active Schedule'}
                </div>
              </div>
              <div className="grid grid-cols-5 gap-4">
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map(day => (
                  <div key={day} className="text-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-2">{day.slice(0,3)}</p>
                    <div className={`p-3 rounded-xl font-black text-[10px] uppercase ${entry.schedule[day] ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-300'}`}>
                      {entry.schedule[day] || 'OFF'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="mt-8 w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-lg shadow-indigo-100">+ Propose New Schedule Change</button>
      </div>
    </div>
  );

  // --- 5. MAIN NAVIGATION & LAYOUT ---

  if (!currentRole) {
    return (
      <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[3.5rem] shadow-2xl p-14 text-center border border-gray-100">
          <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] mx-auto mb-10 rotate-6 shadow-2xl shadow-indigo-200 flex items-center justify-center">
             <span className="text-white text-5xl font-black">L</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Little Learners</h1>
          <p className="text-gray-400 font-bold mb-12 uppercase text-[10px] tracking-[0.3em]">Master Portal v2.0</p>
          <div className="space-y-4">
            <button onClick={() => handleLogin('admin')} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all">Administrator</button>
            <button onClick={() => handleLogin('teacher')} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-500 transition-all">Teacher Login</button>
            <button onClick={() => handleLogin('parent')} className="w-full py-5 bg-white border-2 border-gray-100 text-gray-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition-all">Parent Access</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900">
      {/* SIDEBAR */}
      <div className="w-80 bg-white border-r border-gray-100 flex flex-col p-10">
        <div className="flex items-center gap-4 mb-14 px-2">
          <div className="h-10 w-10 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center font-black text-white">L</div>
          <span className="font-black text-2xl tracking-tighter">Learners.</span>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'dashboard', label: 'Overview', icon: '🏠' },
            { id: 'register', label: 'Attendance', icon: '📅' },
            { id: 'observations', label: 'Journals', icon: '🎨' },
            { id: 'messages', label: 'Messages', icon: '✉️' }
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-5 px-6 py-4 rounded-2xl font-black text-sm transition-all ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-gray-400 hover:bg-gray-50'}`}>
              <span className="text-xl">{item.icon}</span> {item.label}
            </button>
          ))}

          {currentRole === 'admin' && (
            <div className="pt-10">
              <p className="px-6 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-6">Management</p>
              <button onClick={() => setActiveTab('child-logic')} className={`w-full flex items-center gap-5 px-6 py-4 rounded-2xl font-black text-sm transition-all ${activeTab === 'child-logic' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-50'}`}>👶 Schedule Logic</button>
              <button onClick={() => setActiveTab('staff-rota')} className={`w-full flex items-center gap-5 px-6 py-4 rounded-2xl font-black text-sm transition-all ${activeTab === 'staff-rota' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-50'}`}>👩‍🏫 Staff Rota</button>
              <button onClick={() => setActiveTab('finance')} className={`w-full flex items-center gap-5 px-6 py-4 rounded-2xl font-black text-sm transition-all ${activeTab === 'finance' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-50'}`}>💰 Finance</button>
            </div>
          )}
        </nav>

        <button onClick={() => setCurrentRole(null)} className="mt-10 flex items-center gap-4 px-6 py-4 text-red-500 font-black text-sm hover:bg-red-50 rounded-2xl transition-all">🚪 Sign Out</button>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-28 bg-white/80 backdrop-blur-md border-b border-gray-100 px-12 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-gray-900 capitalize tracking-tight">{activeTab.replace('-', ' ')}</h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">{new Date(selectedDate).toDateString()}</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="bg-gray-50 p-2 pr-6 rounded-2xl border border-gray-100 flex items-center gap-4">
              <div className="h-12 w-12 bg-indigo-100 rounded-xl flex items-center justify-center font-black text-indigo-600 text-lg">JS</div>
              <div className="text-left">
                <p className="text-xs font-black text-gray-900 leading-none mb-1">Jessica Smith</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Lead Admin</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'register' && <AttendanceRegister />}
          {activeTab === 'finance' && <FinanceModule />}
          
          {activeTab === 'child-logic' && (
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-white border-b">
                  <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                    <th className="px-10 py-8">Child</th>
                    <th className="px-10 py-8">M</th><th className="px-10 py-8">T</th><th className="px-10 py-8">W</th><th className="px-10 py-8">T</th><th className="px-10 py-8">F</th>
                    <th className="px-10 py-8 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {children.map(c => {
                    const sched = getCurrentSchedule(c.id, selectedDate);
                    return (
                      <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-10 py-6">
                           <p className="font-black text-gray-900">{c.name}</p>
                           <p className="text-[10px] font-bold text-gray-400 uppercase">Start: {sched?.startDate}</p>
                        </td>
                        {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map(day => (
                          <td key={day} className="px-10 py-6">
                            <div className={`h-3 w-3 rounded-full ${sched?.schedule[day] ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                          </td>
                        ))}
                        <td className="px-10 py-6 text-right">
                          <button onClick={() => { setSelectedChild(c); setShowScheduleEditor(true); }} className="text-indigo-600 font-black text-[10px] uppercase hover:underline">View History</button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-4">
              {messages.map(m => (
                <div key={m.id} onClick={() => { setSelectedMessage(m); setShowMessageModal(true); }} className={`p-8 rounded-[2rem] border transition-all cursor-pointer flex justify-between items-center ${m.read ? 'bg-white border-gray-100' : 'bg-indigo-50 border-indigo-100 shadow-lg shadow-indigo-100/20'}`}>
                  <div className="flex gap-6 items-center">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black ${m.read ? 'bg-gray-100 text-gray-400' : 'bg-indigo-600 text-white'}`}>{m.from[0]}</div>
                    <div>
                      <h4 className={`text-lg ${m.read ? 'font-bold text-gray-600' : 'font-black text-gray-900'}`}>{m.subject}</h4>
                      <p className="text-sm text-gray-400 font-medium">{m.preview}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-300 uppercase mb-2">{m.date}</p>
                    {!m.read && <span className="h-2 w-2 bg-indigo-600 rounded-full inline-block"></span>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'observations' && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {observations.map(o => (
                  <div key={o.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all">
                     <div className="h-64 bg-slate-100 flex items-center justify-center text-slate-300 text-6xl">🖼️</div>
                     <div className="p-10">
                        <div className="flex justify-between items-start mb-6">
                           <div>
                              <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{o.area}</p>
                              <h4 className="text-2xl font-black text-gray-900">{o.childName}</h4>
                           </div>
                           <span className="text-xs font-bold text-gray-400">{o.date}</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-8">{o.observation}</p>
                        <div className="flex justify-between items-center pt-8 border-t border-gray-50">
                           <p className="text-[10px] font-black text-gray-300 uppercase italic">Observer: {o.observer}</p>
                           <button className="text-indigo-600 font-black text-xs hover:underline">Full Profile</button>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          )}
        </main>
      </div>

      {/* MODAL LAYER */}
      {showMessageModal && <MessageModal />}
      {showScheduleEditor && <ScheduleHistoryModal />}
    </div>
  );
}

// --- 6. INITIALIZATION ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<EducationalPlatform />);
