import { apiGet, apiPost, apiPut, apiDelete, uploadFile } from './api';
import type {
    User,
    Character,
    Emotion,
    UploadSession,
    UploadSessionWithDetails,
    Sticker,
    DailyUsage,
    PaginatedResponse,
} from '../types';
import type {
    UploadSessionCreateData,
    UploadSessionUpdateData,
    PaginationData,
    UploadSessionQueryData,
} from '../schemas';

// Auth services
export const authService = {
    // Facebook login
    loginWithFacebook: async (accessToken: string): Promise<{ user: User; token: string }> => {
        return apiPost('/auth/login', { facebookToken: accessToken });
    },

    // Get current user profile
    getProfile: async (): Promise<User> => {
        return apiGet('/auth/profile');
    },

    // Update user profile
    updateProfile: async (userData: Partial<User>): Promise<User> => {
        return apiPut('/auth/profile', userData);
    },

    // Logout
    logout: async (): Promise<void> => {
        return apiPost('/auth/logout');
    },

    // Delete account
    deleteAccount: async (): Promise<void> => {
        return apiDelete('/auth/account');
    },
};

// Character services
export const characterService = {
    // Get all active characters
    getCharacters: async (): Promise<Character[]> => {
        return apiGet('/characters');
    },

    // Get character by ID
    getCharacter: async (id: string): Promise<Character> => {
        return apiGet(`/characters/${id}`);
    },
};

// Emotion services
export const emotionService = {
    // Get all active emotions
    getEmotions: async (): Promise<Emotion[]> => {
        return apiGet('/emotions');
    },

    // Get emotion by ID
    getEmotion: async (id: string): Promise<Emotion> => {
        return apiGet(`/emotions/${id}`);
    },
};

// Upload session services
export const uploadSessionService = {
    // Create new upload session
    createSession: async (data: UploadSessionCreateData): Promise<UploadSession> => {
        return apiPost('/upload-sessions', data);
    },

    // Get user's upload sessions
    getSessions: async (params?: UploadSessionQueryData): Promise<{
        sessions: UploadSessionWithDetails[];
        total: number;
        page: number;
        totalPages: number;
    }> => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.status) queryParams.append('status', params.status);
        if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
        if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);

        const url = `/upload-sessions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        return apiGet(url);
    },

    // Get upload session by ID
    getSession: async (id: string): Promise<UploadSessionWithDetails> => {
        return apiGet(`/upload-sessions/${id}`);
    },

    // Update session with photo URLs
    updateSessionPhotos: async (id: string, data: UploadSessionUpdateData): Promise<UploadSession> => {
        return apiPut(`/upload-sessions/${id}/photos`, data);
    },

    // Delete upload session
    deleteSession: async (id: string): Promise<void> => {
        return apiDelete(`/upload-sessions/${id}`);
    },

    // Get daily usage
    getDailyUsage: async (): Promise<DailyUsage> => {
        return apiGet('/upload-sessions/daily-usage');
    },
};

// File services
export const fileService = {
    // Upload file
    uploadFile: async (file: File, onProgress?: (progress: number) => void) => {
        return uploadFile(file, onProgress);
    },

    // Get pre-signed URL for upload
    getPresignedUrl: async (fileName: string, fileType: string) => {
        return apiPost('/files/presigned-url', { fileName, fileType });
    },

    // Delete file
    deleteFile: async (fileKey: string): Promise<void> => {
        return apiDelete(`/files/${fileKey}`);
    },
};

// Sticker services (when implemented)
export const stickerService = {
    // Get user's stickers
    getStickers: async (params?: PaginationData): Promise<PaginatedResponse<Sticker>> => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
        if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);

        const url = `/stickers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        return apiGet(url);
    },

    // Get sticker by ID
    getSticker: async (id: string): Promise<Sticker> => {
        return apiGet(`/stickers/${id}`);
    },

    // Generate sticker from upload session
    generateSticker: async (sessionId: string): Promise<Sticker> => {
        return apiPost(`/stickers/generate/${sessionId}`);
    },

    // Delete sticker
    deleteSticker: async (id: string): Promise<void> => {
        return apiDelete(`/stickers/${id}`);
    },

    // Toggle sticker public status
    togglePublic: async (id: string): Promise<Sticker> => {
        return apiPut(`/stickers/${id}/toggle-public`);
    },
};

// Health service
export const healthService = {
    // Check API health
    checkHealth: async () => {
        return apiGet('/health');
    },
};
