import { usePage } from "@inertiajs/react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import * as React from "react";

export function Toaster() {
    const { flash } = usePage().props as { flash?: { success?: string; error?: string } };
    const [visible, setVisible] = React.useState(false);
    const [message, setMessage] = React.useState<string | null>(null);
    const [type, setType] = React.useState<'success' | 'error' | 'info'>('success');

    React.useEffect(() => {
        if (flash?.success) {
            setMessage(flash.success);
            setType('success');
            setVisible(true);
        } else if (flash?.error) {
            setMessage(flash.error);
            setType('error');
            setVisible(true);
        }
    }, [flash]);

    React.useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => setVisible(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    if (!visible || !message) return null;

    const icons = {
        success: <CheckCircle className="h-5 w-5 text-green-500" />,
        error: <XCircle className="h-5 w-5 text-red-500" />,
        info: <Info className="h-5 w-5 text-blue-500" />,
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-right-4 fade-in duration-300">
            <div className="bg-card border border-border shadow-lg rounded-lg p-4 flex items-center gap-4 min-w-[300px] max-w-md">
                <div className="shrink-0">{icons[type]}</div>
                <div className="flex-1 text-sm font-medium">{message}</div>
                <button 
                    onClick={() => setVisible(false)}
                    className="p-1 hover:bg-muted rounded-full transition-colors text-muted-foreground"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
