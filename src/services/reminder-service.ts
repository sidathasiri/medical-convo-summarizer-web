import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "aws-amplify/auth";
import {
  Reminder,
  listReminders,
  createReminder as createReminderMutation,
  deleteReminder as deleteReminderMutation,
  updateReminder as updateReminderMutation,
} from "../graphql/reminders";

export class ReminderService {
  static async listReminders(userId: string): Promise<Reminder[]> {
    try {
      
      const client = generateClient();
      const result = await client.graphql({
        query: listReminders,
        variables: { userId },
        authMode: "userPool",
      });

      const data = (result as any).data ?? result;
      const errors = (result as any).errors;

      if (errors && errors.length > 0) {
        throw new Error(errors[0].message || "Failed to list reminders");
      }

      return data.listReminders;
    } catch (err: any) {
      if (err?.message?.includes("No current user")) {
        throw new Error("User is not authenticated. Please sign in again.");
      }
      throw err;
    }
  }

  static async createReminder(description: string, dateTime: string, userId: string, email: string): Promise<Reminder> {
    try {
      const client = generateClient();
      if (!email) {
        throw new Error("User email not found");
      }

      const result = await client.graphql({
        query: createReminderMutation,
        variables: { description, dateTime, userId, email },
        authMode: "userPool",
      });

      const data = (result as any).data ?? result;
      const errors = (result as any).errors;

      if (errors && errors.length > 0) {
        throw new Error(errors[0].message || "Failed to create reminder");
      }

      return data.createReminder;
    } catch (err: any) {
      if (err?.message?.includes("No current user")) {
        throw new Error("User is not authenticated. Please sign in again.");
      }
      throw err;
    }
  }

  static async deleteReminder(id: string, userId: string): Promise<boolean> {
    try {
      
      const client = generateClient();
      const result = await client.graphql({
        query: deleteReminderMutation,
        variables: { id, userId },
        authMode: "userPool",
      });

      const data = (result as any).data ?? result;
      const errors = (result as any).errors;

      if (errors && errors.length > 0) {
        throw new Error(errors[0].message || "Failed to delete reminder");
      }

      return data.deleteReminder;
    } catch (err: any) {
      if (err?.message?.includes("No current user")) {
        throw new Error("User is not authenticated. Please sign in again.");
      }
      throw err;
    }
  }

  static async updateReminder(id: string): Promise<Reminder> {
    try {
      await getCurrentUser(); // Verify authentication
      
      const client = generateClient();
      const result = await client.graphql({
        query: updateReminderMutation,
        variables: { id },
        authMode: "userPool",
      });

      const data = (result as any).data ?? result;
      const errors = (result as any).errors;

      if (errors && errors.length > 0) {
        throw new Error(errors[0].message || "Failed to update reminder");
      }

      return data.updateReminder;
    } catch (err: any) {
      if (err?.message?.includes("No current user")) {
        throw new Error("User is not authenticated. Please sign in again.");
      }
      throw err;
    }
  }
}