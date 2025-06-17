import { getQuestionText } from "../utils/quizUtils";

const QuestionText = ({ question, quizType }) => {
  return (
    <h3 className="font-poke mb-6 text-center text-xl">
      {getQuestionText(question, quizType)}
    </h3>
  );
};

export default QuestionText;
