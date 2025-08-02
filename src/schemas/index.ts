import { z } from 'zod';

// Common schemas
export const uuidSchema = z.string().uuid('Invalid UUID format');

// Upload Session schemas
export const uploadSessionCreateSchema = z.object({
    character_id: uuidSchema,
    emotion_id: uuidSchema,
});

export const uploadSessionUpdateSchema = z.object({
    first_photo_url: z.string().url('Invalid photo URL').optional(),
    second_photo_url: z.string().url('Invalid photo URL').optional(),
});

// File upload schemas
export const fileUploadSchema = z.object({
    file: z.instanceof(File, { message: 'File is required' })
        .refine((file) => file.size <= 10 * 1024 * 1024, 'File size must be less than 10MB')
        .refine(
            (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
            'Only JPEG, PNG, and WebP files are allowed'
        ),
});

// Pagination schemas
export const paginationSchema = z.object({
    page: z.number().int().min(1).optional().default(1),
    limit: z.number().int().min(1).max(100).optional().default(10),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

// Upload session query schema
export const uploadSessionQuerySchema = paginationSchema.extend({
    status: z.enum(['pending', 'completed', 'failed']).optional(),
});

// User update schema
export const userUpdateSchema = z.object({
    full_name: z.string().min(1, 'Name is required').max(100, 'Name too long').optional(),
    profile_picture_url: z.string().url('Invalid URL').optional(),
});

// Admin schemas
export const adminPromptUpdateSchema = z.object({
    prompt: z.string().min(10, 'Prompt must be at least 10 characters')
        .max(1000, 'Prompt too long'),
    model: z.string().optional(),
    temperature: z.number().min(0).max(2).optional(),
    max_tokens: z.number().int().min(1).max(4000).optional(),
});

// Search schemas
export const searchSchema = z.object({
    query: z.string().min(1, 'Search query is required').max(100, 'Query too long'),
    category: z.string().optional(),
    sortBy: z.enum(['relevance', 'created_at', 'name']).optional().default('relevance'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

// Contact form schema
export const contactFormSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
    email: z.string().email('Invalid email address'),
    subject: z.string().min(1, 'Subject is required').max(200, 'Subject too long'),
    message: z.string().min(10, 'Message must be at least 10 characters')
        .max(1000, 'Message too long'),
});

// Facebook login schema
export const facebookLoginSchema = z.object({
    accessToken: z.string().min(1, 'Facebook access token is required'),
});

// Export types from schemas
export type UploadSessionCreateData = z.infer<typeof uploadSessionCreateSchema>;
export type UploadSessionUpdateData = z.infer<typeof uploadSessionUpdateSchema>;
export type FileUploadData = z.infer<typeof fileUploadSchema>;
export type PaginationData = z.infer<typeof paginationSchema>;
export type UploadSessionQueryData = z.infer<typeof uploadSessionQuerySchema>;
export type UserUpdateData = z.infer<typeof userUpdateSchema>;
export type AdminPromptUpdateData = z.infer<typeof adminPromptUpdateSchema>;
export type SearchData = z.infer<typeof searchSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type FacebookLoginData = z.infer<typeof facebookLoginSchema>;
