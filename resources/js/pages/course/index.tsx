import { Form, Head, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { Trash2, Edit, Plus, Search, MoreHorizontal } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { BreadcrumbItem } from '@/types';

type Teacher = {
    id: string;
    first_name: string;
    last_name: string;
};

type Course = {
    id: string;
    course_name: string;
    teacher: Teacher | null;
    teacher_id: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Classroom', href: '/courses' },
    { title: 'Courses', href: '/courses' },
];

export default function Courses({ courses, teachers }: { courses: Course[]; teachers: Teacher[] }) {
    const { flash } = usePage().props as any;
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [search, setSearch] = useState('');

    const courseList = useMemo(() => courses ?? [], [courses]);

    const filteredCourses = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) return courseList;

        return courseList.filter((course) => {
            const teacherName = course.teacher
                ? `${course.teacher.first_name} ${course.teacher.last_name}`
                : '';
            return (
                course.course_name.toLowerCase().includes(term) ||
                teacherName.toLowerCase().includes(term)
            );
        });
    }, [search, courseList]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Courses" />

            <div className="space-y-6 p-6 md:p-10 max-w-7xl mx-auto">
                {flash?.success && (
                    <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/10 px-4 py-4 text-primary font-medium animate-in fade-in slide-in-from-top-2">
                        <div className="flex-1">{flash.success}</div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <header className="flex flex-col gap-1">
                        <h1 className="text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Courses
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            Manage the curriculum and assigned teachers.
                        </p>
                    </header>
                    <Button
                        onClick={() => setIsCreating(true)}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Course
                    </Button>
                </div>

                <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between gap-4">
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search courses or teachers..."
                                className="pl-9 bg-background border-input w-full"
                            />
                        </div>
                        <div className="text-sm text-muted-foreground font-medium">
                            {filteredCourses.length} record{filteredCourses.length !== 1 ? 's' : ''}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase bg-muted/40 text-muted-foreground border-b border-border">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-foreground">Course Name</th>
                                    <th className="px-6 py-4 font-semibold text-foreground">Instructor</th>
                                    <th className="px-6 py-4 font-semibold text-foreground text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredCourses.length > 0 ? (
                                    filteredCourses.map((course) => (
                                        <tr key={course.id} className="hover:bg-muted/20 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-foreground">
                                                    {course.course_name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground">
                                                {course.teacher ? (
                                                    <span className="flex items-center gap-2">
                                                        <span className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                                                            {course.teacher.first_name[0]}{course.teacher.last_name[0]}
                                                        </span>
                                                        {course.teacher.first_name} {course.teacher.last_name}
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground/50 italic">Unassigned</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-40 border-border bg-popover">
                                                        <DropdownMenuItem className="cursor-pointer" onClick={() => setEditingCourse(course)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator className="bg-border" />
                                                        <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => {
                                                            if (confirm('Are you sure you want to permanently remove this course?')) {
                                                                const form = document.createElement('form');
                                                                form.method = 'POST';
                                                                form.action = `/courses/${course.id}`;
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
                                        <td colSpan={3} className="px-6 py-12 text-center text-muted-foreground">
                                            <div className="flex flex-col items-center justify-center space-y-3">
                                                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                                                    <Search className="h-5 w-5 text-muted-foreground/50" />
                                                </div>
                                                <p className="font-medium text-foreground">{search ? 'No courses found' : 'No courses registered'}</p>
                                                <p className="text-xs">{search ? 'Try adjusting your search query' : 'Add a new course to get started'}</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <Dialog 
                    open={isCreating || Boolean(editingCourse)} 
                    onOpenChange={(open) => {
                        if (!open) {
                            setIsCreating(false);
                            setEditingCourse(null);
                        }
                    }}
                >
                    <DialogContent className="sm:max-w-md border-border bg-popover">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-foreground">
                                {editingCourse ? 'Edit Course Details' : 'Add New Course'}
                            </DialogTitle>
                            <p className="text-sm text-muted-foreground">
                                {editingCourse ? 'Update the details for this course.' : 'Enter the details for the new course.'}
                            </p>
                        </DialogHeader>
                        <Form 
                            action={editingCourse ? `/courses/${editingCourse.id}` : '/courses'} 
                            method="post" 
                            className="space-y-4 py-2"
                        >
                            {editingCourse && <input type="hidden" name="_method" value="PUT" />}
                            <div className="grid gap-2">
                                <Label htmlFor="course_name" className="text-sm font-medium text-foreground">Course Name</Label>
                                <Input
                                    id="course_name"
                                    name="course_name"
                                    defaultValue={editingCourse?.course_name || ''}
                                    placeholder="Mathematics 101"
                                    required
                                    className="border-input focus-visible:ring-primary"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="teacher_id" className="text-sm font-medium text-foreground">Assigned Teacher</Label>
                                <select
                                    id="teacher_id"
                                    name="teacher_id"
                                    required
                                    defaultValue={editingCourse?.teacher_id || ''}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="" disabled>Select a teacher...</option>
                                    {teachers.map((teacher) => (
                                        <option key={teacher.id} value={teacher.id}>
                                            {teacher.first_name} {teacher.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <DialogFooter className="pt-4 sm:justify-between">
                                <DialogClose asChild>
                                    <Button variant="ghost" type="button" className="text-muted-foreground">Cancel</Button>
                                </DialogClose>
                                <Button
                                    type="submit"
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                                >
                                    {editingCourse ? 'Save Changes' : 'Create Course'}
                                </Button>
                            </DialogFooter>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
