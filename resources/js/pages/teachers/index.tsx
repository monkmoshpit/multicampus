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
    email: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Classroom', href: '/teachers' },
    { title: 'Teachers', href: '/teachers' },
];

export default function Teachers({ teachers }: { teachers: Teacher[] }) {
    const { flash } = usePage().props as any;
    const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [search, setSearch] = useState('');

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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Teachers" />

            <div className="space-y-6 p-6 md:p-10 max-w-7xl mx-auto">
                {flash?.success && (
                    <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/10 px-4 py-4 text-primary font-medium animate-in fade-in slide-in-from-top-2">
                        <div className="flex-1">{flash.success}</div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <header className="flex flex-col gap-1">
                        <h1 className="text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Teachers
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            Manage your academic staff and their contact information.
                        </p>
                    </header>
                    <Button
                        onClick={() => setIsCreating(true)}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Teacher
                    </Button>
                </div>

                <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between gap-4">
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search teachers..."
                                className="pl-9 bg-background border-input w-full"
                            />
                        </div>
                        <div className="text-sm text-muted-foreground font-medium">
                            {filteredTeachers.length} record{filteredTeachers.length !== 1 ? 's' : ''}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase bg-muted/40 text-muted-foreground border-b border-border">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-foreground">Name</th>
                                    <th className="px-6 py-4 font-semibold text-foreground">Email Directory</th>
                                    <th className="px-6 py-4 font-semibold text-foreground text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredTeachers.length > 0 ? (
                                    filteredTeachers.map((teacher) => (
                                        <tr key={teacher.id} className="hover:bg-muted/20 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-foreground">
                                                    {teacher.first_name} {teacher.last_name}
                                                </div>
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
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator className="bg-border" />
                                                        <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => {
                                                            if (confirm('Are you sure you want to permanently remove this teacher?')) {
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
                                                <p className="font-medium text-foreground">{search ? 'No teachers found' : 'No teachers registered'}</p>
                                                <p className="text-xs">{search ? 'Try adjusting your search query' : 'Add a new teacher to get started'}</p>
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
                                {editingTeacher ? 'Edit Teacher Directory' : 'Add New Teacher'}
                            </DialogTitle>
                            <p className="text-sm text-muted-foreground">
                                {editingTeacher ? 'Update the details for this staff member.' : 'Enter the details for the new staff member.'}
                            </p>
                        </DialogHeader>
                        <Form 
                            action={editingTeacher ? `/teachers/${editingTeacher.id}` : '/teachers'} 
                            method="post" 
                            className="space-y-4 py-2"
                        >
                            {editingTeacher && <input type="hidden" name="_method" value="PUT" />}
                            <div className="grid gap-2">
                                <Label htmlFor="first_name" className="text-sm font-medium text-foreground">First Name</Label>
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    defaultValue={editingTeacher?.first_name || ''}
                                    placeholder="Jane"
                                    required
                                    className="border-input focus-visible:ring-primary"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last_name" className="text-sm font-medium text-foreground">Last Name</Label>
                                <Input
                                    id="last_name"
                                    name="last_name"
                                    defaultValue={editingTeacher?.last_name || ''}
                                    placeholder="Doe"
                                    required
                                    className="border-input focus-visible:ring-primary"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    defaultValue={editingTeacher?.email || ''}
                                    placeholder="jane.doe@institution.edu"
                                    required
                                    className="border-input focus-visible:ring-primary"
                                />
                            </div>
                            <DialogFooter className="pt-4 sm:justify-between">
                                <DialogClose asChild>
                                    <Button variant="ghost" type="button" className="text-muted-foreground">Cancel</Button>
                                </DialogClose>
                                <Button
                                    type="submit"
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                                >
                                    {editingTeacher ? 'Save Changes' : 'Create Teacher'}
                                </Button>
                            </DialogFooter>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
