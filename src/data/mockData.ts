export const mockRooms = [
  {
    id: '1',
    name: 'Friends Fun Table',
    host: 'NeonKing',
    players: 6,
    maxPlayers: 9,
    blinds: 'For Fun',
    buyIn: 'Free',
    isPrivate: false,
    status: 'active',
  },
  {
    id: '2',
    name: 'Chill Night Poker',
    host: 'PokerPro',
    players: 3,
    maxPlayers: 6,
    blinds: 'Casual',
    buyIn: 'Free',
    isPrivate: false,
    status: 'active',
  },
  {
    id: '3',
    name: 'Practice Game',
    host: 'ChipMaster',
    players: 9,
    maxPlayers: 9,
    blinds: 'For Fun',
    buyIn: 'Free',
    isPrivate: true,
    status: 'active',
  },
  {
    id: '4',
    name: 'Beginner Friendly',
    host: 'NewbieHelper',
    players: 2,
    maxPlayers: 6,
    blinds: 'Learning',
    buyIn: 'Free',
    isPrivate: false,
    status: 'waiting',
  },
];

export const mockClubs = [
  {
    id: '1',
    name: 'Neon Sharks',
    members: 156,
    logo: '🦈',
    description: 'Elite poker players only',
    isPrivate: true,
  },
  {
    id: '2',
    name: 'Friday Night Poker',
    members: 89,
    logo: '🎲',
    description: 'Weekly tournaments and cash games',
    isPrivate: false,
  },
  {
    id: '3',
    name: 'Cyber Aces',
    members: 234,
    logo: '♠️',
    description: 'High stakes digital poker club',
    isPrivate: true,
  },
];

export const mockTournaments = [
  {
    id: '1',
    name: 'Weekly Fun Championship',
    startTime: '2025-11-16T20:00:00',
    buyIn: 'Free',
    prizePool: '🏆 Glory',
    registered: 89,
    maxPlayers: 100,
    status: 'registering',
  },
  {
    id: '2',
    name: 'Quick Play Madness',
    startTime: '2025-11-17T18:00:00',
    buyIn: 'Free',
    prizePool: '🎖️ Badges',
    registered: 45,
    maxPlayers: 50,
    status: 'registering',
  },
  {
    id: '3',
    name: 'Sunday Fun Day',
    startTime: '2025-11-17T21:00:00',
    buyIn: 'Free',
    prizePool: '👑 Crown',
    registered: 567,
    maxPlayers: 1000,
    status: 'registering',
  },
];

export const mockPlayers = [
  {
    id: '1',
    username: 'NeonKing',
    avatar: '👑',
    score: 250,
    seat: 0,
    status: 'active',
    cards: ['As', 'Kh'],
    isDealer: true,
  },
  {
    id: '2',
    username: 'PokerPro',
    avatar: '🎯',
    score: 185,
    seat: 2,
    status: 'active',
    cards: ['Qd', 'Jc'],
    isDealer: false,
  },
  {
    id: '3',
    username: 'ChipMaster',
    avatar: '💎',
    score: 320,
    seat: 4,
    status: 'passed',
    cards: null,
    isDealer: false,
  },
  {
    id: '4',
    username: 'BluffKing',
    avatar: '🃏',
    score: 150,
    seat: 6,
    status: 'active',
    cards: ['9s', '9h'],
    isDealer: false,
  },
];

export const mockChatMessages = [
  { id: '1', username: 'NeonKing', message: 'Good luck everyone!', timestamp: '10:30' },
  { id: '2', username: 'PokerPro', message: 'Thanks! May the best hand win.', timestamp: '10:31' },
  { id: '3', username: 'ChipMaster', message: 'All in!', timestamp: '10:32' },
  { id: '4', username: 'BluffKing', message: 'This is intense!', timestamp: '10:33' },
];

export const mockAchievements = [
  { id: '1', name: 'First Win', icon: '🏆', description: 'Win your first hand', unlocked: true },
  { id: '2', name: 'Point Master', icon: '⭐', description: 'Score 1000 points in one session', unlocked: true },
  { id: '3', name: 'Strategy Pro', icon: '😎', description: 'Play 100 strategic hands', unlocked: false },
  { id: '4', name: 'Tournament Champion', icon: '👑', description: 'Win a tournament', unlocked: false },
  { id: '5', name: 'Royal Flush', icon: '♠️', description: 'Get a royal flush', unlocked: false },
];

export const mockStats = {
  handsPlayed: 1234,
  handsWon: 567,
  biggestWin: '500 pts',
  tournamentsWon: 12,
  winRate: 45.9,
  totalEarnings: '1250 pts',
};

export const cardSuits = {
  s: '♠',
  h: '♥',
  d: '♦',
  c: '♣',
};

export const avatarOptions = ['👑', '🎯', '💎', '🃏', '🦈', '🎲', '♠️', '♥️', '♦️', '♣️', '🌟', '⚡'];
