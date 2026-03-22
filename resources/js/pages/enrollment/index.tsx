import { Form, Head, usePage } from '@inertiajs/react';
import { Trash2, Plus, Search, MoreHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type Student = {
 id: string;
 first_name: string;
 last_name: string;
};

type Course = {
 id: string;
 course_name: string;
};

type Enrollment = {
 id: string;
 student: Student | null;
 course: Course | null;
 enrollment_date: string;
};

export default function Enrollments({ enrollments, students, courses }: { enrollments: Enrollment[]; students: Student[]; courses: Course[] }) {
 const { t, i18n } = useTranslation();
 const { flash } = usePage().props as { flash?: { success?: string } };
 const [isCreating, setIsCreating] = useState(false);
 const [search, setSearch] = useState('');

 const breadcrumbs: BreadcrumbItem[] = [
  { title: t('classroom_label'), href: '/enrollments' },
  { title: t('enrollments_plural'), href: '/enrollments' },
 ];

 const enrollmentList = useMemo(() => enrollments ?? [], [enrollments]);

 const filteredEnrollments = useMemo(() => {
 const term = search.trim().toLowerCase();
 if (!term) return enrollmentList;

 return enrollmentList.filter((enrollment) => {
 const studentName = enrollment.student
 ? `${enrollment.student.first_name} ${enrollment.student.last_name}`
 : '';
 const courseName = enrollment.course?.course_name ?? '';

 return (
 studentName.toLowerCase().includes(term) ||
 courseName.toLowerCase().includes(term)
 );
 });
 }, [search, enrollmentList]);

 return (
 <AppLayout breadcrumbs={breadcrumbs}>
 <Head title={t('enrollments_plural')} />

 <div className="space-y-6 p-6 md:p-10 max-w-7xl mx-auto">
 {flash?.success && (
 <div className="flex items-center gap-3 border border-primary/20 bg-primary/10 px-4 py-4 text-primary font-medium animate-in fade-in slide-in-from-top-2">
 <div className="flex-1">{flash.success}</div>
 </div>
 )}

 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <header className="flex flex-col gap-1">
 <h1 className="text-3xl font-bold text-primary">
 {t('enrollments_plural')}
 </h1>
 <p className="text-muted-foreground text-sm">
 {t('enrollment_management_desc')}
 </p>
 </header>
 <Button
 onClick={() => setIsCreating(true)}
 className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all"
 >
 <Plus className="mr-2 h-4 w-4" />
 {t('add_enrollment')}
 </Button>
 </div>

 <div className=" border border-border bg-card text-card-foreground shadow-sm overflow-hidden">
 <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between gap-4">
 <div className="relative w-full max-w-md">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
 <Input
 value={search}
 onChange={(e) => setSearch(e.target.value)}
 placeholder={t('search_students_courses')}
 className="pl-9 bg-background border-input w-full"
 />
 </div>
 <div className="text-sm text-muted-foreground font-medium">
 {filteredEnrollments.length} {t('records')}
 </div>
 </div>

 <div className="overflow-x-auto">
 <table className="w-full text-sm text-left">
 <thead className="text-xs uppercase bg-muted/40 text-muted-foreground border-b border-border">
 <tr>
 <th className="px-6 py-4 font-semibold text-foreground">{t('student')}</th>
 <th className="px-6 py-4 font-semibold text-foreground">{t('course')}</th>
 <th className="px-6 py-4 font-semibold text-foreground">{t('enrollment_date')}</th>
 <th className="px-6 py-4 font-semibold text-foreground text-right">{t('actions')}</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-border">
 {filteredEnrollments.length > 0 ? (
 filteredEnrollments.map((enrollment) => (
 <tr key={enrollment.id} className="hover:bg-muted/20 transition-colors group">
 <td className="px-6 py-4">
 <div className="font-medium text-foreground">
 {enrollment.student ? (
 <span className="flex items-center gap-2">
 <span className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
 {enrollment.student.first_name[0]}{enrollment.student.last_name[0]}
 </span>
 {enrollment.student.first_name} {enrollment.student.last_name}
 </span>
 ) : (
 <span className="text-muted-foreground/50">{t('unknown_student')}</span>
 )}
 </div>
 </td>
 <td className="px-6 py-4 font-medium text-foreground">
 {enrollment.course ? enrollment.course.course_name : <span className="text-muted-foreground/50">{t('unknown_course')}</span>}
 </td>
 <td className="px-6 py-4">
 <span className="inline-flex items-center rounded border border-border bg-muted/50 px-2 py-1 text-xs font-semibold text-muted-foreground">
 {new Date(enrollment.enrollment_date).toLocaleDateString(i18n.language)}
 </span>
 </td>
 <td className="px-6 py-4 text-right">
 <DropdownMenu>
 <DropdownMenuTrigger asChild>
 <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
 <MoreHorizontal className="h-4 w-4" />
 </Button>
 </DropdownMenuTrigger>
 <DropdownMenuContent align="end" className="w-40 border-border bg-popover">
 <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => {
 if (confirm(t('confirm_delete_enrollment'))) {
 const form = document.createElement('form');
 form.method = 'POST';
 form.action = `/enrollments/${enrollment.id}`;
 const methodField = document.createElement('input');
 methodField.type = 'hidden';
 methodField.name = '_method';
 methodField.value = 'DELETE';
 const csrfField = document.createElement('input');
 csrfField.type = 'hidden';
 csrfField.name = '_token';
 csrfField.value = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '';
 form.appendChild(methodField);
 form.appendChild(csrfField);
 document.body.appendChild(form);
 form.submit();
 }
 }}>
 <Trash2 className="mr-2 h-4 w-4" />
 {t('delete')}
 </DropdownMenuItem>
 </DropdownMenuContent>
 </DropdownMenu>
 </td>
 </tr>
 ))
 ) : (
 <tr>
 <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
 <div className="flex flex-col items-center justify-center space-y-3">
 <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
 <Search className="h-5 w-5 text-muted-foreground/50" />
 </div>
 <p className="font-medium text-foreground">{search ? t('no_enrollments_found') : t('no_enrollments_registered')}</p>
 <p className="text-xs">{search ? t('adjust_search') : t('add_enrollment_started')}</p>
 </div>
 </td>
 </tr>
 )}
 </tbody>
 </table>
 </div>
 </div>

 <Dialog 
 open={isCreating} 
 onOpenChange={setIsCreating}
 >
 <DialogContent className="sm:max-w-md border-border bg-popover">
 <DialogHeader>
 <DialogTitle className="text-xl font-bold text-foreground">
 {t('add_new_enrollment')}
 </DialogTitle>
 <p className="text-sm text-muted-foreground">
 {t('add_enrollment_desc')}
 </p>
 </DialogHeader>
 <Form 
 action="/enrollments" 
 method="post" 
 className="space-y-4 py-2"
 >
 <div className="grid gap-2">
 <Label htmlFor="student_id" className="text-sm font-medium text-foreground">{t('student')}</Label>
 <select
 id="student_id"
 name="student_id"
 required
 className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
 >
 <option value="" disabled>{t('select_student_placeholder')}</option>
 {students.map((student) => (
 <option key={student.id} value={student.id}>
 {student.first_name} {student.last_name}
 </option>
 ))}
 </select>
 </div>
 <div className="grid gap-2">
 <Label htmlFor="course_id" className="text-sm font-medium text-foreground">{t('course')}</Label>
 <select
 id="course_id"
 name="course_id"
 required
 className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
 >
 <option value="" disabled>{t('select_course_placeholder')}</option>
 {courses.map((course) => (
 <option key={course.id} value={course.id}>
 {course.course_name}
 </option>
 ))}
 </select>
 </div>
 <DialogFooter className="pt-4 sm:justify-between">
 <DialogClose asChild>
 <Button variant="ghost" type="button" className="text-muted-foreground">{t('cancel')}</Button>
 </DialogClose>
 <Button
 type="submit"
 className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
 >
 {t('complete_enrollment')}
 </Button>
 </DialogFooter>
 </Form>
 </DialogContent>
 </Dialog>
 </div>
 </AppLayout>
 );
}
