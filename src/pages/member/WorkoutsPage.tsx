import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Play,
  CheckCircle2,
  Minus,
  Plus,
  RotateCcw,
  Clock,
  Dumbbell,
  ChevronRight,
  ChevronLeft,
  X,
  Check
} from 'lucide-react';
import { PageHeader } from '../../components/common';
import { useApp } from '../../context/AppContext';

export const WorkoutsPage: React.FC = () => {
  const { workout, addExercise, toggleExerciseCompleted, updateExerciseWeight } = useApp();
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Exercise Form
  const [exName, setExName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('Chest');
  const [sets, setSets] = useState('4');
  const [reps, setReps] = useState('10');
  const [weightKg, setWeightKg] = useState('40');
  const [restSeconds, setRestSeconds] = useState('60');
  const [instructions, setInstructions] = useState('Maintain strict form through full range of motion.');

  // Rest timer state
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const activeExercise = workout.exercises[activeExerciseIndex] || workout.exercises[0];

  const handleStartWorkout = () => {
    if (workout.exercises.length === 0) {
      setShowAddModal(true);
      return;
    }
    setIsPlayerOpen(true);
  };

  const handleNextExercise = () => {
    if (activeExerciseIndex < workout.exercises.length - 1) {
      setActiveExerciseIndex(prev => prev + 1);
      setTimerSeconds(workout.exercises[activeExerciseIndex + 1].restSeconds || 60);
      setIsTimerRunning(false);
    }
  };

  const handlePrevExercise = () => {
    if (activeExerciseIndex > 0) {
      setActiveExerciseIndex(prev => prev - 1);
      setTimerSeconds(workout.exercises[activeExerciseIndex - 1].restSeconds || 60);
      setIsTimerRunning(false);
    }
  };

  const handleCompleteCurrent = () => {
    if (!activeExercise) return;
    toggleExerciseCompleted(activeExercise.id);
    setTimerSeconds(activeExercise.restSeconds || 60);
    setIsTimerRunning(true);

    const remaining = workout.exercises.filter(
      e => e.id !== activeExercise.id && !e.completed
    );
    if (remaining.length === 0 && !activeExercise.completed) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleAddExerciseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exName.trim()) return;

    addExercise({
      name: exName,
      muscleGroup,
      sets: Number(sets) || 3,
      reps: Number(reps) || 10,
      weightKg: Number(weightKg) || 0,
      restSeconds: Number(restSeconds) || 60,
      instructions
    });

    setExName('');
    setShowAddModal(false);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Workout Routine"
        subtitle="Track exercises, weight loads, and rest intervals"
        actionText="+ Add Exercise"
        actionIcon={<Plus size={16} />}
        onAction={() => setShowAddModal(true)}
      />

      {/* 1. Mobile-First Interactive Workout Player Mode (Requirement 31) */}
      {isPlayerOpen && activeExercise ? (
        <div className="workout-player-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-green">{workout.category}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Exercise {activeExerciseIndex + 1} of {workout.exercises.length}
                </span>
              </div>
              <h2 style={{ fontSize: '22px', marginTop: '6px' }}>{activeExercise.name}</h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Target: {activeExercise.muscleGroup} · {activeExercise.sets} Sets × {activeExercise.reps} Reps
              </p>
            </div>

            <button
              onClick={handleCompleteCurrent}
              className={`btn-primary touch-target ${activeExercise.completed ? 'badge-green' : ''}`}
              style={{ padding: '8px 16px' }}
            >
              <CheckCircle2 size={18} />
              <span>{activeExercise.completed ? 'Completed' : 'Mark Done'}</span>
            </button>
          </div>

          {/* Form Guidance Box (Solid Black & Green, No Gradients) */}
          <div
            style={{
              background: '#0d2818',
              border: '1px solid var(--primary-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              textAlign: 'center',
              marginBottom: '20px'
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: '#161616',
                color: 'var(--primary)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '10px',
                border: '1px solid var(--primary-border)'
              }}
            >
              <Dumbbell size={24} />
            </div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary-light)' }}>Movement Technique</h4>
            <p style={{ fontSize: '13px', color: '#ffffff', maxWidth: '500px', margin: '4px auto 0' }}>
              {activeExercise.instructions}
            </p>
          </div>

          {/* Interactive Weight Selector: [-] 40 KG [+] */}
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.08em' }}>
              Working Weight Load
            </div>

            <div className="weight-counter-control" style={{ maxWidth: '280px', margin: '12px auto' }}>
              <button
                onClick={() => updateExerciseWeight(activeExercise.id, -2.5)}
                className="counter-circle-btn touch-target"
                aria-label="Decrease weight"
              >
                <Minus size={18} />
              </button>

              <div className="weight-display-value">
                {activeExercise.weightKg}{' '}
                <span style={{ fontSize: '14px', color: 'var(--text-dim)' }}>KG</span>
              </div>

              <button
                onClick={() => updateExerciseWeight(activeExercise.id, 2.5)}
                className="counter-circle-btn touch-target"
                aria-label="Increase weight"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Rest Timer: 01:30 countdown */}
          <div className="rest-timer-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={22} color="var(--primary)" />
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
                  Rest Timer
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Interval between sets
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span className="timer-countdown">{formatTimer(timerSeconds)}</span>

              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="btn-secondary touch-target"
                style={{ padding: '6px 12px', fontSize: '12px' }}
              >
                {isTimerRunning ? 'Pause' : 'Start'}
              </button>

              <button
                onClick={() => {
                  setTimerSeconds(activeExercise.restSeconds || 60);
                  setIsTimerRunning(false);
                }}
                className="btn-ghost touch-target"
                style={{ padding: '6px' }}
                aria-label="Reset timer"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          {/* Bottom navigation controls: Previous, Next */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginTop: '24px' }}>
            <button
              onClick={handlePrevExercise}
              disabled={activeExerciseIndex === 0}
              className="btn-secondary touch-target"
              style={{ opacity: activeExerciseIndex === 0 ? 0.3 : 1 }}
            >
              <ChevronLeft size={18} />
              <span>Previous</span>
            </button>

            <button
              onClick={() => setIsPlayerOpen(false)}
              className="btn-secondary touch-target"
            >
              Close Player
            </button>

            <button
              onClick={handleNextExercise}
              disabled={activeExerciseIndex === workout.exercises.length - 1}
              className="btn-secondary touch-target"
              style={{ opacity: activeExerciseIndex === workout.exercises.length - 1 ? 0.3 : 1 }}
            >
              <span>Next</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      ) : (
        /* 2. Standard Routine Overview Screen */
        <div>
          <div
            className="glass-panel"
            style={{
              padding: '24px',
              marginBottom: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span className="badge badge-green">Workout Plan</span>
                <h2 style={{ fontSize: '22px', marginTop: '8px' }}>{workout.title}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '2px' }}>
                  Target: {workout.targetMuscles}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn-secondary touch-target"
                >
                  <Plus size={16} />
                  <span>Add Exercise</span>
                </button>
                <button
                  onClick={handleStartWorkout}
                  className="btn-primary touch-target"
                >
                  <Play size={16} fill="currentColor" />
                  <span>Start Player</span>
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div className="stat-chip">
                <Dumbbell size={14} color="var(--primary)" />
                <span>{workout.exercises.length} Exercises</span>
              </div>
              <div className="stat-chip">
                <Clock size={14} color="var(--primary-light)" />
                <span>{workout.durationMinutes} Minutes</span>
              </div>
            </div>
          </div>

          {/* Exercise List or Empty State */}
          <h3 style={{ fontSize: '17px', marginBottom: '14px' }}>Routine Exercises</h3>
          {workout.exercises.length === 0 ? (
            <div className="empty-state-card">
              <Dumbbell size={36} color="var(--primary)" />
              <h4>No exercises in your routine yet</h4>
              <p>Add movements like Bench Press, Squats, Pull-ups, or Cable Rows to customize today's workout session.</p>
              <button onClick={() => setShowAddModal(true)} className="btn-primary touch-target" style={{ marginTop: '8px' }}>
                <Plus size={16} />
                <span>Add First Exercise</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {workout.exercises.map((ex, idx) => (
                <div
                  key={ex.id}
                  className={`exercise-player-card ${ex.completed ? 'completed' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: ex.completed ? 'var(--primary)' : '#1e1e1e',
                        color: ex.completed ? '#000000' : 'var(--text-dim)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '13px'
                      }}
                    >
                      {ex.completed ? '✓' : idx + 1}
                    </div>

                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: 700 }}>{ex.name}</h4>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {ex.sets} Sets × {ex.reps} Reps · {ex.weightKg} KG · Rest {ex.restSeconds}s
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleExerciseCompleted(ex.id)}
                    className={`btn-ghost touch-target ${ex.completed ? 'badge-green' : ''}`}
                    style={{ borderRadius: 'var(--radius-pill)', padding: '6px 14px' }}
                  >
                    <CheckCircle2 size={18} color={ex.completed ? 'var(--primary)' : 'var(--text-dim)'} />
                    <span style={{ fontSize: '12px' }}>{ex.completed ? 'Done' : 'Mark Done'}</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal: Add New Exercise */}
      {showAddModal && (
        <>
          <div className="drawer-backdrop" onClick={() => setShowAddModal(false)} />
          <div className="bottom-sheet" style={{ maxWidth: '440px', margin: '0 auto', left: 0, right: 0 }}>
            <div className="sheet-handle" />
            <div className="sheet-header">
              <h3 style={{ fontSize: '18px' }}>Add Exercise to Routine</h3>
              <button onClick={() => setShowAddModal(false)} className="btn-ghost touch-target">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddExerciseSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Exercise Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Barbell Bench Press"
                  value={exName}
                  onChange={e => setExName(e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Target Muscle Group
                </label>
                <select value={muscleGroup} onChange={e => setMuscleGroup(e.target.value)} style={{ width: '100%' }}>
                  <option value="Chest">Chest</option>
                  <option value="Back">Back</option>
                  <option value="Legs / Quads">Legs / Quads</option>
                  <option value="Shoulders">Shoulders</option>
                  <option value="Arms / Triceps">Arms / Triceps</option>
                  <option value="Core & Abs">Core & Abs</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Sets
                  </label>
                  <input
                    type="number"
                    value={sets}
                    onChange={e => setSets(e.target.value)}
                    style={{ width: '100%' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Reps
                  </label>
                  <input
                    type="number"
                    value={reps}
                    onChange={e => setReps(e.target.value)}
                    style={{ width: '100%' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Weight (KG)
                  </label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={e => setWeightKg(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Rest (s)
                  </label>
                  <input
                    type="number"
                    value={restSeconds}
                    onChange={e => setRestSeconds(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Form Instructions
                </label>
                <input
                  type="text"
                  value={instructions}
                  onChange={e => setInstructions(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <button type="submit" className="btn-primary touch-target" style={{ marginTop: '10px', justifyContent: 'center' }}>
                <Check size={18} />
                <span>Save to Routine</span>
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
