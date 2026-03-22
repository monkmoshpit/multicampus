import { Form, Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
 const { t } = useTranslation();

 return (
 <AuthLayout
 title={t('create_your_account')}
 description={t('get_started_today')}
 >
 <Head title={t('register')} />
 <Form
 {...store.form()}
 resetOnSuccess={['password', 'password_confirmation']}
 disableWhileProcessing
 className="flex flex-col gap-6"
 >
 {({ processing, errors }) => (
 <>
 <div className="grid gap-6">
 <div className="grid gap-2">
 <Label htmlFor="name">{t('full_name')}</Label>
 <Input
 id="name"
 type="text"
 required
 autoFocus
 tabIndex={1}
 autoComplete="name"
 name="name"
 placeholder={t('full_name')}
 />
 <InputError
 message={errors.name}
 className="mt-2"
 />
 </div>

 <div className="grid gap-2">
 <Label htmlFor="school_name">{t('school_name')}</Label>
 <Input
 id="school_name"
 type="text"
 required
 tabIndex={2}
 name="school_name"
 placeholder={t('school_name_placeholder')}
 />
 <InputError message={errors.school_name} />
 </div>

 <div className="grid gap-2">
 <Label htmlFor="email">{t('email_address_label')}</Label>
 <Input
 id="email"
 type="email"
 required
 tabIndex={3}
 autoComplete="email"
 name="email"
 placeholder="email@example.com"
 />
 <InputError message={errors.email} />
 </div>

 <div className="grid gap-2">
 <Label htmlFor="password">{t('password')}</Label>
 <Input
 id="password"
 type="password"
 required
 tabIndex={3}
 autoComplete="new-password"
 name="password"
 placeholder={t('password_placeholder')}
 />
 <InputError message={errors.password} />
 </div>

 <div className="grid gap-2">
 <Label htmlFor="password_confirmation">
 {t('confirm_password')}
 </Label>
 <Input
 id="password_confirmation"
 type="password"
 required
 tabIndex={4}
 autoComplete="new-password"
 name="password_confirmation"
 placeholder={t('confirm_password_placeholder')}
 />
 <InputError
 message={errors.password_confirmation}
 />
 </div>

 <Button
 type="submit"
 className="mt-2 w-full"
 tabIndex={5}
 data-test="register-user-button"
 >
 {processing && <Spinner />}
 {t('create_account')}
 </Button>
 </div>

 <div className="text-center text-sm text-muted-foreground">
 {t('already_have_account')}{' '}
 <TextLink href={login()} tabIndex={6}>
 {t('log_in_link')}
 </TextLink>
 </div>
 </>
 )}
 </Form>
 </AuthLayout>
 );
}
