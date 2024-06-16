import { useState } from 'react';
import './Quiz.css';

const dataInitialQuestions = [
  {
    id: 1,
    value: 'Question 1',
    question: 'Question 1?',
    answer: null,
  },
  {
    id: 2,
    value: 'Question 2',
    question: 'Question 2?',
    answer: null,
  },
  {
    id: 3,
    value: 'Question 3',
    question: 'Question 3?',
    answer: null,
  },
  {
    id: 4,
    value: 'Question 4',
    question: 'Question 4?',
    answer: null,
  },
  {
    id: 5,
    value: 'Question 5',
    question: 'Question 5?',
    answer: null,
  },
  {
    id: 6,
    value: 'Question 6',
    question: 'Question 6?',
    answer: null,
  },
];

const Quiz = () => {
  const [dataQuestions, setDataQuestions] = useState(dataInitialQuestions);
  const [questionSelected, setQuestionSelected] = useState(1);
  const [error, setError] = useState(null);

  const handleAnswerChange = (id, answer) => {
    const updatedQuestions = dataQuestions.map(question =>
      question.id === id ? { ...question, answer } : question
    );
    setDataQuestions(updatedQuestions);
    setError(null); // Clear error when an answer is selected
  };

  const handleNextQuestion = () => {
    const currentQuestion = dataQuestions.find(question => question.id === questionSelected);
    if (currentQuestion.answer === null) {
      setError('Please select an answer before proceeding to the next question.');
    } else {
      setQuestionSelected(prev => (prev < dataQuestions.length ? prev + 1 : prev));
    }
  };

  const handlePrevQuestion = () => {
    setQuestionSelected(prev => (prev > 1 ? prev - 1 : prev));
    setError(null); // Clear error when going back
  };

  const handleSubmit = () => {
    const unansweredQuestions = dataQuestions.filter(question => question.answer === null);
    if (unansweredQuestions.length > 0) {
      setError('Please answer all questions before submitting.');
    } else {
      console.log('Final dataQuestions:', dataQuestions);
      setError(null); // Clear error after successful submission
    }
  };

  const renderContent = (id = 1) => {
    const selectedQuestion = dataQuestions.find(question => question.id === id);
    return (
      <div className='QuizContainer_Content'>
        <div className='QuizContainer_Content_Question'>{selectedQuestion.question}</div>
        <div className='QuizContainer_Content_Answer'>
          <label>
            <input
              type="radio"
              name={`question-${id}`}
              value="true"
              checked={selectedQuestion.answer === true}
              onChange={() => handleAnswerChange(id, true)}
            />
            True
          </label>
          <label>
            <input
              type="radio"
              name={`question-${id}`}
              value="false"
              checked={selectedQuestion.answer === false}
              onChange={() => handleAnswerChange(id, false)}
            />
            False
          </label>
        </div>
      </div>
    );
  };

  return (
    <div className="Quiz">
      <div className='QuizTitle'>Formular</div>
      <div className='QuizContainer'>
        <div className='QuizContainer_Sidebar'>
          {dataQuestions.map((question, index) => (
            <div
              key={index}
              className='QuizContainer_Sidebar_Question'
              onClick={() => setQuestionSelected(question.id)}
            >
              {question.value}
            </div>
          ))}
        </div>
        {renderContent(questionSelected)}
        {error && <div className="QuizError">{error}</div>}
        <div className='QuizContainer_Buttons'>
          {questionSelected > 1 && (
            <button onClick={handlePrevQuestion}>
              Previous Question
            </button>
          )}
          {questionSelected < dataQuestions.length ? (
            <button onClick={handleNextQuestion}>
              Next Question
            </button>
          ) : (
            <button onClick={handleSubmit}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
