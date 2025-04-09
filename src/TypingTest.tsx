import { useState, useEffect, useRef, ChangeEvent } from 'react';
import {
  Clock,
  BarChart2,
  Target,
  Type,
  AlertCircle,
  RefreshCw,
  Keyboard,
} from 'lucide-react';
import { getSampleText } from './utils';

// Define interface for typed words
interface TypedWord {
  word: string;
  isCorrect: boolean;
}

export default function TypingTest(): JSX.Element {
  const [text, setText] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [typedWords, setTypedWords] = useState<TypedWord[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);

  const textWords: string[] = text.split(' ');

  useEffect(() => {
    setText(getSampleText());
  }, [text]);

  useEffect(() => {
    if (isActive && !timerRef.current) {
      timerRef.current = window.setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isActive]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value },
    } = e;

    if (!isActive && value.length === 1) {
      setIsActive(true);
      setStartTime(new Date());
    }

    // Check if the user typed a space
    if (value.endsWith(' ')) {
      const typedWord = value.trim();
      const currentWord = textWords[currentWordIndex];

      // Add to typed words array with correct/incorrect status
      setTypedWords((prev) => [
        ...prev,
        { word: typedWord, isCorrect: typedWord === currentWord },
      ]);

      if (typedWord !== currentWord) {
        setErrors((prev) => prev + 1);
      }

      if (currentWordIndex === textWords.length - 1) {
        handleTestComplete();
      } else {
        setCurrentWordIndex((prev) => prev + 1);
        setUserInput('');
      }
    } else {
      setUserInput(value);
    }
  };

  const handleTestComplete = (): void => {
    const end = new Date();
    setEndTime(end);
    setIsActive(false);
    setIsFinished(true);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Calculate WPM and accuracy
    if (startTime) {
      const minutes = (end.getTime() - startTime.getTime()) / 60000;
      const totalWords = textWords.length;
      const calculatedWpm = Math.round(totalWords / minutes);
      const calculatedAccuracy = Math.round(
        ((totalWords - errors) / totalWords) * 100,
      );

      setWpm(calculatedWpm);
      setAccuracy(calculatedAccuracy);
    }
  };

  const resetTest = (): void => {
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setCurrentWordIndex(0);
    setErrors(0);
    setIsFinished(false);
    setWpm(0);
    setAccuracy(100);
    setTimeElapsed(0);
    setIsActive(false);
    setTypedWords([]);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Function to determine word styling
  const getWordStyle = (index: number): string => {
    if (index === currentWordIndex) {
      return 'bg-blue-100 px-1 rounded';
    } else if (index < currentWordIndex) {
      // Check if this word was typed correctly
      const wordEntry = typedWords[index];
      return wordEntry?.isCorrect ? 'text-green-600' : 'text-red-600';
    } else {
      return 'text-gray-800';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 w-[448px]">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 font-mono flex items-center justify-center gap-2">
          <Keyboard size={24} className="text-blue-600" />
          Typing Test
        </h1>

        {!isFinished ? (
          <>
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2 font-mono">
                <span className="flex items-center gap-1">
                  <Clock size={16} className="text-blue-500" />
                  Time: {timeElapsed}s
                </span>
                <span className="flex items-center gap-1">
                  <Type size={16} className="text-blue-500" />
                  Word: {currentWordIndex + 1}/{textWords.length}
                </span>
              </div>

              <div className="font-mono text-lg leading-relaxed bg-gray-50 p-4 rounded-md mb-4">
                {textWords.map((word, index) => (
                  <span key={index} className={getWordStyle(index)}>
                    {word}{' '}
                  </span>
                ))}
              </div>

              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInputChange}
                className="w-full font-mono text-lg p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Start typing..."
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>

            <div className="text-sm text-gray-600 font-mono flex gap-2 items-start">
              <AlertCircle
                size={16}
                className="text-blue-500 mt-1 flex-shrink-0"
              />
              <div>
                <p>Type the text above. Press space after each word.</p>
                <p>
                  Current word: <strong>{textWords[currentWordIndex]}</strong>
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4 font-mono flex items-center justify-center gap-2">
              <BarChart2 size={20} className="text-blue-600" />
              Test Results
            </h2>

            <div className="flex justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 font-mono flex items-center justify-center gap-1">
                  <BarChart2 size={24} className="text-blue-600" />
                  {wpm}
                </div>
                <div className="text-sm text-gray-600 font-mono">WPM</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 font-mono flex items-center justify-center gap-1">
                  <Target size={24} className="text-green-600" />
                  {accuracy}%
                </div>
                <div className="text-sm text-gray-600 font-mono">Accuracy</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 font-mono flex items-center justify-center gap-1">
                  <Clock size={24} className="text-purple-600" />
                  {timeElapsed}s
                </div>
                <div className="text-sm text-gray-600 font-mono">Time</div>
              </div>
            </div>

            <button
              onClick={resetTest}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md font-mono flex items-center justify-center gap-2 mx-auto"
            >
              <RefreshCw size={18} />
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
