'use client';
import { cn } from '@/lib/utils';
import {
  ItineraryFormQuestion,
  ItineraryFormStep,
  ItineraryFormSubmitRequestBody,
} from '@/types/itinerary-form';
import { Formik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Instruction from './Instruction';
import { Button } from '@/components/ui/button';
import { MoveRight, MoveLeft, XIcon } from 'lucide-react';
import Step from './Step';
import ThankYouScreen from './ThankYouScreen';
import { submitFormResponse } from '@/services/form-response';
import { contactFormValidationSchema } from './ContactForm';
import { trackFormSubmitDevis } from '@/lib/tracking';
import {
  getDynamicNumberInputsIdentifier,
  getDefaultValueForQuestions,
} from '@/helpers/personalized-form';
import { useRouter } from 'next/navigation';
import Container from '@/components/Container';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Link from 'next/link';
import useReCaptcha from '@/hooks/useReCaptcha';
import { toast } from '@/hooks/use-toast';

export interface DisplayedQuestionsState {
  [key: string]: ItineraryFormQuestion[];
}

export interface InputErrorState {
  [key: number]: string[];
}

export interface ContactUser {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function PersonalizedItineraryForm({
  tourGuideLogo,
  backGroundImageUrl,
  steps,
  url,
  lang,
  emailTemplate,
  destinationName,
  emailForOdasieTemplateId,
}: {
  tourGuideLogo?: string;
  backGroundImageUrl?: string;
  destinationName?: string;
  steps: ItineraryFormStep[];
  url: string | undefined;
  lang: string;
  emailTemplate: {
    id: number;
    documentId: string;
  };
  emailForOdasieTemplateId: {
    id: number;
    documentId: string;
  };
}) {
  const { t } = useTranslation(['common']);
  const [displayQuestionMap, setDisplayQuestionMap] =
    useState<DisplayedQuestionsState>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState<InputErrorState>();
  const [openThankYou, setOpenThankYou] = useState(false);
  const [submittedSteps, setSubmittedSteps] = useState<Record<number, any>>({});
  const [initialValues, setInitialValues] = useState<Record<number, any>>({});
  const { executeReCaptcha } = useReCaptcha();

  const router = useRouter();
  const progressPercentage = (currentStep / steps.length) * 100;

  useEffect(() => {
    // Hide navigation bar and footer
    const header = document.getElementById('header-navigation-bar');
    header?.classList.add('hidden');
    const footer = document.getElementById('footer');
    footer?.classList.add('hidden');
    setInitialLoad(false);

    return () => {
      header?.classList.remove('hidden');
      footer?.classList.remove('hidden');
    };
  }, []);

  useEffect(() => {
    const step = steps?.[currentStep];
    if (!step) return;
    if (!displayQuestionMap[step.id]) {
      setDisplayQuestionMap(prev => ({
        ...prev,
        [step.id]: step.questions,
      }));
    }
    // Set initial values
    setInitialValues(getDefaultValueForQuestions(step.questions));
  }, [currentStep]);

  const onNext = useCallback(
    async (
      values: any,
      submitForm: () => void,
      validateForm: (values: any) => Promise<any>,
      contactUser: ContactUser | null,
    ) => {
      const step = steps?.[currentStep];
      if (!step) return;

      // Validate frontend form steps.
      await submitForm();
      const validation = await validateForm(values);
      if (Object.keys(validation).length > 0) {
        return;
      }

      // Skipping steps with no questions
      if (step?.questions.length === 0 && step?.type !== 'contactForm') {
        setSubmittedSteps(prev => ({
          ...prev,
          [currentStep]: step,
        }));
        setCurrentStep(currentStep + 1);
        return;
      }

      // Construct the request body object to validate the form on the backend side
      const requestBody: ItineraryFormSubmitRequestBody = {
        url: url || '/create-your-itinerary',
        locale: lang,
        emailTemplateId: emailTemplate.documentId,
        emailForOdasieTemplateId: emailForOdasieTemplateId.documentId,
        steps: [],
      };
      if (contactUser) {
        requestBody.user = contactUser;
      }

      setLoading(true);
      setError({});

      const validateStep = {
        id: step.id,
        questions: mapQuestions(step.questions, values),
      };

      submittedSteps[currentStep] = validateStep;

      // Get reCAPTCHA token before final submission
      if (currentStep === steps.length - 1) {
        const token = await executeReCaptcha('itinerary_form_submit');

        Object.values(submittedSteps).forEach((s: any) => {
          requestBody.steps.push(s);
        });

        // Add recaptcha token to the request
        if (token) {
          requestBody.recaptchaToken = token;
        } else {
          toast({
            variant: 'destructive',
            title: t('recaptcha.error.title'),
            description: t('recaptcha.error.description'),
          });
          return;
        }
      } else {
        requestBody.steps.push(validateStep);
      }

      const response = await submitFormResponse(requestBody);
      setLoading(false);

      // Handle validation errors
      if (response.error?.status) {
        const validationErrors: InputErrorState = {};
        const errorDetails = response.error.details?.errors as any[];
        errorDetails?.forEach((error: any) => {
          const errorStep = error?.steps;
          const questions = errorStep?.questions as any[];

          questions?.forEach((question: any) => {
            const inputs = question?.inputs as any[];
            processInputs(inputs || [], validationErrors);
          });
        });
        setError(validationErrors);

        return;
      }

      // Handle successful submission
      setSubmittedSteps((prev: any) => ({
        ...prev,
        [currentStep]: validateStep,
      }));
      setError({});

      if (currentStep === steps.length - 1) {
        const [firstName = '', lastName = ''] = (values?.name || '')
          .trim()
          .split(' ');

        // **Track Devis form submission**
        trackFormSubmitDevis(values.email, values.phone, firstName, lastName);
        setOpenThankYou(true);
        document
          .getElementById('header-navigation-bar')
          ?.classList.remove('hidden');
        document.getElementById('footer')?.classList.remove('hidden');

        return;
      }
      setCurrentStep(currentStep + 1);
    },
    [
      currentStep,
      steps,
      url,
      lang,
      emailTemplate,
      executeReCaptcha,
      t,
      submittedSteps,
      setSubmittedSteps,
      setCurrentStep,
      setLoading,
      setError,
      setOpenThankYou,
    ],
  );

  return (
    <div
      className={cn('relative h-[100vh] bg-cover bg-center')}
      style={{
        backgroundImage: `url(${encodeURI(backGroundImageUrl!)})`,
      }}>
      <div className="absolute bottom-0 left-0 right-0 top-0 backdrop-blur-sm"></div>
      {!openThankYou && (
        <div className="fixed left-0 top-0 h-[4px] w-full bg-gray-300">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      )}
      <div className="absolute h-[100%] w-full justify-items-center">
        {!openThankYou && (
          <>
            {!initialLoad && (
              <Container className="mx-auto flex w-full max-w-[1440px] items-center justify-between p-5">
                <Link href={`/${lang}`}>
                  <ImageWithFallback
                    alt="odasie logo"
                    width={124}
                    height={36}
                    src="/images/odasie-logo-white.svg"
                    className="w-auto"
                  />
                </Link>
                <div className="flex cursor-pointer gap-x-2 text-white">
                  <p className="typo-lg-regular max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap sm:max-w-none">
                    {destinationName}
                  </p>
                  <XIcon
                    onClick={() => {
                      router.back();
                    }}
                  />
                </div>
              </Container>
            )}
            <Formik
              validationSchema={
                steps?.[currentStep]?.type === 'contactForm'
                  ? contactFormValidationSchema(t)
                  : undefined
              }
              initialValues={initialValues}
              enableReinitialize
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              onSubmit={(_values: any) => {
                //
              }}>
              {({
                values,
                setFieldValue,
                handleChange,
                touched,
                errors: formErrors,
                submitForm,
                validateForm,
              }) => {
                const step = steps?.[currentStep];

                return (
                  <div className="mx-auto w-full max-w-[640px] px-2">
                    {tourGuideLogo && (
                      <div className="m-auto mb-3 h-[96px] w-[96px]">
                        <ImageWithFallback
                          alt="tour guide logo"
                          width={96}
                          height={96}
                          src={tourGuideLogo}
                          className="h-full w-full rounded-full border-2 border-white"
                        />
                      </div>
                    )}
                    {step?.instruction?.content && (
                      <Instruction
                        key={`instruction-${step.instruction.id}`}
                        title={step.instruction.title}
                        description={step.instruction.content}
                      />
                    )}
                    {step && !step?.instruction?.content && (
                      <Step
                        step={step}
                        values={values}
                        setFieldValue={setFieldValue}
                        displayQuestionMap={displayQuestionMap}
                        setDisplayQuestionMap={setDisplayQuestionMap}
                        loading={loading}
                        errors={{
                          ...error,
                          ...formErrors,
                        }}
                        handleChange={handleChange}
                        touched={touched}
                        t={t}
                      />
                    )}

                    <NavigationButtons
                      onBack={() => {
                        setError({});
                        setCurrentStep(currentStep - 1);
                      }}
                      onNext={() =>
                        onNext(
                          values,
                          submitForm,
                          validateForm,
                          step.type === 'contactForm'
                            ? {
                                name: values.name,
                                email: values.email,
                                phone: values.phone,
                                message: values.message,
                              }
                            : null,
                        )
                      }
                      currentStep={currentStep}
                      disableBack={currentStep === 0}
                      totalSteps={steps.length}
                    />
                  </div>
                );
              }}
            </Formik>
          </>
        )}
      </div>
      {openThankYou && <ThankYouScreen />}
    </div>
  );
}

function NavigationButtons({
  onBack,
  onNext,
  currentStep,
  totalSteps,
  disableBack,
}: {
  onBack: () => void;
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
  disableBack?: boolean;
}) {
  return (
    <div className="absolute bottom-10 left-0 mt-5 flex w-full justify-center">
      <div className="flex w-[200px] max-w-[100%] justify-around">
        {!disableBack && (
          <Button
            variant="ghost"
            size="xl"
            onClick={onBack}
            disabled={disableBack}>
            <MoveLeft color="white" aria-hidden />
          </Button>
        )}
        <Button
          size="xl"
          onClick={onNext}
          disabled={currentStep === totalSteps}>
          <MoveRight aria-hidden />
        </Button>
      </div>
    </div>
  );
}

function mapInputs(inputs: any, values: any) {
  return inputs.map((input: any) => {
    const selectedValue = values?.[input.id];

    const filteredAnswers = input.answers.filter(
      (answer: any) => answer.value === selectedValue,
    );
    // Handle dynamic inputs
    if (input.dynamicInput) {
      const dynamicInputs = [];
      for (let i = 0; i < selectedValue; i++) {
        const value =
          values?.[
            getDynamicNumberInputsIdentifier(input.id, input.dynamicInput.id, i)
          ];
        const answers = input.dynamicInput.answers.filter(
          (answer: any) => answer.value === selectedValue,
        );
        dynamicInputs.push({
          ...input.dynamicInput,
          value,
          answers,
        });
      }
      input.dynamicInputs = dynamicInputs;
    }

    return {
      ...input,
      value: selectedValue,
      answers: filteredAnswers.map((answer: any) => ({
        ...answer,
        children:
          answer.children?.length > 0
            ? mapQuestions(answer.children, values)
            : [],
      })),
    };
  });
}

function mapQuestions(questions: any, values: any) {
  return questions.map((question: any) => ({
    ...question,
    inputs: mapInputs(question.inputs, values),
  }));
}

function processInputs(inputs: any[], validationErrors: InputErrorState) {
  inputs?.forEach((input: any) => {
    const inputErrors = input?.errors as any[];
    const errorMessages = [] as any[];
    inputErrors.forEach(inputError => {
      const messages = Object.values(inputError);
      errorMessages.push(...messages);
    });
    validationErrors[input.id] = errorMessages;
    // @ts-expect-error TODO: Define type later
    input.answers.forEach(answer => {
      // Recursively process nested inputs within the answer
      const inputs: any[] = [];
      answer?.children?.forEach((childAnswer: any) => {
        inputs.push(...childAnswer.inputs);
      });

      if (inputs.length > 0) {
        processInputs(inputs, validationErrors);
      }
    });
  });
}
