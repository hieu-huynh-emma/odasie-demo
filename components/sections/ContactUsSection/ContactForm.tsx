'use client';
import { TextField } from '@/components/Form/TextField';
import TextArea from '@/components/Form/TextArea';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { ContactUsFormSubmitBody } from '@/types/contact';
import { ContactUsSection } from '@/types';
import { submitContactForm } from '@/services/contact';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { trackFormSubmitContact } from '@/lib/tracking';
import useReCaptcha from '@/hooks/useReCaptcha';

const validationSchema = (t: TFunction<string[], string>) =>
  Yup.object().shape({
    topic: Yup.string().required(t('common.form.required')),
    name: Yup.string().required(t('common.form.required')),
    email: Yup.string()
      .email(t('common.form.invalid_email'))
      .required(t('common.form.required')),
    message: Yup.string()
      .min(20, t('common.form.min_charaters', { min: 20 }))
      .required(t('common.form.required')),
  });

export default function ContactForm({
  section,
  lang,
}: {
  section: ContactUsSection;
  lang: string;
}) {
  const { toast } = useToast();
  const formRef = useRef(null);
  const { t } = useTranslation(['common']);
  const { executeReCaptcha } = useReCaptcha();

  return (
    <div className="rounded-sm bg-white py-8 lg:rounded-md">
      <Formik
        innerRef={formRef}
        initialValues={{
          topic: section.topics?.[0]?.value,
          name: '',
          email: '',
          message: '',
        }}
        validationSchema={validationSchema(t)}
        enableReinitialize
        onSubmit={async values => {
          // Execute reCAPTCHA v3
          const token = await executeReCaptcha('contact_form_submit');

          if (!token) {
            toast({
              variant: 'destructive',
              title: t('recaptcha.error.title'),
              description: t('recaptcha.error.description'),
            });
            return;
          }

          const body: ContactUsFormSubmitBody = {
            locale: lang,
            emailTemplateId: section.emailTemplate?.documentId || null,
            emailTemplateForOdasieId:
              section.emailTemplateForOdasie?.documentId || null,
            data: values,
            recaptchaToken: token,
          };
          const response = await submitContactForm(body);
          if (response.error) {
            toast({
              variant: 'destructive',
              title: t('message.error.title'),
              description: t('message.error.description'),
              action: (
                <ToastAction
                  altText="retry"
                  onClick={() => {
                    if (formRef.current) {
                      (formRef.current as FormikProps<any>).submitForm();
                    }
                  }}>
                  <RotateCcw />
                </ToastAction>
              ),
            });
            return;
          }
          toast({
            title: t('message.success.title'),
            variant: 'success',
            description: t('message.success.description'),
          });
          const [firstName = '', lastName = ''] = (values?.name || '')
            .trim()
            .split(' ');
          trackFormSubmitContact(
            values.email,
            firstName,
            lastName,
            values?.topic,
          );

          if (formRef.current) {
            (formRef.current as FormikProps<any>).resetForm();
          }
        }}>
        {({
          errors,
          touched,
          values,
          handleChange,
          setFieldValue,
          submitForm,
        }) => {
          return (
            <div className="flex max-h-[556px] w-full flex-col gap-y-5 overflow-y-auto px-6">
              <h3 className="typo-xl-bold">{section.formTitle}</h3>
              <div>
                <ToggleGroup
                  className="flex max-w-full flex-wrap justify-start gap-2"
                  value={values.topic}
                  onValueChange={value => {
                    setFieldValue('topic', value);
                  }}
                  type="single">
                  {section.topics.map(topic => (
                    <ToggleGroupItem
                      key={topic.value}
                      className="min-w-[90px]"
                      value={topic.value}
                      aria-label="Toggle bold">
                      {topic.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
              <TextField
                name="name"
                placeholder={`${t('common.form.name')}*`}
                className=""
                onChange={handleChange}
                value={values.name}
                errors={errors.name && touched.name ? [errors.name] : []}
              />
              <TextField
                name="email"
                placeholder={`${t('common.form.email')}*`}
                className=""
                onChange={handleChange}
                value={values.email}
                errors={errors.email && touched.email ? [errors.email] : []}
              />
              <TextArea
                name="message"
                placeholder={`${t('common.form.message')}*`}
                className=""
                onChange={value => setFieldValue('message', value)}
                value={values.message}
                errors={
                  errors.message && touched.message ? [errors.message] : []
                }
              />

              <Button className="w-fit" onClick={submitForm} type="submit">
                {t('common.form.send_message')}
              </Button>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}
