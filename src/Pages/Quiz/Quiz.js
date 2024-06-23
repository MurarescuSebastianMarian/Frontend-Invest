import { useState, useEffect } from 'react';
import './Quiz.css';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [dataQuestions, setDataQuestions] = useState([]);
  const [questionSelected, setQuestionSelected] = useState(67);
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
          // Sort questions by id in ascending order
          const sortedQuestions = data.questions.sort((a, b) => a.id - b.id);
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
  }, []);

  const handleAnswerChange = (id, answer) => {
    const updatedQuestions = dataQuestions.map(question =>
      question.id === id ? { ...question, answer } : question
    );
    setDataQuestions(updatedQuestions);
    setError(null); // Clear error when an answer is selected
  };

  const handleNextQuestion = () => {
    console.log('questionSelected', questionSelected);
    console.log('dataQuestions', dataQuestions);

    const currentQuestion = dataQuestions.find(question => question.id === questionSelected);
    console.log('currentQuestion', currentQuestion);
    if (currentQuestion.answer === null) {
      setError('Please select an answer before proceeding to the next question.');
    } else {
      setQuestionSelected(prev => {
        console.log('mmmmm',prev);
        return (prev + 1);
      });
    }
  };

  const handlePrevQuestion = () => {
    setQuestionSelected(prev => (prev > 1 ? prev - 1 : prev));
    setError(null); // Clear error when going back
  };

  const handleSubmit = async () => {
    const unansweredQuestions = dataQuestions.filter(question => question.answer === null);
    if (unansweredQuestions.length > 0) {
      setError('Please answer all questions before submitting.');
    } else {
      console.log('Final dataQuestions:', dataQuestions);
      setError(null); // Clear error after successful submission

      try {
        const response = await fetch('http://localhost:8081/api/quizzes/updateQuiz', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataQuestions),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.log('DATA errorData:', errorData);
          // setError(errorData.message || 'Login failed');
        } else {
          const data = await response.json();
          console.log('DATA SEND successful:', data);
          localStorage.setItem('quizCompleted', true);
          
          // // Redirect to home page after successful login
          navigate('/');
        }
      } catch (error) {
        console.error('Error during login:', error);
        // setError('An error occurred during login');
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
                type="radio"
                name={`question-${id}`}
                value={answer}
                checked={selectedQuestion.answer === answer}
                onChange={() => handleAnswerChange(id, answer)}
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
              className='QuizContainer_Sidebar_Question'
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
          {questionSelected < dataQuestions[5].id ? (
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
