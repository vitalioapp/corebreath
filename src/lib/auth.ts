// Sistema de autenticação simples (localStorage)
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  respiratoryProfile: {
    age?: number;
    condition?: string;
    goals?: string[];
  };
  testHistory: TestResult[];
}

export interface TestResult {
  id: string;
  testType: 'blow' | 'inspiration' | 'expiration' | 'capacity';
  score: number;
  maxScore: number;
  date: string;
  duration: number;
}

const STORAGE_KEY = 'vitalio_user';
const USERS_KEY = 'vitalio_users';

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const userJson = localStorage.getItem(STORAGE_KEY);
  return userJson ? JSON.parse(userJson) : null;
}

export function setCurrentUser(user: User | null) {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function getAllUsers(): User[] {
  if (typeof window === 'undefined') return [];
  const usersJson = localStorage.getItem(USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
}

export function saveUser(user: User) {
  if (typeof window === 'undefined') return;
  const users = getAllUsers();
  const index = users.findIndex(u => u.id === user.id);
  if (index >= 0) {
    users[index] = user;
  } else {
    users.push(user);
  }
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  setCurrentUser(user);
}

export function login(email: string, password: string): User | null {
  const users = getAllUsers();
  const user = users.find(u => u.email === email);
  // Simulação simples - em produção use hash de senha
  if (user) {
    setCurrentUser(user);
    return user;
  }
  return null;
}

export function register(name: string, email: string, password: string): User {
  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    createdAt: new Date().toISOString(),
    respiratoryProfile: {},
    testHistory: []
  };
  saveUser(newUser);
  return newUser;
}

export function logout() {
  setCurrentUser(null);
}

export function addTestResult(testResult: TestResult) {
  const user = getCurrentUser();
  if (!user) return;
  
  user.testHistory.unshift(testResult);
  // Manter apenas os últimos 50 testes
  if (user.testHistory.length > 50) {
    user.testHistory = user.testHistory.slice(0, 50);
  }
  saveUser(user);
}

export function updateRespiratoryProfile(profile: User['respiratoryProfile']) {
  const user = getCurrentUser();
  if (!user) return;
  
  user.respiratoryProfile = { ...user.respiratoryProfile, ...profile };
  saveUser(user);
}
