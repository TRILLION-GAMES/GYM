import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  UserRole,
  UserProfile,
  WorkoutRoutine,
  Exercise,
  NutritionPlan,
  AttendanceRecord,
  MemberRecord,
  PaymentInvoice,
  LeadRecord,
  EquipmentRecord,
  ChatMessage,
  TrainerSession,
  GymClass
} from '../types';
import {
  CURRENT_MEMBER_USER,
  CURRENT_TRAINER_USER,
  CURRENT_ADMIN_USER,
  INITIAL_WORKOUT,
  INITIAL_NUTRITION,
  INITIAL_ATTENDANCE,
  MEMBERS_DATA,
  PAYMENT_INVOICES,
  LEADS_DATA,
  EQUIPMENT_DATA,
  INITIAL_CHAT_MESSAGES,
  TRAINER_TODAY_SESSIONS,
  GYM_CLASSES
} from '../services/mockData';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'workout' | 'payment' | 'session' | 'alert';
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: UserProfile;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  toggleDrawer: () => void;
  isMoreSheetOpen: boolean;
  setIsMoreSheetOpen: (open: boolean) => void;
  workout: WorkoutRoutine;
  addExercise: (exercise: Omit<Exercise, 'id'>) => void;
  toggleExerciseCompleted: (exerciseId: string) => void;
  updateExerciseWeight: (exerciseId: string, deltaKg: number) => void;
  completeWorkout: () => void;
  nutrition: NutritionPlan;
  addWater: (liters: number) => void;
  addMeal: (meal: Omit<import('../types').MealItem, 'id'>) => void;
  attendance: AttendanceRecord[];
  streakDays: number;
  hasCheckedInToday: boolean;
  checkInToday: () => void;
  members: MemberRecord[];
  addMember: (member: Omit<MemberRecord, 'id' | 'lastVisit'>) => void;
  payments: PaymentInvoice[];
  recordPayment: (payment: Omit<PaymentInvoice, 'id' | 'date'>) => void;
  leads: LeadRecord[];
  addLead: (lead: Omit<LeadRecord, 'id' | 'dateAdded'>) => void;
  updateLeadStage: (leadId: string, stage: LeadRecord['stage']) => void;
  equipment: EquipmentRecord[];
  addEquipment: (item: Omit<EquipmentRecord, 'id' | 'lastService' | 'nextService'>) => void;
  updateEquipmentStatus: (id: string, status: EquipmentRecord['status']) => void;
  sessions: TrainerSession[];
  addSession: (session: Omit<TrainerSession, 'id' | 'date'>) => void;
  updateSessionStatus: (id: string, status: TrainerSession['status']) => void;
  classes: GymClass[];
  addClass: (cls: Omit<GymClass, 'id' | 'bookedCount' | 'isBookedByUser'>) => void;
  toggleBookClass: (id: string) => void;
  messages: ChatMessage[];
  sendMessage: (text: string) => void;
  notifications: AppNotification[];
  unreadNotificationCount: number;
  markNotificationsAsRead: () => void;
  accentColor: string;
  setAccentColor: (hex: string) => void;
  resetThemeColor: () => void;
  themePresets: typeof THEME_COLOR_PRESETS;
}

export interface ThemeColorPreset {
  id: string;
  name: string;
  hex: string;
  light: string;
}

export const THEME_COLOR_PRESETS: ThemeColorPreset[] = [
  { id: 'green', name: 'Light Green (Default)', hex: '#22c55e', light: '#4ade80' },
  { id: 'yellow', name: 'Electric Yellow', hex: '#eab308', light: '#fde047' },
  { id: 'red', name: 'Flame Red', hex: '#ef4444', light: '#f87171' },
  { id: 'cyan', name: 'Electric Cyan', hex: '#06b6d4', light: '#38bdf8' },
  { id: 'purple', name: 'Ultra Violet', hex: '#a855f7', light: '#c084fc' },
  { id: 'orange', name: 'Sunset Orange', hex: '#f97316', light: '#fb923c' },
];

export const generateThemeStyles = (hex: string) => {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  const num = parseInt(c, 16);
  if (isNaN(num)) return null;

  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  const lightR = Math.round(r + (255 - r) * 0.3);
  const lightG = Math.round(g + (255 - g) * 0.3);
  const lightB = Math.round(b + (255 - b) * 0.3);

  const darkR = Math.round(r * 0.75);
  const darkG = Math.round(g * 0.75);
  const darkB = Math.round(b * 0.75);

  const bgR = Math.round(r * 0.14);
  const bgG = Math.round(g * 0.14);
  const bgB = Math.round(b * 0.14);

  const borderR = Math.round(r * 0.32);
  const borderG = Math.round(g * 0.32);
  const borderB = Math.round(b * 0.32);

  return {
    primary: `#${c}`,
    primaryLight: `rgb(${lightR}, ${lightG}, ${lightB})`,
    primaryDark: `rgb(${darkR}, ${darkG}, ${darkB})`,
    primaryBg: `rgb(${bgR}, ${bgG}, ${bgB})`,
    primaryBorder: `rgb(${borderR}, ${borderG}, ${borderB})`,
  };
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('member');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMoreSheetOpen, setIsMoreSheetOpen] = useState(false);

  // User Profile based on active role
  const [currentUser, setCurrentUser] = useState<UserProfile>(CURRENT_MEMBER_USER);

  // Accent color state with local storage persistence
  const [accentColor, setAccentColorState] = useState<string>(() => {
    try {
      return localStorage.getItem('fitzone_accent_color') || '#22c55e';
    } catch {
      return '#22c55e';
    }
  });

  const applyThemeColor = (hex: string) => {
    const styles = generateThemeStyles(hex);
    if (!styles) return;
    const root = document.documentElement;
    root.style.setProperty('--primary', styles.primary);
    root.style.setProperty('--primary-light', styles.primaryLight);
    root.style.setProperty('--primary-dark', styles.primaryDark);
    root.style.setProperty('--primary-bg', styles.primaryBg);
    root.style.setProperty('--primary-border', styles.primaryBorder);
    root.style.setProperty('--border-focus', styles.primary);
    try {
      localStorage.setItem('fitzone_accent_color', hex);
    } catch {
      // ignore
    }
    setAccentColorState(hex);
  };

  const setAccentColor = (hex: string) => {
    applyThemeColor(hex);
  };

  const resetThemeColor = () => {
    applyThemeColor('#22c55e');
  };

  useEffect(() => {
    applyThemeColor(accentColor);
  }, []);

  useEffect(() => {
    if (role === 'member') setCurrentUser(CURRENT_MEMBER_USER);
    else if (role === 'trainer') setCurrentUser(CURRENT_TRAINER_USER);
    else setCurrentUser(CURRENT_ADMIN_USER);
  }, [role]);

  // Workout state - clean initial state
  const [workout, setWorkout] = useState<WorkoutRoutine>(INITIAL_WORKOUT);

  const addExercise = (exerciseData: Omit<Exercise, 'id'>) => {
    const newEx: Exercise = {
      ...exerciseData,
      id: `ex_${Date.now()}`
    };
    setWorkout(prev => ({
      ...prev,
      exerciseCount: prev.exerciseCount + 1,
      exercises: [...prev.exercises, newEx]
    }));
  };

  const toggleExerciseCompleted = (exerciseId: string) => {
    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map(ex =>
        ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
      )
    }));
  };

  const updateExerciseWeight = (exerciseId: string, deltaKg: number) => {
    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map(ex =>
        ex.id === exerciseId ? { ...ex, weightKg: Math.max(0, ex.weightKg + deltaKg) } : ex
      )
    }));
  };

  const completeWorkout = () => {
    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map(ex => ({ ...ex, completed: true }))
    }));
  };

  // Nutrition state - clean initial state
  const [nutrition, setNutrition] = useState<NutritionPlan>(INITIAL_NUTRITION);

  const addWater = (liters: number) => {
    setNutrition(prev => ({
      ...prev,
      waterLiters: {
        ...prev.waterLiters,
        current: Number((Math.min(5.0, prev.waterLiters.current + liters)).toFixed(1))
      }
    }));
  };

  const addMeal = (meal: Omit<import('../types').MealItem, 'id'>) => {
    const newMeal = { ...meal, id: `meal_${Date.now()}` };
    setNutrition(prev => ({
      ...prev,
      dailyCalories: {
        ...prev.dailyCalories,
        current: prev.dailyCalories.current + meal.calories
      },
      protein: {
        ...prev.protein,
        current: prev.protein.current + meal.protein
      },
      carbs: {
        ...prev.carbs,
        current: prev.carbs.current + meal.carbs
      },
      fat: {
        ...prev.fat,
        current: prev.fat.current + meal.fat
      },
      meals: [newMeal, ...prev.meals]
    }));
  };

  // Attendance state
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [streakDays, setStreakDays] = useState(0);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);

  const checkInToday = () => {
    if (!hasCheckedInToday) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newRecord: AttendanceRecord = {
        id: `att_${Date.now()}`,
        date: now.toISOString().split('T')[0],
        checkInTime: timeStr,
        status: 'present',
        streakDays: streakDays + 1
      };
      setAttendance(prev => [newRecord, ...prev]);
      setStreakDays(prev => prev + 1);
      setHasCheckedInToday(true);
    }
  };

  // Directory & Admin records
  const [members, setMembers] = useState<MemberRecord[]>(MEMBERS_DATA);
  const addMember = (memberData: Omit<MemberRecord, 'id' | 'lastVisit'>) => {
    const newMember: MemberRecord = {
      ...memberData,
      id: `usr_${Date.now()}`,
      lastVisit: 'Just now'
    };
    setMembers(prev => [newMember, ...prev]);
  };

  const [payments, setPayments] = useState<PaymentInvoice[]>(PAYMENT_INVOICES);
  const recordPayment = (paymentData: Omit<PaymentInvoice, 'id' | 'date'>) => {
    const newInvoice: PaymentInvoice = {
      ...paymentData,
      id: `INV-${Date.now().toString().slice(-4)}`,
      date: 'Today'
    };
    setPayments(prev => [newInvoice, ...prev]);
  };

  const [leads, setLeads] = useState<LeadRecord[]>(LEADS_DATA);
  const addLead = (leadData: Omit<LeadRecord, 'id' | 'dateAdded'>) => {
    const newLead: LeadRecord = {
      ...leadData,
      id: `lead_${Date.now()}`,
      dateAdded: 'Today'
    };
    setLeads(prev => [newLead, ...prev]);
  };
  const updateLeadStage = (leadId: string, stage: LeadRecord['stage']) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage } : l));
  };

  const [equipment, setEquipment] = useState<EquipmentRecord[]>(EQUIPMENT_DATA);
  const addEquipment = (itemData: Omit<EquipmentRecord, 'id' | 'lastService' | 'nextService'>) => {
    const newItem: EquipmentRecord = {
      ...itemData,
      id: `eq_${Date.now()}`,
      lastService: 'Today',
      nextService: 'In 3 Months'
    };
    setEquipment(prev => [newItem, ...prev]);
  };
  const updateEquipmentStatus = (id: string, status: EquipmentRecord['status']) => {
    setEquipment(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  };

  // Sessions
  const [sessions, setSessions] = useState<TrainerSession[]>(TRAINER_TODAY_SESSIONS);
  const addSession = (sessionData: Omit<TrainerSession, 'id' | 'date'>) => {
    const newSes: TrainerSession = {
      ...sessionData,
      id: `ses_${Date.now()}`,
      date: 'Today'
    };
    setSessions(prev => [newSes, ...prev]);
  };
  const updateSessionStatus = (id: string, status: TrainerSession['status']) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  // Group Classes
  const [classes, setClasses] = useState<GymClass[]>(GYM_CLASSES);
  const addClass = (clsData: Omit<GymClass, 'id' | 'bookedCount' | 'isBookedByUser'>) => {
    const newCls: GymClass = {
      ...clsData,
      id: `cls_${Date.now()}`,
      bookedCount: 0,
      isBookedByUser: false
    };
    setClasses(prev => [newCls, ...prev]);
  };
  const toggleBookClass = (id: string) => {
    setClasses(prev =>
      prev.map(c => {
        if (c.id === id) {
          const isCurrentlyBooked = c.isBookedByUser;
          return {
            ...c,
            isBookedByUser: !isCurrentlyBooked,
            bookedCount: isCurrentlyBooked ? c.bookedCount - 1 : c.bookedCount + 1
          };
        }
        return c;
      })
    );
  };

  // Chat messages
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      senderAvatar: currentUser.avatar,
      text,
      timestamp: timeStr,
      isSelf: true
    };
    setMessages(prev => [...prev, newMsg]);
  };

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const unreadNotificationCount = notifications.filter(n => !n.read).length;
  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const toggleDrawer = () => setIsDrawerOpen(prev => !prev);

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        isDrawerOpen,
        setIsDrawerOpen,
        toggleDrawer,
        isMoreSheetOpen,
        setIsMoreSheetOpen,
        workout,
        addExercise,
        toggleExerciseCompleted,
        updateExerciseWeight,
        completeWorkout,
        nutrition,
        addWater,
        addMeal,
        attendance,
        streakDays,
        hasCheckedInToday,
        checkInToday,
        members,
        addMember,
        payments,
        recordPayment,
        leads,
        addLead,
        updateLeadStage,
        equipment,
        addEquipment,
        updateEquipmentStatus,
        sessions,
        addSession,
        updateSessionStatus,
        classes,
        addClass,
        toggleBookClass,
        messages,
        sendMessage,
        notifications,
        unreadNotificationCount,
        markNotificationsAsRead,
        accentColor,
        setAccentColor,
        resetThemeColor,
        themePresets: THEME_COLOR_PRESETS
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
