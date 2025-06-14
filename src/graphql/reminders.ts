export interface Reminder {
  id: string;
  userId: string;
  description: string;
  dateTime: string; // ISO string
  createdAt: string;
}

export const listReminders = `
  query ListReminders($userId: ID!) {
    listReminders(userId: $userId) {
      id
      userId
      description
      dateTime
      createdAt
    }
  }
`;

export const createReminder = `
  mutation CreateReminder($description: String!, $dateTime: String!, $userId: ID!, $email: String!) {
    createReminder(description: $description, dateTime: $dateTime, userId: $userId, email: $email) {
      id
      userId
      description
      dateTime
      createdAt
    }
  }
`;

export const deleteReminder = `
  mutation DeleteReminder($id: ID!, $userId: ID!) {
    deleteReminder(id: $id, userId: $userId)
  }
`;

export const updateReminder = `
  mutation UpdateReminder($id: ID!) {
    updateReminder(id: $id) {
      id
      userId
      description
      dateTime
      createdAt
    }
  }
`;
