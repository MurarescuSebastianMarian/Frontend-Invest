import { useState, useEffect } from 'react';
import './Quiz.css';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [dataQuestions, setDataQuestions] = useState([]);
  const [questionSelected, setQuestionSelected] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError('Token not found in local storage.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8081/api/quizzes/getQuiz', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('data', data);

        if (data.completed) {
          localStorage.setItem('quizCompleted', true);
          navigate('/');
        }

        if (data.questions) {
          const questionsWithAnswers = data.questions.map(question => ({
            ...question,
            answer: question.answer || [],
            type: question.value === "Sectoare" ? "checkbox" : "radio"
          }));
          const sortedQuestions = questionsWithAnswers.sort((a, b) => a.id - b.id);
          setDataQuestions(sortedQuestions);
        } else {
          setError('Invalid response format.');
        }
      } catch (error) {
        setError(`Failed to fetch data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate]);

  const handleAnswerChange = (id, answer, isSingleAnswer) => {
    const updatedQuestions = dataQuestions.map(question =>
      question.id === id
        ? {
            ...question,
            answer: isSingleAnswer
              ? [answer]
              : question.answer.includes(answer)
              ? question.answer.filter(a => a !== answer)
              : [...question.answer, answer]
          }
        : question
    );
    setDataQuestions(updatedQuestions);
    setError(null);
  };

  const handleNextQuestion = () => {
    const currentQuestion = dataQuestions.find(question => question.id === questionSelected);
    if (currentQuestion.answer.length === 0) {
      setError('Please select an answer before proceeding to the next question.');
    } else {
      setQuestionSelected(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    setQuestionSelected(prev => (prev > dataQuestions[0].id ? prev - 1 : prev));
    setError(null);
  };

  const handleSubmit = async () => {
    const unansweredQuestions = dataQuestions.filter(question => question.answer.length === 0);
    console.log('dataQuestionsdataQuestionsdataQuestionsdataQuestions', dataQuestions);
    const sendDataQuestionsFinal = dataQuestions.map(question => ({
      answer: question.answer,
      id: question.id,
      question: question.question,
      value: question.value,
    }));

    if (unansweredQuestions.length > 0) {
      setError('Please answer all questions before submitting.');
    } else {
      console.log('Final dataQuestions:', sendDataQuestionsFinal);
      setError(null);

      try {
        const response = await fetch('http://localhost:8081/api/quizzes/updateQuiz', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendDataQuestionsFinal),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.log('DATA errorData:', errorData);
        } else {
          const data = await response.json();
          console.log('DATA SEND successful:', data);
          localStorage.setItem('quizCompleted', true);
          navigate('/');
        }
      } catch (error) {
        console.error('Error during submission:', error);
      }
    }
  };

  const renderContent = (id) => {
    const selectedQuestion = dataQuestions.find(question => question.id === id);

    return (
      <div className='QuizContainer_Content'>
        <div className='QuizContainer_Content_Question'>{selectedQuestion?.question}</div>
        <div className='QuizContainer_Content_Answer'>
          {selectedQuestion?.possibleAnswers.map((answer, index) => (
            <label key={index}>
              <input
                type={selectedQuestion.type}
                name={`question-${id}`}
                value={answer}
                checked={selectedQuestion.answer.includes(answer)}
                onChange={() => handleAnswerChange(id, answer, selectedQuestion.type === 'radio')}
              />
              {answer}
            </label>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Quiz">
      <div className='QuizTitle'>Formular</div>
      <div className='QuizContainer'>
        <div className='QuizContainer_Sidebar'>
          {dataQuestions.map((question, index) => (
            <div
              key={index}
              className={`${questionSelected === question.id ? 'QuizContainer_Sidebar_Question_Active' : ''} QuizContainer_Sidebar_Question`}
              onClick={() => setQuestionSelected(question.id)}
            >
              {question.value}
            </div>
          ))}
        </div>

        {renderContent(questionSelected || dataQuestions[0].id)}
        {error && <div className="QuizError">{error}</div>}
        <div className='QuizContainer_Buttons'>
          {questionSelected > dataQuestions[0].id && (
            <button onClick={handlePrevQuestion}>
              Previous Question
            </button>
          )}
          {questionSelected < dataQuestions[dataQuestions.length - 1].id ? (
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
