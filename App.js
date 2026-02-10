import React, { useState } from 'react';

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
  {
    id: '1',
    childId: '1',
    childName: 'Emma Wilson',
    date: '2026-02-06',
    time: '10:30',
    observer: 'Jessica Smith',
    area: 'Physical Development',
    activity: 'Outdoor Play',
    observation: 'Emma demonstrated excellent balance while navigating the climbing frame.',
    photos: 2,
  },
  {
    id: '2',
    childId: '2',
    childName: 'Oliver Brown',
    date: '2026-02-05',
    time: '14:15',
    observer: 'Maria Garcia',
    area: 'Expressive Arts',
    activity: 'Painting',
    observation: 'Oliver spent 20 minutes creating a detailed painting of his family.',
    photos: 3,
  }
];

const initialMessages = [
  { id: '1', from: 'Sarah Wilson', to: 'Admin', subject: 'Pickup Change', preview: 'Emma will be picked up by her grandmother today at 4pm...', date: '2026-02-07', read: false },
  { id: '2', from: 'Admin', to: 'All Parents', subject: 'Half Term Reminder', preview: 'Reminder that we will be closed next week for half term...', date: '2026-02-06', read: true },
];

const initialSessions = [
  { id: '1', title: 'Music Time', room: 'Teddy Bears', startTime: '10:00', endTime: '10:30', staff: 'Jessica Smith' },
  { id: '2', title: 'Story Circle', room: 'Sunshine Room', startTime: '14:00', endTime: '14:30', staff: 'Tom Anderson' },
];

// Schedule history with date ranges
const initialScheduleHistory = [
  {
    id: '1',
    childId: '1',
    childName: 'Emma Wilson',
    startDate: '2026-01-01',
    endDate: null, // null means current/ongoing
    locked: true,
    schedule: {
      monday: 'full',
      tuesday: 'full',
      wednesday: 'full',
      thursday: 'full',
      friday: 'full'
    }
  },
  {
    id: '2',
    childId: '2',
    childName: 'Oliver Brown',
    startDate: '2026-01-01',
    endDate: null,
    locked: true,
    schedule: {
      monday: 'afternoon',
      tuesday: 'afternoon',
      wednesday: null,
      thursday: 'afternoon',
      friday: 'afternoon'
    }
  },
  {
    id: '3',
    childId: '3',
    childName: 'Sophia Davis',
    startDate: '2026-01-15',
    endDate: null,
    locked: false,
    schedule: {
      monday: null,
      tuesday: 'morning',
      wednesday: 'morning',
      thursday: 'morning',
      friday: null
    }
  },
  {
    id: '4',
    childId: '4',
    childName: 'Liam Johnson',
    startDate: '2026-01-01',
    endDate: null,
    locked: true,
    schedule: {
      monday: 'full',
      tuesday: null,
      wednesday: 'full',
      thursday: null,
      friday: 'full'
    }
  },
];

const initialStaffSchedule = [
  {
    id: '1',
    staffId: '1',
    staffName: 'Jessica Smith',
    startDate: '2026-01-01',
    endDate: null,
    locked: true,
    schedule: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true
    }
  },
  {
    id: '2',
    staffId: '2',
    staffName: 'Maria Garcia',
    startDate: '2026-01-01',
    endDate: null,
    locked: true,
    schedule: {
      monday: true,
      tuesday: true,
      wednesday: false,
      thursday: true,
      friday: true
    }
  },
  {
    id: '3',
    staffId: '3',
    staffName: 'Tom Anderson',
    startDate: '2026-01-01',
    endDate: null,
    locked: false,
    schedule: {
      monday: true,
      tuesday: false,
      wednesday: true,
      thursday: true,
      friday: false
    }
  },
  {
    id: '4',
    staffId: '4',
    staffName: 'Lisa Chen',
    startDate: '2026-01-01',
    endDate: null,
    locked: true,
    schedule: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true
    }
  },
];

const initialAttendance = [
  { id: '1', childId: '1', childName: 'Emma Wilson', date: '2026-02-08', status: 'present', sessionType: 'full', arrivedAt: '08:45' },
  { id: '2', childId: '2', childName: 'Oliver Brown', date: '2026-02-08', status: 'present', sessionType: 'afternoon', arrivedAt: '08:50' },
  { id: '3', childId: '4', childName: 'Liam Johnson', date: '2026-02-08', status: 'present', sessionType: 'full', arrivedAt: '08:45' },
];

export default function EducationalPlatform() {
  const [currentRole, setCurrentRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [children, setChildren] = useState(initialChildren);
  const [staff, setStaff] = useState(initialStaff);
  const [observations, setObservations] = useState(initialObservations);
  const [messages, setMessages] = useState(initialMessages);
  const [sessions, setSessions] = useState(initialSessions);
  const [scheduleHistory, setScheduleHistory] = useState(initialScheduleHistory);
  const [staffSchedule, setStaffSchedule] = useState(initialStaffSchedule);
  const [attendance, setAttendance] = useState(initialAttendance);
  const [selectedDate, setSelectedDate] = useState('2026-02-08');
  const [selectedChildForHistory, setSelectedChildForHistory] = useState(null);
  const [showScheduleHistoryDialog, setShowScheduleHistoryDialog] = useState(false);
  const [showEditSchedulePeriodDialog, setShowEditSchedulePeriodDialog] = useState(false);
  const [showAddObservationDialog, setShowAddObservationDialog] = useState(false);
  const [showEditObservationDialog, setShowEditObservationDialog] = useState(false);
  const [showAddMessageDialog, setShowAddMessageDialog] = useState(false);
  const [showEditMessageDialog, setShowEditMessageDialog] = useState(false);
  const [selectedObservation, setSelectedObservation] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [observationForm, setObservationForm] = useState({
    childId: '',
    childName: '',
    date: '',
    time: '',
    observer: '',
    area: '',
    activity: '',
    observation: '',
    photos: 0
  });
  const [messageForm, setMessageForm] = useState({
    from: '',
    to: '',
    subject: '',
    preview: ''
  });
  const [editPeriodForm, setEditPeriodForm] = useState({
    childId: null,
    startDate: '',
    endDate: '',
    schedule: { monday: null, tuesday: null, wednesday: null, thursday: null, friday: null }
  });

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

  // Get current schedule for a child on a specific date
  const getCurrentSchedule = (childId, date) => {
    const childSchedules = scheduleHistory
      .filter(h => h.childId === childId)
      .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    
    for (const schedule of childSchedules) {
      const startDate = new Date(schedule.startDate);
      const checkDate = new Date(date);
      const endDate = schedule.endDate ? new Date(schedule.endDate) : new Date('2099-12-31');
      
      if (checkDate >= startDate && checkDate <= endDate) {
        return schedule;
      }
    }
    return null;
  };

  // Get day of week from date
  const getDayOfWeek = (dateString) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  // Toggle schedule day
  const toggleScheduleDay = (childId, day, sessionType) => {
    setScheduleHistory(scheduleHistory.map(h => {
      if (h.childId === childId && h.endDate === null) {
        return {
          ...h,
          schedule: {
            ...h.schedule,
            [day]: h.schedule[day] === sessionType ? null : sessionType
          }
        };
      }
      return h;
    }));
  };

  // Lock schedule
  const lockSchedule = (childId) => {
    if (window.confirm('Are you sure you want to lock this schedule? Once locked, registers will auto-populate based on this schedule.')) {
      setScheduleHistory(scheduleHistory.map(h => {
        if (h.childId === childId && h.endDate === null) {
          return { ...h, locked: true };
        }
        return h;
      }));
      
      // Auto-populate future attendance based on locked schedule
      autoPopulateAttendance(childId);
    }
  };

  // Unlock schedule
  const unlockSchedule = (childId) => {
    if (window.confirm('Unlocking will allow you to edit the schedule. Continue?')) {
      setScheduleHistory(scheduleHistory.map(h => {
        if (h.childId === childId && h.endDate === null) {
          return { ...h, locked: false };
        }
        return h;
      }));
    }
  };

  // Auto-populate attendance for next 7 days when schedule is locked
  const autoPopulateAttendance = (childId) => {
    const child = children.find(c => c.id === childId);
    const schedule = getCurrentSchedule(childId, selectedDate);
    
    if (!schedule || !schedule.locked) return;

    const newAttendance = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      const dayOfWeek = getDayOfWeek(dateString);
      const sessionType = schedule.schedule[dayOfWeek];
      
      if (sessionType && !attendance.find(a => a.childId === childId && a.date === dateString)) {
        const sessionTime = SESSION_TIMES.find(s => s.id === sessionType);
        newAttendance.push({
          id: `auto-${Date.now()}-${i}`,
          childId,
          childName: child.name,
          date: dateString,
          status: 'present',
          sessionType,
          arrivedAt: sessionTime?.start || '08:45'
        });
      }
    }
    
    setAttendance([...attendance, ...newAttendance]);
  };

  // Update attendance
  const updateAttendance = (childId, date, status) => {
    const schedule = getCurrentSchedule(childId, date);
    const dayOfWeek = getDayOfWeek(date);
    const sessionType = schedule?.schedule[dayOfWeek];
    const sessionTime = SESSION_TIMES.find(s => s.id === sessionType);
    const child = children.find(c => c.id === childId);
    
    const existingAttendance = attendance.find(a => a.childId === childId && a.date === date);
    
    if (existingAttendance) {
      setAttendance(attendance.map(a =>
        a.childId === childId && a.date === date
          ? { ...a, status, arrivedAt: status === 'present' ? (a.arrivedAt || sessionTime?.start || '08:45') : null }
          : a
      ));
    } else {
      setAttendance([...attendance, {
        id: String(Date.now()),
        childId,
        childName: child.name,
        date,
        status,
        sessionType,
        arrivedAt: status === 'present' ? sessionTime?.start || '08:45' : null
      }]);
    }
  };

  // Open schedule history
  const openScheduleHistory = (childId) => {
    setSelectedChildForHistory(childId);
    setShowScheduleHistoryDialog(true);
  };

  // Add new schedule period
  const addSchedulePeriod = () => {
    if (!editPeriodForm.childId || !editPeriodForm.startDate) {
      alert('Please fill in required fields');
      return;
    }

    const child = children.find(c => c.id === editPeriodForm.childId);
    
    // End the current active schedule
    setScheduleHistory(prev => prev.map(h => {
      if (h.childId === editPeriodForm.childId && h.endDate === null) {
        const newEndDate = new Date(editPeriodForm.startDate);
        newEndDate.setDate(newEndDate.getDate() - 1);
        return { ...h, endDate: newEndDate.toISOString().split('T')[0] };
      }
      return h;
    }));

    // Add new schedule period
    const newSchedule = {
      id: String(Date.now()),
      childId: editPeriodForm.childId,
      childName: child.name,
      startDate: editPeriodForm.startDate,
      endDate: editPeriodForm.endDate || null,
      locked: false,
      schedule: editPeriodForm.schedule
    };

    setScheduleHistory([...scheduleHistory, newSchedule]);
    setShowEditSchedulePeriodDialog(false);
    setEditPeriodForm({
      childId: null,
      startDate: '',
      endDate: '',
      schedule: { monday: null, tuesday: null, wednesday: null, thursday: null, friday: null }
    });
  };

  // Staff schedule functions
  const toggleStaffScheduleDay = (staffId, day) => {
    setStaffSchedule(staffSchedule.map(s => {
      if (s.staffId === staffId && s.endDate === null) {
        return {
          ...s,
          schedule: {
            ...s.schedule,
            [day]: !s.schedule[day]
          }
        };
      }
      return s;
    }));
  };

  const lockStaffSchedule = (staffId) => {
    if (window.confirm('Lock this staff schedule?')) {
      setStaffSchedule(staffSchedule.map(s => {
        if (s.staffId === staffId && s.endDate === null) {
          return { ...s, locked: true };
        }
        return s;
      }));
    }
  };

  const unlockStaffSchedule = (staffId) => {
    if (window.confirm('Unlock this staff schedule?')) {
      setStaffSchedule(staffSchedule.map(s => {
        if (s.staffId === staffId && s.endDate === null) {
          return { ...s, locked: false };
        }
        return s;
      }));
    }
  };

  // Observation functions
  const addObservation = () => {
    if (!observationForm.childId || !observationForm.date || !observationForm.observation) {
      alert('Please fill in required fields');
      return;
    }

    const newObservation = {
      id: String(Date.now()),
      ...observationForm
    };

    setObservations([...observations, newObservation]);
    setShowAddObservationDialog(false);
    setObservationForm({
      childId: '',
      childName: '',
      date: '',
      time: '',
      observer: '',
      area: '',
      activity: '',
      observation: '',
      photos: 0
    });
  };

  const updateObservation = () => {
    if (!observationForm.childId || !observationForm.date || !observationForm.observation) {
      alert('Please fill in required fields');
      return;
    }

    setObservations(observations.map(o =>
      o.id === selectedObservation.id
        ? { ...o, ...observationForm }
        : o
    ));
    setShowEditObservationDialog(false);
    setSelectedObservation(null);
    setObservationForm({
      childId: '',
      childName: '',
      date: '',
      time: '',
      observer: '',
      area: '',
      activity: '',
      observation: '',
      photos: 0
    });
  };

  const deleteObservation = (obsId) => {
    if (window.confirm('Delete this observation?')) {
      setObservations(observations.filter(o => o.id !== obsId));
    }
  };

  const openEditObservation = (obs) => {
    setSelectedObservation(obs);
    setObservationForm({
      childId: obs.childId,
      childName: obs.childName,
      date: obs.date,
      time: obs.time,
      observer: obs.observer,
      area: obs.area,
      activity: obs.activity,
      observation: obs.observation,
      photos: obs.photos
    });
    setShowEditObservationDialog(true);
  };

  // Message functions
  const addMessage = () => {
    if (!messageForm.from || !messageForm.to || !messageForm.subject) {
      alert('Please fill in required fields');
      return;
    }

    const newMessage = {
      id: String(Date.now()),
      ...messageForm,
      date: new Date().toISOString().split('T')[0],
      read: false
    };

    setMessages([newMessage, ...messages]);
    setShowAddMessageDialog(false);
    setMessageForm({ from: '', to: '', subject: '', preview: '' });
  };

  const updateMessage = () => {
    if (!messageForm.from || !messageForm.to || !messageForm.subject) {
      alert('Please fill in required fields');
      return;
    }

    setMessages(messages.map(m =>
      m.id === selectedMessage.id
        ? { ...m, ...messageForm }
        : m
    ));
    setShowEditMessageDialog(false);
    setSelectedMessage(null);
    setMessageForm({ from: '', to: '', subject: '', preview: '' });
  };

  const deleteMessage = (msgId) => {
    if (window.confirm('Delete this message?')) {
      setMessages(messages.filter(m => m.id !== msgId));
    }
  };

  const openEditMessage = (msg) => {
    setSelectedMessage(msg);
    setMessageForm({
      from: msg.from,
      to: msg.to,
      subject: msg.subject,
      preview: msg.preview
    });
    setShowEditMessageDialog(true);
  };

  const filteredObservations = currentRole === 'parent' 
    ? observations.filter(obs => obs.childName === currentUser?.childName)
    : observations;
    
  const filteredMessages = currentRole === 'parent'
    ? messages.filter(msg => msg.to === currentUser?.name || msg.to === 'All Parents')
    : messages;

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
            <button 
              className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              onClick={() => handleLogin('admin')}
            >
              Login as Admin
            </button>
            <button 
              className="w-full h-14 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              onClick={() => handleLogin('teacher')}
            >
              Login as Teacher
            </button>
            <button 
              className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              onClick={() => handleLogin('parent')}
            >
              Login as Parent
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900">Little Learners</h1>
              <p className="text-xs text-gray-500 capitalize">{currentRole} Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Dashboard
          </button>

          {currentRole !== 'parent' && (
            <button
              onClick={() => setActiveTab('register')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'register' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Register
            </button>
          )}

          <button
            onClick={() => setActiveTab('observations')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'observations' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Observations
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'messages' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Messages
          </button>

          {currentRole === 'admin' && (
            <div className="pt-6">
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Management
              </p>
              
              <button
                onClick={() => setActiveTab('childrens-schedule')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'childrens-schedule' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Children's Schedule
              </button>

              <button
                onClick={() => setActiveTab('staff')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'staff' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Staff Schedule
              </button>

              <button
                onClick={() => setActiveTab('finance')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'finance' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Finance
              </button>
            </div>
          )}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-sm font-semibold text-indigo-600">
                {currentUser?.name?.split(' ').map(n => n[0]).join('') || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{currentUser?.name || 'User'}</p>
              <p className="text-xs text-gray-500 truncate capitalize">{currentRole}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'register' && 'Daily Register'}
            {activeTab === 'observations' && 'Observations'}
            {activeTab === 'messages' && 'Messages'}
            {activeTab === 'childrens-schedule' && "Children's Weekly Schedule"}
            {activeTab === 'staff' && "Staff Schedule"}
            {activeTab === 'finance' && "Finance"}
          </h1>
          <p className="text-sm text-gray-500">
            Welcome back, {currentUser?.name}.
          </p>
        </div>

        <div className="p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-gray-600">Total Children</p>
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{children.length}</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-gray-600">Observations</p>
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{observations.length}</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-gray-600">Pending Reviews</p>
                    <div className="p-2 bg-orange-50 rounded-lg">
                      <svg className="h-5 w-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">3</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-gray-600">Alerts</p>
                    <div className="p-2 bg-red-50 rounded-lg">
                      <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">1</p>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upcoming Event */}
                <div className="lg:col-span-2">
                  <div className="bg-indigo-600 rounded-xl p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Upcoming Event: Summer Fair</h3>
                    <p className="text-indigo-100 mb-4">
                      Don't forget to prepare the activity stations for next Friday. 
                      Parent notifications have been sent out.
                    </p>
                    <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
                      View Details
                    </button>
                  </div>

                  {/* Recent Observations */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">Recent Observations</h3>
                      <button className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                        View All
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {observations.slice(0, 2).map(obs => (
                        <div key={obs.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                          <div className="flex gap-3">
                            <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h4 className="font