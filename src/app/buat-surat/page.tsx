"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MobileContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#4F46E5] to-[#3B82F6] flex items-center justify-center p-4">
            <div className="w-full max-w-md mx-auto">
                {children}
            </div>
        </div>
    );
};

export default function BuatSuratPage() {
    const router = useRouter();
    const [keperluan, setKeperluan] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('');

    const templates = [
        { id: 'none', name: 'Pilih Template', keperluan: '', description: '' },
        { id: 'surat-pengantar', name: 'Surat Pengantar RT', keperluan: 'Surat Pengantar RT', description: 'Dengan hormat, kami mengajukan surat pengantar untuk keperluan...' },
        { id: 'izin-keramaian', name: 'Surat Izin Keramaian', keperluan: 'Surat Izin Keramaian', description: 'Dengan ini mengajukan permohonan izin keramaian untuk acara...' },
        { id: 'keterangan-domisili', name: 'Surat Keterangan Domisili', keperluan: 'Surat Keterangan Domisili', description: 'Menerangkan bahwa yang bersangkutan berdomisili di...' },
    ];

    const handleTemplateChange = (templateId: string) => {
        setSelectedTemplate(templateId);
        const template = templates.find(t => t.id === templateId);
        if (template) {
            setKeperluan(template.keperluan);
            setDescription(template.description);
        } else {
            setKeperluan('');
            setDescription('');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)]">
            <div className="max-w-md mx-auto h-screen flex flex-col relative">
                {/* Header */}
                <div className="flex items-center justify-between p-6 pt-12">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push("/")}
                            className="text-white hover:bg-white/10 transition-colors"
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                        <h1 className="text-2xl font-bold text-white">Buat Surat</h1>
                    </div>
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <FileText className="h-6 w-6 text-white" />
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-white rounded-b-3xl shadow-inner">
                    <div className="bg-white shadow-lg border-0 rounded-lg p-6 space-y-6">
                        <div className="text-center space-y-2 mb-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                                <FileText className="h-8 w-8 text-blue-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">Buat Surat Baru</h2>
                            <p className="text-gray-600 text-sm"></p>
                        </div>
                        <br />
                        <div>
                            <Label htmlFor="template" className="text-sm font-medium text-gray-700">Pilih Template</Label>
                            <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                                <SelectTrigger className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 bg-gray-50 text-gray-800">
                                    <SelectValue placeholder="Pilih template surat..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {templates.map((template) => (
                                        <SelectItem key={template.id} value={template.id}>
                                            {template.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="keperluan" className="text-sm font-medium text-gray-700">Topik Keperluan</Label>
                            <Input
                                id="keperluan"
                                placeholder="Masukkan keperluan surat"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 bg-gray-50 text-gray-800"
                                value={keperluan}
                                onChange={(e) => setKeperluan(e.target.value)}
                            />
                        </div>

                        <div className="mb-6">
                            <Label htmlFor="description" className="text-sm font-medium text-gray-700">Deskripsi</Label>
                            <Textarea
                                id="description"
                                placeholder="Jelaskan detail surat yang ingin dibuat..."
                                rows={6}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 bg-gray-50 text-gray-800"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold rounded-lg"
                            size="lg"
                        >
                            Simpan
                        </Button>
                    </div>
                    <div className="p-4 bg-white/10 backdrop-blur-sm border-white/20 rounded-lg mt-6">
                        <p className="text-blue-500/90 text-sm text-left whitespace-pre-wrap">
                            💡 Tip: Jika keperluan Surat membutuhkan waktu cepat, silahkan hubungi pengurus RT untuk membuat Surat.
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
}