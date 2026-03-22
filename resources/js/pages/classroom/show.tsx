import { Form, Head, Link, usePage } from '@inertiajs/react';
import {
    Users,
    GraduationCap,
    BookOpen,
    Calendar as CalendarIcon,
    LayoutGrid,
    ListTodo,
    ArrowLeft,
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type Grade = {
    id: number;
    score: number;
    comments: string;
    classroom_id: number;
};

type Student = {
    id: string;
    first_name: string;
    last_name: string;
    grade: string;
    email: string;
    grades?: Grade[];
};

type Teacher = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
};

type Activity = {
    id: string;
    title: string;
    description: string | null;
    due_date: string | null;
    type: string;
};

type CalendarActivity = {
    id: string;
    title: string;
    description: string | null;
    activity_date: string;
    start_time: string;
    end_time: string;
    user: { name: string };
};

type Classroom = {
    id: string;
    name: string;
    teacher: Teacher;
    teacher_id: string;
    course: { course_name: string } | null;
    students: Student[];
    activities: Activity[];
    calendar_activities: CalendarActivity[];
};

export default function ClassroomShow({ classroom }: { classroom: Classroom }) {
    const { t, i18n } = useTranslation();
    const { auth } = usePage().props as { auth?: { user?: { role?: string } } };
    const isTenant = auth?.user?.role === 'tenant';
    const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'activities'>('overview');
    const [isEditing, setIsEditing] = useState(false);
    const [gradingStudent, setGradingStudent] = useState<Student | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('classrooms'), href: '/classrooms' },
        { title: classroom.name, href: `/classrooms/${classroom.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${classroom.name} - ${t('classroom')}`} />

            <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <Link 
                            href="/classrooms" 
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {t('back_to_classrooms')}
                        </Link>
                        <div className="space-y-1">
                            <h1 className="text-4xl font-extrabold tracking-tight text-primary uppercase">
                                {classroom.name}
                            </h1>
                            <div className="flex items-center gap-4 text-muted-foreground">
                                <div className="flex items-center gap-1.5 font-medium">
                                    <GraduationCap className="h-4 w-4" />
                                    {classroom.teacher.first_name} {classroom.teacher.last_name}
                                </div>
                                {classroom.course && (
                                    <div className="flex items-center gap-1.5 font-medium border-l border-border pl-4">
                                        <BookOpen className="h-4 w-4" />
                                        {classroom.course.course_name}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-primary/5 hover:bg-primary/10 border-primary/20 text-primary font-bold uppercase tracking-wider text-xs rounded-full px-4"
                            asChild
                        >
                            <a href={`/reports/classroom/${classroom.id}?locale=${i18n.language}`} target="_blank">
                                {t('download_report_pdf')}
                            </a>
                        </Button>
                        <Badge variant="secondary" className="px-4 py-1 text-sm rounded-full">
                            {classroom.students.length} {t('students')}
                        </Badge>
                        <Badge variant="outline" className="px-4 py-1 text-sm rounded-full border-primary/20 text-primary">
                            {t('active_session')}
                        </Badge>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex border-b border-border gap-8 overflow-x-auto no-scrollbar">
                    {[
                        { id: 'overview', label: t('overview'), icon: LayoutGrid },
                        { id: 'students', label: t('students'), icon: Users },
                        { id: 'activities', label: t('activities'), icon: ListTodo },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as 'overview' | 'students' | 'activities')}
                            className={`flex items-center gap-2 py-4 px-1 text-sm font-bold uppercase tracking-widest transition-all relative ${
                                activeTab === tab.id 
                                ? 'text-primary' 
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            <tab.icon className="h-4 w-4" />
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-in fade-in duration-300" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Content Sections */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="col-span-1 md:col-span-2 border-border shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-lg">{t('recent_activities')}</CardTitle>
                                    <Button variant="ghost" size="sm" asChild className="text-xs font-bold uppercase text-primary">
                                        <Link href="/calendar-activities">{t('view_all')}</Link>
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    {(classroom.calendar_activities?.length > 0 || classroom.activities.length > 0) ? (
                                        <div className="space-y-3">
                                            {classroom.calendar_activities?.slice(0, 3).map(activity => (
                                                <div key={activity.id} className="p-3 border border-border rounded-lg bg-emerald-500/5 flex justify-between items-center group hover:border-emerald-500/50 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                                                            <CalendarIcon className="h-4 w-4" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-sm leading-tight text-emerald-900">{activity.title}</h4>
                                                            <p className="text-[10px] text-emerald-600/80 font-bold uppercase tracking-tighter">
                                                                {new Date(activity.activity_date).toLocaleDateString()} at {activity.start_time.substring(0, 5)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Badge variant="outline" className="border-emerald-500/20 text-emerald-600 bg-emerald-500/10 text-[9px] font-bold uppercase">
                                                        {t('calendar')}
                                                    </Badge>
                                                </div>
                                            ))}
                                            {classroom.activities.slice(0, 2).map(activity => (
                                                <div key={activity.id} className="p-3 border border-border rounded-lg bg-muted/20 flex justify-between items-center group hover:border-primary/50 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                                                            <ListTodo className="h-4 w-4" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-sm leading-tight">{activity.title}</h4>
                                                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">{t('general_task')}</p>
                                                        </div>
                                                    </div>
                                                    <Badge variant="secondary" className="uppercase text-[9px]">
                                                        {activity.type}
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 text-muted-foreground">
                                            {t('no_activities_assigned')}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                            <Card className="border-border shadow-sm">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="text-lg">{t('class_info')}</CardTitle>
                                    {isTenant && (
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            onClick={() => setIsEditing(true)}
                                            className="h-8 w-8 p-0"
                                        >
                                            <ListTodo className="h-4 w-4" />
                                        </Button>
                                    )}
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                                            <GraduationCap className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-muted-foreground uppercase">{t('primary_teacher')}</p>
                                            <p className="text-sm font-medium">{classroom.teacher.first_name} {classroom.teacher.last_name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                                            <Users className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-muted-foreground uppercase">{t('total_students')}</p>
                                            <p className="text-sm font-medium">{classroom.students.length} {t('enrolled')}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'students' && (
                        <Card className="border-border shadow-sm">
                            <CardContent className="p-0">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-muted/40 uppercase text-[10px] font-bold text-muted-foreground tracking-widest border-b border-border">
                                        <tr>
                                            <th className="px-6 py-4">{t('student_name')}</th>
                                            <th className="px-6 py-4">{t('level')}</th>
                                            <th className="px-6 py-4 text-center">{t('score')}</th>
                                            <th className="px-6 py-4 text-right">{t('actions')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {classroom.students.map(student => (
                                            <tr key={student.id} className="hover:bg-muted/30 transition-colors group">
                                                <td className="px-6 py-4 border-l-2 border-transparent group-hover:border-primary/50">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold ring-1 ring-primary/20">
                                                            {student.first_name[0]}{student.last_name[0]}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-foreground text-sm leading-none">{student.first_name} {student.last_name}</p>
                                                            <p className="text-[10px] text-muted-foreground mt-1 lowercase">{student.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge variant="secondary" className="bg-muted text-[10px] font-bold uppercase tracking-tight">
                                                        {student.grade}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {student.grades && student.grades.length > 0 ? (
                                                        <div className="inline-flex flex-col items-center">
                                                            <span className={`text-sm font-bold ${student.grades[0].score >= 70 ? 'text-emerald-600' : 'text-orange-500'}`}>
                                                                {student.grades[0].score}%
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground opacity-50">N/A</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm" 
                                                            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                            onClick={() => setGradingStudent(student)}
                                                        >
                                                            <ListTodo className="h-4 w-4 text-primary" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="h-8 group-hover:text-primary transition-colors text-xs font-bold uppercase tracking-tighter">
                                                            {t('profile')}
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'activities' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold uppercase tracking-tight text-primary">
                                    {t('date_tied_activities').split(' ')[0]} <span className="text-foreground">{t('date_tied_activities').split(' ').slice(1).join(' ')}</span>
                                </h2>
                                {auth?.user?.role !== 'student' && (
                                    <Button asChild size="sm" className="bg-primary hover:bg-primary/90 rounded-full font-bold uppercase tracking-wider text-xs">
                                        <Link href="/calendar-activities">
                                            {t('manage_all')}
                                        </Link>
                                    </Button>
                                )}
                            </div>

                            {/* New Calendar Activities */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {classroom.calendar_activities?.map(activity => (
                                    <Card key={activity.id} className="border-border shadow-sm border-l-4 border-l-emerald-500 group overflow-hidden">
                                        <CardContent className="p-4 flex justify-between items-start gap-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-base leading-tight">{activity.title}</h3>
                                                </div>
                                                <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase">
                                                    <span className="flex items-center gap-1"><CalendarIcon className="h-3 w-3" /> {new Date(activity.activity_date).toLocaleDateString()}</span>
                                                    <span className="flex items-center gap-1"><CalendarIcon className="h-3 w-3" /> {activity.start_time.substring(0, 5)}</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{activity.description}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                                {classroom.calendar_activities?.length === 0 && (
                                    <div className="col-span-full py-12 text-center bg-muted/20 border border-dashed border-border rounded-xl">
                                        <p className="text-sm text-muted-foreground">{t('no_date_tied_activities')}</p>
                                    </div>
                                )}
                            </div>

                            <div className="pt-6 border-t border-border">
                                <h2 className="text-lg font-bold uppercase tracking-tight text-muted-foreground mb-4">
                                    {t('general_classroom_tasks').split(' ').slice(0, 1).join(' ')} <span className="text-foreground/60">{t('general_classroom_tasks').split(' ').slice(1).join(' ')}</span>
                                </h2>
                                <div className="space-y-4">
                                    {classroom.activities.map(activity => (
                                        <Card key={activity.id} className="border-border shadow-sm hover:border-primary/40 transition-all group">
                                            <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-extrabold text-lg uppercase tracking-tight">{activity.title}</h3>
                                                        <Badge className="rounded-full px-2 text-[10px] font-bold uppercase">
                                                            {activity.type}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground max-w-2xl">{activity.description}</p>
                                                </div>
                                                <div className="flex flex-col items-end gap-1">
                                                    <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase">
                                                        <CalendarIcon className="h-3 w-3" />
                                                        {t('due')}: {activity.due_date ? new Date(activity.due_date).toLocaleDateString() : 'No date'}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                    {classroom.activities.length === 0 && (
                                        <div className="text-center py-12 bg-muted/20 border border-dashed border-border rounded-xl">
                                            <p className="font-medium text-muted-foreground text-sm">{t('no_general_tasks')}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <Dialog open={Boolean(isEditing)} onOpenChange={setIsEditing}>
                    <DialogContent className="sm:max-w-md border-border bg-popover shadow-lg">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black text-primary uppercase tracking-tighter">{t('edit_classroom')}</DialogTitle>
                        </DialogHeader>
                        <Form 
                            action={`/classrooms/${classroom.id}`} 
                            method="post" 
                            className="space-y-6 py-4"
                            onSuccess={() => setIsEditing(false)}
                        >
                            <input type="hidden" name="_method" value="PUT" />
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t('classroom_name')}</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    defaultValue={classroom.name}
                                    className="h-12 border-border focus:ring-primary/50 focus:border-primary text-base font-bold"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="teacher_id" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t('assigned_teacher')}</Label>
                                <select
                                    id="teacher_id"
                                    name="teacher_id"
                                    defaultValue={classroom.teacher_id}
                                    className="w-full h-12 rounded-md border border-border bg-background px-3 py-2 text-sm font-bold focus:ring-primary/50 focus:border-primary outline-none appearance-none"
                                    required
                                >
                                    <option value={classroom.teacher_id}>{classroom.teacher.first_name} {classroom.teacher.last_name}</option>
                                </select>
                            </div>
                            <DialogFooter className="pt-4 border-t border-border mt-4 flex justify-between gap-4">
                                <Button type="button" variant="ghost" className="font-bold uppercase tracking-widest text-xs" onClick={() => setIsEditing(false)}>{t('cancel')}</Button>
                                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest text-xs px-8 h-10">{t('update_class')}</Button>
                            </DialogFooter>
                        </Form>
                    </DialogContent>
                </Dialog>

                {/* Grading Modal */}
                <Dialog open={Boolean(gradingStudent)} onOpenChange={(open) => !open && setGradingStudent(null)}>
                    <DialogContent className="sm:max-w-sm border-border bg-popover shadow-lg">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-black text-primary uppercase tracking-tighter">
                                {t('grade_student', { name: `${gradingStudent?.first_name} ${gradingStudent?.last_name}` })}
                            </DialogTitle>
                        </DialogHeader>
                        {gradingStudent && (
                            <Form 
                                action="/grades" 
                                method="post" 
                                className="space-y-6 py-4"
                                onSuccess={() => setGradingStudent(null)}
                            >
                                <input type="hidden" name="student_id" value={gradingStudent.id} />
                                <input type="hidden" name="classroom_id" value={classroom.id} />
                                
                                <div className="space-y-2">
                                    <Label htmlFor="score" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t('numeric_score')}</Label>
                                    <Input
                                        id="score"
                                        name="score"
                                        type="number"
                                        min="0"
                                        max="100"
                                        defaultValue={gradingStudent.grades && gradingStudent.grades.length > 0 ? gradingStudent.grades[0].score : ''}
                                        className="h-14 border-border focus:ring-primary/50 focus:border-primary text-2xl font-black text-center"
                                        placeholder="85.50"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="comments" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t('teacher_comments')}</Label>
                                    <textarea
                                        id="comments"
                                        name="comments"
                                        defaultValue={gradingStudent.grades && gradingStudent.grades.length > 0 ? gradingStudent.grades[0].comments : ''}
                                        className="w-full h-32 rounded-md border border-border bg-background px-3 py-2 text-sm focus:ring-primary/50 focus:border-primary outline-none resize-none"
                                        placeholder="Excellent progress this semester..."
                                    />
                                </div>

                                <DialogFooter className="pt-4 border-t border-border mt-4">
                                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest text-xs h-12">
                                        {t('save_grade')}
                                    </Button>
                                </DialogFooter>
                            </Form>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
