"use client";

import { useState } from 'react';
import FlashCard, { weekdaysWords, numbersWords, alphabetWords } from '@/components/FlashCard';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (selectedCategory === 'alphabet') {
    return <FlashCard words={alphabetWords} />;
  }

  if (selectedCategory === 'weekdays') {
    return <FlashCard words={weekdaysWords} />;
  }

  if (selectedCategory === 'numbers') {
    return <FlashCard words={numbersWords} />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-lg px-4">
        <div className="bg-white rounded-2xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Learn Tibetan
          </h1>
          
          <div className="space-y-4 mb-12">
            <button
              onClick={() => setSelectedCategory('alphabet')}
              className="w-full py-4 text-xl font-semibold rounded-lg transition-colors"
            >
              1. Alphabet
            </button>
            
            <button
              onClick={() => setSelectedCategory('weekdays')}
              className="w-full py-4 text-xl font-semibold rounded-lg transition-colors"
            >
              2. Weekdays
            </button>
            
            <button
              onClick={() => setSelectedCategory('numbers')}
              className="w-full py-4 text-xl font-semibold rounded-lg transition-colors"
            >
              3. Numbers
            </button>
          </div>

          <div className="text-center">
            <p className="text-xl mb-2 text-gray-700">སློབ་སྦྱོང་བྱེད།</p>
            <p className="text-lg text-gray-600">Learn & Have Fun!</p>
          </div>
        </div>
      </div>
    </div>
  );
}