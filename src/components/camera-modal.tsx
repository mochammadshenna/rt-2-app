"use client";

import { Button } from '@/components/ui/button';
import { AlertTriangle, Camera, Check, RotateCcw, SwitchCamera, Upload, X } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface CameraModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCapture: (imageBlob: Blob, imageDataUrl: string) => void;
    onCancel?: () => void;
    title?: string;
    description?: string;
}

type CameraError = 'permission-denied' | 'no-camera' | 'not-allowed' | 'unknown';

interface CameraState {
    stream: MediaStream | null;
    error: CameraError | null;
    isLoading: boolean;
    facingMode: 'user' | 'environment';
    devices: MediaDeviceInfo[];
}

export const CameraModal: React.FC<CameraModalProps> = ({
    isOpen,
    onClose,
    onCapture,
    onCancel,
    title = "Take Photo",
    description = "Position your camera and tap the capture button"
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const [cameraState, setCameraState] = useState<CameraState>({
        stream: null,
        error: null,
        isLoading: true,
        facingMode: 'environment',
        devices: []
    });

    const [capturedImage, setCapturedImage] = useState<{
        blob: Blob;
        dataUrl: string;
    } | null>(null);

    const [showFlash, setShowFlash] = useState(false);

    const stopCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setCameraState(prev => ({ ...prev, stream: null }));
    }, []);

    const getAvailableDevices = useCallback(async () => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            setCameraState(prev => ({ ...prev, devices: videoDevices }));
            return videoDevices;
        } catch (error) {
            console.error('Error getting devices:', error);
            return [];
        }
    }, []);

    const startCamera = useCallback(async (facingMode: 'user' | 'environment') => {
        try {
            setCameraState(prev => ({ ...prev, isLoading: true, error: null }));

            // Stop existing stream
            stopCamera();

            const constraints: MediaStreamConstraints = {
                video: {
                    facingMode: facingMode,
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await new Promise((resolve) => {
                    if (videoRef.current) {
                        videoRef.current.onloadedmetadata = resolve;
                    }
                });
            }

            setCameraState(prev => ({
                ...prev,
                stream,
                isLoading: false,
                facingMode,
                error: null
            }));

        } catch (error: any) {
            console.error('Camera error:', error);

            let errorType: CameraError = 'unknown';
            if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                errorType = 'permission-denied';
            } else if (error.name === 'NotFoundError') {
                errorType = 'no-camera';
            } else if (error.name === 'NotAllowedError') {
                errorType = 'not-allowed';
            }

            setCameraState(prev => ({
                ...prev,
                error: errorType,
                isLoading: false,
                stream: null
            }));
        }
    }, [stopCamera]);

    const switchCamera = useCallback(() => {
        const newFacingMode = cameraState.facingMode === 'user' ? 'environment' : 'user';
        startCamera(newFacingMode);
    }, [cameraState.facingMode, startCamera]);

    const capturePhoto = useCallback(() => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (!context) return;

        // Set canvas dimensions to video dimensions
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw video frame to canvas
        context.drawImage(video, 0, 0);

        // Flash effect
        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 200);

        // Convert to blob
        canvas.toBlob((blob) => {
            if (blob) {
                const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
                setCapturedImage({ blob, dataUrl });
            }
        }, 'image/jpeg', 0.9);
    }, []);

    const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target?.result as string;
            setCapturedImage({ blob: file, dataUrl });
        };
        reader.readAsDataURL(file);
    }, []);

    const confirmCapture = useCallback(() => {
        if (capturedImage) {
            onCapture(capturedImage.blob, capturedImage.dataUrl);
            setCapturedImage(null);
            onClose();
        }
    }, [capturedImage, onCapture, onClose]);

    const retakePhoto = useCallback(() => {
        setCapturedImage(null);
    }, []);

    const handleCancel = useCallback(() => {
        setCapturedImage(null);
        onCancel?.();
        onClose();
    }, [onCancel, onClose]);

    // Initialize camera when modal opens
    useEffect(() => {
        if (isOpen && !capturedImage) {
            getAvailableDevices().then(() => {
                startCamera('environment');
            });
        }

        return () => {
            if (!isOpen) {
                stopCamera();
                setCapturedImage(null);
            }
        };
    }, [isOpen, startCamera, getAvailableDevices, stopCamera, capturedImage]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, [stopCamera]);

    if (!isOpen) return null;

    const renderError = () => {
        const errorMessages = {
            'permission-denied': {
                title: 'Camera Permission Denied',
                message: 'Please allow camera access to take photos.',
                action: () => startCamera(cameraState.facingMode)
            },
            'no-camera': {
                title: 'No Camera Found',
                message: 'No camera device detected on your device.',
                action: null
            },
            'not-allowed': {
                title: 'Camera Not Allowed',
                message: 'Camera access is not allowed on this device.',
                action: null
            },
            'unknown': {
                title: 'Camera Error',
                message: 'An unexpected error occurred with the camera.',
                action: () => startCamera(cameraState.facingMode)
            }
        };

        const errorInfo = errorMessages[cameraState.error!];

        return (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">{errorInfo.title}</h3>
                    <p className="text-sm text-gray-600 max-w-sm">{errorInfo.message}</p>
                </div>
                <div className="flex space-x-2">
                    {errorInfo.action && (
                        <Button
                            onClick={errorInfo.action}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Try Again
                        </Button>
                    )}
                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="border-gray-300"
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Photo
                    </Button>
                </div>
            </div>
        );
    };

    const renderCamera = () => (
        <div className="relative">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-64 object-cover bg-gray-900 rounded-lg"
            />

            {/* Flash effect */}
            {showFlash && (
                <div className="absolute inset-0 bg-white opacity-75 rounded-lg animate-pulse" />
            )}

            {/* Camera controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center space-x-4">
                    {/* Switch camera button */}
                    {cameraState.devices.length > 1 && (
                        <Button
                            onClick={switchCamera}
                            size="lg"
                            variant="outline"
                            className="w-12 h-12 rounded-full border-2 border-white bg-black/20 backdrop-blur-sm hover:bg-black/30"
                        >
                            <SwitchCamera className="w-5 h-5 text-white" />
                        </Button>
                    )}

                    {/* Capture button */}
                    <Button
                        onClick={capturePhoto}
                        size="lg"
                        className="w-16 h-16 rounded-full bg-white border-4 border-blue-600 hover:border-blue-700 shadow-lg"
                    >
                        <Camera className="w-6 h-6 text-blue-600" />
                    </Button>

                    {/* Upload button */}
                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        size="lg"
                        variant="outline"
                        className="w-12 h-12 rounded-full border-2 border-white bg-black/20 backdrop-blur-sm hover:bg-black/30"
                    >
                        <Upload className="w-5 h-5 text-white" />
                    </Button>
                </div>
            </div>
        </div>
    );

    const renderPreview = () => (
        <div className="space-y-4">
            <div className="relative">
                <img
                    src={capturedImage!.dataUrl}
                    alt="Captured"
                    className="w-full h-64 object-cover rounded-lg"
                />
            </div>

            <div className="flex space-x-2 justify-center">
                <Button
                    onClick={retakePhoto}
                    variant="outline"
                    className="flex-1 border-gray-300"
                >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Retake
                </Button>
                <Button
                    onClick={confirmCapture}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                    <Check className="w-4 h-4 mr-2" />
                    Use Photo
                </Button>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleCancel}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md mx-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                        {description && (
                            <p className="text-sm text-gray-600 mt-1">{description}</p>
                        )}
                    </div>
                    <Button
                        onClick={handleCancel}
                        variant="outline"
                        size="icon"
                        className="rounded-full border-gray-300"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {cameraState.isLoading && !capturedImage && (
                        <div className="flex items-center justify-center h-64">
                            <div className="text-center space-y-4">
                                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                                <p className="text-sm text-gray-600">Starting camera...</p>
                            </div>
                        </div>
                    )}

                    {cameraState.error && !capturedImage && renderError()}

                    {cameraState.stream && !cameraState.error && !capturedImage && renderCamera()}

                    {capturedImage && renderPreview()}
                </div>

                {/* Hidden file input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                />

                {/* Hidden canvas for photo capture */}
                <canvas ref={canvasRef} className="hidden" />
            </div>
        </div>
    );
};