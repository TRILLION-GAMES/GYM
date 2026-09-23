import React, { useState } from 'react';
import { Plus, Droplets, X, Check, UtensilsCrossed } from 'lucide-react';
import { PageHeader } from '../../components/common';
import { useApp } from '../../context/AppContext';

export const DietPage: React.FC = () => {
  const { nutrition, addWater, addMeal } = useApp();
  const [showAddMealModal, setShowAddMealModal] = useState(false);

  // New Meal Form
  const [mealName, setMealName] = useState('');
  const [mealType, setMealType] = useState<'Breakfast' | 'Lunch' | 'Snack' | 'Dinner' | 'Post Workout'>('Breakfast');
  const [calories, setCalories] = useState('450');
  const [protein, setProtein] = useState('30');
  const [carbs, setCarbs] = useState('45');
  const [fat, setFat] = useState('12');

  const handleSaveMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mealName.trim()) return;

    addMeal({
      name: mealName,
      mealType,
      calories: Number(calories) || 0,
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    setMealName('');
    setShowAddMealModal(false);
  };

  const getMealIcon = (type: string) => {
    switch (type) {
      case 'Breakfast': return '🍳';
      case 'Lunch': return '🥗';
      case 'Post Workout': return '🥤';
      case 'Dinner': return '🍲';
      default: return '🍎';
    }
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Diet & Nutrition"
        subtitle="Daily macronutrient balance, caloric intake, and meal logs"
        actionText="+ Log Meal"
        actionIcon={<Plus size={16} />}
        onAction={() => setShowAddMealModal(true)}
      />

      {/* Top Nutrition Target Card (Solid Black & Green, Zero Gradients) */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <span className="badge badge-green">Daily Nutrition Goal</span>
            <h2 style={{ fontSize: '26px', marginTop: '6px' }}>
              {nutrition.dailyCalories.current.toLocaleString()}{' '}
              <span style={{ fontSize: '15px', color: 'var(--text-dim)', fontWeight: 500 }}>
                / {nutrition.dailyCalories.target.toLocaleString()} kcal
              </span>
            </h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-display)' }}>
              {Math.max(0, nutrition.dailyCalories.target - nutrition.dailyCalories.current)} kcal
            </span>
            <div style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Remaining</div>
          </div>
        </div>

        {/* Solid Progress Bar */}
        <div className="progress-track-bg" style={{ height: '10px' }}>
          <div
            className="progress-fill-bar"
            style={{
              width: `${Math.min(100, (nutrition.dailyCalories.current / nutrition.dailyCalories.target) * 100)}%`
            }}
          />
        </div>

        {/* Macros Breakdown (Solid styling) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '20px' }}>
          {/* Protein */}
          <div style={{ background: '#161616', border: '1px solid var(--border-glass)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
              <span style={{ fontWeight: 700, color: 'var(--primary-light)' }}>Protein</span>
              <span style={{ color: 'var(--text-muted)' }}>{nutrition.protein.current}g / {nutrition.protein.target}g</span>
            </div>
            <div className="progress-track-bg" style={{ margin: 0, height: '6px' }}>
              <div
                style={{
                  height: '100%',
                  background: 'var(--primary)',
                  borderRadius: 'var(--radius-pill)',
                  width: `${Math.min(100, (nutrition.protein.current / nutrition.protein.target) * 100)}%`
                }}
              />
            </div>
          </div>

          {/* Carbs */}
          <div style={{ background: '#161616', border: '1px solid var(--border-glass)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
              <span style={{ fontWeight: 700, color: '#ffffff' }}>Carbs</span>
              <span style={{ color: 'var(--text-muted)' }}>{nutrition.carbs.current}g / {nutrition.carbs.target}g</span>
            </div>
            <div className="progress-track-bg" style={{ margin: 0, height: '6px' }}>
              <div
                style={{
                  height: '100%',
                  background: 'var(--primary-light)',
                  borderRadius: 'var(--radius-pill)',
                  width: `${Math.min(100, (nutrition.carbs.current / nutrition.carbs.target) * 100)}%`
                }}
              />
            </div>
          </div>

          {/* Fat */}
          <div style={{ background: '#161616', border: '1px solid var(--border-glass)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
              <span style={{ fontWeight: 700, color: 'var(--primary-light)' }}>Fat</span>
              <span style={{ color: 'var(--text-muted)' }}>{nutrition.fat.current}g / {nutrition.fat.target}g</span>
            </div>
            <div className="progress-track-bg" style={{ margin: 0, height: '6px' }}>
              <div
                style={{
                  height: '100%',
                  background: 'var(--primary)',
                  borderRadius: 'var(--radius-pill)',
                  width: `${Math.min(100, (nutrition.fat.current / nutrition.fat.target) * 100)}%`
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hydration Tracker (Solid Black & Green) */}
      <div
        className="glass-panel"
        style={{
          padding: '20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#0d2818',
          border: '1px solid var(--primary-border)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              background: '#161616',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--primary-border)'
            }}
          >
            <Droplets size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700 }}>Hydration: {nutrition.waterLiters.current.toFixed(1)} / {nutrition.waterLiters.target} Liters</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Keep hydration levels consistent for optimal muscular performance</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => addWater(0.25)} className="btn-secondary touch-target" style={{ padding: '6px 12px', fontSize: '13px' }}>
            +250ml
          </button>
          <button onClick={() => addWater(0.5)} className="btn-secondary touch-target" style={{ padding: '6px 12px', fontSize: '13px' }}>
            +500ml
          </button>
        </div>
      </div>

      {/* Meals Timeline */}
      <h3 style={{ fontSize: '17px', marginBottom: '14px' }}>Logged Meals</h3>
      {nutrition.meals.length === 0 ? (
        <div className="empty-state-card">
          <UtensilsCrossed size={36} color="var(--primary)" />
          <h4>No meals recorded today</h4>
          <p>Track your calories and macros by logging your breakfast, lunch, post-workout meals, or snacks.</p>
          <button onClick={() => setShowAddMealModal(true)} className="btn-primary touch-target" style={{ marginTop: '8px' }}>
            <Plus size={16} />
            <span>Log First Meal</span>
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {nutrition.meals.map(meal => (
            <div
              key={meal.id}
              className="glass-panel"
              style={{
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '24px' }}>{getMealIcon(meal.mealType)}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge badge-green" style={{ fontSize: '10px' }}>{meal.mealType}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{meal.time}</span>
                  </div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, marginTop: '2px' }}>{meal.name}</h4>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)' }}>
                  {meal.calories} kcal
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  P: {meal.protein}g · C: {meal.carbs}g · F: {meal.fat}g
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Add Food Item */}
      {showAddMealModal && (
        <>
          <div className="drawer-backdrop" onClick={() => setShowAddMealModal(false)} />
          <div className="bottom-sheet" style={{ maxWidth: '440px', margin: '0 auto', left: '0', right: '0' }}>
            <div className="sheet-handle" />
            <div className="sheet-header">
              <h3 style={{ fontSize: '18px' }}>Log Meal</h3>
              <button onClick={() => setShowAddMealModal(false)} className="btn-ghost touch-target">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveMeal} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Meal Category
                </label>
                <select
                  value={mealType}
                  onChange={e => setMealType(e.target.value as any)}
                  style={{ width: '100%' }}
                >
                  <option value="Breakfast">Breakfast 🍳</option>
                  <option value="Lunch">Lunch 🥗</option>
                  <option value="Post Workout">Post Workout 🥤</option>
                  <option value="Dinner">Dinner 🍲</option>
                  <option value="Snack">Snack 🍎</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Description / Recipe
                </label>
                <input
                  type="text"
                  placeholder="e.g., Grilled Chicken & Brown Rice"
                  value={mealName}
                  onChange={e => setMealName(e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Calories (kcal)
                  </label>
                  <input
                    type="number"
                    value={calories}
                    onChange={e => setCalories(e.target.value)}
                    style={{ width: '100%' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Protein (g)
                  </label>
                  <input
                    type="number"
                    value={protein}
                    onChange={e => setProtein(e.target.value)}
                    style={{ width: '100%' }}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Carbs (g)
                  </label>
                  <input
                    type="number"
                    value={carbs}
                    onChange={e => setCarbs(e.target.value)}
                    style={{ width: '100%' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Fat (g)
                  </label>
                  <input
                    type="number"
                    value={fat}
                    onChange={e => setFat(e.target.value)}
                    style={{ width: '100%' }}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary touch-target" style={{ marginTop: '10px', justifyContent: 'center' }}>
                <Check size={18} />
                <span>Save Logged Meal</span>
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
