export type UserRole = 'member' | 'trainer' | 'admin';

export type NavCategory = 
  | 'MAIN'
  | 'MEMBERS'
  | 'FITNESS'
  | 'TRAINING'
  | 'MANAGEMENT'
  | 'COMMUNICATION'
  | 'REPORTS'
  | 'SYSTEM';

export interface NavItemConfig {
  id: string;
  title: string;
  subtitle?: string;
  iconName: string;
  path: string;
  category: NavCategory;
  roles: UserRole[];
  badge?: string | number;
  highlight?: boolean;
  mobileBottomTab?: boolean;
  mobileOrder?: number;
  stats?: {
    label: string;
    value: string;
    trend?: string;
    trendPositive?: boolean;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  membershipPlan?: string;
  membershipStatus?: 'Active' | 'Expiring' | 'Inactive';
  membershipDaysLeft?: number;
  membershipProgress?: number;
  joinDate?: string;
  assignedTrainer?: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weightKg: number;
  restSeconds: number;
  muscleGroup: string;
  completed?: boolean;
  instructions?: string;
  videoPlaceholder?: string;
}

export interface WorkoutRoutine {
  id: string;
  title: string;
  category: string;
  targetMuscles: string;
  durationMinutes: number;
  exerciseCount: number;
  caloriesBurnEstimate: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  exercises: Exercise[];
  assignedTo?: string;
  scheduledDate?: string;
}

export interface NutritionMacro {
  current: number;
  target: number;
  unit: string;
}

export interface MealItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
  mealType: 'Breakfast' | 'Lunch' | 'Snack' | 'Dinner' | 'Post Workout';
}

export interface NutritionPlan {
  dailyCalories: { current: number; target: number };
  protein: NutritionMacro;
  carbs: NutritionMacro;
  fat: NutritionMacro;
  waterLiters: { current: number; target: number };
  meals: MealItem[];
}

export interface AttendanceRecord {
  id: string;
  date: string; // YYYY-MM-DD
  checkInTime: string;
  checkOutTime?: string;
  status: 'present' | 'absent' | 'rest_day';
  streakDays: number;
}

export interface ProgressMetric {
  date: string;
  weightKg: number;
  bodyFatPercentage?: number;
  muscleMassKg?: number;
  chestCm?: number;
  waistCm?: number;
  armsCm?: number;
}

export interface TrainerSession {
  id: string;
  time: string;
  clientName: string;
  clientId: string;
  trainerName: string;
  trainerId: string;
  activity: string;
  status: 'upcoming' | 'in_progress' | 'completed' | 'cancelled';
  notes?: string;
  date: string;
}

export interface GymClass {
  id: string;
  title: string;
  instructor: string;
  time: string;
  durationMins: number;
  room: string;
  capacity: number;
  bookedCount: number;
  difficulty: 'All Levels' | 'Intermediate' | 'High Intensity';
  isBookedByUser?: boolean;
}

export interface MemberRecord {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  plan: string;
  status: 'Active' | 'Expiring' | 'Inactive';
  daysLeft: number;
  trainer: string;
  attendanceRate: number;
  lastVisit: string;
}

export interface PaymentInvoice {
  id: string;
  memberName: string;
  memberId: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  paymentMethod: string;
  plan: string;
}

export interface LeadRecord {
  id: string;
  name: string;
  phone: string;
  interest: string;
  stage: 'New' | 'Contacted' | 'Trial Booked' | 'Converted' | 'Lost';
  source: string;
  assignedTo: string;
  dateAdded: string;
}

export interface EquipmentRecord {
  id: string;
  name: string;
  category: string;
  count: number;
  status: 'Good' | 'Needs Service' | 'Broken';
  lastService: string;
  nextService: string;
  location: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isSelf: boolean;
}
