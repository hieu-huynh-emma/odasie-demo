import TextArea from '@/components/Form/TextArea';
import { TextField } from '@/components/Form/TextField';
import * as Yup from 'yup';
import { TFunction } from 'i18next';

export const contactFormValidationSchema = (t: TFunction<string[], string>) =>
  Yup.object({
    name: Yup.string().required(t('common.form.name_required')),
    phone: Yup.string().required(t('common.form.phone_requred')),
    email: Yup.string()
      .email(t('common.form.invalid_email'))
      .required(t('common.form.email_required')),
    message: Yup.string().required(t('common.form.message_required')),
  });

export default function ContactForm({
  values,
  handleChange,
  errors,
  setFieldValue,
  t,
}: {
  values: any;
  handleChange: (event: React.ChangeEvent<any>) => void;
  errors: any;
  touched: any;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  t: TFunction<string[], string>;
}) {
  return (
    <div className="grid w-full grid-cols-12 gap-8 p-2 pb-5">
      <div className="col-span-12">
        <h3 className="typo-xl-semibold">{t('common.form.title')}</h3>
      </div>
      <div className="col-span-12">
        <TextField
          value={values.name || ''}
          onChange={handleChange}
          label={t('common.form.your_name')}
          name="name"
          placeholder={`${t('common.form.your_name')}*`}
          errors={errors.name ? [errors.name] : []}
          shouldShowError={false}
          required
        />
      </div>
      <div className="col-span-6">
        <TextField
          value={values.phone || ''}
          onChange={handleChange}
          label={t('common.form.your_phone')}
          name="phone"
          placeholder={`${t('common.form.your_phone')}*`}
          errors={errors.phone ? [errors.phone] : []}
          shouldShowError={false}
          required
        />
      </div>
      <div className="col-span-6">
        <TextField
          value={values.email || ''}
          onChange={handleChange}
          label={t('common.form.your_email_address')}
          name="email"
          placeholder={`${t('common.form.your_email_address')}*`}
          errors={errors.email ? [errors.email] : []}
          shouldShowError={false}
          required
        />
      </div>
      <div className="col-span-12">
        <TextArea
          value={values.message || ''}
          onChange={values => setFieldValue('message', values)}
          label={t('common.form.your_message')}
          name="message"
          placeholder={t('common.form.your_message')}
          errors={errors.message ? [errors.message] : []}
          required
          shouldShowError={false}
        />
      </div>
    </div>
  );
}
