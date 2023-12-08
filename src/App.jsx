import { useEffect, useState } from 'react'
const questionsData = [
  // Question 1
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 'Paris',
  },
  // Question 2
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars',
  },
  // Question 3
  {
    question: 'What is the largest mammal?',
    options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
    correctAnswer: 'Blue Whale',
  },
  // ... Add more questions here ...

  // Example: Question 18
  {
    question: 'What is the capital of Japan?',
    options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'],
    correctAnswer: 'Tokyo',
  },
  // Example: Question 19
  {
    question: 'Which scientist developed the theory of relativity?',
    options: ['Isaac Newton', 'Albert Einstein', 'Galileo Galilei', 'Nikola Tesla'],
    correctAnswer: 'Albert Einstein',
  },
  // Example: Question 20
  {
    question: 'What is the currency of Brazil?',
    options: ['Peso', 'Real', 'Rupee', 'Dollar'],
    correctAnswer: 'Real',
  },
];

function App() {
  const [switchData,setSwitchData] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [welcomeMsg,setWelcomeMsg] = useState('')
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(40); // in seconds
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [intervalId, setIntervalId] = useState(null);




  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setSwitchData('You are not allowed because you break rules')
        // need to close or stop timer
        clearInterval(intervalId);
        setTimer(0)
        setIsTimeUp(true)
        
      } else {
        console.log('Page is back');
      }
    };
    const handleKeyDown = (event) => {
      console.log('Key pressed:', event.key);
      if(event.key){
        setSwitchData('You are not allowed because you break rules')
        clearInterval(intervalId);
        setTimer(0)
        setIsTimeUp(true)
      }
    };

    if (quizStarted) {
      // Add event listeners only when the quiz is started
      document.addEventListener('visibilitychange', handleVisibilityChange);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [quizStarted,intervalId]);

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
      console.log('cholteche.....')
    }, 1000);
    setIntervalId(interval);
    setTimeout(() => {
      clearInterval(interval);
      setIsTimeUp(true);
    }, timer * 1000);
  };

  useEffect(() => {
    if (quizStarted) {
      startTimer();
    }
  }, [quizStarted,]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerSelection = (answer) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion]: answer,
    }));

    
  };

  const handleNextQuestion = () => {
    if(currentQuestion === questionsData.length - 1){
      setWelcomeMsg('welcome you finised !')
      return
    }
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion]: selectedAnswers[currentQuestion],
    }));

    

    if (selectedAnswers[currentQuestion] === questionsData[currentQuestion].correctAnswer) {
      setScore((prevScore) => prevScore + 5);
    }

     

    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    
  };

  const handlePrevQuestion = () => {
    
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  };

  const handleSkipQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    setSelectedAnswers({});
  };

  const handleFinishQuiz = () => {
    // Calculate and display the final score
    alert(`Quiz completed!\nYour score: ${score}`);
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div>
      <h1>Quiz App</h1>
      {!quizStarted && (
        <button onClick={handleStartQuiz}>Start Quiz</button>
      )}
        <p>Time remaining: {formatTime(timer)}</p>
      {isTimeUp && <p>Time's up! Quiz ended.</p>}
      {switchData && <p>{switchData}</p>}
      {!isTimeUp && (
        <div>
         <p>Question {currentQuestion + 1}:</p>
            <p>{questionsData[currentQuestion].question}</p>
            <ul>
              {questionsData[currentQuestion].options.map((option, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={selectedAnswers[currentQuestion] === option}
                      onChange={() => handleAnswerSelection(option)}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          <button onClick={handlePrevQuestion} disabled={currentQuestion === 0}>
            Back
          </button>
          <button onClick={handleSkipQuestion} disabled={isTimeUp}>
            Skip
          </button>
          <button onClick={handleNextQuestion} disabled={isTimeUp}>
            Next
          </button>
          {/* {currentQuestion === questionsData.length - 1 && (
            <button onClick={handleFinishQuiz}>Finish</button>
          )} */}
          {
            welcomeMsg && <h1>{welcomeMsg}</h1>
          }
          <h2>{score}</h2>
        </div>
      )}
    </div>
  )
}

export default App
