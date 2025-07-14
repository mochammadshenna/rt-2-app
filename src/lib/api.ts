import { create } from 'zustand';

// Environment configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';
const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || 'wss://api.example.com/ws';
const JWT_SECRET = process.env.JWT_SECRET || '';

// TypeScript interfaces
export interface User {
    id: string;
    email: string;
    name: string;
    phone: string;
    role: 'resident' | 'admin' | 'security';
    houseId: string;
    houseName: string;
    blockNumber: string;
    isActive: boolean;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
}

export interface House {
    id: string;
    blockNumber: string;
    houseNumber: string;
    area: number;
    ownerName: string;
    ownerEmail: string;
    residentCount: number;
    status: 'occupied' | 'vacant' | 'under_construction';
    createdAt: string;
}

export interface Bill {
    id: string;
    houseId: string;
    type: 'monthly_fee' | 'utilities' | 'maintenance' | 'parking' | 'security';
    title: string;
    description?: string;
    amount: number;
    dueDate: string;
    status: 'pending' | 'paid' | 'overdue';
    paymentDate?: string;
    paymentMethod?: string;
    transactionId?: string;
    createdAt: string;
}

export interface Payment {
    id: string;
    billId: string;
    amount: number;
    paymentMethod: 'bank_transfer' | 'credit_card' | 'e_wallet' | 'cash';
    transactionId: string;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    paymentDate: string;
    receipt?: string;
    notes?: string;
}

export interface Report {
    id: string;
    userId: string;
    category: 'maintenance' | 'security' | 'noise' | 'cleanliness' | 'utilities' | 'other';
    title: string;
    description: string;
    location?: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'submitted' | 'in_progress' | 'resolved' | 'closed';
    images?: string[];
    assignedTo?: string;
    resolvedAt?: string;
    resolution?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Document {
    id: string;
    userId: string;
    type: 'recommendation_letter' | 'residence_certificate' | 'parking_permit' | 'guest_pass' | 'complaint_letter';
    title: string;
    content: string;
    status: 'draft' | 'submitted' | 'approved' | 'rejected';
    documentUrl?: string;
    templateId?: string;
    approvedBy?: string;
    rejectionReason?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Announcement {
    id: string;
    authorId: string;
    authorName: string;
    title: string;
    content: string;
    category: 'general' | 'emergency' | 'maintenance' | 'event' | 'reminder';
    priority: 'low' | 'medium' | 'high';
    images?: string[];
    isPublished: boolean;
    publishedAt?: string;
    expiresAt?: string;
    targetAudience: 'all' | 'residents' | 'owners' | 'specific_blocks';
    targetBlocks?: string[];
    readBy: string[];
    createdAt: string;
    updatedAt: string;
}

export interface Camera {
    id: string;
    name: string;
    location: string;
    streamUrl: string;
    isActive: boolean;
    type: 'entrance' | 'parking' | 'playground' | 'corridor' | 'exit';
    quality: '720p' | '1080p' | '4k';
    hasNightVision: boolean;
    hasAudio: boolean;
    lastOnline: string;
}

export interface Poll {
    id: string;
    creatorId: string;
    title: string;
    description: string;
    options: PollOption[];
    type: 'single_choice' | 'multiple_choice' | 'yes_no';
    isAnonymous: boolean;
    startDate: string;
    endDate: string;
    status: 'draft' | 'active' | 'closed';
    eligibleVoters: string[];
    totalVotes: number;
    createdAt: string;
}

export interface PollOption {
    id: string;
    text: string;
    votes: number;
    voters: string[];
}

export interface Vote {
    id: string;
    pollId: string;
    userId: string;
    selectedOptions: string[];
    votedAt: string;
}

// Request/Response types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    token: string;
    user: User;
    expiresAt: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: string[];
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface CreateReportRequest {
    category: Report['category'];
    title: string;
    description: string;
    location?: string;
    priority: Report['priority'];
    images?: File[];
}

export interface CreateDocumentRequest {
    type: Document['type'];
    title: string;
    content: string;
    templateId?: string;
}

export interface CreateAnnouncementRequest {
    title: string;
    content: string;
    category: Announcement['category'];
    priority: Announcement['priority'];
    targetAudience: Announcement['targetAudience'];
    targetBlocks?: string[];
    expiresAt?: string;
    images?: File[];
}

export interface CreatePollRequest {
    title: string;
    description: string;
    options: string[];
    type: Poll['type'];
    isAnonymous: boolean;
    startDate: string;
    endDate: string;
    eligibleVoters: string[];
}

export interface PayBillRequest {
    billId: string;
    paymentMethod: Payment['paymentMethod'];
    amount: number;
}

// Error types
export class ApiError extends Error {
    constructor(
        public status: number,
        public message: string,
        public errors?: string[]
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

// Authentication store
interface AuthStore {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    setAuth: (token: string, user: User) => void;
    clearAuth: () => void;
    updateUser: (user: Partial<User>) => void;
}

export const useAuth = create<AuthStore>((set) => ({
    token: null,
    user: null,
    isAuthenticated: false,
    setAuth: (token: string, user: User) => {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(user));
        set({ token, user, isAuthenticated: true });
    },
    clearAuth: () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        set({ token: null, user: null, isAuthenticated: false });
    },
    updateUser: (userData: Partial<User>) => {
        set((state) => {
            if (state.user) {
                const updatedUser = { ...state.user, ...userData };
                localStorage.setItem('user_data', JSON.stringify(updatedUser));
                return { user: updatedUser };
            }
            return state;
        });
    },
}));

// HTTP Client wrapper
class HttpClient {
    private baseURL: string;
    private cache: Map<string, { data: any; timestamp: number; ttl: number }>;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
        this.cache = new Map();
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {},
        useCache = false,
        cacheTTL = 5 * 60 * 1000 // 5 minutes default
    ): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;
        const cacheKey = `${options.method || 'GET'}:${url}:${JSON.stringify(options.body)}`;

        // Check cache for GET requests
        if (useCache && options.method !== 'POST' && options.method !== 'PUT' && options.method !== 'DELETE') {
            const cached = this.cache.get(cacheKey);
            if (cached && Date.now() - cached.timestamp < cached.ttl) {
                return cached.data;
            }
        }

        const { token } = useAuth.getState();

        const config: RequestInit = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new ApiError(
                    response.status,
                    errorData.message || 'Request failed',
                    errorData.errors
                );
            }

            const data = await response.json();

            // Cache successful responses
            if (useCache && response.status === 200) {
                this.cache.set(cacheKey, {
                    data,
                    timestamp: Date.now(),
                    ttl: cacheTTL
                });
            }

            return data;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(0, 'Network error occurred');
        }
    }

    async get<T>(endpoint: string, useCache = false, cacheTTL?: number): Promise<T> {
        return this.request<T>(endpoint, { method: 'GET' }, useCache, cacheTTL);
    }

    async post<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async put<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }

    async upload<T>(endpoint: string, formData: FormData): Promise<T> {
        const { token } = useAuth.getState();

        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'POST',
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new ApiError(
                response.status,
                errorData.message || 'Upload failed',
                errorData.errors
            );
        }

        return response.json();
    }

    clearCache(): void {
        this.cache.clear();
    }

    invalidateCache(pattern?: string): void {
        if (!pattern) {
            this.clearCache();
            return;
        }

        for (const [key] of this.cache) {
            if (key.includes(pattern)) {
                this.cache.delete(key);
            }
        }
    }
}

// Create HTTP client instance
const httpClient = new HttpClient(API_BASE_URL);

// WebSocket Manager
class WebSocketManager {
    private ws: WebSocket | null = null;
    private listeners: Map<string, Set<Function>> = new Map();
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectDelay = 1000;

    connect(): void {
        const { token } = useAuth.getState();
        if (!token) return;

        try {
            this.ws = new WebSocket(`${WS_BASE_URL}?token=${token}`);

            this.ws.onopen = () => {
                console.log('WebSocket connected');
                this.reconnectAttempts = 0;
            };

            this.ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    this.emit(data.type, data.payload);
                } catch (error) {
                    console.error('Failed to parse WebSocket message:', error);
                }
            };

            this.ws.onclose = () => {
                console.log('WebSocket disconnected');
                this.handleReconnect();
            };

            this.ws.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        } catch (error) {
            console.error('Failed to connect WebSocket:', error);
        }
    }

    private handleReconnect(): void {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            setTimeout(() => {
                this.reconnectAttempts++;
                this.connect();
            }, this.reconnectDelay * Math.pow(2, this.reconnectAttempts));
        }
    }

    disconnect(): void {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    on(event: string, callback: Function): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(callback);
    }

    off(event: string, callback: Function): void {
        if (this.listeners.has(event)) {
            this.listeners.get(event)!.delete(callback);
        }
    }

    private emit(event: string, data: any): void {
        if (this.listeners.has(event)) {
            this.listeners.get(event)!.forEach((callback) => {
                try {
                    callback(data);
                } catch (error) {
                    console.error('WebSocket event callback error:', error);
                }
            });
        }
    }

    send(type: string, payload: any): void {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({ type, payload }));
        }
    }
}

// Create WebSocket manager instance
export const wsManager = new WebSocketManager();

// API functions
export const api = {
    // Authentication
    auth: {
        async login(credentials: LoginRequest): Promise<LoginResponse> {
            const response = await httpClient.post<LoginResponse>('/auth/login', credentials);
            if (response.success) {
                useAuth.getState().setAuth(response.token, response.user);
            }
            return response;
        },

        async logout(): Promise<ApiResponse<null>> {
            const response = await httpClient.post<ApiResponse<null>>('/auth/logout');
            useAuth.getState().clearAuth();
            wsManager.disconnect();
            httpClient.clearCache();
            return response;
        },

        async verifyToken(): Promise<ApiResponse<User>> {
            return httpClient.get<ApiResponse<User>>('/auth/verify');
        },

        async refreshToken(): Promise<LoginResponse> {
            return httpClient.post<LoginResponse>('/auth/refresh');
        },

        async forgotPassword(email: string): Promise<ApiResponse<null>> {
            return httpClient.post<ApiResponse<null>>('/auth/forgot-password', { email });
        },

        async resetPassword(token: string, password: string): Promise<ApiResponse<null>> {
            return httpClient.post<ApiResponse<null>>('/auth/reset-password', { token, password });
        },
    },

    // User management
    users: {
        async getProfile(): Promise<ApiResponse<User>> {
            return httpClient.get<ApiResponse<User>>('/users/profile', true);
        },

        async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
            const response = await httpClient.put<ApiResponse<User>>('/users/profile', data);
            if (response.success && response.data) {
                useAuth.getState().updateUser(response.data);
            }
            return response;
        },

        async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<null>> {
            return httpClient.put<ApiResponse<null>>('/users/password', {
                currentPassword,
                newPassword,
            });
        },

        async switchHouse(houseId: string): Promise<ApiResponse<User>> {
            const response = await httpClient.post<ApiResponse<User>>('/users/switch-house', { houseId });
            if (response.success && response.data) {
                useAuth.getState().updateUser(response.data);
            }
            return response;
        },

        async uploadAvatar(file: File): Promise<ApiResponse<{ avatarUrl: string }>> {
            const formData = new FormData();
            formData.append('avatar', file);
            return httpClient.upload<ApiResponse<{ avatarUrl: string }>>('/users/avatar', formData);
        },
    },

    // Houses
    houses: {
        async getHouses(page = 1, limit = 10): Promise<ApiResponse<PaginatedResponse<House>>> {
            return httpClient.get<ApiResponse<PaginatedResponse<House>>>(
                `/houses?page=${page}&limit=${limit}`,
                true,
                10 * 60 * 1000 // 10 minutes cache
            );
        },

        async getHouse(id: string): Promise<ApiResponse<House>> {
            return httpClient.get<ApiResponse<House>>(`/houses/${id}`, true);
        },
    },

    // Bills and Payments
    bills: {
        async getBills(status?: string): Promise<ApiResponse<Bill[]>> {
            const query = status ? `?status=${status}` : '';
            return httpClient.get<ApiResponse<Bill[]>>(`/bills${query}`, true);
        },

        async getBill(id: string): Promise<ApiResponse<Bill>> {
            return httpClient.get<ApiResponse<Bill>>(`/bills/${id}`, true);
        },

        async payBill(data: PayBillRequest): Promise<ApiResponse<Payment>> {
            const response = await httpClient.post<ApiResponse<Payment>>('/bills/pay', data);
            httpClient.invalidateCache('/bills');
            return response;
        },
    },

    payments: {
        async getPaymentHistory(page = 1, limit = 10): Promise<ApiResponse<PaginatedResponse<Payment>>> {
            return httpClient.get<ApiResponse<PaginatedResponse<Payment>>>(
                `/payments/history?page=${page}&limit=${limit}`,
                true
            );
        },

        async getPayment(id: string): Promise<ApiResponse<Payment>> {
            return httpClient.get<ApiResponse<Payment>>(`/payments/${id}`, true);
        },

        async uploadReceipt(paymentId: string, file: File): Promise<ApiResponse<{ receiptUrl: string }>> {
            const formData = new FormData();
            formData.append('receipt', file);
            return httpClient.upload<ApiResponse<{ receiptUrl: string }>>(`/payments/${paymentId}/receipt`, formData);
        },
    },

    // Reports
    reports: {
        async getReports(page = 1, limit = 10, status?: string): Promise<ApiResponse<PaginatedResponse<Report>>> {
            const query = status ? `?page=${page}&limit=${limit}&status=${status}` : `?page=${page}&limit=${limit}`;
            return httpClient.get<ApiResponse<PaginatedResponse<Report>>>(`/reports${query}`, true);
        },

        async getReport(id: string): Promise<ApiResponse<Report>> {
            return httpClient.get<ApiResponse<Report>>(`/reports/${id}`, true);
        },

        async createReport(data: CreateReportRequest): Promise<ApiResponse<Report>> {
            const formData = new FormData();
            formData.append('category', data.category);
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('priority', data.priority);
            if (data.location) formData.append('location', data.location);

            data.images?.forEach((file, index) => {
                formData.append(`images[${index}]`, file);
            });

            const response = await httpClient.upload<ApiResponse<Report>>('/reports', formData);
            httpClient.invalidateCache('/reports');
            return response;
        },

        async updateReportStatus(id: string, status: Report['status'], resolution?: string): Promise<ApiResponse<Report>> {
            const response = await httpClient.put<ApiResponse<Report>>(`/reports/${id}/status`, { status, resolution });
            httpClient.invalidateCache('/reports');
            return response;
        },

        async deleteReport(id: string): Promise<ApiResponse<null>> {
            const response = await httpClient.delete<ApiResponse<null>>(`/reports/${id}`);
            httpClient.invalidateCache('/reports');
            return response;
        },
    },

    // Documents
    documents: {
        async getDocuments(page = 1, limit = 10): Promise<ApiResponse<PaginatedResponse<Document>>> {
            return httpClient.get<ApiResponse<PaginatedResponse<Document>>>(
                `/documents?page=${page}&limit=${limit}`,
                true
            );
        },

        async getDocument(id: string): Promise<ApiResponse<Document>> {
            return httpClient.get<ApiResponse<Document>>(`/documents/${id}`, true);
        },

        async createDocument(data: CreateDocumentRequest): Promise<ApiResponse<Document>> {
            const response = await httpClient.post<ApiResponse<Document>>('/documents', data);
            httpClient.invalidateCache('/documents');
            return response;
        },

        async updateDocument(id: string, data: Partial<CreateDocumentRequest>): Promise<ApiResponse<Document>> {
            const response = await httpClient.put<ApiResponse<Document>>(`/documents/${id}`, data);
            httpClient.invalidateCache('/documents');
            return response;
        },

        async downloadDocument(id: string): Promise<Blob> {
            const response = await fetch(`${API_BASE_URL}/documents/${id}/download`, {
                headers: {
                    Authorization: `Bearer ${useAuth.getState().token}`,
                },
            });
            return response.blob();
        },

        async getTemplates(): Promise<ApiResponse<{ id: string; name: string; content: string }[]>> {
            return httpClient.get<ApiResponse<{ id: string; name: string; content: string }[]>>(
                '/documents/templates',
                true,
                60 * 60 * 1000 // 1 hour cache
            );
        },
    },

    // Announcements
    announcements: {
        async getAnnouncements(page = 1, limit = 10): Promise<ApiResponse<PaginatedResponse<Announcement>>> {
            return httpClient.get<ApiResponse<PaginatedResponse<Announcement>>>(
                `/announcements?page=${page}&limit=${limit}`,
                true,
                5 * 60 * 1000 // 5 minutes cache
            );
        },

        async getAnnouncement(id: string): Promise<ApiResponse<Announcement>> {
            return httpClient.get<ApiResponse<Announcement>>(`/announcements/${id}`, true);
        },

        async createAnnouncement(data: CreateAnnouncementRequest): Promise<ApiResponse<Announcement>> {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('content', data.content);
            formData.append('category', data.category);
            formData.append('priority', data.priority);
            formData.append('targetAudience', data.targetAudience);

            if (data.targetBlocks) {
                formData.append('targetBlocks', JSON.stringify(data.targetBlocks));
            }
            if (data.expiresAt) {
                formData.append('expiresAt', data.expiresAt);
            }

            data.images?.forEach((file, index) => {
                formData.append(`images[${index}]`, file);
            });

            const response = await httpClient.upload<ApiResponse<Announcement>>('/announcements', formData);
            httpClient.invalidateCache('/announcements');
            return response;
        },

        async markAsRead(id: string): Promise<ApiResponse<null>> {
            return httpClient.post<ApiResponse<null>>(`/announcements/${id}/read`);
        },
    },

    // CCTV
    cctv: {
        async getCameras(): Promise<ApiResponse<Camera[]>> {
            return httpClient.get<ApiResponse<Camera[]>>('/cctv/cameras', true);
        },

        async getCamera(id: string): Promise<ApiResponse<Camera>> {
            return httpClient.get<ApiResponse<Camera>>(`/cctv/cameras/${id}`, true);
        },

        async getCameraStream(id: string): Promise<ApiResponse<{ streamUrl: string }>> {
            return httpClient.get<ApiResponse<{ streamUrl: string }>>(`/cctv/cameras/${id}/stream`);
        },

        async getRecordings(cameraId: string, date: string): Promise<ApiResponse<{ recordings: string[] }>> {
            return httpClient.get<ApiResponse<{ recordings: string[] }>>(
                `/cctv/cameras/${cameraId}/recordings?date=${date}`,
                true
            );
        },
    },

    // Admin functions
    admin: {
        async getAllReports(page = 1, limit = 10, status?: string): Promise<ApiResponse<PaginatedResponse<Report>>> {
            const query = status ? `?page=${page}&limit=${limit}&status=${status}` : `?page=${page}&limit=${limit}`;
            return httpClient.get<ApiResponse<PaginatedResponse<Report>>>(`/admin/reports${query}`, true);
        },

        async getAllUsers(page = 1, limit = 10): Promise<ApiResponse<PaginatedResponse<User>>> {
            return httpClient.get<ApiResponse<PaginatedResponse<User>>>(
                `/admin/users?page=${page}&limit=${limit}`,
                true
            );
        },

        async updateUserStatus(userId: string, isActive: boolean): Promise<ApiResponse<User>> {
            return httpClient.put<ApiResponse<User>>(`/admin/users/${userId}/status`, { isActive });
        },

        async getStats(): Promise<ApiResponse<{
            totalUsers: number;
            totalHouses: number;
            pendingReports: number;
            totalRevenue: number;
            monthlyGrowth: number;
        }>> {
            return httpClient.get<ApiResponse<any>>('/admin/stats', true, 10 * 60 * 1000);
        },

        async createBill(data: {
            houseId: string;
            type: Bill['type'];
            title: string;
            description?: string;
            amount: number;
            dueDate: string;
        }): Promise<ApiResponse<Bill>> {
            const response = await httpClient.post<ApiResponse<Bill>>('/admin/bills', data);
            httpClient.invalidateCache('/bills');
            return response;
        },
    },

    // Polls
    polls: {
        async getPolls(page = 1, limit = 10, status?: string): Promise<ApiResponse<PaginatedResponse<Poll>>> {
            const query = status ? `?page=${page}&limit=${limit}&status=${status}` : `?page=${page}&limit=${limit}`;
            return httpClient.get<ApiResponse<PaginatedResponse<Poll>>>(`/polls${query}`, true);
        },

        async getPoll(id: string): Promise<ApiResponse<Poll>> {
            return httpClient.get<ApiResponse<Poll>>(`/polls/${id}`, true);
        },

        async createPoll(data: CreatePollRequest): Promise<ApiResponse<Poll>> {
            const response = await httpClient.post<ApiResponse<Poll>>('/polls', data);
            httpClient.invalidateCache('/polls');
            return response;
        },

        async vote(pollId: string, selectedOptions: string[]): Promise<ApiResponse<Vote>> {
            const response = await httpClient.post<ApiResponse<Vote>>(`/polls/${pollId}/vote`, { selectedOptions });
            httpClient.invalidateCache('/polls');
            return response;
        },

        async getResults(pollId: string): Promise<ApiResponse<Poll>> {
            return httpClient.get<ApiResponse<Poll>>(`/polls/${pollId}/results`, true);
        },
    },
};

// Initialize authentication from localStorage
if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');

    if (token && userData) {
        try {
            const user = JSON.parse(userData);
            useAuth.getState().setAuth(token, user);
            wsManager.connect();
        } catch (error) {
            console.error('Failed to restore authentication:', error);
            useAuth.getState().clearAuth();
        }
    }
}

// Helper functions
export const utils = {
    formatCurrency: (amount: number): string => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    },

    formatDate: (date: string | Date): string => {
        return new Intl.DateTimeFormat('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(new Date(date));
    },

    formatDateTime: (date: string | Date): string => {
        return new Intl.DateTimeFormat('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(date));
    },

    isValidEmail: (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    isValidPhone: (phone: string): boolean => {
        const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,11}$/;
        return phoneRegex.test(phone);
    },

    getStatusColor: (status: string): string => {
        const colors: Record<string, string> = {
            pending: 'yellow',
            paid: 'green',
            overdue: 'red',
            completed: 'green',
            failed: 'red',
            submitted: 'blue',
            in_progress: 'orange',
            resolved: 'green',
            closed: 'gray',
            approved: 'green',
            rejected: 'red',
            active: 'green',
            draft: 'gray',
        };
        return colors[status] || 'gray';
    },

    getPriorityColor: (priority: string): string => {
        const colors: Record<string, string> = {
            low: 'green',
            medium: 'yellow',
            high: 'orange',
            urgent: 'red',
        };
        return colors[priority] || 'gray';
    },

    debounce: <T extends (...args: any[]) => void>(func: T, delay: number): T => {
        let timeoutId: NodeJS.Timeout;
        return ((...args: any[]) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        }) as T;
    },

    throttle: <T extends (...args: any[]) => void>(func: T, delay: number): T => {
        let lastCall = 0;
        return ((...args: any[]) => {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                func(...args);
            }
        }) as T;
    },
};

export { httpClient };
