import { getQuestionText } from "../utils/quizUtils";

const QuestionText = ({ question, quizType }) => {
  return (
    <h3 className="mb-6 text-center text-xl font-bold">
      {getQuestionText(question, quizType)}
    </h3>
  );
};

export default QuestionText;
