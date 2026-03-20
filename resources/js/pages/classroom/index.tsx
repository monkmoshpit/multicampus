import { Form, Head, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { Trash2, Edit, Plus, Search, MoreHorizontal, Users, GraduationCap, BookOpen } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
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

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Classroom', href: '/classrooms' },
    { title: 'Classrooms', href: '/classrooms' },
];

export default function Classrooms({ 
    classrooms, 
    teachers, 
    courses, 
    allStudents 
}: { 
    classrooms: Classroom[];
    teachers: Teacher[];
    courses: Course[];
    allStudents: Student[];
}) {
    const { flash } = usePage().props as any;
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Classrooms" />

            <div className="space-y-6 p-6 md:p-10 max-w-7xl mx-auto">
                {flash?.success && (
                    <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/10 px-4 py-4 text-primary font-medium animate-in fade-in slide-in-from-top-2">
                        <div className="flex-1">{flash.success}</div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <header className="flex flex-col gap-1">
                        <h1 className="text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Classrooms
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            Organize groups of students, assign teachers, and manage courses.
                        </p>
                    </header>
                    <Button
                        onClick={handleCreate}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Create Classroom
                    </Button>
                </div>

                <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between gap-4">
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search classrooms..."
                                className="pl-9 bg-background border-input w-full"
                            />
                        </div>
                        <div className="text-sm text-muted-foreground font-medium">
                            {filteredClassrooms.length} record{filteredClassrooms.length !== 1 ? 's' : ''}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase bg-muted/40 text-muted-foreground border-b border-border">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-foreground">Classroom Name</th>
                                    <th className="px-6 py-4 font-semibold text-foreground">Course</th>
                                    <th className="px-6 py-4 font-semibold text-foreground">Teacher</th>
                                    <th className="px-6 py-4 font-semibold text-foreground text-center">Students</th>
                                    <th className="px-6 py-4 font-semibold text-foreground text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredClassrooms.length > 0 ? (
                                    filteredClassrooms.map((classroom) => (
                                        <tr key={classroom.id} className="hover:bg-muted/20 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-foreground flex items-center gap-2">
                                                    <Users className="h-4 w-4 text-primary/60" />
                                                    {classroom.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {classroom.course ? (
                                                    <Badge variant="outline" className="flex items-center gap-1 w-fit">
                                                        <BookOpen className="h-3 w-3" />
                                                        {classroom.course.course_name}
                                                    </Badge>
                                                ) : (
                                                    <span className="text-muted-foreground italic text-xs">No Course</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                                    {classroom.teacher.first_name} {classroom.teacher.last_name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <Badge variant="secondary" className="rounded-full px-2.5">
                                                    {classroom.students.length}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-40 border-border bg-popover">
                                                        <DropdownMenuItem className="cursor-pointer" onClick={() => handleEdit(classroom)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator className="bg-border" />
                                                        <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => {
                                                            if (confirm('Are you sure you want to delete this classroom?')) {
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
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                            <div className="flex flex-col items-center justify-center space-y-3">
                                                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                                                    <Search className="h-5 w-5 text-muted-foreground/50" />
                                                </div>
                                                <p className="font-medium text-foreground">{search ? 'No classrooms found' : 'No classrooms registered'}</p>
                                                <p className="text-xs">{search ? 'Try adjusting your search query' : 'Create a new classroom to get started'}</p>
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
                                {editingClassroom ? 'Edit Classroom' : 'Create New Classroom'}
                            </DialogTitle>
                            <p className="text-sm text-muted-foreground">
                                {editingClassroom ? 'Update the details and student assignments.' : 'Fill in the details to establish a new classroom.'}
                            </p>
                        </DialogHeader>
                        
                        <Form 
                            action={editingClassroom ? `/classrooms/${editingClassroom.id}` : '/classrooms'} 
                            method="post" 
                            className="space-y-6 py-4"
                        >
                            {editingClassroom && <input type="hidden" name="_method" value="PUT" />}
                            
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-sm font-medium text-foreground">Classroom Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    defaultValue={editingClassroom?.name || ''}
                                    placeholder="Room 101 - Level A"
                                    required
                                    className="border-input focus-visible:ring-primary"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="teacher_id" className="text-sm font-medium text-foreground">Primary Teacher</Label>
                                    <Select name="teacher_id" defaultValue={editingClassroom?.teacher_id || ''}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a teacher" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {teachers.map((teacher) => (
                                                <SelectItem key={teacher.id} value={teacher.id}>
                                                    {teacher.first_name} {teacher.last_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="course_id" className="text-sm font-medium text-foreground">Associated Course</Label>
                                    <Select name="course_id" defaultValue={editingClassroom?.course_id || 'none'}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a course (optional)" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">None</SelectItem>
                                            {courses.map((course) => (
                                                <SelectItem key={course.id} value={course.id}>
                                                    {course.course_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-foreground flex items-center justify-between">
                                    <span>Students ({selectedStudentIds.length} selected)</span>
                                    <span className="text-xs text-muted-foreground font-normal">Select all that apply</span>
                                </Label>
                                <div className="border border-border rounded-lg bg-muted/10 p-4 max-h-48 overflow-y-auto">
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
                                {/* Hidden inputs for the student_ids array */}
                                {selectedStudentIds.map((id) => (
                                    <input key={id} type="hidden" name="student_ids[]" value={id} />
                                ))}
                            </div>

                            <DialogFooter className="pt-4 sm:justify-between border-t border-border mt-4">
                                <DialogClose asChild>
                                    <Button variant="ghost" type="button" className="text-muted-foreground">Cancel</Button>
                                </DialogClose>
                                <Button
                                    type="submit"
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                                >
                                    {editingClassroom ? 'Save Changes' : 'Create Classroom'}
                                </Button>
                            </DialogFooter>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
