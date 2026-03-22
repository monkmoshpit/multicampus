import { Head } from '@inertiajs/react';
import {
    GraduationCap,
    BookOpen,
    TrendingUp,
    Award,
    MessageSquare,
    ChevronRight,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

type Grade = {
    id: number;
    score: number;
    comments: string;
    classroom: {
        id: string;
        name: string;
        teacher: {
            first_name: string;
            last_name: string;
        };
    };
    created_at: string;
};

export default function StudentGrades({ grades }: { grades: Grade[] }) {
    const { t } = useTranslation();
    const averageScore = grades.length > 0 
        ? (grades.reduce((acc, g) => acc + g.score, 0) / grades.length).toFixed(1)
        : 'N/A';

    return (
        <AppLayout>
            <Head title={t('my_grades')} />

            <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-extrabold tracking-tight text-primary uppercase">
                            {t('my_grades').split(' ')[0]} <span className="text-foreground">{t('my_grades').split(' ')[1]}</span>
                        </h1>
                        <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">
                            {t('academic_performance_desc')}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-card border border-border px-6 py-3 rounded-2xl flex items-center gap-4 shadow-sm">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <TrendingUp className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground leading-none">{t('global_average')}</p>
                                <p className="text-2xl font-black tracking-tighter text-primary">{averageScore}{averageScore !== 'N/A' ? '%' : ''}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grades List */}
                <div className="grid grid-cols-1 gap-6">
                    {grades.length > 0 ? grades.map((grade) => (
                        <Card key={grade.id} className="border-border shadow-sm group hover:border-primary/40 transition-all overflow-hidden">
                            <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row">
                                    {/* Left Side: Course Info */}
                                    <div className="p-6 md:w-1/3 bg-muted/20 border-b md:border-b-0 md:border-r border-border">
                                        <div className="space-y-4">
                                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary ring-1 ring-primary/20">
                                                <BookOpen className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black uppercase tracking-tighter text-primary group-hover:translate-x-1 transition-transform">
                                                    {grade.classroom.name}
                                                </h3>
                                                <p className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase mt-1">
                                                    <GraduationCap className="h-3.5 w-3.5" />
                                                    {grade.classroom.teacher.first_name} {grade.classroom.teacher.last_name}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 pt-2">
                                                <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest border-primary/20 text-primary">
                                                    {t('completed')}
                                                </Badge>
                                                <span className="text-[10px] font-bold text-muted-foreground/60 uppercase">
                                                    {new Date(grade.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Middle: Score */}
                                    <div className="p-6 md:w-1/4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-border">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">{t('final_score')}</p>
                                        <div className="relative">
                                            <div className={`text-6xl font-black tracking-tighter ${grade.score >= 70 ? 'text-emerald-600' : 'text-orange-500'}`}>
                                                {grade.score}<span className="text-3xl opacity-50">%</span>
                                            </div>
                                            {grade.score >= 90 && (
                                                <div className="absolute -top-4 -right-8 animate-bounce">
                                                    <Award className="h-8 w-8 text-yellow-500 fill-yellow-500" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right Side: Comments */}
                                    <div className="p-6 flex-1 bg-card">
                                        <div className="flex items-center gap-2 mb-3 text-primary">
                                            <MessageSquare className="h-4 w-4" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">{t('feedback')}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            "{grade.comments || t('no_comments_provided')}"
                                        </p>
                                        <div className="mt-6 flex justify-end">
                                            <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-primary hover:gap-2 transition-all">
                                                {t('view_detailed_report')} <ChevronRight className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )) : (
                        <div className="py-20 text-center bg-muted/10 border border-dashed border-border rounded-3xl">
                            <div className="h-20 w-20 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-6">
                                <TrendingUp className="h-10 w-10 text-muted-foreground/40" />
                            </div>
                            <h3 className="text-xl font-bold text-muted-foreground uppercase tracking-tight">{t('no_grades_issued')}</h3>
                            <p className="text-sm text-muted-foreground/60 mt-1 max-w-md mx-auto">
                                {t('no_grades_desc')}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
