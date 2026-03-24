import { Form, Head, usePage } from '@inertiajs/react';
import { Trash2, Edit, Plus, Search, MoreHorizontal, Key } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type Student = {
 id: string;
 first_name: string;
 last_name: string;
 email: string;
 grade: string;
};

const breadcrumbs: BreadcrumbItem[] = [
 { title: 'classroom_label', href: '/students' },
 { title: 'students', href: '/students' },
];

export default function Students({ students }: { students: Student[] }) {
 const { t, i18n } = useTranslation();
 const { auth, flash } = usePage().props as { auth?: { user?: { role?: string } }; flash?: { success?: string } };
 const userRole = auth?.user?.role;
 const isTenant = userRole === 'tenant';
 const [editingStudent, setEditingStudent] = useState<Student | null>(null);
 const [isCreating, setIsCreating] = useState(false);
 const [resettingStudent, setResettingStudent] = useState<Student | null>(null);
 const [search, setSearch] = useState('');
 const localizedBreadcrumbs = breadcrumbs.map(b => ({ ...b, title: t(b.title) }));

 const studentsList = useMemo(() => students ?? [], [students]);

 const filteredStudents = useMemo(() => {
  const term = search.trim().toLowerCase();
  if (!term) return studentsList;

  return studentsList.filter((student) =>
   `${student.first_name} ${student.last_name}`.toLowerCase().includes(term) ||
   (student.email && student.email.toLowerCase().includes(term)) ||
   student.grade.toLowerCase().includes(term),
  );
 }, [search, studentsList]);

 return (
  <AppLayout breadcrumbs={localizedBreadcrumbs}>
   <Head title={t('students')} />

   <div className="space-y-6 p-6 md:p-10 max-w-7xl mx-auto">
    {flash?.success && (
     <div className="flex items-center gap-3 border border-primary/20 bg-primary/10 px-4 py-4 text-primary font-medium animate-in fade-in slide-in-from-top-2">
      <div className="flex-1">{flash.success}</div>
     </div>
    )}

    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
     <header className="flex flex-col gap-1">
      <h1 className="text-3xl font-bold text-primary">{t('students')}</h1>
      <p className="text-muted-foreground text-sm">{t('student_management_desc')}</p>
     </header>
     {isTenant && (
      <Button
       onClick={() => setIsCreating(true)}
       className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all"
      >
       <Plus className="mr-2 h-4 w-4" />
       {t('add_student')}
      </Button>
     )}
    </div>

    <div className=" border border-border bg-card text-card-foreground shadow-sm overflow-hidden">
     <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between gap-4">
      <div className="relative w-full max-w-md">
       <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
       <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t('search_students')}
        className="pl-9 bg-background border-input w-full"
       />
      </div>
      <div className="text-sm text-muted-foreground font-medium">
       {filteredStudents.length} {t('records')}
      </div>
     </div>

     <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
       <thead className="text-xs uppercase bg-muted/40 text-muted-foreground border-b border-border">
        <tr>
         <th className="px-6 py-4 font-semibold text-foreground">{t('name')}</th>
         <th className="px-6 py-4 font-semibold text-foreground">{t('email')}</th>
         <th className="px-6 py-4 font-semibold text-foreground">{t('grade_level')}</th>
         <th className="px-6 py-4 font-semibold text-foreground text-right">{t('actions')}</th>
        </tr>
       </thead>
       <tbody className="divide-y divide-border">
        {filteredStudents.length > 0 ? (
         filteredStudents.map((student) => (
          <tr key={student.id} className="hover:bg-muted/20 transition-colors group">
           <td className="px-6 py-4">
            <div className="font-bold text-foreground">
             {student.first_name} {student.last_name}
            </div>
           </td>
           <td className="px-6 py-4 text-muted-foreground">{student.email}</td>
           <td className="px-6 py-4">
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
             {student.grade}
            </span>
           </td>
           <td className="px-6 py-4 text-right">
            {isTenant && (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
               <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
               </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 border-border bg-popover">
               <DropdownMenuItem className="cursor-pointer" onClick={() => setEditingStudent(student)}>
                <Edit className="mr-2 h-4 w-4" />
                {t('edit')}
               </DropdownMenuItem>
               <DropdownMenuItem className="cursor-pointer" onClick={() => setResettingStudent(student)}>
                <Key className="mr-2 h-4 w-4" />
                {t('reset_password')}
               </DropdownMenuItem>
               <DropdownMenuSeparator className="bg-border" />
               <DropdownMenuItem className="cursor-pointer" asChild>
                <a href={`/reports/student/${student.id}?locale=${i18n.language}`} target="_blank" className="flex items-center w-full">
                 <Search className="mr-2 h-4 w-4" />
                 {t('download_report')}
                </a>
               </DropdownMenuItem>
               <DropdownMenuSeparator className="bg-border" />
               <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                onClick={() => {
                 if (confirm(t('confirm_delete_student'))) {
                  const form = document.createElement('form');
                  form.method = 'POST';
                  form.action = `/students/${student.id}`;
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
                }}
               >
                <Trash2 className="mr-2 h-4 w-4" />
                {t('delete')}
               </DropdownMenuItem>
              </DropdownMenuContent>
             </DropdownMenu>
            )}
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
            <p className="font-medium text-foreground">{search ? t('no_students_found') : t('no_students_registered')}</p>
            <p className="text-xs">{search ? t('adjust_search') : t('add_student_started')}</p>
           </div>
          </td>
         </tr>
        )}
       </tbody>
      </table>
     </div>
    </div>

    <Dialog
     open={isCreating || Boolean(editingStudent)}
     onOpenChange={(open) => {
      if (!open) {
       setIsCreating(false);
       setEditingStudent(null);
      }
     }}
    >
     <DialogContent className="sm:max-w-md border-border bg-popover">
      <DialogHeader>
       <DialogTitle className="text-xl font-bold text-foreground">
        {editingStudent ? t('edit_student_details') : t('add_new_student')}
       </DialogTitle>
       <p className="text-sm text-muted-foreground">
        {editingStudent ? t('edit_student_desc') : t('add_student_desc')}
       </p>
      </DialogHeader>
                <Form
                    action={editingStudent ? `/students/${editingStudent.id}` : '/students'}
                    method="post"
                    className="space-y-4 py-2"
                    onSuccess={() => {
                        setIsCreating(false);
                        setEditingStudent(null);
                    }}
                >
                    {({ errors, processing }) => (
                        <>
                            {editingStudent && <input type="hidden" name="_method" value="PUT" />}
                            <div className="grid gap-2">
                                <Label htmlFor="first_name" className="text-sm font-medium text-foreground">{t('first_name')}</Label>
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    defaultValue={editingStudent?.first_name || ''}
                                    placeholder="John"
                                    required
                                    className="border-input focus-visible:ring-primary"
                                />
                                <InputError message={errors.first_name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last_name" className="text-sm font-medium text-foreground">{t('last_name')}</Label>
                                <Input
                                    id="last_name"
                                    name="last_name"
                                    defaultValue={editingStudent?.last_name || ''}
                                    placeholder="Smith"
                                    required
                                    className="border-input focus-visible:ring-primary"
                                />
                                <InputError message={errors.last_name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-sm font-medium text-foreground">{t('email_address')}</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    defaultValue={editingStudent?.email || ''}
                                    placeholder="john.smith@school.edu"
                                    required
                                    className="border-input focus-visible:ring-primary"
                                />
                                <InputError message={errors.email} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="grade" className="text-sm font-medium text-foreground">{t('grade_level')}</Label>
                                <Input
                                    id="grade"
                                    name="grade"
                                    defaultValue={editingStudent?.grade || ''}
                                    placeholder="10A"
                                    required
                                    className="border-input focus-visible:ring-primary"
                                />
                                <InputError message={errors.grade} />
                            </div>
                            {!editingStudent && (
                                <div className="grid gap-2">
                                    <Label htmlFor="password" title={t('leave_blank_default')} className="text-sm font-medium text-foreground">{t('initial_password_optional')}</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="border-input focus-visible:ring-primary"
                                    />
                                    <InputError message={errors.password} />
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{t('leave_blank_default')}</p>
                                </div>
                            )}
                            <DialogFooter className="pt-4 sm:justify-between">
                                <DialogClose asChild>
                                    <Button variant="ghost" type="button" className="text-muted-foreground" disabled={processing}>{t('cancel')}</Button>
                                </DialogClose>
                                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium" disabled={processing}>
                                    {editingStudent ? t('save_changes') : t('create_student')}
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
     </DialogContent>
    </Dialog>

    <Dialog open={Boolean(resettingStudent)} onOpenChange={(open) => !open && setResettingStudent(null)}>
     <DialogContent className="sm:max-w-md border-border bg-popover">
      <DialogHeader>
       <DialogTitle className="text-xl font-bold text-foreground">{t('reset_password')}</DialogTitle>
       <p className="text-sm text-muted-foreground">
        {t('resetting_password_for', { name: `${resettingStudent?.first_name} ${resettingStudent?.last_name}` })}
       </p>
      </DialogHeader>
                <Form
                    action={`/students/${resettingStudent?.id}/reset-password`}
                    method="post"
                    className="space-y-4 py-2"
                    onSuccess={() => setResettingStudent(null)}
                >
                    {({ errors, processing }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="reset_password_student" title={t('leave_blank_default')} className="text-sm font-medium text-foreground">{t('new_password_optional')}</Label>
                                <Input
                                    id="reset_password_student"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="border-input focus-visible:ring-primary"
                                />
                                <InputError message={errors.password} />
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{t('leave_blank_default')}</p>
                            </div>
                            <DialogFooter className="pt-4 sm:justify-between">
                                <DialogClose asChild>
                                    <Button variant="ghost" type="button" className="text-muted-foreground" disabled={processing}>{t('cancel')}</Button>
                                </DialogClose>
                                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium" disabled={processing}>{t('reset_password')}</Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
     </DialogContent>
    </Dialog>
   </div>
  </AppLayout>
 );
}
