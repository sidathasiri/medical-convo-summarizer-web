import React, { useState, useEffect } from 'react';
import { FaBell, FaPlus, FaTrash, FaCheck } from 'react-icons/fa';
import { styles } from '../HomePage.styles';
import { ReminderService } from '../../../services/reminder-service';
import type { Reminder } from '../../../graphql/reminders';
import { Loader } from '../../../components/Loader/Loader';

export const RemindersSection = ({userId, email}: {userId: string, email: string}) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedReminders = await ReminderService.listReminders(userId);
      setReminders(fetchedReminders.sort((a, b) => 
        new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load reminders');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !dateTime) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsSubmitting(true);
      // Convert to ISO 8601 format
      const isoDateTime = new Date(dateTime).toISOString();
      const newReminder = await ReminderService.createReminder(description, isoDateTime, userId, email);
      setReminders(prev => [...prev, newReminder].sort((a, b) => 
        new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      ));
      setDescription('');
      setDateTime('');
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create reminder');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReminder = async (id: string) => {
    try {
      await ReminderService.deleteReminder(id, userId);
      setReminders(prev => prev.filter(reminder => reminder.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete reminder');
    }
  };

  const handleToggleComplete = async (id: string) => {
    try {
      const updatedReminder = await ReminderService.updateReminder(id);
      setReminders(prev => prev.map(reminder => 
        reminder.id === id ? updatedReminder : reminder
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update reminder');
    }
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <section style={styles.recordingSection}>
      <h2 style={styles.recordingTitle}>
        <span style={{ marginRight: 8, color: '#D69E2E', verticalAlign: 'middle' }}>
          <FaBell />
        </span>
        Reminders
      </h2>

      <form onSubmit={handleCreateReminder} style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Reminder description"
            style={{
              flex: 2,
              padding: '0.85rem',
              fontSize: '1.05rem',
              border: '1px solid #E2E8F0',
              borderRadius: '0.5rem',
              outline: 'none',
            }}
          />
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            style={{
              flex: 1,
              padding: '0.85rem',
              fontSize: '1.05rem',
              border: '1px solid #E2E8F0',
              borderRadius: '0.5rem',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              ...styles.button,
              ...styles.primaryButton,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 1.5rem',
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              minWidth: '120px',
              justifyContent: 'center'
            }}
          >
            <FaPlus />
            <span>Add</span>
          </button>
        </div>
      </form>

      {error && (
        <div style={{ color: '#E53E3E', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <div style={styles.transcriptionContent}>
        {isLoading || isSubmitting ? (
          <Loader size="medium" message={isSubmitting ? "Adding reminder..." : "Loading reminders..."} />
        ) : reminders.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#718096' }}>
            No reminders yet. Add one above!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {reminders.map(reminder => (
              <div
                key={reminder.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  backgroundColor: 'white',
                  borderRadius: '0.5rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                <button
                  onClick={() => handleToggleComplete(reminder.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem',
                  }}
                >
                  <FaCheck />
                </button>
                <div style={{ flex: 1 }}>
                  <div
                  >
                    {reminder.description}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#718096' }}>
                    {formatDateTime(reminder.dateTime)}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteReminder(reminder.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#E53E3E',
                    padding: '0.5rem',
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
