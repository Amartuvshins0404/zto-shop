
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating?: number;
  isNew?: boolean;
  discount?: number;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string; // URL or icon name
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  points: number;
  balance: number;
  orderCount: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Delivered' | 'Processing' | 'Cancelled';
  items: number;
  products?: { product: Product; quantity: number }[]; // Added for Order Detail
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
  duration: string;
  calories: number;
}

export interface CalendarEvent {
  id: string;
  time: string;
  label: string;
  color: string;
}

export type NotificationType = 'success' | 'error' | 'info';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}
