export const MOCK_USERS = {
  personnel: { username: 'officer001', password: 'Secure@123', mfaCode: '123456', role: 'Personnel' },
  veteran: { username: 'veteran001', password: 'Secure@123', mfaCode: '654321', role: 'Veteran' },
  family: { username: 'family001', password: 'Secure@123', mfaCode: '111222', role: 'Family' },
};

// Test users
export const TEST_USERS = {
  personnel: {
    armyId: 'DEF2025001',
    phone: '+919876543210',
    name: 'Captain Miller',
    rank: 'Captain',
    unit: '5th Infantry Division',
    seedPhrase: 'abandon amount liar amount expire adjust cage candy arch gather drum buyer hello world here',
  },
  veteran: {
    armyId: 'VET2020045',
    phone: '+919876543211',
    name: 'Major Johnson',
    rank: 'Major (Retd.)',
    unit: 'Special Forces',
    seedPhrase: 'board flee heavy tunnel powder denial science ski answer betray cargo cat',
  },
};

export const MOCK_OTP = '123456';

// Direct Chats
export const MOCK_DIRECT_CHATS = [
  {
    id: 'd1',
    name: 'Capt. Miller',
    members: 2,
    unread: 2,
    lastMessage: 'See you at the briefing',
    timestamp: '11:45 AM',
  },
  {
    id: 'd2',
    name: 'Lt. Johnson',
    members: 2,
    unread: 0,
    lastMessage: 'Roger that',
    timestamp: 'Yesterday',
  },
  {
    id: 'd3',
    name: 'Sgt. Thompson',
    members: 2,
    unread: 1,
    lastMessage: 'Equipment ready',
    timestamp: '2 days ago',
  },
];

// Group Chats
export const MOCK_GROUPS = [
  {
    id: 'g1',
    name: 'Alpha Squad',
    members: 12,
    unread: 3,
    lastMessage: 'Mission briefing at 1400 hours',
    timestamp: '10:30 AM',
  },
  {
    id: 'g2',
    name: 'Veterans Support',
    members: 45,
    unread: 0,
    lastMessage: 'Weekly meetup scheduled',
    timestamp: 'Yesterday',
  },
  {
    id: 'g3',
    name: 'Family Network',
    members: 28,
    unread: 1,
    lastMessage: 'Event this weekend',
    timestamp: '2 days ago',
  },
];

export const MOCK_MESSAGES = [
  { id: '1', sender: 'Capt. Miller', content: 'Team, briefing at 1400', timestamp: '10:30 AM', isOwn: false },
  { id: '2', sender: 'You', content: 'Acknowledged', timestamp: '10:32 AM', isOwn: true },
  { id: '3', sender: 'Lt. Johnson', content: 'Will be there', timestamp: '10:35 AM', isOwn: false },
];

export const MOCK_PENDING_MEMBERS = [
  { id: '1', name: 'Sgt. Thompson', rank: 'Sergeant', unit: '5th Infantry', requestDate: '2 hours ago' },
  { id: '2', name: 'Cpl. Davis', rank: 'Corporal', unit: '3rd Battalion', requestDate: '1 day ago' },
];

