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
    gallerySortBy: 'date' | 'downloads' | 'likes';
    galleryFilterAnchor: HTMLElement | null;

    // Gallery interactions state
    isPreviewModalOpen: boolean;
    previewedSticker: Sticker | null;
    likedStickers: string[]; // Array of sticker IDs that are liked
    bookmarkedStickers: string[]; // Array of sticker IDs that are bookmarked
    isShareModalOpen: boolean;
    sharedSticker: Sticker | null;
    isMoreMenuOpen: boolean;
    moreMenuAnchor: HTMLElement | null;
    moreMenuSticker: Sticker | null;

    // Profile page state
    profileCurrentTab: number;
    profileEditMode: boolean;
    profileFormData: {
        fullName: string;
        email: string;
        bio: string;
        location: string;
        website: string;
        phoneNumber: string;
        dateOfBirth: string;
        occupation: string;
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
    setGallerySortBy: (sortBy: 'date' | 'downloads' | 'likes') => void;
    setGalleryFilterAnchor: (anchor: HTMLElement | null) => void;
    resetGalleryState: () => void;

    // Gallery interactions actions
    openPreviewModal: (sticker: Sticker) => void;
    closePreviewModal: () => void;
    toggleStickerLike: (stickerId: string) => void;
    toggleStickerBookmark: (stickerId: string) => void;
    downloadSticker: (sticker: Sticker) => void;
    openShareModal: (sticker: Sticker) => void;
    closeShareModal: () => void;
    shareSticker: (sticker: Sticker, platform: string) => void;
    openMoreMenu: (sticker: Sticker, anchor: HTMLElement) => void;
    closeMoreMenu: () => void;
    reportSticker: (stickerId: string, reason: string) => void;

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
    gallerySortBy: 'date',
    galleryFilterAnchor: null,

    // Gallery interactions initial state
    isPreviewModalOpen: false,
    previewedSticker: null,
    likedStickers: [],
    bookmarkedStickers: [],
    isShareModalOpen: false,
    sharedSticker: null,
    isMoreMenuOpen: false,
    moreMenuAnchor: null,
    moreMenuSticker: null,

    // Profile page initial state
    profileCurrentTab: 0,
    profileEditMode: false,
    profileFormData: {
        fullName: '',
        email: '',
        bio: '',
        location: '',
        website: '',
        phoneNumber: '',
        dateOfBirth: '',
        occupation: '',
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
    setGallerySortBy: (sortBy: 'date' | 'downloads' | 'likes') => set({ gallerySortBy: sortBy }),
    setGalleryFilterAnchor: (anchor: HTMLElement | null) => set({ galleryFilterAnchor: anchor }),
    resetGalleryState: () => set({
        gallerySearchQuery: '',
        galleryViewMode: 'grid',
        gallerySelectedCategory: 'all',
        gallerySortBy: 'date',
        galleryFilterAnchor: null,
    }),

    // Gallery interactions actions
    openPreviewModal: (sticker: Sticker) => set({
        isPreviewModalOpen: true,
        previewedSticker: sticker
    }),
    closePreviewModal: () => set({
        isPreviewModalOpen: false,
        previewedSticker: null
    }),
    toggleStickerLike: (stickerId: string) => set((state) => ({
        likedStickers: state.likedStickers.includes(stickerId)
            ? state.likedStickers.filter(id => id !== stickerId)
            : [...state.likedStickers, stickerId]
    })),
    downloadSticker: (sticker: Sticker) => {
        // Create download link and trigger download
        const link = document.createElement('a');
        link.href = sticker.file_url;
        link.download = `sticker_${sticker.id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Add download notification
        set((state) => ({
            notifications: [
                {
                    id: Date.now().toString(),
                    title: 'Tải xuống thành công',
                    message: `Sticker đã được tải về`,
                    type: 'success' as const,
                    time: 'vừa xong',
                    isRead: false
                },
                ...state.notifications
            ]
        }));
    },
    openShareModal: (sticker: Sticker) => set({
        isShareModalOpen: true,
        sharedSticker: sticker
    }),
    closeShareModal: () => set({
        isShareModalOpen: false,
        sharedSticker: null
    }),
    shareSticker: (sticker: Sticker, platform: string) => {
        const url = encodeURIComponent(window.location.origin + '/gallery/' + sticker.id);
        const text = encodeURIComponent(`Xem sticker tuyệt vời này!`);

        let shareUrl = '';
        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                break;
            case 'telegram':
                shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
                break;
            case 'copy':
                navigator.clipboard.writeText(window.location.origin + '/gallery/' + sticker.id);
                set((state) => ({
                    notifications: [
                        {
                            id: Date.now().toString(),
                            title: 'Đã sao chép liên kết',
                            message: 'Liên kết sticker đã được sao chép vào clipboard',
                            type: 'success' as const,
                            time: 'vừa xong',
                            isRead: false
                        },
                        ...state.notifications
                    ]
                }));
                return;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    },
    openMoreMenu: (sticker: Sticker, anchor: HTMLElement) => set({
        isMoreMenuOpen: true,
        moreMenuSticker: sticker,
        moreMenuAnchor: anchor
    }),
    closeMoreMenu: () => set({
        isMoreMenuOpen: false,
        moreMenuSticker: null,
        moreMenuAnchor: null
    }),
    toggleStickerBookmark: (stickerId: string) => set((state) => ({
        bookmarkedStickers: state.bookmarkedStickers.includes(stickerId)
            ? state.bookmarkedStickers.filter(id => id !== stickerId)
            : [...state.bookmarkedStickers, stickerId]
    })),
    reportSticker: (stickerId: string, reason: string) => {
        // In a real app, this would send to an API
        console.log(`Reported sticker ${stickerId} for: ${reason}`);
        set((state) => ({
            notifications: [
                {
                    id: Date.now().toString(),
                    title: 'Báo cáo đã được gửi',
                    message: 'Cảm ơn bạn đã báo cáo. Chúng tôi sẽ xem xét trong thời gian sớm nhất.',
                    type: 'info' as const,
                    time: 'vừa xong',
                    isRead: false
                },
                ...state.notifications
            ]
        }));
    },

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
            bio: '',
            location: '',
            website: '',
            phoneNumber: '',
            dateOfBirth: '',
            occupation: '',
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
