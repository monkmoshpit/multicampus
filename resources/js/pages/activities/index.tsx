import { Head, useForm, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Plus, Trash2, Calendar as CalendarIcon, Clock, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type CalendarActivity = {
    id: string;
    title: string;
    description: string | null;
    activity_date: string;
    start_time: string;
    end_time: string;
    classroom_id: string;
    user: { name: string };
    classroom: { name: string };
};

type Classroom = { id: string; name: string };

export default function Activities({ activities, classrooms }: { activities: CalendarActivity[]; classrooms: Classroom[] }) {
    const { t, i18n } = useTranslation();
    const { auth, flash } = usePage().props as { auth?: { user?: { role?: string } }; flash?: { success?: string } };
    const [isCreating, setIsCreating] = useState(false);
    const [editingActivity, setEditingActivity] = useState<CalendarActivity | null>(null);

    const currentLocale = i18n.language.startsWith('pt') ? ptBR : undefined;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('activities'), href: '/calendar-activities' },
    ];

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm<{
        classroom_id: string;
        title: string;
        description: string;
        activity_date: string;
        start_time: string;
        end_time: string;
    }>({
        classroom_id: '',
        title: '',
        description: '',
        activity_date: format(new Date(), 'yyyy-MM-dd'),
        start_time: '08:00',
        end_time: '09:00',
    });

    const handleCreate = () => {
        setEditingActivity(null);
        reset();
        if (classrooms.length > 0) {
            setData('classroom_id', classrooms[0].id);
        }
        setIsCreating(true);
    };

    const handleEdit = (activity: CalendarActivity) => {
        setEditingActivity(activity);
        setData({
            classroom_id: activity.classroom_id,
            title: activity.title,
            description: activity.description || '',
            activity_date: activity.activity_date,
            start_time: activity.start_time.substring(0, 5),
            end_time: activity.end_time.substring(0, 5),
        });
        setIsCreating(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingActivity) {
            put(`/calendar-activities/${editingActivity.id}`, {
                onSuccess: () => {
                    setIsCreating(false);
                    reset();
                },
            });
        } else {
            post('/calendar-activities', {
                onSuccess: () => {
                    setIsCreating(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: string) => {
        if (confirm(t('confirm_delete_activity'))) {
            destroy(`/calendar-activities/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('activities')} />

            <div className="space-y-6 p-6 md:p-10 max-w-7xl mx-auto">
                {flash?.success && (
                    <div className="flex items-center gap-3 border border-primary/20 bg-primary/10 px-4 py-4 text-primary font-medium animate-in fade-in slide-in-from-top-2">
                        <div className="flex-1">{flash.success}</div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <header className="flex flex-col gap-1">
                        <h1 className="text-3xl font-bold text-primary tracking-tight uppercase">
                            {t('activities')}
                        </h1>
                        <p className="text-muted-foreground text-sm font-medium">
                            {t('manage_activities_desc')}
                        </p>
                    </header>
                    {auth?.user?.role !== 'student' && (
                        <Button
                            onClick={handleCreate}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all active:scale-95"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            {t('add_activity')}
                        </Button>
                    )}
                </div>

                {activities.length > 0 ? (
                    <div className="space-y-12">
                        {classrooms
                            .filter(classroom => activities.some(a => a.classroom_id === classroom.id))
                            .map((classroom) => (
                                <section key={classroom.id} className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="h-px flex-1 bg-border" />
                                        <h2 className="text-sm font-bold text-primary uppercase tracking-widest bg-background px-4 py-1 border border-primary/20 rounded-full">
                                            {classroom.name}
                                        </h2>
                                        <div className="h-px flex-1 bg-border" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {activities
                                            .filter((activity) => activity.classroom_id === classroom.id)
                                            .map((activity) => (
                                                <div 
                                                    key={activity.id} 
                                                    className="group bg-card border border-border overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/30 transition-all rounded-xl flex flex-col"
                                                >
                                                    <div className="p-5 flex-1 space-y-4">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <h3 className="font-bold text-lg text-foreground leading-tight">
                                                                {activity.title}
                                                            </h3>
                                                            {auth?.user?.role !== 'student' && (
                                                                <div className="flex items-center gap-1">
                                                                    <button 
                                                                        onClick={() => handleEdit(activity)}
                                                                        className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                                    >
                                                                        <Edit2 className="h-4 w-4" />
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => handleDelete(activity.id)}
                                                                        className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                        
                                                        {activity.description && (
                                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                                {activity.description}
                                                            </p>
                                                        )}

                                                        <div className="pt-2 space-y-2">
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                                                <CalendarIcon className="h-4 w-4 text-primary" />
                                                                {format(new Date(activity.activity_date), 'PPP', { locale: currentLocale })}
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                                                <Clock className="h-4 w-4 text-primary" />
                                                                {activity.start_time.substring(0, 5)} - {activity.end_time.substring(0, 5)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="p-4 bg-muted/30 border-t border-border mt-auto flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary uppercase">
                                                                {activity.user.name.substring(0, 2)}
                                                            </div>
                                                            <span className="text-xs font-medium text-muted-foreground">{activity.user.name}</span>
                                                        </div>
                                                        <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-bold">
                                                            {t('activity')}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </section>
                            ))}
                    </div>
                ) : (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-center space-y-4 bg-muted/5 border border-dashed border-border rounded-2xl">
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                            <CalendarIcon className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-bold text-lg">{t('no_activities')}</h3>
                            <p className="text-muted-foreground max-w-xs">{t('no_activities_desc')}</p>
                        </div>
                        <Button variant="outline" onClick={handleCreate}>
                            {t('create_first_activity')}
                        </Button>
                    </div>
                )}

            </div>

            {/* Create/Edit Modal */}
            <Dialog open={isCreating} onOpenChange={setIsCreating}>
                <DialogContent className="sm:max-w-md border-border bg-popover">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">
                            {editingActivity ? t('edit_activity') : t('add_activity')}
                        </DialogTitle>
                        <p className="text-sm text-muted-foreground">
                            {t('activity_modal_desc')}
                        </p>
                    </DialogHeader>

                    <form onSubmit={submit} className="space-y-4 py-2">
                        <div className="grid gap-2">
                            <Label htmlFor="classroom_id">{t('classroom')}</Label>
                            <Select 
                                value={data.classroom_id} 
                                onValueChange={(val) => setData('classroom_id', val)}
                            >
                                <SelectTrigger id="classroom_id" className={errors.classroom_id ? 'border-destructive' : ''}>
                                    <SelectValue placeholder={t('select_classroom')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {classrooms.map((classroom) => (
                                        <SelectItem key={classroom.id} value={classroom.id}>
                                            {classroom.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.classroom_id && <p className="text-xs text-destructive">{errors.classroom_id}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="title">{t('title')}</Label>
                            <Input 
                                id="title"
                                value={data.title} 
                                onChange={e => setData('title', e.target.value)} 
                                placeholder={t('activity_placeholder')}
                                className={errors.title ? 'border-destructive' : ''}
                            />
                            {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">{t('description')}</Label>
                            <Textarea 
                                id="description"
                                value={data.description} 
                                onChange={e => setData('description', e.target.value)} 
                                placeholder={t('details_placeholder')}
                                className="min-h-[100px]"
                            />
                            {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="activity_date">{t('date')}</Label>
                            <Input 
                                id="activity_date"
                                type="date" 
                                value={data.activity_date} 
                                onChange={e => setData('activity_date', e.target.value)} 
                                className={errors.activity_date ? 'border-destructive' : ''}
                            />
                            {errors.activity_date && <p className="text-xs text-destructive">{errors.activity_date}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="start_time">{t('start_time')}</Label>
                                <Input 
                                    id="start_time"
                                    type="time" 
                                    value={data.start_time} 
                                    onChange={e => setData('start_time', e.target.value)} 
                                    className={errors.start_time ? 'border-destructive' : ''}
                                />
                                {errors.start_time && <p className="text-xs text-destructive">{errors.start_time}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="end_time">{t('end_time')}</Label>
                                <Input 
                                    id="end_time"
                                    type="time" 
                                    value={data.end_time} 
                                    onChange={e => setData('end_time', e.target.value)} 
                                    className={errors.end_time ? 'border-destructive' : ''}
                                />
                                {errors.end_time && <p className="text-xs text-destructive">{errors.end_time}</p>}
                            </div>
                        </div>

                        <DialogFooter className="pt-4">
                            <DialogClose asChild>
                                <Button type="button" variant="ghost">{t('cancel')}</Button>
                            </DialogClose>
                            <Button type="submit" disabled={processing} className="bg-primary hover:bg-primary/90">
                                {editingActivity ? t('update') : t('create')}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}

function Badge({ children, variant = 'default', className }: { children: React.ReactNode, variant?: 'default' | 'outline', className?: string }) {
    const variants = {
        default: 'bg-primary text-primary-foreground',
        outline: 'border border-primary/20 text-primary bg-primary/5'
    };
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}
