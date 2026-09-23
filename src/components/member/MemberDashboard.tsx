import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flame,
  ArrowRight,
  Play,
  TrendingDown,
  Clock,
  Dumbbell,
  Plus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HomeModuleGrid } from '../common/HomeModuleGrid';

export const MemberDashboard: React.FC = () => {
  const {
    currentUser,
    workout,
    nutrition,
    addWater,
    streakDays,
    attendance,
    sessions
  } = useApp();
  const navigate = useNavigate();

  const completedExercises = workout.exercises.filter(e => e.completed).length;
  const isWorkoutDone = workout.exercises.length > 0 && completedExercises === workout.exercises.length;
  const nextSession = sessions[0];

  return (
    <div className="animate-fade-in">
      {/* 1. Header (Requirement 7) */}
      <div className="dashboard-greeting-hero">
        <div className="greeting-text">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-green">Member Portal</span>
          </div>
          <h1>Good Morning, {currentUser.name} 👋</h1>
          <p>Ready for your fitness routine? Let's crush your goals today.</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              textAlign: 'right',
              background: '#121212',
              padding: '10px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-glass)'
            }}
          >
            <div style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              Membership Plan
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)' }}>
              {currentUser.membershipPlan}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Priority Grid */}
      <div className="widgets-grid-main">
        {/* MEMBERSHIP CARD (Requirement 8) */}
        <div className="col-4 membership-card-featured">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--primary)' }}>
                MEMBERSHIP STATUS
              </span>
              <span className="badge badge-green">{currentUser.membershipStatus}</span>
            </div>
            <h3 style={{ fontSize: '18px', marginTop: '10px' }}>{currentUser.membershipPlan}</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Validity: {currentUser.membershipDaysLeft} days remaining
            </p>

            <div className="progress-track-bg">
              <div
                className="progress-fill-bar"
                style={{ width: `${currentUser.membershipProgress || 100}%` }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-dim)' }}>
              <span>Status</span>
              <span>Active</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/memberships')}
            className="btn-ghost"
            style={{ marginTop: '16px', paddingLeft: 0, justifyContent: 'flex-start', color: 'var(--primary)' }}
          >
            <span>View Membership Details</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* TODAY'S WORKOUT CARD (Requirement 9) */}
        <div className="col-8 workout-today-card glow-hover">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-green">TODAY'S WORKOUT</span>
                <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
                  {workout.difficulty}
                </span>
              </div>
              {workout.exercises.length > 0 ? (
                isWorkoutDone ? (
                  <span className="badge badge-green">Completed!</span>
                ) : (
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {completedExercises}/{workout.exercises.length} Exercises Done
                  </span>
                )
              ) : (
                <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>No exercises in routine</span>
              )}
            </div>

            <h3 style={{ fontSize: '22px', marginTop: '12px', color: '#fff' }}>
              {workout.title}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Target: {workout.targetMuscles}
            </p>

            <div className="workout-stats-chips">
              <div className="stat-chip">
                <Dumbbell size={14} color="var(--primary)" />
                <span>{workout.exercises.length} Exercises</span>
              </div>
              <div className="stat-chip">
                <Clock size={14} color="var(--primary-light)" />
                <span>~{workout.durationMinutes} Minutes</span>
              </div>
              <div className="stat-chip">
                <Flame size={14} color="var(--primary)" />
                <span>Target Routine</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={() => navigate('/workouts')}
              className="btn-primary touch-target"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              {workout.exercises.length > 0 ? (
                <>
                  <Play size={18} fill="currentColor" />
                  <span>{isWorkoutDone ? 'Review Workout' : 'Start Workout'}</span>
                </>
              ) : (
                <>
                  <Plus size={18} />
                  <span>Customize Workout Routine</span>
                </>
              )}
            </button>
            <button
              onClick={() => navigate('/workouts')}
              className="btn-secondary touch-target"
            >
              View Plan
            </button>
          </div>
        </div>

        {/* TODAY'S NUTRITION CARD (Requirement 10) */}
        <div className="col-4 glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)' }}>
              TODAY'S NUTRITION
            </span>
            <span className="badge badge-green">Target 2,400 kcal</span>
          </div>

          <div style={{ margin: '16px 0 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                {nutrition.dailyCalories.current.toLocaleString()}{' '}
                <span style={{ fontSize: '14px', color: 'var(--text-dim)', fontWeight: 500 }}>
                  / {nutrition.dailyCalories.target.toLocaleString()} kcal
                </span>
              </span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)' }}>
                {Math.round((nutrition.dailyCalories.current / nutrition.dailyCalories.target) * 100)}%
              </span>
            </div>
            <div className="progress-track-bg">
              <div
                className="progress-fill-bar"
                style={{
                  width: `${Math.min(100, (nutrition.dailyCalories.current / nutrition.dailyCalories.target) * 100)}%`
                }}
              />
            </div>
          </div>

          {/* Macro breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '12px' }}>
            <div style={{ background: '#181818', padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Protein</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)' }}>
                {nutrition.protein.current}g <span style={{ fontSize: '10px', color: 'var(--text-dim)' }}>/{nutrition.protein.target}g</span>
              </div>
            </div>
            <div style={{ background: '#181818', padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Carbs</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary-light)' }}>
                {nutrition.carbs.current}g <span style={{ fontSize: '10px', color: 'var(--text-dim)' }}>/{nutrition.carbs.target}g</span>
              </div>
            </div>
            <div style={{ background: '#181818', padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Fat</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)' }}>
                {nutrition.fat.current}g <span style={{ fontSize: '10px', color: 'var(--text-dim)' }}>/{nutrition.fat.target}g</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/diet')}
            className="btn-ghost"
            style={{ marginTop: '16px', paddingLeft: 0, justifyContent: 'space-between', width: '100%', color: 'var(--primary)' }}
          >
            <span>View Diet & Meals</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* WATER TRACKER CARD (Requirement 11) */}
        <div className="col-4 water-tracker-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)' }}>
              💧 WATER TRACKER
            </span>
            <span className="badge badge-green">Daily Goal</span>
          </div>

          <div style={{ margin: '14px 0 10px' }}>
            <div className="water-amount-huge">
              {nutrition.waterLiters.current.toFixed(1)}
              <span style={{ fontSize: '15px', color: 'var(--text-dim)', fontWeight: 500 }}>
                / {nutrition.waterLiters.target} Liters
              </span>
            </div>
            <div className="progress-track-bg">
              <div
                style={{
                  height: '100%',
                  background: 'var(--primary)',
                  borderRadius: 'var(--radius-pill)',
                  width: `${Math.min(100, (nutrition.waterLiters.current / nutrition.waterLiters.target) * 100)}%`
                }}
              />
            </div>
          </div>

          <div className="water-buttons-row">
            <button
              onClick={() => addWater(0.25)}
              className="water-quick-btn touch-target"
            >
              + 250 ml
            </button>
            <button
              onClick={() => addWater(0.5)}
              className="water-quick-btn touch-target"
            >
              + 500 ml
            </button>
          </div>
        </div>

        {/* ATTENDANCE CARD (Requirement 12) */}
        <div className="col-4 glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)' }}>
              ATTENDANCE
            </span>
            <span className="badge badge-green">This Month</span>
          </div>

          <div style={{ margin: '14px 0' }}>
            <div style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
              {attendance.length} <span style={{ fontSize: '14px', color: 'var(--text-dim)', fontWeight: 500 }}>Visits</span>
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#0d2818',
                color: 'var(--primary-light)',
                border: '1px solid var(--primary-border)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '12px',
                fontWeight: 700,
                marginTop: '8px'
              }}
            >
              <Flame size={15} />
              <span>{streakDays} Day Streak</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/attendance')}
            className="btn-ghost"
            style={{ marginTop: '10px', paddingLeft: 0, justifyContent: 'space-between', width: '100%', color: 'var(--primary)' }}
          >
            <span>View Attendance Log</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* PROGRESS CARD (Requirement 13) */}
        <div className="col-6 glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)' }}>
              YOUR PROGRESS
            </span>
            <span className="badge badge-green">Target Tracking</span>
          </div>

          <div style={{ margin: '14px 0 10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)' }}>Weight Tracker</span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '2px',
                  color: 'var(--primary-light)',
                  fontSize: '13px',
                  fontWeight: 700,
                  marginLeft: '8px'
                }}
              >
                <TrendingDown size={16} /> Ready to Log
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Log your body metrics and weight check-ins regularly.
            </p>

            <div className="progress-track-bg">
              <div className="progress-fill-bar" style={{ width: '0%' }} />
            </div>
          </div>

          <button
            onClick={() => navigate('/progress')}
            className="btn-ghost"
            style={{ marginTop: '8px', paddingLeft: 0, justifyContent: 'space-between', width: '100%', color: 'var(--primary)' }}
          >
            <span>View Body Metrics</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* UPCOMING SESSION CARD (Requirement 14) */}
        <div className="col-6 glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)' }}>
              COACHING SESSION
            </span>
            <span className="badge badge-green">1-on-1 Training</span>
          </div>

          <div style={{ margin: '14px 0 10px' }}>
            <h4 style={{ fontSize: '17px', fontWeight: 700 }}>
              {nextSession ? nextSession.activity : 'Personal Coaching'}
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              {nextSession ? `Trainer: ${nextSession.trainerName} · ${nextSession.time}` : 'No coaching sessions scheduled for today.'}
            </p>
          </div>

          <button
            onClick={() => navigate('/sessions')}
            className="btn-secondary touch-target"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <span>{nextSession ? 'View Session Details' : 'Book a Session'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* 3. Home Module Grid (Requirement 15 & 23) */}
      <HomeModuleGrid
        title="Member Portal Modules"
        subtitle="Quick access to workout logger, nutrition, attendance & messages"
      />
    </div>
  );
};
