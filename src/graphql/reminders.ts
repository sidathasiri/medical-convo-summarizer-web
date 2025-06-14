import { generateClient } from "aws-amplify/api";

export interface Reminder {
  id: string;
  userId: string;
  description: string;
  dateTime: string; // ISO string
  createdAt: string;
  completed: boolean;
}

export const listReminders = `
  query ListReminders($userId: ID!) {
    listReminders(userId: $userId) {
      id
      userId
      description
      dateTime
      createdAt
      completed
    }
  }
`;

export const createReminder = `
  mutation CreateReminder($description: String!, $dateTime: String!, $userId: ID!) {
    createReminder(description: $description, dateTime: $dateTime, userId: $userId) {
      id
      userId
      description
      dateTime
      createdAt
      completed
    }
  }
`;

export const deleteReminder = `
  mutation DeleteReminder($id: ID!, $userId: ID!) {
    deleteReminder(id: $id, userId: $userId)
  }
`;

export const updateReminder = `
  mutation UpdateReminder($id: ID!, $completed: Boolean!) {
    updateReminder(id: $id, completed: $completed) {
      id
      userId
      description
      dateTime
      createdAt
      completed
    }
  }
`;
