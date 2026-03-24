import { Form, Head, usePage, Link } from '@inertiajs/react';
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

type Teacher = {
 id: string;
 first_name: string;
 last_name: string;
 email: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'classroom_label', href: '/teachers' },
    { title: 'teachers', href: '/teachers' },
];

export default function Teachers({ teachers }: { teachers: Teacher[] }) {
    const { t } = useTranslation();
    const { flash } = usePage().props as { flash?: { success?: string; error?: string } };
    const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [resettingTeacher, setResettingTeacher] = useState<Teacher | null>(null);
    const [search, setSearch] = useState('');
    const localizedBreadcrumbs = breadcrumbs.map(b => ({ ...b, title: t(b.title) }));

 const teachersList = useMemo(() => teachers ?? [], [teachers]);

 const filteredTeachers = useMemo(() => {
 const term = search.trim().toLowerCase();
 if (!term) return teachersList;

 return teachersList.filter((teacher) =>
 `${teacher.first_name} ${teacher.last_name}`.toLowerCase().includes(term) ||
 teacher.email.toLowerCase().includes(term),
 );
 }, [search, teachersList]);

    return (
        <AppLayout breadcrumbs={localizedBreadcrumbs}>
            <Head title={t('teachers')} />

 <div className="space-y-6 p-6 md:p-10 max-w-7xl mx-auto">
 {flash?.success && (
 <div className="flex items-center gap-3 border border-primary/20 bg-primary/10 px-4 py-4 text-primary font-medium animate-in fade-in slide-in-from-top-2">
 <div className="flex-1">{flash.success}</div>
 </div>
 )}

 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <header className="flex flex-col gap-1">
 <h1 className="text-3xl font-bold text-primary">
                                {t('teachers')}
 </h1>
 <p className="text-muted-foreground text-sm">
                                {t('teacher_management_desc')}
 </p>
 </header>
 <Button
 onClick={() => setIsCreating(true)}
 className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all"
 >
 <Plus className="mr-2 h-4 w-4" />
                            {t('add_teacher')}
 </Button>
 </div>

 <div className=" border border-border bg-card text-card-foreground shadow-sm overflow-hidden">
 <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between gap-4">
 <div className="relative w-full max-w-md">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
 <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={t('search_teachers')}
                                className="pl-9 bg-background border-input w-full"
                            />
                        </div>
                        <div className="text-sm text-muted-foreground font-medium">
                            {filteredTeachers.length} {t('records')}
                        </div>
 </div>

 <div className="overflow-x-auto">
 <table className="w-full text-sm text-left">
 <thead className="text-xs uppercase bg-muted/40 text-muted-foreground border-b border-border">
 <tr>
 <th className="px-6 py-4 font-semibold text-foreground">{t('name')}</th>
 <th className="px-6 py-4 font-semibold text-foreground">{t('email_directory')}</th>
 <th className="px-6 py-4 font-semibold text-foreground text-right">{t('actions')}</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-border">
 {filteredTeachers.length > 0 ? (
 filteredTeachers.map((teacher) => (
 <tr key={teacher.id} className="hover:bg-muted/20 transition-colors group">
 <td className="px-6 py-4">
 <Link href={`/teachers/${teacher.id}`} className="hover:underline">
 <div className="font-bold text-foreground group-hover:text-primary transition-colors">
 {teacher.first_name} {teacher.last_name}
 </div>
 </Link>
 </td>
 <td className="px-6 py-4 text-muted-foreground">
 {teacher.email}
 </td>
 <td className="px-6 py-4 text-right">
 <DropdownMenu>
 <DropdownMenuTrigger asChild>
 <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
 <MoreHorizontal className="h-4 w-4" />
 </Button>
 </DropdownMenuTrigger>
 <DropdownMenuContent align="end" className="w-40 border-border bg-popover">
 <DropdownMenuItem className="cursor-pointer" onClick={() => setEditingTeacher(teacher)}>
 <Edit className="mr-2 h-4 w-4" />
 {t('edit')}
 </DropdownMenuItem>
 <DropdownMenuSeparator className="bg-border" />
 <DropdownMenuItem className="cursor-pointer" onClick={() => setResettingTeacher(teacher)}>
 <Key className="mr-2 h-4 w-4" />
 {t('reset_password')}
 </DropdownMenuItem>
 <DropdownMenuSeparator className="bg-border" />
 <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => {
 if (confirm(t('confirm_delete_teacher'))) {
 const form = document.createElement('form');
 form.method = 'POST';
 form.action = `/teachers/${teacher.id}`;
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
 <td colSpan={3} className="px-6 py-12 text-center text-muted-foreground">
 <div className="flex flex-col items-center justify-center space-y-3">
 <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
 <Search className="h-5 w-5 text-muted-foreground/50" />
 </div>
 <p className="font-medium text-foreground">{search ? t('no_teachers_found') : t('no_teachers_registered')}</p>
 <p className="text-xs">{search ? t('adjust_search') : t('add_teacher_started')}</p>
 </div>
 </td>
 </tr>
 )}
 </tbody>
 </table>
 </div>
 </div>

 <Dialog 
 open={isCreating || Boolean(editingTeacher)} 
 onOpenChange={(open) => {
 if (!open) {
 setIsCreating(false);
 setEditingTeacher(null);
 }
 }}
 >
 <DialogContent className="sm:max-w-md border-border bg-popover">
 <DialogHeader>
 <DialogTitle className="text-xl font-bold text-foreground">
 {editingTeacher ? t('edit_teacher_directory') : t('add_new_teacher')}
 </DialogTitle>
 <p className="text-sm text-muted-foreground">
 {editingTeacher ? t('edit_teacher_desc') : t('add_teacher_desc')}
 </p>
 </DialogHeader>
                <Form
                    action={editingTeacher ? `/teachers/${editingTeacher.id}` : '/teachers'}
                    method="post"
                    className="space-y-4 py-2"
                    onSuccess={() => {
                        setIsCreating(false);
                        setEditingTeacher(null);
                    }}
                >
                    {({ errors, processing }) => (
                        <>
                            {editingTeacher && <input type="hidden" name="_method" value="PUT" />}
                            <div className="grid gap-2">
                                <Label htmlFor="first_name" className="text-sm font-medium text-foreground">{t('first_name')}</Label>
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    defaultValue={editingTeacher?.first_name || ''}
                                    placeholder="Jane"
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
                                    defaultValue={editingTeacher?.last_name || ''}
                                    placeholder="Doe"
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
                                    defaultValue={editingTeacher?.email || ''}
                                    placeholder="jane.doe@institution.edu"
                                    required
                                    className="border-input focus-visible:ring-primary"
                                />
                                <InputError message={errors.email} />
                            </div>
                            {!editingTeacher && (
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
                                <Button
                                    type="submit"
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                                    disabled={processing}
                                >
                                    {editingTeacher ? t('save_changes') : t('create_teacher')}
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
 </DialogContent>
 </Dialog>

 <Dialog open={Boolean(resettingTeacher)} onOpenChange={(open) => !open && setResettingTeacher(null)}>
 <DialogContent className="sm:max-w-md border-border bg-popover">
 <DialogHeader>
 <DialogTitle className="text-xl font-bold text-foreground">{t('reset_password')}</DialogTitle>
 <p className="text-sm text-muted-foreground">
 {t('resetting_password_for', { name: `${resettingTeacher?.first_name} ${resettingTeacher?.last_name}` })}
 </p>
 </DialogHeader>
                <Form
                    action={`/teachers/${resettingTeacher?.id}/reset-password`}
                    method="post"
                    className="space-y-4 py-2"
                    onSuccess={() => setResettingTeacher(null)}
                >
                    {({ errors, processing }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="reset_password" title={t('leave_blank_default')} className="text-sm font-medium text-foreground">{t('new_password_optional')}</Label>
                                <Input
                                    id="reset_password"
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
