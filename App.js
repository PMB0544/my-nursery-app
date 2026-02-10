// --- DATA AND CONSTANTS ---
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
  { id: '1', childId: '1', childName: 'Emma Wilson', date: '2026-02-06', area: 'Physical Development', observation: 'Emma demonstrated excellent balance.', photos: 2 },
  { id: '2', childId: '2', childName: 'Oliver Brown', date: '2026-02-05', area: 'Expressive Arts', observation: 'Oliver created a detailed family painting.', photos: 3 }
];

const initialMessages = [
  { id: '1', from: 'Sarah Wilson', to: 'Admin', subject: 'Pickup Change', preview: 'Emma will be picked up early...', date: '2026-02-07', read: false },
  { id: '2', from: 'Admin', to: 'All Parents', subject: 'Half Term Reminder', preview: 'Closed next week...', date: '2026-02-06', read: true },
];

// --- MAIN COMPONENT ---
function EducationalPlatform() {
  const [currentRole, setCurrentRole] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [children, setChildren] = React.useState(initialChildren);
  const [staff, setStaff] = React.useState(initialStaff);
  const [observations, setObservations] = React.useState(initialObservations);
  const [messages, setMessages] = React.useState(initialMessages);

  const handleLogin = (role) => {
    setCurrentRole(role);
    if (role === 'parent') {
      setCurrentUser({ name: 'Sarah Wilson', childName: 'Emma Wilson', childId: '1' });
    } else if (role === 'teacher') {
      setCurrentUser({ name: 'Jessica Smith' });
    } else {
      setCurrentUser({ name: 'Admin User' });
    }
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentRole(null);
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  // Login View (Restored Original Design)
  if (!currentRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 h-16 w-16 bg-indigo-600 rounded-full flex items-center justify-center">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Little Learners</h1>
            <p className="text-gray-600">Early Years Learning Platform</p>
          </div>
          <div className="space-y-3">
            <button className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors" onClick={() => handleLogin('admin')}>Login as Admin</button>
            <button className="w-full h-14 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors" onClick={() => handleLogin('teacher')}>Login as Teacher</button>
            <button className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors" onClick={() => handleLogin('parent')}>Login as Parent</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="font-bold text-lg text-gray-900">Little Learners</h1>
          <p className="text-xs text-gray-500 capitalize">{currentRole} Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {['dashboard', 'register', 'observations', 'messages'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${activeTab === tab ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button onClick={handleLogout} className="w-full py-2 bg-gray-100 rounded-lg text-sm font-medium">Logout</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 capitalize">{activeTab}</h1>
        
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-600">Active Children</p>
              <p className="text-3xl font-bold">{children.length}</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-600">Staff Present</p>
              <p className="text-3xl font-bold">{staff.filter(s => s.status === 'checked-in').length}</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-600">Observations</p>
              <p className="text-3xl font-bold">{observations.length}</p>
            </div>
          </div>
        )}

        {activeTab === 'observations' && (
          <div className="space-y-4">
            {observations.map(obs => (
              <div key={obs.id} className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-lg">{obs.childName}</h3>
                <p className="text-indigo-600 text-sm mb-2">{obs.area}</p>
                <p className="text-gray-700">{obs.observation}</p>
              </div>
            ))}
          </div>
        )}

        {/* Placeholder for other tabs to keep code safe/concise */}
        {['register', 'messages'].includes(activeTab) && (
          <div className="bg-white p-12 rounded-xl text-center border border-dashed border-gray-300">
            <p className="text-gray-500">The {activeTab} content is ready for detailed population.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<EducationalPlatform />);
