import type {
  UserProfile,
  WorkoutRoutine,
  NutritionPlan,
  AttendanceRecord,
  ProgressMetric,
  TrainerSession,
  GymClass,
  MemberRecord,
  PaymentInvoice,
  LeadRecord,
  EquipmentRecord,
  ChatMessage
} from '../types';

export const CURRENT_MEMBER_USER: UserProfile = {
  id: 'usr_001',
  name: 'Member',
  email: 'member@fitzone.com',
  role: 'member',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  phone: '+91 98000 00000',
  membershipPlan: 'Active Membership',
  membershipStatus: 'Active',
  membershipDaysLeft: 30,
  membershipProgress: 0,
  joinDate: 'Today',
  assignedTrainer: 'Personal Coach'
};

export const CURRENT_TRAINER_USER: UserProfile = {
  id: 'usr_002',
  name: 'Trainer',
  email: 'trainer@fitzone.com',
  role: 'trainer',
  avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=150&auto=format&fit=crop&q=80',
  phone: '+91 98000 00001',
  joinDate: 'Today'
};

export const CURRENT_ADMIN_USER: UserProfile = {
  id: 'usr_003',
  name: 'Admin',
  email: 'admin@fitzone.com',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  phone: '+91 98000 00002',
  joinDate: 'Today'
};

export const INITIAL_WORKOUT: WorkoutRoutine = {
  id: 'wrk_default',
  title: 'Today Workout Routine',
  category: 'Full Body & Conditioning',
  targetMuscles: 'Muscular Conditioning & Core',
  durationMinutes: 45,
  exerciseCount: 0,
  caloriesBurnEstimate: 0,
  difficulty: 'Intermediate',
  exercises: []
};

export const INITIAL_NUTRITION: NutritionPlan = {
  dailyCalories: { current: 0, target: 2400 },
  protein: { current: 0, target: 160, unit: 'g' },
  carbs: { current: 0, target: 260, unit: 'g' },
  fat: { current: 0, target: 70, unit: 'g' },
  waterLiters: { current: 0.0, target: 3.0 },
  meals: []
};

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [];

export const PROGRESS_HISTORY: ProgressMetric[] = [];

export const TRAINER_TODAY_SESSIONS: TrainerSession[] = [];

export const GYM_CLASSES: GymClass[] = [];

export const MEMBERS_DATA: MemberRecord[] = [];

export const PAYMENT_INVOICES: PaymentInvoice[] = [];

export const LEADS_DATA: LeadRecord[] = [];

export const EQUIPMENT_DATA: EquipmentRecord[] = [];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [];
