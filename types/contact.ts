export type Topic = {
  id: number;
  label: string;
  value: string;
};

export type ContactUsFormSubmitBody = {
  locale: string;
  emailTemplateId: string | null;
  emailTemplateForOdasieId: string | null;
  data: {
    topic: string;
    name: string;
    message: string;
    email: string;
  };
  recaptchaToken?: string | null;
};
