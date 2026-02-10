// --- 1. DATA AND CONSTANTS ---
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
  { id: '1', childName: 'Emma Wilson', date: '2026-02-06', area: 'Physical Development', activity: 'Outdoor Play', observation: 'Emma demonstrated excellent balance.', photos: 2 },
  { id: '2', childName: 'Oliver Brown', date: '2026-02-05', area: 'Expressive Arts', activity: 'Painting', observation: 'Oliver created a detailed family painting.', photos: 3 }
];

const initialMessages = [
  { id: '1', from: 'Sarah Wilson', subject: 'Pickup Change', preview: 'Emma will be picked up early...', date: '2026-02-07', read: false },
  { id: '2', from: 'Admin', subject: 'Half Term', preview: 'We are closed next week...', date: '2026-02-06', read: true },
];

// --- 2. MAIN COMPONENT ---
function EducationalPlatform() {
  const [currentRole, setCurrentRole] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [children] = React.useState(initialChildren);
  const [staff] = React.useState(initialStaff);
  const [observations] = React.useState(initialObservations);
  const [messages] = React.useState(initialMessages);

  const handleLogin = (role) => {
    setCurrentRole(role);
    setActiveTab('dashboard');
  };

  if (!currentRole) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', textAlign: 'center', width: '400px' }}>
          <h1 style={{ color: '#4f46e5', marginBottom: '10px' }}>Little Learners</h1>
          <p style={{ color: '#6b7280', marginBottom: '30px' }}>Nursery Management System</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button onClick={() => handleLogin('admin')} style={{ padding: '14px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Admin Login</button>
            <button onClick={() => handleLogin('teacher')} style={{ padding: '14px', backgroundColor: '#9333ea', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Teacher Login</button>
            <button onClick={() => handleLogin('parent')} style={{ padding: '14px', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Parent Login</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif', backgroundColor: '#f9fafb' }}>
      {/* Sidebar Navigation */}
      <div style={{ width: '260px', backgroundColor: 'white', borderRight: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: '#4f46e5', marginBottom: '25px' }}>Little Learners</h2>
        <nav style={{ flex: 1 }}>
          {[
            { id: 'dashboard', label: '📊 Dashboard' },
            { id: 'children', label: '👶 Children' },
            { id: 'observations', label: '📝 Observations' },
            { id: 'messages', label: '✉️ Messages' },
            { id: 'staff', label: '👩‍🏫 Staff Team' }
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)} 
              style={{ 
                width: '100%', textAlign: 'left', padding: '12px', marginBottom: '5px', 
                backgroundColor: activeTab === item.id ? '#f5f3ff' : 'transparent', 
                color: activeTab === item.id ? '#4f46e5' : '#4b5563', 
                border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: activeTab === item.id ? 'bold' : 'normal' 
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button onClick={() => setCurrentRole(null)} style={{ padding: '12px', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Logout</button>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <header style={{ marginBottom: '30px' }}>
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <p>Logged in as: {currentRole.toUpperCase()}</p>
        </header>

        {activeTab === 'dashboard' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
              <h3>Total Children</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#4f46e5' }}>{children.length}</p>
            </div>
            <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
              <h3>Unread Messages</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b' }}>{messages.filter(m => !m.read).length}</p>
            </div>
            <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
              <h3>Staff Present</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>{staff.filter(s => s.status === 'checked-in').length}</p>
            </div>
          </div>
        )}

        {activeTab === 'observations' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {observations.map(obs => (
              <div key={obs.id} style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', borderLeft: '5px solid #9333ea' }}>
                <h4 style={{ margin: '0 0 5px 0' }}>{obs.childName} - {obs.area}</h4>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>{obs.date}</p>
                <p>{obs.observation}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'children' && (
           <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
               <thead style={{ backgroundColor: '#f9fafb' }}>
                 <tr>
                   <th style={{ padding: '15px', textAlign: 'left' }}>Name</th>
                   <th style={{ padding: '15px', textAlign: 'left' }}>Room</th>
                   <th style={{ padding: '15px', textAlign: 'left' }}>Status</th>
                 </tr>
               </thead>
               <tbody>
                 {children.map(c => (
                   <tr key={c.id}>
                     <td style={{ padding: '15px', borderTop: '1px solid #e5e7eb' }}>{c.name}</td>
                     <td style={{ padding: '15px', borderTop: '1px solid #e5e7eb' }}>{c.room}</td>
                     <td style={{ padding: '15px', borderTop: '1px solid #e5e7eb' }}><span style={{ color: '#059669' }}>● Active</span></td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<EducationalPlatform />);
