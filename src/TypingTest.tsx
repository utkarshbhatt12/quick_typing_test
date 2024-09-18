import React, { useState, useEffect, useRef } from 'react';
import {
  calculateTypingSpeed,
  calculateAccuracy,
  getSampleText,
} from './utils';
import { Keyboard, RefreshCw, X, Cloud, History } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const sampleText = getSampleText();

interface TestResults {
  speed: number;
  mistakes: number;
  accuracy: number;
  keystrokes: number;
  date: string;
}

type SyncStatus = 'idle' | 'syncing' | 'success' | 'error';

interface PerformanceData {
  date: string;
  speed: number;
}

export default function TypingTest() {
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [results, setResults] = useState<TestResults[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [mistakes, setMistakes] = useState<Set<number>>(new Set());
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [performanceHistory, setPerformanceHistory] = useState<
    PerformanceData[]
  >([]);
  const [showHistory, setShowHistory] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const words = sampleText.split(' ');

  useEffect(() => {
    if (wordCount >= words.length) {
      finishTest();
    }
  }, [wordCount, words.length]);

  useEffect(() => {
    let intervalId: number;

    if (startTime && !isFinished) {
      intervalId = window.setInterval(() => {
        const elapsedTime = (Date.now() - startTime) / 60000; // Convert to minutes
        const speed = calculateTypingSpeed(wordCount, elapsedTime);

        setCurrentSpeed(speed);
      }, 500);
    }

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [startTime, wordCount, isFinished]);

  useEffect(() => {
    // Load performance history from chrome.storage.sync
    chrome.storage.sync.get(['typingHistory'], (data) => {
      const history: TestResults[] = data.typingHistory || [];
      setPerformanceHistory(
        history
          .slice(0, 20)
          .map((result) => ({ date: result.date, speed: result.speed })),
      );
    });

    // Focus the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setUserInput(inputValue);

    if (!startTime) {
      setStartTime(Date.now());
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      const typedWord = userInput.trim();
      if (typedWord !== words[currentWordIndex]) {
        setMistakes((prev) => new Set(prev).add(currentWordIndex));
      }
      setCurrentWordIndex((prev) => prev + 1);
      setUserInput('');
      setWordCount((prev) => prev + 1);
    }
  };

  const finishTest = () => {
    if (startTime) {
      const endTime = Date.now();
      const timeElapsed = (endTime - startTime) / 60000; // Convert to minutes
      const typingSpeed = calculateTypingSpeed(wordCount, timeElapsed);
      const accuracy = calculateAccuracy(mistakes.size, wordCount);
      const keystrokes = words.slice(0, wordCount).join(' ').length;
      const currentDate = new Date().toISOString();

      const newResult: TestResults = {
        speed: typingSpeed,
        mistakes: mistakes.size,
        accuracy,
        keystrokes,
        date: currentDate,
      };

      setPerformanceHistory((prev) =>
        [{ date: currentDate, speed: typingSpeed }, ...prev].slice(0, 20),
      );
      saveResults(newResult);
    }
  };

  const saveResults = (newResult: TestResults) => {
    setSyncStatus('syncing');
    chrome.storage.sync.get(['typingHistory'], (data) => {
      const history: TestResults[] = data.typingHistory || [];
      const updatedHistory = [newResult, ...history].slice(0, 20); // Keep only the latest 20 results
      chrome.storage.sync.set({ typingHistory: updatedHistory }, () => {
        if (chrome.runtime.lastError) {
          console.error('Error saving results:', chrome.runtime.lastError);
          setSyncStatus('error');
        } else {
          console.log('Results saved to Chrome storage');
          setResults(updatedHistory);
          setIsFinished(true);
          setSyncStatus('success');

          // Show 'success' status for 1.5 seconds before setting to 'idle'
          setTimeout(() => {
            setSyncStatus('idle');
          }, 1500);
        }
      });
    });
  };

  const resetTest = () => {
    setUserInput('');
    setStartTime(null);
    setWordCount(0);
    setIsFinished(false);
    setResults([]);
    setCurrentWordIndex(0);
    setMistakes(new Set());
    setSyncStatus('idle');
    setCurrentSpeed(0);
    setShowHistory(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const toggleHistory = () => {
    setShowHistory((prev) => !prev);
  };

  const renderTwoLines = () => {
    const wordsPerLine = 10; // Adjust this value to fit your design
    const startIndex = Math.max(0, currentWordIndex - wordsPerLine);
    const endIndex = Math.min(words.length, startIndex + wordsPerLine * 2);
    const visibleWords = words.slice(startIndex, endIndex);

    return (
      <div className="flex flex-col">
        <div className="mb-1">
          {visibleWords.slice(0, wordsPerLine).map((word, index) => {
            const wordIndex = startIndex + index;
            return renderWord(word, wordIndex);
          })}
        </div>
        <div className="pb-2">
          {visibleWords.slice(wordsPerLine).map((word, index) => {
            const wordIndex = startIndex + wordsPerLine + index;
            return renderWord(word, wordIndex);
          })}
        </div>
      </div>
    );
  };

  const renderWord = (word: string, wordIndex: number) => {
    const isCurrentWord = wordIndex === currentWordIndex;
    const isMistake = mistakes.has(wordIndex);

    return (
      <span
        key={wordIndex}
        className={`mr-1 ${isCurrentWord ? 'text-blue-400 font-bold text-lg' : ''} ${isMistake ? 'text-red-400' : ''}`}
      >
        {word}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const formatCompactDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric',
    });
  };

  const chartData = {
    labels: performanceHistory.map((entry) => formatCompactDate(entry.date)),
    datasets: [
      {
        label: 'WPM',
        data: performanceHistory.map((entry) => entry.speed),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: showHistory ? 'Typing Speed History' : 'Current Test Performance',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Words Per Minute',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-[480px] h-[600px] bg-gray-900 text-white shadow-lg overflow-hidden flex flex-col">
      <header className="bg-black py-3 px-4 flex items-center justify-center">
        <Keyboard className="w-6 h-6 text-white mr-2" />
        <h1 className="text-xl font-bold">quick_typing_test</h1>
      </header>
      <main className="flex-grow flex flex-col p-4 overflow-hidden">
        <div className="flex-grow overflow-y-auto">
          {!isFinished && !showHistory && (
            <>
              <div className="mb-4 h-24 overflow-hidden">
                <p className="text-gray-400 text-sm mb-1">
                  Type the following:
                </p>
                <div
                  className="bg-gray-800 p-2 rounded text-sm leading-snug"
                  aria-live="polite"
                >
                  {renderTwoLines()}
                </div>
              </div>
              <input
                ref={inputRef}
                className="w-full p-2 text-lg border rounded mb-3 bg-gray-800 text-white border-gray-700 focus:outline-none focus:border-blue-500"
                value={userInput}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder="Type here..."
                aria-label="Type the displayed text"
              />
              <div className="mb-3 text-xs text-gray-300 flex justify-between">
                <span>
                  Words: {wordCount}/{words.length}
                </span>
                <span>Speed: {currentSpeed.toFixed(2)} WPM</span>
              </div>
            </>
          )}
          {(isFinished || showHistory) && (
            <>
              <div className="mb-4 bg-gray-800 p-3 rounded">
                <Line data={chartData} options={chartOptions} />
              </div>
              {!showHistory && results.length > 0 && (
                <div className="bg-gray-800 p-3 rounded mb-3 text-sm overflow-y-auto max-h-[200px]">
                  <h2 className="text-lg font-bold mb-2">Previous Results</h2>
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className={`mb-2 pb-2 border-b border-gray-700 last:border-b-0 ${index === 0 ? 'bg-blue-900 p-2 rounded' : ''}`}
                    >
                      {index === 0 && (
                        <div className="text-xs text-blue-300 mb-1">
                          Latest Result
                        </div>
                      )}
                      <div>Date: {formatDate(result.date)}</div>
                      <div>Speed: {result.speed.toFixed(2)} WPM</div>
                      <div>Accuracy: {result.accuracy.toFixed(2)}%</div>
                      <div>Mistakes: {result.mistakes}</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        <div className="mt-4 flex space-x-2">
          <button
            className="flex-1 bg-red-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 flex items-center justify-center"
            onClick={resetTest}
            aria-label="Reset test and undo progress"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            {isFinished ? 'Start New Test' : 'Reset Test'}
          </button>
          <button
            className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 flex items-center justify-center"
            onClick={toggleHistory}
            aria-label={
              showHistory ? 'Hide typing history' : 'View typing history'
            }
          >
            <History className="w-4 h-4 mr-2" />
            {showHistory ? 'Hide History' : 'View History'}
          </button>
        </div>
      </main>
      <div className="bg-gray-800 px-4 py-2 text-xs flex items-center justify-between border-t border-gray-700">
        <span>Sync Status:</span>
        {syncStatus === 'idle' && (
          <span className="text-gray-400 flex items-center">
            <Cloud className="w-3 h-3 mr-1" /> Idle
          </span>
        )}
        {syncStatus === 'syncing' && (
          <span className="text-yellow-500 flex items-center">
            <RefreshCw className="w-3 h-3 mr-1 animate-spin" /> Syncing...
          </span>
        )}
        {syncStatus === 'success' && (
          <span className="text-green-500 flex items-center">
            <Cloud className="w-3 h-3 mr-1" /> Synced
          </span>
        )}
        {syncStatus === 'error' && (
          <span className="text-red-500 flex items-center">
            <X className="w-3 h-3 mr-1" /> Sync Error
          </span>
        )}
      </div>
    </div>
  );
}
