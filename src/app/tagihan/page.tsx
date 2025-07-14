"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Banknote, Calendar, Check, CreditCard, Smartphone, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";

interface Bill {
    id: string;
    title: string;
    amount: number;
    dueDate: string;
    status: 'paid' | 'pending' | 'overdue';
    description: string;
}

const mockBills: Bill[] = [
    {
        id: '1',
        title: 'Iuran RT Januari 2025',
        amount: 50000,
        dueDate: '2025-01-20',
        status: 'paid',
        description: 'Iuran rutin bulanan untuk operasional RT'
    },
    {
        id: '2',
        title: 'Iuran RT Februari 2025',
        amount: 50000,
        dueDate: '2025-02-20',
        status: 'overdue',
        description: 'Iuran rutin bulanan untuk operasional RT'
    },
    {
        id: '3',
        title: 'Iuran RT Maret 2025',
        amount: 50000,
        dueDate: '2025-03-20',
        status: 'pending',
        description: 'Iuran rutin bulanan untuk operasional RT'
    }
];

export default function IuranPage() {
    const router = useRouter();

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getStatusColor = (status: Bill['status']) => {
        switch (status) {
            case 'paid':
                return 'text-green-600 bg-green-50 border-green-200';
            case 'pending':
                return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'overdue':
                return 'text-red-600 bg-red-50 border-red-200';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getStatusIcon = (status: Bill['status']) => {
        switch (status) {
            case 'paid':
                return <Check className="w-4 h-4" />;
            case 'pending':
                return <Calendar className="w-4 h-4" />;
            case 'overdue':
                return <AlertCircle className="w-4 h-4" />;
            default:
                return <Calendar className="w-4 h-4" />;
        }
    };

    const getStatusText = (status: Bill['status']) => {
        switch (status) {
            case 'paid':
                return 'Lunas';
            case 'pending':
                return 'Belum Dibayar';
            case 'overdue':
                return 'Terlambat';
            default:
                return 'Unknown';
        }
    };

    return (
        <div
            className="min-h-screen"
            style={{
                background: 'linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)',
            }}
        >
            <div className="min-h-screen w-full max-w-md mx-auto">
                <div className="flex flex-col h-full overflow-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 pt-12">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => router.back()}
                                className="text-white hover:bg-white/10 rounded-xl"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Iuran RT</h1>
                                <p className="text-white/80 text-sm">Kelola pembayaran Anda</p>
                            </div>
                        </div>
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-white" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 px-6 pb-6">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <Card className="bg-green-600 border-white/20 border shadow-[0_4px_0_rgba(255,255,255,1)]">
                                <CardContent className="p-4 text-center">
                                    <p className="text-white/80 text-sm mb-1"><b>Total Iuran 2025</b></p>
                                    <p className="text-white text-lg font-bold">
                                        {formatCurrency(mockBills.filter(b => b.status === 'paid').reduce((sum, b) => sum + b.amount, 0))}
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-yellow-600 border-white/20 border shadow-[0_4px_0_rgba(255,255,255,1)]">
                                <CardContent className="p-4 text-center">
                                    <p className="text-white/80 text-sm mb-1"><b>Belum Dibayar</b></p>
                                    <p className="text-white text-lg font-bold">
                                        {mockBills.filter(b => b.status !== 'paid').length} Bulan Iuran
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Bills List */}
                        <div className="space-y-4">
                            <h2 className="text-white font-semibold text-lg">Daftar Iuran</h2>

                            {mockBills.map((bill) => (
                                <Card key={bill.id} className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900 mb-1">{bill.title}</h3>
                                                <p className="text-gray-600 text-sm mb-2">{bill.description}</p>
                                                <p className="text-gray-500 text-xs">Jatuh tempo: {new Date(bill.dueDate).toLocaleDateString('id-ID')}</p>
                                            </div>

                                            <div className="text-right">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs border ${getStatusColor(bill.status)}`}>
                                                    {getStatusIcon(bill.status)}
                                                    <span className="ml-1">{getStatusText(bill.status)}</span>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="text-2xl font-bold text-gray-900">
                                                {formatCurrency(bill.amount)}
                                            </div>

                                            {bill.status !== 'paid' && (
                                                <Button
                                                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6"
                                                    onClick={() => alert(`Pembayaran ${bill.title}`)}
                                                >
                                                    Bayar
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Payment Methods */}
                        <Card className="mt-6 bg-white/95 backdrop-blur-sm border-white/20 border">
                            <CardHeader>
                                <CardTitle className="text-blue-500 text-lg flex items-center justify-between">
                                    <span>Metode Pembayaran</span>
                                    <CreditCard className="h-5 w-5" />
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-3 gap-3">
                                    <Button variant="outline" className="h-16 flex flex-col bg-white/50 bg-gradient-to-r from-blue-500 to-blue-600 border-white/30 hover:bg-white/30 rounded-xl">
                                        <span className="text-2xl mb-1 text-white"><Banknote /></span>
                                        <span className="text-xs text-white"><b>Transfer</b></span>
                                    </Button>
                                    <Button variant="outline" className="h-16 flex flex-col bg-white/50 bg-gradient-to-r from-blue-500 to-blue-600 border-white/30 hover:bg-white/30 rounded-xl">
                                        <span className="text-2xl mb-1 text-white"><Wallet /></span>
                                        <span className="text-xs text-white"><b>Cash</b></span>
                                    </Button>
                                    <Button variant="outline" className="h-16 flex flex-col bg-white/50 bg-gradient-to-r from-blue-500 to-blue-600 border-white/30 hover:bg-white/30 rounded-xl">
                                        <span className="text-2xl mb-1 text-white"><Smartphone /></span>
                                        <span className="text-xs text-white"><b>E-Wallet</b></span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}