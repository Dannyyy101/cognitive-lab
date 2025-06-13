// store/useRefreshStore.ts
import { create } from 'zustand';

interface RefreshStoreProps {
    shouldRefresh: boolean;
    triggerRefresh: () => void;
    clearRefresh: () => void;
}

export const useRefreshStore = create<RefreshStoreProps>(set => ({
    shouldRefresh: false,
    triggerRefresh: () => set({ shouldRefresh: true }),
    clearRefresh: () => set({ shouldRefresh: false }),
}));
