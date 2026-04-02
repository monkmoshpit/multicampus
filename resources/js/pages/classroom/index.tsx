import { Form, Head, Link } from '@inertiajs/react';
import { Trash2, Edit, Plus, Search, MoreHorizontal, Users, GraduationCap } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type Student = {
 id: string;
 first_name: string;
 last_name: string;
 grade: string;
};

type Teacher = {
 id: string;
 first_name: string;
 last_name: string;
};

type Course = {
 id: string;
 course_name: string;
};

type Classroom = {
 id: string;
 name: string;
 teacher_id: string;
 course_id: string | null;
 teacher: Teacher;
 course: Course | null;
 students: Student[];
};

export default function Classrooms({ 
 classrooms, 
 teachers, 
 courses, 
 allStudents,
 }: { 
 classrooms: Classroom[];
 teachers: Teacher[];
 courses: Course[];
 allStudents: Student[];
 }) {
 const { t } = useTranslation();
 const [editingClassroom, setEditingClassroom] = useState<Classroom | null>(null);
 const [isCreating, setIsCreating] = useState(false);
 const [search, setSearch] = useState('');
 const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

 const classroomsList = useMemo(() => classrooms ?? [], [classrooms]);

 const filteredClassrooms = useMemo(() => {
 const term = search.trim().toLowerCase();
 if (!term) return classroomsList;

 return classroomsList.filter((classroom) =>
 classroom.name.toLowerCase().includes(term) ||
 `${classroom.teacher.first_name} ${classroom.teacher.last_name}`.toLowerCase().includes(term) ||
 (classroom.course?.course_name.toLowerCase().includes(term) ?? false)
 );
 }, [search, classroomsList]);

 const handleEdit = (classroom: Classroom) => {
 setEditingClassroom(classroom);
 setSelectedStudentIds(classroom.students.map(s => s.id));
 };

 const handleCreate = () => {
 setIsCreating(true);
 setEditingClassroom(null);
 setSelectedStudentIds([]);
 };

 const toggleStudent = (studentId: string) => {
 setSelectedStudentIds(prev => 
 prev.includes(studentId) 
 ? prev.filter(id => id !== studentId) 
 : [...prev, studentId]
 );
 };

 const breadcrumbs: BreadcrumbItem[] = [
  { title: t('classroom_label'), href: '/classrooms' },
  { title: t('classrooms'), href: '/classrooms' },
 ];

 return (
 <AppLayout breadcrumbs={breadcrumbs}>
 <Head title={t('classrooms')} />

  <div className="space-y-6 p-4 sm:p-6 md:p-10 max-w-7xl mx-auto">
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
  <header className="flex flex-col gap-1.5">
  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary">
  {t('classrooms')}
  </h1>
  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-md">
  {t('classroom_management_desc')}
  </p>
  </header>
 <Button
 onClick={handleCreate}
 className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all"
 >
 <Plus className="mr-2 h-4 w-4" />
 {t('create_classroom')}
 </Button>
 </div>

  <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden">
  <div className="p-4 border-b border-border bg-muted/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
  <div className="relative w-full sm:max-w-md">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <Input
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder={t('search_classrooms')}
  className="pl-9 bg-background border-input w-full h-10 sm:h-9"
  />
  </div>
  <div className="text-xs sm:text-sm text-muted-foreground font-medium flex items-center gap-2">
  <Users className="h-4 w-4 opacity-50" />
  {filteredClassrooms.length} {t('records')}
  </div>
  </div>

  {/* Mobile Card View */}
  <div className="block md:hidden border-t border-border">
  {filteredClassrooms.length > 0 ? (
  <div className="divide-y divide-border">
  {filteredClassrooms.map((classroom) => (
  <div key={classroom.id} className="p-4 hover:bg-muted/5 transition-colors">
  <div className="flex items-start justify-between mb-3">
  <div className="space-y-1">
  <Link href={`/classrooms/${classroom.id}`} className="font-bold text-base hover:text-primary transition-colors flex items-center gap-2">
  <Users className="h-4 w-4 text-primary/70" />
  {classroom.name}
  </Link>
  <div className="flex flex-wrap gap-2 pt-1">
  {classroom.course ? (
  <Badge variant="outline" className="text-[10px] py-0 px-2 h-5 bg-primary/5 border-primary/20 text-primary">
  {classroom.course.course_name}
  </Badge>
  ) : (
  <span className="text-[10px] text-muted-foreground italic">{t('no_course')}</span>
  )}
  <Badge variant="secondary" className="text-[10px] py-0 px-2 h-5 flex items-center gap-1">
  <Users className="h-3 w-3" />
  {classroom.students.length}
  </Badge>
  </div>
  </div>
  <DropdownMenu>
  <DropdownMenuTrigger asChild>
  <Button variant="ghost" size="icon" className="h-8 w-8">
  <MoreHorizontal className="h-4 w-4" />
  </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-40">
  <DropdownMenuItem onClick={() => handleEdit(classroom)}>
  <Edit className="mr-2 h-4 w-4" /> {t('edit')}
  </DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem className="text-destructive" onClick={() => {
    if (confirm(t('confirm_delete_classroom'))) {
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = `/classrooms/${classroom.id}`;
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
  <Trash2 className="mr-2 h-4 w-4" /> {t('delete')}
  </DropdownMenuItem>
  </DropdownMenuContent>
  </DropdownMenu>
  </div>
  <div className="flex items-center gap-2 text-xs text-muted-foreground">
  <GraduationCap className="h-3.5 w-3.5" />
  {classroom.teacher.first_name} {classroom.teacher.last_name}
  </div>
  </div>
  ))}
  </div>
  ) : (
  <div className="py-12 px-6 text-center">
  <div className="h-16 w-16 mx-auto rounded-full bg-muted/50 flex items-center justify-center mb-4">
  <Search className="h-8 w-8 text-muted-foreground/30" />
  </div>
  <p className="font-bold text-lg mb-1">{search ? t('no_classrooms_found') : t('no_classrooms_registered')}</p>
  <p className="text-sm text-muted-foreground">{search ? t('try_adjusting_search') : t('create_new_classroom_start')}</p>
  </div>
  )}
  </div>

  {/* Desktop Table View */}
  <div className="hidden md:block overflow-x-auto">
  <table className="w-full text-sm text-left border-t border-border">
  <thead className="text-[10px] uppercase bg-muted/30 text-muted-foreground/70 tracking-wider">
  <tr>
  <th className="px-6 py-4 font-bold">{t('classroom_name')}</th>
  <th className="px-6 py-4 font-bold">{t('course')}</th>
  <th className="px-6 py-4 font-bold">{t('teacher')}</th>
  <th className="px-6 py-4 font-bold text-center">{t('students')}</th>
  <th className="px-6 py-4 font-bold text-right">{t('actions')}</th>
  </tr>
  </thead>
  <tbody className="divide-y divide-border">
  {filteredClassrooms.length > 0 ? (
  filteredClassrooms.map((classroom) => (
  <tr key={classroom.id} className="hover:bg-muted/5 transition-colors group">
  <td className="px-6 py-4">
  <Link href={`/classrooms/${classroom.id}`} className="hover:underline">
  <div className="font-bold text-foreground flex items-center gap-2.5 group-hover:text-primary transition-colors">
  <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
  <Users className="h-4 w-4" />
  </div>
  {classroom.name}
  </div>
  </Link>
  </td>
  <td className="px-6 py-4 text-muted-foreground">
  {classroom.course ? (
  <Badge variant="outline" className="font-medium bg-secondary/30 border-transparent">
  {classroom.course.course_name}
  </Badge>
  ) : (
  <span className="text-muted-foreground/60 italic text-xs">{t('no_course')}</span>
  )}
  </td>
  <td className="px-6 py-4 font-medium">
  <div className="flex items-center gap-2 text-foreground/90">
  <GraduationCap className="h-4 w-4 opacity-50" />
  {classroom.teacher.first_name} {classroom.teacher.last_name}
  </div>
  </td>
  <td className="px-6 py-4 text-center">
  <Badge variant="secondary" className="rounded-md font-bold px-2 py-0.5 min-w-[32px] justify-center">
  {classroom.students.length}
  </Badge>
  </td>
  <td className="px-6 py-4 text-right">
  <DropdownMenu>
  <DropdownMenuTrigger asChild>
  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
  <MoreHorizontal className="h-4 w-4" />
  </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-40 border-border bg-popover shadow-xl animate-in fade-in-0 zoom-in-95">
  <DropdownMenuItem className="cursor-pointer" onClick={() => handleEdit(classroom)}>
  <Edit className="mr-2 h-4 w-4" />
  {t('edit')}
  </DropdownMenuItem>
  <DropdownMenuSeparator className="bg-border" />
  <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => {
  if (confirm(t('confirm_delete_classroom'))) {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = `/classrooms/${classroom.id}`;
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
  <td colSpan={5} className="px-6 py-20 text-center">
  <div className="flex flex-col items-center justify-center space-y-4">
  <div className="h-20 w-20 rounded-full bg-muted/30 flex items-center justify-center">
  <Search className="h-10 w-10 text-muted-foreground/20" />
  </div>
  <div className="space-y-1">
  <p className="font-extrabold text-xl text-foreground">{search ? t('no_classrooms_found') : t('no_classrooms_registered')}</p>
  <p className="text-sm text-muted-foreground">{search ? t('try_adjusting_search') : t('create_new_classroom_start')}</p>
  </div>
  </div>
  </td>
  </tr>
  )}
  </tbody>
  </table>
  </div>
  </div>

 {/* Create/Edit Modal */}
 <Dialog 
 open={isCreating || Boolean(editingClassroom)} 
 onOpenChange={(open) => {
 if (!open) {
 setIsCreating(false);
 setEditingClassroom(null);
 }
 }}
 >
 <DialogContent className="sm:max-w-lg border-border bg-popover max-h-[90vh] overflow-y-auto">
 <DialogHeader>
 <DialogTitle className="text-xl font-bold text-foreground">
 {editingClassroom ? t('edit_classroom') : t('create_new_classroom')}
 </DialogTitle>
 <p className="text-sm text-muted-foreground">
 {editingClassroom ? t('edit_classroom_desc') : t('create_classroom_desc')}
 </p>
 </DialogHeader>
 
                <Form
                    action={editingClassroom ? `/classrooms/${editingClassroom.id}` : '/classrooms'}
                    method="post"
                    className="space-y-6 py-4"
                    onSuccess={() => {
                        setIsCreating(false);
                        setEditingClassroom(null);
                    }}
                >
                    {({ errors: formErrors, processing }) => (
                        <>
                            {editingClassroom && <input type="hidden" name="_method" value="PUT" />}

                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-sm font-medium text-foreground">{t('classroom_name')}</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    defaultValue={editingClassroom?.name || ''}
                                    placeholder="Room 101 - Level A"
                                    required
                                    className="border-input focus-visible:ring-primary"
                                />
                                <InputError message={formErrors.name} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="teacher_id" className="text-sm font-medium text-foreground">{t('primary_teacher')}</Label>
                                    <Select name="teacher_id" defaultValue={editingClassroom?.teacher_id || ''}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder={t('select_teacher')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {teachers.map((teacher) => (
                                                <SelectItem key={teacher.id} value={teacher.id}>
                                                    {teacher.first_name} {teacher.last_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={formErrors.teacher_id} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="course_id" className="text-sm font-medium text-foreground">{t('associated_course')}</Label>
                                    <Select name="course_id" defaultValue={editingClassroom?.course_id || 'none'}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder={t('select_course_optional')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">{t('none')}</SelectItem>
                                            {courses.map((course) => (
                                                <SelectItem key={course.id} value={course.id}>
                                                    {course.course_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={formErrors.course_id} />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-foreground flex items-center justify-between">
                                    <span>{t('students_selected', { count: selectedStudentIds.length })}</span>
                                    <span className="text-xs text-muted-foreground font-normal">{t('select_all_apply')}</span>
                                </Label>
                                <div className="border border-border bg-muted/10 p-4 max-h-48 overflow-y-auto">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {allStudents.map((student) => (
                                            <div key={student.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`student-${student.id}`}
                                                    checked={selectedStudentIds.includes(student.id)}
                                                    onCheckedChange={() => toggleStudent(student.id)}
                                                />
                                                <Label
                                                    htmlFor={`student-${student.id}`}
                                                    className="text-sm font-normal cursor-pointer leading-none"
                                                >
                                                    {student.first_name} {student.last_name}
                                                    <span className="ml-1.5 text-[10px] uppercase text-muted-foreground font-bold">
                                                        {student.grade}
                                                    </span>
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <InputError message={formErrors.student_ids} />
                                {/* Hidden inputs for the student_ids array */}
                                {selectedStudentIds.map((id) => (
                                    <input key={id} type="hidden" name="student_ids[]" value={id} />
                                ))}
                            </div>

                            <DialogFooter className="pt-4 sm:justify-between border-t border-border mt-4">
                                <DialogClose asChild>
                                    <Button variant="ghost" type="button" className="text-muted-foreground" disabled={processing}>{t('cancel')}</Button>
                                </DialogClose>
                                <Button
                                    type="submit"
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                                    disabled={processing}
                                >
                                    {editingClassroom ? t('save_changes') : t('create_classroom')}
                                </Button>
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
