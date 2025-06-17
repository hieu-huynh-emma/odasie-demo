import { ItineraryFormStep } from '@/types/itinerary-form';
import ContactForm from './ContactForm';
import { DisplayedQuestionsState, InputErrorState } from '.';
import { Spinner } from '@/components/ui/spinner';
import { Info } from 'lucide-react';
import { TFunction } from 'i18next';
import InputComponent from './InputComponent';
import {
  findAllChildrenIdOfQuestion,
  getDefaultValueForQuestions,
} from '@/helpers/personalized-form';

export default function Step({
  step,
  values,
  setFieldValue,
  displayQuestionMap,
  setDisplayQuestionMap,
  loading,
  errors,
  handleChange,
  touched,
  t,
}: {
  step: ItineraryFormStep;
  values: any;
  handleChange: (event: React.ChangeEvent<any>) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  displayQuestionMap?: DisplayedQuestionsState;
  setDisplayQuestionMap: (
    value: React.SetStateAction<DisplayedQuestionsState>,
  ) => void;
  loading?: boolean;
  errors?: InputErrorState;
  touched: any;
  t: TFunction<string[], string>;
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center py-2">
      <div className="relative w-full max-w-xl rounded-2xl bg-white px-5 py-4 shadow-xl lg:px-10 lg:py-8">
        <div className="absolute left-8 top-[-22px] z-0 h-0 w-0 border-b-[22px] border-l-[38px] border-r-[0px] border-b-white border-l-transparent border-r-transparent" />
        <div className="scrollbar-hide relative z-10 max-h-[calc(100vh-360px)] overflow-y-auto">
          {step.type === 'step' && step?.questions.length > 0 ? (
            <div>
              {errors && Object.keys(errors).length > 0 && (
                <div className="mb-3 flex gap-x-4 rounded-[12px] border-[1px] border-error-300 bg-error-50 p-4">
                  <Info className="h-5 w-5 text-error-500" />
                  <p className="text-sm font-bold text-error-500">
                    {t('common.error_msg')}
                  </p>
                </div>
              )}
              {displayQuestionMap?.[step.id]?.map(question => {
                return (
                  <div key={question.id} className="mb-5">
                    {question.question && (
                      <h3 className="mb-4 text-xl font-semibold text-gray-900">
                        {question.question}
                      </h3>
                    )}
                    {question.description && (
                      <p className="mb-4 text-base text-gray-700">
                        {question.description}
                      </p>
                    )}
                    {question.image && (
                      <img
                        src={question.image}
                        className="mb-4 max-h-[200px] w-full rounded-sm object-cover lg:rounded-md"
                      />
                    )}
                    <div className="flex flex-col gap-4">
                      {question.inputs.map(input => (
                        <InputComponent
                          key={input.name}
                          input={input}
                          value={values?.[input.id]}
                          values={values}
                          error={errors?.[input.id] || []}
                          setFieldValue={setFieldValue}
                          onChange={(value: any) => {
                            setFieldValue(input.id + '', value);

                            const answer = input.answers?.find(
                              answer => answer.value === value,
                            );
                            let displayQuestions =
                              displayQuestionMap?.[step.id];

                            // Pop all question that is children of current question:
                            const childrenIds = findAllChildrenIdOfQuestion(
                              question.id,
                              displayQuestions,
                            );
                            displayQuestions = displayQuestions.filter(
                              question => !childrenIds.includes(question.id),
                            );

                            // Add children questions to current step if any.
                            if (answer?.children) {
                              const childrenQuestions = answer.children.map(
                                child => ({
                                  ...child,
                                  parentQuestionId: question.id,
                                }),
                              );
                              setDisplayQuestionMap(prev => {
                                return {
                                  ...prev,
                                  [step.id]: [
                                    ...displayQuestions,
                                    ...childrenQuestions,
                                  ],
                                };
                              });
                              // Set initial values for the children questions
                              const initialValues =
                                getDefaultValueForQuestions(childrenQuestions);
                              // Loop through keys
                              Object.keys(initialValues).forEach(
                                (inputId: string) => {
                                  setFieldValue(
                                    inputId,
                                    initialValues[+inputId],
                                  );
                                },
                              );
                            }
                          }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
              {loading && <Loading />}
            </div>
          ) : step.type === 'contactForm' ? (
            <div>
              {errors && Object.keys(errors).length > 0 && (
                <div className="mb-3 flex gap-x-4 rounded-[12px] border-[1px] border-error-300 bg-error-50 p-4">
                  <Info className="h-5 w-5 text-error-500" />
                  <p className="text-sm font-bold text-error-500">
                    {t('common.error_msg')}
                  </p>
                </div>
              )}
              <ContactForm
                touched={touched}
                values={values}
                errors={errors}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                t={t}
              />
              {loading && <Loading />}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white bg-opacity-80">
      <Spinner size="large" />
    </div>
  );
}
