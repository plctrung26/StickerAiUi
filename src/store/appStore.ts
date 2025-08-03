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

    // Dashboard state
    isNotificationModalOpen: boolean;
    isSettingsModalOpen: boolean;
    notifications: Array<{
        id: string;
        title: string;
        message: string;
        type: 'info' | 'success' | 'warning' | 'error';
        time: string;
        isRead: boolean;
    }>;
    userSettings: {
        theme: 'light' | 'dark' | 'auto';
        notifications: boolean;
        emailUpdates: boolean;
        autoSave: boolean;
        publicProfile: boolean;
        dataSharing: boolean;
    };
    dashboardStats: {
        totalStickers: number;
        totalCollections: number;
        totalDownloads: number;
        averageRating: number;
    };

    // Create page state
    createStep: number;
    uploadedImages: File[];
    selectedCharacterId: string;
    selectedEmotionId: string;
    textPrompt: string;
    isGenerating: boolean;
    generatedImages: string[];
    selectedGeneratedImage: string;
    isPreviewOpen: boolean;

    // Gallery page state
    gallerySearchQuery: string;
    galleryViewMode: 'grid' | 'list';
    gallerySelectedCategory: string;
    galleryFilterAnchor: HTMLElement | null;

    // Profile page state
    profileCurrentTab: number;
    profileEditMode: boolean;
    profileFormData: {
        fullName: string;
        email: string;
    };

    // Login page state
    loginError: string | null;

    // Home page state
    homeSearchModalOpen: boolean;
    homeSearchQuery: string;
    homeQuickActions: Array<{
        id: string;
        title: string;
        description: string;
        icon: string;
        color: string;
        bgColor: string;
        action: string;
    }>;
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

    // Dashboard actions
    openNotificationModal: () => void;
    closeNotificationModal: () => void;
    openSettingsModal: () => void;
    closeSettingsModal: () => void;
    markNotificationAsRead: (id: string) => void;
    addNotification: (notification: Omit<AppState['notifications'][0], 'id'>) => void;
    updateUserSettings: (settings: Partial<AppState['userSettings']>) => void;
    updateDashboardStats: (stats: Partial<AppState['dashboardStats']>) => void;

    // Create page actions
    setCreateStep: (step: number) => void;
    nextCreateStep: () => void;
    prevCreateStep: () => void;
    setUploadedImages: (images: File[]) => void;
    addUploadedImage: (image: File) => void;
    removeUploadedImage: (index: number) => void;
    setSelectedCharacterId: (id: string) => void;
    setSelectedEmotionId: (id: string) => void;
    setTextPrompt: (prompt: string) => void;
    setIsGenerating: (generating: boolean) => void;
    setGeneratedImages: (images: string[]) => void;
    setSelectedGeneratedImage: (image: string) => void;
    openPreview: () => void;
    closePreview: () => void;
    resetCreateState: () => void;

    // Gallery page actions
    setGallerySearchQuery: (query: string) => void;
    setGalleryViewMode: (mode: 'grid' | 'list') => void;
    setGallerySelectedCategory: (category: string) => void;
    setGalleryFilterAnchor: (anchor: HTMLElement | null) => void;
    resetGalleryState: () => void;

    // Profile page actions
    setProfileCurrentTab: (tab: number) => void;
    setProfileEditMode: (editMode: boolean) => void;
    setProfileFormData: (data: Partial<AppState['profileFormData']>) => void;
    resetProfileState: () => void;

    // Login page actions
    setLoginError: (error: string | null) => void;

    // Home page actions
    openHomeSearchModal: () => void;
    closeHomeSearchModal: () => void;
    setHomeSearchQuery: (query: string) => void;
    executeHomeQuickAction: (actionId: string) => void;

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

    // Dashboard initial state
    isNotificationModalOpen: false,
    isSettingsModalOpen: false,
    notifications: [
        {
            id: '1',
            title: 'Sticker được phê duyệt',
            message: 'Sticker "Cute Cat" đã được phê duyệt và xuất bản',
            type: 'success',
            time: '5 phút trước',
            isRead: false
        },
        {
            id: '2',
            title: 'Cập nhật hệ thống',
            message: 'Hệ thống sẽ bảo trì từ 2:00 - 4:00 sáng',
            type: 'info',
            time: '1 giờ trước',
            isRead: false
        },
        {
            id: '3',
            title: 'Sticker vi phạm chính sách',
            message: 'Sticker "Test Image" đã bị gỡ xuống do vi phạm',
            type: 'warning',
            time: '3 giờ trước',
            isRead: true
        },
        {
            id: '4',
            title: 'Đạt mức tải xuống cao',
            message: 'Sticker của bạn đã đạt 1000 lượt tải xuống!',
            type: 'success',
            time: '1 ngày trước',
            isRead: true
        }
    ],
    userSettings: {
        theme: 'light',
        notifications: true,
        emailUpdates: true,
        autoSave: true,
        publicProfile: true,
        dataSharing: false
    },
    dashboardStats: {
        totalStickers: 156,
        totalCollections: 23,
        totalDownloads: 1245,
        averageRating: 4.8
    },

    // Create page initial state
    createStep: 0,
    uploadedImages: [],
    selectedCharacterId: '',
    selectedEmotionId: '',
    textPrompt: '',
    isGenerating: false,
    generatedImages: [],
    selectedGeneratedImage: '',
    isPreviewOpen: false,

    // Gallery page initial state
    gallerySearchQuery: '',
    galleryViewMode: 'grid',
    gallerySelectedCategory: 'all',
    galleryFilterAnchor: null,

    // Profile page initial state
    profileCurrentTab: 0,
    profileEditMode: false,
    profileFormData: {
        fullName: '',
        email: '',
    },

    // Login page initial state
    loginError: null,

    // Home page initial state
    homeSearchModalOpen: false,
    homeSearchQuery: '',
    homeQuickActions: [
        {
            id: 'create-sticker',
            title: 'Create Sticker',
            description: 'Generate custom stickers with AI',
            icon: 'add_circle',
            color: '#00BCD4',
            bgColor: 'rgba(0, 188, 212, 0.1)',
            action: 'navigate-create'
        },
        {
            id: 'browse-gallery',
            title: 'Browse Gallery',
            description: 'Explore trending stickers',
            icon: 'photo_library',
            color: '#FF5722',
            bgColor: 'rgba(255, 87, 34, 0.1)',
            action: 'navigate-gallery'
        },
        {
            id: 'view-profile',
            title: 'My Profile',
            description: 'Manage your account',
            icon: 'person',
            color: '#9C27B0',
            bgColor: 'rgba(156, 39, 176, 0.1)',
            action: 'navigate-profile'
        }
    ],

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

    // Dashboard actions
    openNotificationModal: () => set({ isNotificationModalOpen: true }),
    closeNotificationModal: () => set({ isNotificationModalOpen: false }),
    openSettingsModal: () => set({ isSettingsModalOpen: true }),
    closeSettingsModal: () => set({ isSettingsModalOpen: false }),
    markNotificationAsRead: (id: string) => set((state) => ({
        notifications: state.notifications.map(notification =>
            notification.id === id ? { ...notification, isRead: true } : notification
        )
    })),
    addNotification: (notification) => set((state) => ({
        notifications: [
            {
                ...notification,
                id: Date.now().toString(),
            },
            ...state.notifications
        ]
    })),
    updateUserSettings: (settings) => set((state) => ({
        userSettings: { ...state.userSettings, ...settings }
    })),
    updateDashboardStats: (stats) => set((state) => ({
        dashboardStats: { ...state.dashboardStats, ...stats }
    })),

    // Create page actions
    setCreateStep: (step: number) => set({ createStep: step }),
    nextCreateStep: () => set((state) => ({
        createStep: Math.min(state.createStep + 1, 3)
    })),
    prevCreateStep: () => set((state) => ({
        createStep: Math.max(state.createStep - 1, 0)
    })),
    setUploadedImages: (images: File[]) => set({ uploadedImages: images }),
    addUploadedImage: (image: File) => set((state) => ({
        uploadedImages: [...state.uploadedImages, image]
    })),
    removeUploadedImage: (index: number) => set((state) => ({
        uploadedImages: state.uploadedImages.filter((_, i) => i !== index)
    })),
    setSelectedCharacterId: (id: string) => set({ selectedCharacterId: id }),
    setSelectedEmotionId: (id: string) => set({ selectedEmotionId: id }),
    setTextPrompt: (prompt: string) => set({ textPrompt: prompt }),
    setIsGenerating: (generating: boolean) => set({ isGenerating: generating }),
    setGeneratedImages: (images: string[]) => set({ generatedImages: images }),
    setSelectedGeneratedImage: (image: string) => set({ selectedGeneratedImage: image }),
    openPreview: () => set({ isPreviewOpen: true }),
    closePreview: () => set({ isPreviewOpen: false }),
    resetCreateState: () => set({
        createStep: 0,
        uploadedImages: [],
        selectedCharacterId: '',
        selectedEmotionId: '',
        textPrompt: '',
        isGenerating: false,
        generatedImages: [],
        selectedGeneratedImage: '',
        isPreviewOpen: false,
    }),

    // Gallery page actions
    setGallerySearchQuery: (query: string) => set({ gallerySearchQuery: query }),
    setGalleryViewMode: (mode: 'grid' | 'list') => set({ galleryViewMode: mode }),
    setGallerySelectedCategory: (category: string) => set({ gallerySelectedCategory: category }),
    setGalleryFilterAnchor: (anchor: HTMLElement | null) => set({ galleryFilterAnchor: anchor }),
    resetGalleryState: () => set({
        gallerySearchQuery: '',
        galleryViewMode: 'grid',
        gallerySelectedCategory: 'all',
        galleryFilterAnchor: null,
    }),

    // Profile page actions
    setProfileCurrentTab: (tab: number) => set({ profileCurrentTab: tab }),
    setProfileEditMode: (editMode: boolean) => set({ profileEditMode: editMode }),
    setProfileFormData: (data: Partial<AppState['profileFormData']>) => set((state) => ({
        profileFormData: { ...state.profileFormData, ...data }
    })),
    resetProfileState: () => set({
        profileCurrentTab: 0,
        profileEditMode: false,
        profileFormData: {
            fullName: '',
            email: '',
        },
    }),

    // Login page actions
    setLoginError: (error: string | null) => set({ loginError: error }),

    // Home page actions
    openHomeSearchModal: () => set({ homeSearchModalOpen: true }),
    closeHomeSearchModal: () => set({ homeSearchModalOpen: false }),
    setHomeSearchQuery: (query: string) => set({ homeSearchQuery: query }),
    executeHomeQuickAction: (actionId: string) => set((state) => {
        const action = state.homeQuickActions.find(a => a.id === actionId);
        if (action?.action === 'navigate-create') {
            // This will be handled by the component using useNavigate
        } else if (action?.action === 'navigate-gallery') {
            // This will be handled by the component using useNavigate  
        } else if (action?.action === 'navigate-profile') {
            // This will be handled by the component using useNavigate
        }
        return state;
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
