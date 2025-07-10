import { AppError } from '../utils/AppError';

// Mock data - in a real app this would come from a database
const FRUITS_DATA = [
  { id: 1, name: 'Apple', color: 'Red' },
  { id: 2, name: 'Banana', color: 'Yellow' },
  { id: 3, name: 'Orange', color: 'Orange' },
  { id: 4, name: 'Grape', color: 'Purple' },
  { id: 5, name: 'Strawberry', color: 'Red' },
  { id: 6, name: 'Blueberry', color: 'Blue' },
  { id: 7, name: 'Kiwi', color: 'Green' },
  { id: 8, name: 'Mango', color: 'Yellow' },
  { id: 9, name: 'Pineapple', color: 'Yellow' },
  { id: 10, name: 'Watermelon', color: 'Green' },
];

export async function getFruits(limit: number) {
  try {
    console.log(`Fetching fruits with limit: ${limit}`);
    
    if (limit <= 0) {
      throw new AppError('Limit must be a positive number', 400);
    }

    const fruits = FRUITS_DATA.slice(0, limit);
    console.log(`Returning ${fruits.length} fruits`);
    
    return fruits;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to fetch fruits');
  }
}