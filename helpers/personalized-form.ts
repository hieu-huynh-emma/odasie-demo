import { ItineraryFormQuestion } from '@/types/itinerary-form';

export function findAllChildrenIdOfQuestion(
  questionId: number,
  allQuestions: ItineraryFormQuestion[],
): number[] {
  const childrenIds: number[] = [];
  const findChildren = (questionId: number) => {
    const children = allQuestions.filter(
      q => q.parentQuestionId === questionId,
    );
    if (!children || children.length == 0) return;

    children.forEach(child => {
      childrenIds.push(child.id);
      findChildren(child.id);
    });
  };
  findChildren(questionId);

  return childrenIds;
}

export function getDefaultValueForQuestions(
  questions: ItineraryFormQuestion[],
): Record<number, any> {
  const initialValues: Record<number, any> = {};
  questions.forEach(question => {
    question.inputs.forEach(input => {
      if (input.type === 'number' || input.type === 'dynamic') {
        initialValues[input.id] = input.validation?.min || 0;
      }
      if (input.type === 'range-slider') {
        initialValues[input.id] = [
          input.validation?.min || 0,
          input.validation?.max || 0,
        ];
      }
    });
  });

  return initialValues;
}

export function getDynamicNumberInputsIdentifier(
  inputId: number,
  dynamicInputId: number,
  index: number,
) {
  return `${inputId}-${dynamicInputId}-${index}`;
}
