// Storage interface for future use if needed
// Currently, this app doesn't require data persistence
// as it fetches RSS feeds directly from the n8n webhook

export interface IStorage {
  // Add storage methods here if needed in the future
}

export class MemStorage implements IStorage {
  constructor() {
    // Initialize storage if needed
  }
}

export const storage = new MemStorage();
