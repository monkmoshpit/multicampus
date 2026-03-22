import { Head, Link, useForm } from '@inertiajs/react';
import {
    User as UserIcon,
    Mail,
    Shield,
    ArrowLeft,
    ChevronLeft,
    GraduationCap,
    BookOpen,
    KeyRound,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type Classroom = {
    id: string;
    name: string;
    course: { course_name: string } | null;
};

type Teacher = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    user: { id: string; email: string; role: string } | null;
    classrooms: Classroom[];
};

export default function TeacherShow({ teacher }: { teacher: Teacher }) {
    const { post, processing } = useForm();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Teachers', href: '/teachers' },
        { title: `${teacher.first_name} ${teacher.last_name}`, href: `/teachers/${teacher.id}` },
    ];

    const handleResetPassword = () => {
        if (confirm('Are you sure you want to reset this teacher\'s password to the default "Welcome@Multicampus"?')) {
            post(`/teachers/${teacher.id}/reset-password`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${teacher.first_name} ${teacher.last_name} - Profile`} />

            <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
                {/* Back Link */}
                <Link 
                    href="/teachers" 
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Staff Directory
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sidebar / Info */}
                    <div className="space-y-6">
                        <Card className="border-border shadow-sm overflow-hidden">
                            <div className="h-24 bg-primary/10 relative">
                                <div className="absolute -bottom-10 left-6">
                                    <div className="h-20 w-20 rounded-xl bg-background border-4 border-background shadow-lg flex items-center justify-center text-primary">
                                        <UserIcon className="h-10 w-10" />
                                    </div>
                                </div>
                            </div>
                            <CardContent className="pt-14 pb-6 px-6">
                                <h2 className="text-2xl font-extrabold tracking-tight uppercase">
                                    {teacher.first_name} {teacher.last_name}
                                </h2>
                                <p className="text-sm text-muted-foreground font-medium flex items-center gap-1.5 mt-1">
                                    <Mail className="h-3.5 w-3.5" />
                                    {teacher.email}
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="px-3 py-0.5 text-[10px] font-bold uppercase rounded-full">
                                        {teacher.user?.role || 'Staff'}
                                    </Badge>
                                    <Badge variant="outline" className="px-3 py-0.5 text-[10px] font-bold uppercase rounded-full border-primary/20 text-primary">
                                        ID: {teacher.id.substring(0, 8)}...
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border shadow-sm">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Stats</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center border-b border-border pb-3">
                                    <span className="text-sm font-medium text-muted-foreground">Classrooms</span>
                                    <span className="font-bold">{teacher.classrooms.length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-muted-foreground">Account Status</span>
                                    <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/10 border-green-500/20 px-2 py-0 text-[10px] uppercase font-bold">Active</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Security Card */}
                        <Card className="border-border shadow-sm border-l-4 border-l-orange-500">
                            <CardHeader>
                                <div className="flex items-center gap-2 text-orange-500 mb-1">
                                    <Shield className="h-5 w-5" />
                                    <CardTitle className="text-lg">Security & Access</CardTitle>
                                </div>
                                <CardDescription>Manage teacher login credentials and account access.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Alert variant="default" className="bg-muted/50 border-border">
                                    <KeyRound className="h-4 w-4" />
                                    <AlertTitle className="font-bold uppercase tracking-tight text-xs">Default Password</AlertTitle>
                                    <AlertDescription className="text-sm">
                                        The system default password is <code className="bg-muted px-1 rounded font-mono font-bold">Welcome@Multicampus</code>.
                                    </AlertDescription>
                                </Alert>
                                
                                <div className="pt-2">
                                    <Button 
                                        variant="outline" 
                                        className="w-full border-orange-500/20 hover:bg-orange-500/5 text-orange-600 hover:text-orange-700 font-bold uppercase tracking-wider text-xs h-12"
                                        onClick={handleResetPassword}
                                        disabled={processing}
                                    >
                                        {processing ? 'Processing...' : 'Reset Password to Default'}
                                    </Button>
                                    <p className="text-[10px] text-muted-foreground mt-2 text-center uppercase tracking-tighter">
                                        This action will immediately change the teacher's password.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Assignments / Classrooms */}
                        <Card className="border-border shadow-sm">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-1">
                                    <GraduationCap className="h-5 w-5 text-primary" />
                                    <CardTitle className="text-lg">Active Assignments</CardTitle>
                                </div>
                                <CardDescription>Classrooms and courses currently assigned to this teacher.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {teacher.classrooms.length > 0 ? (
                                    <div className="grid gap-3">
                                        {teacher.classrooms.map(classroom => (
                                            <Link 
                                                key={classroom.id} 
                                                href={`/classrooms/${classroom.id}`}
                                                className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/20 transition-all group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                        <BookOpen className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm">{classroom.name}</p>
                                                        <p className="text-xs text-muted-foreground">{classroom.course?.course_name || 'General Course'}</p>
                                                    </div>
                                                </div>
                                                <ChevronLeft className="h-4 w-4 rotate-180 text-muted-foreground" />
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-muted-foreground text-sm">
                                        No active classroom assignments found.
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
