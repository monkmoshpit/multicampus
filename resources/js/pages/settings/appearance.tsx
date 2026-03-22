import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import AppearanceTabs from '@/components/appearance-tabs';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit as editAppearance } from '@/routes/appearance';
import type { BreadcrumbItem } from '@/types';

export default function Appearance() {
 const { t } = useTranslation();
 const breadcrumbs: BreadcrumbItem[] = [
  {
  title: t('appearance_settings'),
  href: editAppearance().url,
  },
 ];

 return (
 <AppLayout breadcrumbs={breadcrumbs}>
 <Head title={t('appearance_settings')} />

 <h1 className="sr-only">{t('appearance_settings')}</h1>

 <SettingsLayout>
 <div className="space-y-6">
 <Heading
 variant="small"
 title={t('appearance_settings')}
 description={t('appearance_settings_desc')}
 />
 <AppearanceTabs />
 </div>
 </SettingsLayout>
 </AppLayout>
 );
}
