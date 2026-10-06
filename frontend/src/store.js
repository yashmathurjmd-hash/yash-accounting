import { create } from 'zustand';

const initialState = {
  companyName: 'YASH Pvt Ltd',
  selectedBook: 'PAKKA',
  userName: 'Admin User',
  isOffline: false,
  selectedYear: '2026-2027',
};

export const useAppStore = create((set) => ({
  app: initialState,
  setCompany: (companyName) => set((state) => ({ app: { ...state.app, companyName } })),
  setBook: (selectedBook) => set((state) => ({ app: { ...state.app, selectedBook } })),
  setOffline: (isOffline) => set((state) => ({ app: { ...state.app, isOffline } })),
}));
