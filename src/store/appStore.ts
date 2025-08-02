import { create } from 'zustand';
import type { Character, Emotion, UploadSession, Sticker } from '../types';

interface AppState {
    // Data
    characters: Character[];
    emotions: Emotion[];
    uploadSessions: UploadSession[];
    stickers: Sticker[];

    // UI State
    selectedCharacter: Character | null;
    selectedEmotion: Emotion | null;
    uploadProgress: number;
    isUploading: boolean;

    // Modal state
    isUploadModalOpen: boolean;
    isGalleryModalOpen: boolean;
    selectedSticker: Sticker | null;
}

interface AppActions {
    // Data actions
    setCharacters: (characters: Character[]) => void;
    setEmotions: (emotions: Emotion[]) => void;
    setUploadSessions: (sessions: UploadSession[]) => void;
    setStickers: (stickers: Sticker[]) => void;
    addSticker: (sticker: Sticker) => void;

    // Selection actions
    setSelectedCharacter: (character: Character | null) => void;
    setSelectedEmotion: (emotion: Emotion | null) => void;

    // Upload actions
    setUploadProgress: (progress: number) => void;
    setIsUploading: (uploading: boolean) => void;

    // Modal actions
    openUploadModal: () => void;
    closeUploadModal: () => void;
    openGalleryModal: (sticker?: Sticker) => void;
    closeGalleryModal: () => void;

    // Reset actions
    resetUploadState: () => void;
    clearSelections: () => void;
}

export const useAppStore = create<AppState & AppActions>((set) => ({
    // Initial state
    characters: [],
    emotions: [],
    uploadSessions: [],
    stickers: [],
    selectedCharacter: null,
    selectedEmotion: null,
    uploadProgress: 0,
    isUploading: false,
    isUploadModalOpen: false,
    isGalleryModalOpen: false,
    selectedSticker: null,

    // Data actions
    setCharacters: (characters) => set({ characters }),
    setEmotions: (emotions) => set({ emotions }),
    setUploadSessions: (uploadSessions) => set({ uploadSessions }),
    setStickers: (stickers) => set({ stickers }),
    addSticker: (sticker) => set((state) => ({
        stickers: [sticker, ...state.stickers]
    })),

    // Selection actions
    setSelectedCharacter: (selectedCharacter) => set({ selectedCharacter }),
    setSelectedEmotion: (selectedEmotion) => set({ selectedEmotion }),

    // Upload actions
    setUploadProgress: (uploadProgress) => set({ uploadProgress }),
    setIsUploading: (isUploading) => set({ isUploading }),

    // Modal actions
    openUploadModal: () => set({ isUploadModalOpen: true }),
    closeUploadModal: () => set({ isUploadModalOpen: false }),
    openGalleryModal: (selectedSticker?: Sticker) => set({
        isGalleryModalOpen: true,
        selectedSticker: selectedSticker || null
    }),
    closeGalleryModal: () => set({
        isGalleryModalOpen: false,
        selectedSticker: null
    }),

    // Reset actions
    resetUploadState: () => set({
        uploadProgress: 0,
        isUploading: false,
        selectedCharacter: null,
        selectedEmotion: null,
    }),

    clearSelections: () => set({
        selectedCharacter: null,
        selectedEmotion: null,
    }),
}));
