"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    AlertTriangle,
    Bell,
    Camera, Eye, EyeOff,
    Globe,
    Key,
    LogOut,
    Moon,
    Palette,
    Save,
    Settings,
    Shield,
    Sun,
    Trash2,
    User,
    X
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultTab?: 'profile' | 'notifications' | 'privacy' | 'appearance' | 'account';
}

type SettingCategory = 'profile' | 'notifications' | 'privacy' | 'appearance' | 'account';

interface UserProfile {
    name: string;
    email: string;
    avatar?: string;
}

interface NotificationSettings {
    pushNotifications: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
    marketingEmails: boolean;
    securityAlerts: boolean;
}

interface PrivacySettings {
    dataSharing: boolean;
    analytics: boolean;
    thirdPartyIntegrations: boolean;
    profileVisibility: 'public' | 'private' | 'friends';
}

interface AppearanceSettings {
    theme: 'light' | 'dark' | 'system';
    language: string;
    compactMode: boolean;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    defaultTab = 'profile'
}) => {
    const [selectedCategory, setSelectedCategory] = useState<SettingCategory>(defaultTab);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Profile state
    const [profile, setProfile] = useState<UserProfile>({
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: ''
    });

    const [profileErrors, setProfileErrors] = useState<Partial<UserProfile>>({});

    // Notification state
    const [notifications, setNotifications] = useState<NotificationSettings>({
        pushNotifications: true,
        emailNotifications: true,
        smsNotifications: false,
        marketingEmails: false,
        securityAlerts: true
    });

    // Privacy state
    const [privacy, setPrivacy] = useState<PrivacySettings>({
        dataSharing: false,
        analytics: true,
        thirdPartyIntegrations: false,
        profileVisibility: 'private'
    });

    // Appearance state
    const [appearance, setAppearance] = useState<AppearanceSettings>({
        theme: 'light',
        language: 'en',
        compactMode: false
    });

    // Password change state
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        setSelectedCategory(defaultTab);
    }, [defaultTab]);

    const validateProfile = (): boolean => {
        const errors: Partial<UserProfile> = {};

        if (!profile.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!profile.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
            errors.email = 'Invalid email format';
        }

        setProfileErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validatePassword = (): boolean => {
        const errors: Record<string, string> = {};

        if (!passwordData.currentPassword) {
            errors.currentPassword = 'Current password is required';
        }

        if (!passwordData.newPassword) {
            errors.newPassword = 'New password is required';
        } else if (passwordData.newPassword.length < 8) {
            errors.newPassword = 'Password must be at least 8 characters';
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        setPasswordErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSave = async () => {
        setIsSaving(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSaving(false);
        onClose();
    };

    const handleProfileSave = async () => {
        if (!validateProfile()) return;
        await handleSave();
    };

    const handlePasswordChange = async () => {
        if (!validatePassword()) return;
        await handleSave();
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    };

    const handleLogout = () => {
        setShowLogoutModal(false);
        onClose();
        // Implement logout logic
        console.log('Logging out...');
    };

    const handleDeleteAccount = () => {
        setShowDeleteModal(false);
        onClose();
        // Implement account deletion logic
        console.log('Deleting account...');
    };

    const handleClose = () => {
        setSelectedCategory("profile");
        onClose();
    };

    return (
        <>
            <Modal open={isOpen} onOpenChange={handleClose} size="lg">
                <div className="bg-white/95 backdrop-blur-lg rounded-lg shadow-2xl border border-white/20 max-h-[80vh] overflow-hidden">
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                            <Settings className="w-6 h-6 text-indigo-600" />
                            <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
                        </div>
                        <Button variant="ghost" size="sm" onClick={onClose}>
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    <div className="flex">
                        <Tabs value={selectedCategory} onValueChange={(value: string) => setSelectedCategory(value as SettingCategory)} className="w-full">
                            <TabsList className="flex flex-col h-full w-48 p-2 bg-gray-50/50 rounded-none">
                                <TabsTrigger value="profile" className="w-full justify-start space-x-2">
                                    <User className="w-4 h-4" />
                                    <span>Profile</span>
                                </TabsTrigger>
                                <TabsTrigger value="notifications" className="w-full justify-start space-x-2">
                                    <Bell className="w-4 h-4" />
                                    <span>Notifications</span>
                                </TabsTrigger>
                                <TabsTrigger value="privacy" className="w-full justify-start space-x-2">
                                    <Shield className="w-4 h-4" />
                                    <span>Privacy</span>
                                </TabsTrigger>
                                <TabsTrigger value="appearance" className="w-full justify-start space-x-2">
                                    <Palette className="w-4 h-4" />
                                    <span>Appearance</span>
                                </TabsTrigger>
                                <TabsTrigger value="account" className="w-full justify-start space-x-2">
                                    <Key className="w-4 h-4" />
                                    <span>Account</span>
                                </TabsTrigger>
                            </TabsList>

                            <div className="flex-1 overflow-y-auto">
                                <TabsContent value="profile" className="p-6 space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>

                                        <div className="flex items-center space-x-4">
                                            <Avatar className="w-20 h-20">
                                                <AvatarImage src={profile.avatar} />
                                                <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-xl">
                                                    {profile.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <Button variant="outline" size="sm">
                                                <Camera className="w-4 h-4 mr-2" />
                                                Change Photo
                                            </Button>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <Label htmlFor="name">Name</Label>
                                                <Input
                                                    id="name"
                                                    value={profile.name}
                                                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                                                    className={profileErrors.name ? 'border-red-500' : ''}
                                                />
                                                {profileErrors.name && (
                                                    <p className="mt-1 text-sm text-red-500">{profileErrors.name}</p>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={profile.email}
                                                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                                                    className={profileErrors.email ? 'border-red-500' : ''}
                                                />
                                                {profileErrors.email && (
                                                    <p className="mt-1 text-sm text-red-500">{profileErrors.email}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <Button onClick={handleProfileSave} disabled={isSaving}>
                                                {isSaving ? (
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                ) : (
                                                    <Save className="w-4 h-4 mr-2" />
                                                )}
                                                Save Changes
                                            </Button>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="notifications" className="p-6 space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>

                                        <Card>
                                            <CardContent className="space-y-4 p-6">
                                                {Object.entries(notifications).map(([key, value]) => (
                                                    <div key={key} className="flex items-center justify-between">
                                                        <div>
                                                            <Label htmlFor={key} className="font-medium">
                                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                                            </Label>
                                                            <p className="text-sm text-gray-500">
                                                                {key === 'pushNotifications' && 'Receive push notifications on your device'}
                                                                {key === 'emailNotifications' && 'Get updates via email'}
                                                                {key === 'smsNotifications' && 'Receive text message alerts'}
                                                                {key === 'marketingEmails' && 'Get promotional offers and news'}
                                                                {key === 'securityAlerts' && 'Important security notifications'}
                                                            </p>
                                                        </div>
                                                        <Switch
                                                            id={key}
                                                            checked={value}
                                                            onCheckedChange={(checked) =>
                                                                setNotifications(prev => ({ ...prev, [key]: checked }))
                                                            }
                                                        />
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>

                                        <div className="flex justify-end">
                                            <Button onClick={handleSave} disabled={isSaving}>
                                                {isSaving ? (
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                ) : (
                                                    <Save className="w-4 h-4 mr-2" />
                                                )}
                                                Save Changes
                                            </Button>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="privacy" className="p-6 space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium text-gray-900">Privacy Settings</h3>

                                        <Card>
                                            <CardContent className="space-y-6 p-6">
                                                <div className="space-y-4">
                                                    {Object.entries(privacy).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
                                                        <div key={key} className="flex items-center justify-between">
                                                            <div>
                                                                <Label htmlFor={key} className="font-medium">
                                                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                                                </Label>
                                                                <p className="text-sm text-gray-500">
                                                                    {key === 'dataSharing' && 'Allow sharing of anonymized usage data'}
                                                                    {key === 'analytics' && 'Help improve the app with usage analytics'}
                                                                    {key === 'thirdPartyIntegrations' && 'Allow third-party service integrations'}
                                                                </p>
                                                            </div>
                                                            <Switch
                                                                id={key}
                                                                checked={value as boolean}
                                                                onCheckedChange={(checked) =>
                                                                    setPrivacy(prev => ({ ...prev, [key]: checked }))
                                                                }
                                                            />
                                                        </div>
                                                    ))}
                                                </div>

                                                <Separator />

                                                <div className="space-y-2">
                                                    <Label>Profile Visibility</Label>
                                                    <Select
                                                        value={privacy.profileVisibility}
                                                        onValueChange={(value) =>
                                                            setPrivacy(prev => ({ ...prev, profileVisibility: value as any }))
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="public">Public</SelectItem>
                                                            <SelectItem value="private">Private</SelectItem>
                                                            <SelectItem value="friends">Friends Only</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <div className="flex justify-end">
                                            <Button onClick={handleSave} disabled={isSaving}>
                                                {isSaving ? (
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                ) : (
                                                    <Save className="w-4 h-4 mr-2" />
                                                )}
                                                Save Changes
                                            </Button>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="appearance" className="p-6 space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium text-gray-900">Appearance Settings</h3>

                                        <Card>
                                            <CardContent className="space-y-6 p-6">
                                                <div className="space-y-2">
                                                    <Label>Theme</Label>
                                                    <Select
                                                        value={appearance.theme}
                                                        onValueChange={(value) =>
                                                            setAppearance(prev => ({ ...prev, theme: value as any }))
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="light">
                                                                <div className="flex items-center space-x-2">
                                                                    <Sun className="w-4 h-4" />
                                                                    <span>Light</span>
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="dark">
                                                                <div className="flex items-center space-x-2">
                                                                    <Moon className="w-4 h-4" />
                                                                    <span>Dark</span>
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="system">
                                                                <div className="flex items-center space-x-2">
                                                                    <Globe className="w-4 h-4" />
                                                                    <span>System</span>
                                                                </div>
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label>Language</Label>
                                                    <Select
                                                        value={appearance.language}
                                                        onValueChange={(value) =>
                                                            setAppearance(prev => ({ ...prev, language: value }))
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="en">English</SelectItem>
                                                            <SelectItem value="es">Español</SelectItem>
                                                            <SelectItem value="fr">Français</SelectItem>
                                                            <SelectItem value="de">Deutsch</SelectItem>
                                                            <SelectItem value="it">Italiano</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <Label htmlFor="compactMode" className="font-medium">Compact Mode</Label>
                                                        <p className="text-sm text-gray-500">Use a more compact interface</p>
                                                    </div>
                                                    <Switch
                                                        id="compactMode"
                                                        checked={appearance.compactMode}
                                                        onCheckedChange={(checked) =>
                                                            setAppearance(prev => ({ ...prev, compactMode: checked }))
                                                        }
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <div className="flex justify-end">
                                            <Button onClick={handleSave} disabled={isSaving}>
                                                {isSaving ? (
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                ) : (
                                                    <Save className="w-4 h-4 mr-2" />
                                                )}
                                                Save Changes
                                            </Button>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="account" className="p-6 space-y-6">
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium text-gray-900">Change Password</h3>

                                            <Card>
                                                <CardContent className="space-y-4 p-6">
                                                    <div>
                                                        <Label htmlFor="currentPassword">Current Password</Label>
                                                        <div className="relative">
                                                            <Input
                                                                id="currentPassword"
                                                                type={showPassword ? "text" : "password"}
                                                                value={passwordData.currentPassword}
                                                                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                                                                className={passwordErrors.currentPassword ? 'border-red-500' : ''}
                                                            />
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                className="absolute right-0 top-0 h-full px-3"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                            >
                                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                            </Button>
                                                        </div>
                                                        {passwordErrors.currentPassword && (
                                                            <p className="mt-1 text-sm text-red-500">{passwordErrors.currentPassword}</p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="newPassword">New Password</Label>
                                                        <Input
                                                            id="newPassword"
                                                            type="password"
                                                            value={passwordData.newPassword}
                                                            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                                                            className={passwordErrors.newPassword ? 'border-red-500' : ''}
                                                        />
                                                        {passwordErrors.newPassword && (
                                                            <p className="mt-1 text-sm text-red-500">{passwordErrors.newPassword}</p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                                        <div className="relative">
                                                            <Input
                                                                id="confirmPassword"
                                                                type={showConfirmPassword ? "text" : "password"}
                                                                value={passwordData.confirmPassword}
                                                                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                                                className={passwordErrors.confirmPassword ? 'border-red-500' : ''}
                                                            />
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                className="absolute right-0 top-0 h-full px-3"
                                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            >
                                                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                            </Button>
                                                        </div>
                                                        {passwordErrors.confirmPassword && (
                                                            <p className="mt-1 text-sm text-red-500">{passwordErrors.confirmPassword}</p>
                                                        )}
                                                    </div>

                                                    <Button onClick={handlePasswordChange} disabled={isSaving} className="w-full">
                                                        {isSaving ? (
                                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                        ) : (
                                                            <Key className="w-4 h-4 mr-2" />
                                                        )}
                                                        Update Password
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </div>

                                        <Separator />

                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium text-gray-900">Account Actions</h3>

                                            <Card>
                                                <CardContent className="space-y-4 p-6">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h4 className="font-medium text-gray-900">Logout</h4>
                                                            <p className="text-sm text-gray-500">Sign out of your account</p>
                                                        </div>
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => setShowLogoutModal(true)}
                                                        >
                                                            <LogOut className="w-4 h-4 mr-2" />
                                                            Logout
                                                        </Button>
                                                    </div>

                                                    <Separator />

                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h4 className="font-medium text-red-600">Delete Account</h4>
                                                            <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                                                        </div>
                                                        <Button
                                                            variant="destructive"
                                                            onClick={() => setShowDeleteModal(true)}
                                                        >
                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </Modal>

            {/* Logout Confirmation Modal */}
            <Modal open={showLogoutModal} onOpenChange={() => setShowLogoutModal(false)} size="sm">
                <div className="bg-white/95 backdrop-blur-lg rounded-lg shadow-2xl border border-white/20 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="flex-shrink-0">
                            <LogOut className="w-6 h-6 text-orange-500" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Confirm Logout</h3>
                    </div>

                    <p className="text-gray-600 mb-6">
                        Are you sure you want to logout? You'll need to sign in again to access your account.
                    </p>

                    <div className="flex space-x-3">
                        <Button variant="outline" onClick={() => setShowLogoutModal(false)} className="flex-1">
                            Cancel
                        </Button>
                        <Button onClick={handleLogout} className="flex-1">
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Delete Account Confirmation Modal */}
            <Modal open={showDeleteModal} onOpenChange={() => setShowDeleteModal(false)} size="sm">
                <div className="bg-white/95 backdrop-blur-lg rounded-lg shadow-2xl border border-white/20 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="flex-shrink-0">
                            <AlertTriangle className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Delete Account</h3>
                    </div>

                    <div className="space-y-3 mb-6">
                        <p className="text-gray-600">
                            Are you sure you want to delete your account? This action cannot be undone.
                        </p>
                        <p className="text-sm text-red-600 font-medium">
                            All your data will be permanently deleted from our servers.
                        </p>
                    </div>

                    <div className="flex space-x-3">
                        <Button variant="outline" onClick={() => setShowDeleteModal(false)} className="flex-1">
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteAccount} className="flex-1">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Account
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};