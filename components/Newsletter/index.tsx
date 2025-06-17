'use client';

import { useState } from 'react';
import { trackFormSubmitNewsletter } from '@/lib/tracking';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { appConfig } from '../../configs';
import { useReCaptcha } from '@/hooks/useReCaptcha';

//TODO: translation
export default function Newsletter({
  className,
  emailTemplateId,
}: {
  className?: string;
  emailTemplateId?: string;
}) {
  const [email, setEmail] = useState('');
  const { t } = useTranslation(['common']);
  const { toast } = useToast();
  const { executeReCaptcha } = useReCaptcha();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    const token = await executeReCaptcha('newsletter_form_submit');

    if (!token) {
      toast({
        variant: 'destructive',
        title: t('recaptcha.error.title'),
        description: t('recaptcha.error.description'),
      });
      return;
    }

    try {
      const res = await fetch(
        `${appConfig.apiUrl}/api/newsletter-subscribers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${appConfig.apiToken}`,
          },
          body: JSON.stringify({
            data: { email },
            emailTemplateId,
            recaptchaToken: token,
          }),
        },
      );

      if (res.ok) {
        trackFormSubmitNewsletter(email);
        setEmail('');

        toast({
          title: t('message.success.title', 'Subscription successful'),
          description: t(
            'message.success.description',
            'You have been subscribed to the newsletter.',
          ),
          variant: 'success',
        });
      } else {
        throw new Error();
      }
    } catch {
      toast({
        title: t('message.error.title', 'Something went wrong'),
        description: t(
          'message.error.description',
          'We could not subscribe you. Please try again.',
        ),
        variant: 'destructive',
      });
    }
  };

  return (
    <div className={cn('mx-auto w-full max-w-lg rounded-l', className)}>
      <form
        onSubmit={handleSubmit}
        className="flex h-10 w-full overflow-hidden rounded-xs border border-gray-300">
        <input
          type="email"
          placeholder={t('newsletter.placeholder', 'Your email address')}
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="flex-1 bg-white px-4 py-3 text-gray-700 placeholder-gray-600 focus:outline-none"
        />
        <button
          type="submit"
          className="flex w-14 items-center justify-center bg-yellow-400 transition hover:bg-yellow-500">
          <Send size={20} color="black" />
        </button>
      </form>
    </div>
  );
}
