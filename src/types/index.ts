// User types
export interface User {
    id: string;
    facebook_id: string;
    email: string;
    full_name: string;
    profile_picture_url?: string;
    role: 'user' | 'admin';
    is_active: boolean;
    created_at: string;
    updated_at: string;
    last_login_at?: string;
}

// Character types
export interface Character {
    id: string;
    name: string;
    description?: string;
    category?: string;
    image_url?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

// Emotion types
export interface Emotion {
    id: string;
    name: string;
    description?: string;
    category?: string;
    icon_url?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

// Upload Session types
export interface UploadSession {
    id: string;
    user_id: string;
    character_id: string;
    emotion_id: string;
    first_photo_url?: string;
    second_photo_url?: string;
    status: 'pending' | 'completed' | 'failed';
    created_at: string;
    updated_at: string;
}

export interface UploadSessionWithDetails extends UploadSession {
    character_name?: string;
    emotion_name?: string;
    sticker_count?: number;
}

// Sticker types
export interface Sticker {
    id: string;
    upload_session_id: string;
    file_url: string;
    thumbnail_url?: string;
    ai_prompt_used?: string;
    generation_metadata?: any;
    is_public: boolean;
    created_at: string;
    updated_at: string;
}

// API Response types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

// Auth types
export interface AuthTokenPayload {
    userId: string;
    email: string;
    role: 'user' | 'admin';
    iat: number;
    exp: number;
}

// Facebook OAuth response
export interface FacebookUserData {
    id: string;
    name: string;
    email: string;
    picture?: {
        data?: {
            url?: string;
        };
    };
}

// Upload types
export interface FileUploadResponse {
    url: string;
    key: string;
    size: number;
    contentType: string;
}

// Daily usage types
export interface DailyUsage {
    todayUploads: number;
    dailyLimit: number;
    remainingUploads: number;
}

// Pagination types
export interface PaginationParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    totalPages: number;
}
