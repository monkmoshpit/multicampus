import { Form, Head, usePage } from '@inertiajs/react';
import { Building2, School, MapPin, Users, Mail, Phone, Edit, Save } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type Tenant = {
    id: string;
    school_name?: string;
    address?: string;
    registration_id?: string;
    domain?: string;
    official_email?: string;
    support_line?: string;
};

export default function InstitutionData({ tenant, stats }: { tenant: Tenant | null, stats: { students?: number; teachers?: number; courses?: number } | null }) {
 const { t } = useTranslation();
 const { flash } = usePage().props as { flash?: { success?: string } };
 const [isEditing, setIsEditing] = useState(false);
 const breadcrumbs: BreadcrumbItem[] = [
  { title: t('institution_label'), href: '/institution' },
  { title: t('school_data'), href: '/institution' },
 ];

 return (
 <AppLayout breadcrumbs={breadcrumbs}>
 <Head title={t('institution_data')} />

 <div className="space-y-6 p-6 md:p-10 max-w-7xl mx-auto">
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
   <header className="flex flex-col gap-1">
    <h1 className="text-3xl font-bold text-primary">
     {t('institution_data')}
    </h1>
    <p className="text-muted-foreground text-sm">
     {t('institution_data_desc')}
    </p>
   </header>
   <Button
    onClick={() => setIsEditing(true)}
    variant="default"
    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all"
   >
    <Edit className="mr-2 h-4 w-4" />
    {t('edit_institution')}
   </Button>
  </div>

  {flash?.success && (
  <div className="flex items-center gap-3 border border-primary/20 bg-primary/10 px-4 py-4 text-primary font-medium animate-in fade-in slide-in-from-top-2">
  <div className="flex-1">{flash.success}</div>
  </div>
  )}

 <div className="grid gap-6 md:grid-cols-3">
 {/* Main Institution Card */}
 <div className="md:col-span-2 border border-border bg-card text-card-foreground shadow-sm overflow-hidden">
 <div className="p-6 border-b border-border bg-muted/20 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
 <div className="h-20 w-20 bg-primary/10 text-primary flex flex-shrink-0 items-center justify-center">
 <School className="h-10 w-10" />
 </div>
  <div>
  <h2 className="text-2xl font-bold text-foreground">
  {tenant?.school_name || t('unspecified')}
  </h2>
  <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
  <MapPin className="h-4 w-4" />
  {tenant?.address || t('unspecified')}
  </p>
  </div>
 </div>

 <div className="p-6 grid gap-6 sm:grid-cols-2">
 <div className="space-y-2">
  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
  <Building2 className="h-4 w-4" /> {t('registration_id')}
  </h3>
  <p className="font-medium text-foreground bg-muted/30 p-3 border border-border/50">
  {tenant?.registration_id || t('unspecified')}
  </p>
  </div>
  <div className="space-y-2">
  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
  <span className="h-4 w-4 flex items-center justify-center border-2 border-muted-foreground rounded-full text-[10px] font-bold">@</span>
  {t('institution_domain')}
  </h3>
  <p className="font-medium text-foreground bg-muted/30 p-3 border border-border/50">
  {tenant?.domain || t('unspecified')}
  </p>
  </div>
 <div className="space-y-2">
  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
  <Mail className="h-4 w-4" /> {t('official_email')}
  </h3>
  <p className="font-medium text-foreground bg-muted/30 p-3 border border-border/50">
  {tenant?.official_email || t('unspecified')}
  </p>
  </div>
  <div className="space-y-2">
  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
  <Phone className="h-4 w-4" /> {t('support_line')}
  </h3>
  <p className="font-medium text-foreground bg-muted/30 p-3 border border-border/50">
  {tenant?.support_line || t('unspecified')}
  </p>
  </div>
 </div>
 </div>

 {/* Stats Summary Card */}
 <div className=" border border-border bg-card text-card-foreground shadow-sm flex flex-col">
 <div className="p-4 border-b border-border bg-primary/5">
 <h3 className="font-semibold text-foreground flex items-center gap-2">
 <Users className="h-4 w-4 text-primary" />
 {t('institution_overview')}
 </h3>
 </div>
 <div className="p-4 flex-1 flex flex-col gap-3">
 <div className="flex items-center justify-between p-3 bg-muted/30 border border-border/50">
 <span className="text-sm text-muted-foreground font-medium">{t('enrolled_students')}</span>
 <span className="text-xl font-bold text-foreground">{stats?.students || 0}</span>
 </div>
 <div className="flex items-center justify-between p-3 bg-muted/30 border border-border/50">
 <span className="text-sm text-muted-foreground font-medium">{t('active_teachers')}</span>
 <span className="text-xl font-bold text-foreground">{stats?.teachers || 0}</span>
 </div>
 <div className="flex items-center justify-between p-3 bg-muted/30 border border-border/50">
 <span className="text-sm text-muted-foreground font-medium">{t('offered_courses')}</span>
 <span className="text-xl font-bold text-foreground">{stats?.courses || 0}</span>
 </div>
 <div className="mt-auto pt-4 border-t border-border">
 <p className="text-xs text-muted-foreground text-center">
 {t('data_synced_real_time')}
 </p>
 </div>
 </div>
 </div>
  </div>
  </div>

  <Dialog open={isEditing} onOpenChange={setIsEditing}>
  <DialogContent className="sm:max-w-xl border-border bg-popover">
  <DialogHeader>
  <DialogTitle className="text-xl font-bold text-foreground">
  {t('edit_institution')}
  </DialogTitle>
  <p className="text-sm text-muted-foreground">
  {t('edit_institution_desc')}
  </p>
  </DialogHeader>
  
  <Form 
  action="/institution" 
  method="put" 
  className="space-y-4 py-2"
  onSuccess={() => setIsEditing(false)}
  >
  {({ errors, processing }) => (
  <>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="grid gap-2">
  <Label htmlFor="school_name" className="text-sm font-medium text-foreground">{t('school_name')}</Label>
  <Input
  id="school_name"
  name="school_name"
  defaultValue={tenant?.school_name || ''}
  placeholder="Harvard University"
  required
  className="border-input focus-visible:ring-primary"
  />
  <InputError message={errors.school_name} />
  </div>
  <div className="grid gap-2">
  <Label htmlFor="registration_id" className="text-sm font-medium text-foreground">{t('registration_id')}</Label>
  <Input
  id="registration_id"
  name="registration_id"
  defaultValue={tenant?.registration_id || ''}
  placeholder="REG-123456"
  className="border-input focus-visible:ring-primary"
  />
  <InputError message={errors.registration_id} />
  </div>
  </div>

  <div className="grid gap-2">
  <Label htmlFor="address" className="text-sm font-medium text-foreground">{t('address')}</Label>
  <Input
  id="address"
  name="address"
  defaultValue={tenant?.address || ''}
  placeholder="123 Education St, Knowledge City"
  className="border-input focus-visible:ring-primary"
  />
  <InputError message={errors.address} />
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="grid gap-2">
  <Label htmlFor="domain" className="text-sm font-medium text-foreground">{t('institution_domain')}</Label>
  <Input
  id="domain"
  name="domain"
  defaultValue={tenant?.domain || ''}
  placeholder="school.edu"
  className="border-input focus-visible:ring-primary"
  />
  <InputError message={errors.domain} />
  </div>
  <div className="grid gap-2">
  <Label htmlFor="official_email" className="text-sm font-medium text-foreground">{t('official_email')}</Label>
  <Input
  id="official_email"
  name="official_email"
  type="email"
  defaultValue={tenant?.official_email || ''}
  placeholder="contact@school.edu"
  className="border-input focus-visible:ring-primary"
  />
  <InputError message={errors.official_email} />
  </div>
  </div>

  <div className="grid gap-2">
  <Label htmlFor="support_line" className="text-sm font-medium text-foreground">{t('support_line')}</Label>
  <Input
  id="support_line"
  name="support_line"
  defaultValue={tenant?.support_line || ''}
  placeholder="+1 (555) 000-0000"
  className="border-input focus-visible:ring-primary"
  />
  <InputError message={errors.support_line} />
  </div>

  <DialogFooter className="pt-4 sm:justify-between">
  <DialogClose asChild>
  <Button variant="ghost" type="button" className="text-muted-foreground" disabled={processing}>{t('cancel')}</Button>
  </DialogClose>
  <Button
  type="submit"
  className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
  disabled={processing}
  >
  <Save className="mr-2 h-4 w-4" />
  {t('save_changes')}
  </Button>
  </DialogFooter>
  </>
  )}
  </Form>
  </DialogContent>
  </Dialog>
 </AppLayout>
 );
}
