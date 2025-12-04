import { Product, Category, User, Order, Recipe } from './types';

export const CURRENT_USER: User = {
  name: "J. Bat-erdene",
  email: "bat-erdene@gmail.com",
  avatar: "https://picsum.photos/id/1005/200/200",
  points: 1000,
  balance: 2000000,
  orderCount: 165
};

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Food', icon: 'apple' },
  { id: '2', name: 'Drinks', icon: 'cup-soda' },
  { id: '3', name: 'Household', icon: 'home' },
  { id: '4', name: 'Baby', icon: 'baby' },
  { id: '5', name: 'Dessert', icon: 'cake' },
  { id: '6', name: 'Education', icon: 'book' },
  { id: '7', name: 'Beauty', icon: 'sparkles' },
];

export const PRODUCTS: Product[] = [
  { id: '1', name: 'Polish Apples (Damla Brand)', brand: 'Damla', price: 45000, image: 'https://picsum.photos/id/1080/400/400', category: 'Food', discount: 10 },
  { id: '2', name: 'Russian Imported Lemons', brand: 'Import', price: 45000, originalPrice: 50000, image: 'https://picsum.photos/id/102/400/400', category: 'Food', discount: 20 },
  { id: '3', name: 'Mongolian Carrots', brand: 'Local', price: 35000, image: 'https://picsum.photos/id/103/400/400', category: 'Food' },
  { id: '4', name: 'Polish Pears', brand: 'Damla', price: 45000, image: 'https://picsum.photos/id/104/400/400', category: 'Food' },
  { id: '5', name: 'Red Cherries', brand: 'Organic', price: 20000, originalPrice: 25000, image: 'https://picsum.photos/id/105/400/400', category: 'Food', discount: 30 },
  { id: '6', name: 'Organic Honey', brand: 'BeeHappy', price: 15000, image: 'https://picsum.photos/id/106/400/400', category: 'Food' },
  { id: '7', name: 'Fresh Milk', brand: 'Daily', price: 5000, image: 'https://picsum.photos/id/107/400/400', category: 'Drinks' },
  { id: '8', name: 'Orange Juice', brand: 'SunSip', price: 8000, image: 'https://picsum.photos/id/108/400/400', category: 'Drinks' },
];

export const RECIPES: Recipe[] = [
  { id: '1', title: 'Italian Meat Pizza', image: 'https://picsum.photos/id/292/400/300', duration: '45 min', calories: 800 },
  { id: '2', title: 'Pork Stew with Herbs', image: 'https://picsum.photos/id/393/400/300', duration: '60 min', calories: 650 },
  { id: '3', title: 'Famous German Lasagna', image: 'https://picsum.photos/id/494/400/300', duration: '50 min', calories: 700 },
  { id: '4', title: 'Caesar Salad', image: 'https://picsum.photos/id/595/400/300', duration: '20 min', calories: 350 },
];

export const RECENT_ORDERS: Order[] = [
  { id: 'ORD-001', date: '2023-10-25', total: 150000, status: 'Delivered', items: 5 },
  { id: 'ORD-002', date: '2023-10-20', total: 85000, status: 'Delivered', items: 3 },
  { id: 'ORD-003', date: '2023-10-15', total: 240000, status: 'Processing', items: 8 },
];

export const CHART_DATA_HISTORY = [
  { name: 'Jan', value: 400000 },
  { name: 'Feb', value: 300000 },
  { name: 'Mar', value: 200000 },
  { name: 'Apr', value: 278000 },
  { name: 'May', value: 189000 },
  { name: 'Jun', value: 239000 },
  { name: 'Jul', value: 349000 },
  { name: 'Aug', value: 450000 },
];

export const CHART_DATA_CATEGORIES = [
  { name: 'Food', value: 45, fill: '#3B82F6' },
  { name: 'Drinks', value: 25, fill: '#F59E0B' },
  { name: 'Household', value: 20, fill: '#10B981' },
  { name: 'Other', value: 10, fill: '#8B5CF6' },
];