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
];

// --- 2. MAIN COMPONENT ---
function EducationalPlatform() {
  const [currentRole, setCurrentRole] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [children] = React.useState(initialChildren);
  const [staff] = React.useState(initialStaff);

  // Login Handler
  const handleLogin = (role) => {
    setCurrentRole(role);
    setActiveTab('dashboard');
  };

  // 3. LOGIN VIEW
  if (!currentRole) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', textAlign: 'center', width: '100%', maxWidth: '400px' }}>
          <h1 style={{ color: '#4f46e5', marginBottom: '10px' }}>Little Learners</h1>
          <p style={{ color: '#6b7280', marginBottom: '30px' }}>Select a portal to begin</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button onClick={() => handleLogin('admin')} style={{ padding: '14px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Admin Portal</button>
            <button onClick={() => handleLogin('teacher')} style={{ padding: '14px', backgroundColor: '#9333ea', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Teacher Portal</button>
            <button onClick={() => handleLogin('parent')} style={{ padding: '14px', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Parent Portal</button>
          </div>
        </div>
      </div>
    );
  }

  // 4. DASHBOARD VIEW
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif', backgroundColor: '#f9fafb' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: 'white', borderRight: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: '#4f46e5', marginBottom: '30px' }}>Little Learners</h2>
        <nav style={{ flex: 1 }}>
          <button onClick={() => setActiveTab('dashboard')} style={{ width: '100%', textAlign: 'left', padding: '12px', marginBottom: '8px', backgroundColor: activeTab === 'dashboard' ? '#f5f3ff' : 'transparent', color: activeTab === 'dashboard' ? '#4f46e5' : '#4b5563', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: activeTab === 'dashboard' ? 'bold' : 'normal' }}>📊 Dashboard</button>
          <button onClick={() => setActiveTab('children')} style={{ width: '100%', textAlign: 'left', padding: '12px', marginBottom: '8px', backgroundColor: activeTab === 'children' ? '#f5f3ff' : 'transparent', color: activeTab === 'children' ? '#4f46e5' : '#4b5563', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: activeTab === 'children' ? 'bold' : 'normal' }}>👶 Children</button>
          <button onClick={() => setActiveTab('staff')} style={{ width: '100%', textAlign: 'left', padding: '12px', marginBottom: '8px', backgroundColor: activeTab === 'staff' ? '#f5f3ff' : 'transparent', color: activeTab === 'staff' ? '#4f46e5' : '#4b5563', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: activeTab === 'staff' ? 'bold' : 'normal' }}>👩‍🏫 Staff</button>
        </nav>
        <button onClick={() => setCurrentRole(null)} style={{ padding: '12px', backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>🚪 Logout</button>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <header style={{ marginBottom: '30px' }}>
          <h1 style={{ margin: 0, textTransform: 'capitalize' }}>{currentRole} {activeTab}</h1>
          <p style={{ color: '#6b7280' }}>Manage your nursery operations and daily logs.</p>
        </header>

        {activeTab === 'dashboard' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 10px 0' }}>Active Children</h3>
              <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>{children.length}</p>
            </div>
            <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 10px 0' }}>Staff Present</h3>
              <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>{staff.filter(s => s.status === 'checked-in').length}</p>
            </div>
          </div>
        )}

        {activeTab === 'children' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ backgroundColor: '#f9fafb' }}>
                <tr>
                  <th style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>Name</th>
                  <th style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>Age</th>
                  <th style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>Room</th>
                  <th style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {children.map(child => (
                  <tr key={child.id}>
                    <td style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>{child.name}</td>
                    <td style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>{child.age}</td>
                    <td style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>{child.room}</td>
                    <td style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
                      <span style={{ padding: '4px 8px', borderRadius: '99px', fontSize: '12px', backgroundColor: '#dcfce7', color: '#166534' }}>{child.status}</span>
                    </td>
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

// Render to DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<EducationalPlatform />);
