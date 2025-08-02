import axios, { type AxiosResponse, type AxiosError } from 'axios';
import type { ApiResponse } from '../types';

// Create axios instance
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
        return response;
    },
    (error: AxiosError<ApiResponse>) => {
        // Handle 401 Unauthorized
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            window.location.href = '/login';
        }

        // Handle network errors
        if (!error.response) {
            console.error('Network error:', error.message);
            throw new Error('Network error. Please check your connection.');
        }

        // Handle API errors
        const apiError = error.response.data;
        throw new Error(apiError?.error || apiError?.message || 'An unexpected error occurred');
    }
);

// Generic API request function
export const apiRequest = async <T = any>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    url: string,
    data?: any,
    config?: any
): Promise<T> => {
    const response = await apiClient.request<ApiResponse<T>>({
        method,
        url,
        data,
        ...config,
    });

    if (!response.data.success) {
        throw new Error(response.data.error || response.data.message || 'Request failed');
    }

    return response.data.data as T;
};

// Specialized methods
export const apiGet = <T = any>(url: string, config?: any): Promise<T> =>
    apiRequest<T>('GET', url, undefined, config);

export const apiPost = <T = any>(url: string, data?: any, config?: any): Promise<T> =>
    apiRequest<T>('POST', url, data, config);

export const apiPut = <T = any>(url: string, data?: any, config?: any): Promise<T> =>
    apiRequest<T>('PUT', url, data, config);

export const apiDelete = <T = any>(url: string, config?: any): Promise<T> =>
    apiRequest<T>('DELETE', url, undefined, config);

export const apiPatch = <T = any>(url: string, data?: any, config?: any): Promise<T> =>
    apiRequest<T>('PATCH', url, data, config);

// File upload function
export const uploadFile = async (file: File, onProgress?: (progress: number) => void) => {
    const formData = new FormData();
    formData.append('file', file);

    return apiRequest('POST', '/files/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: any) => {
            if (onProgress && progressEvent.total) {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                onProgress(progress);
            }
        },
    });
};

export default apiClient;
