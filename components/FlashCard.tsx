"use client";

import React, { useState } from 'react';
import { Play } from 'lucide-react';

export const weekdaysWords = [
  {
    german: "heute",
    tibetan: "དེ་རིང་",
    phonetic: "de ring",
    audio: "de ring"
  },
  {
    german: "gestern",
    tibetan: "ཁ་སང་",
    phonetic: "kha sang",
    audio: "kha sang"
  },
  {
    german: "morgen",
    tibetan: "སང་ཉིན་",
    phonetic: "sang nyin",
    audio: "sang nyin"
  },
  {
    german: "letzte Woche",
    tibetan: "གཟའ་འཁོར་སྔོན་མ་",
    phonetic: "za khor ngön ma",
    audio: "za khor ngön ma"
  },
  {
    german: "nächste Woche",
    tibetan: "གཟའ་འཁོར་རྗེས་མ་",
    phonetic: "za khor jey ma",
    audio: "za khor jey ma"
  },
  {
    german: "Sonntag",
    tibetan: "གཟའ་ཉི་མ་",
    phonetic: "za nyi ma",
    audio: "za nyi ma"
  },
  {
    german: "Montag",
    tibetan: "གཟའ་ཟླ་བ་",
    phonetic: "za da wa",
    audio: "za da wa"
  },
  {
    german: "Dienstag",
    tibetan: "གཟའ་མིག་དམར་",
    phonetic: "za mi mar",
    audio: "za mi mar"
  },
  {
    german: "Mittwoch",
    tibetan: "གཟའ་ལྷག་པ་",
    phonetic: "za lhag pa",
    audio: "za hlag pa"
  },
  {
    german: "Donnerstag",
    tibetan: "གཟའ་ཕུར་བུ་",
    phonetic: "za phur pu",
    audio: "za phur pu"
  },
  {
    german: "Freitag",
    tibetan: "གཟའ་པ་སངས་",
    phonetic: "za pa sang",
    audio: "za pa sang"
  },
  {
    german: "Samstag",
    tibetan: "གཟའ་སྤེན་པ་",
    phonetic: "za pen pa",
    audio: "za pen pa"
  }
  // ... rest of your weekday words
];

export const numbersWords = [
  {
    german: "eins",
    tibetan: "གཅིག",
    phonetic: "chig",
    audio: "chig"
  },
  {
    german: "zwei",
    tibetan: "གཉིས",
    phonetic: "nyi",
    audio: "nyi"
  },
  {
    german: "drei",
    tibetan: "གསུམ",
    phonetic: "sum",
    audio: "sum"
  },
  {
    german: "vier",
    tibetan: "བཞི",
    phonetic: "zhi",
    audio: "zhi"
  },
  {
    german: "fünf",
    tibetan: "ལྔ",
    phonetic: "nga",
    audio: "nga"
  },
  {
    german: "sechs",
    tibetan: "དྲུག",
    phonetic: "drug",
    audio: "drug"
  },
  {
    german: "sieben",
    tibetan: "བདུན",
    phonetic: "dun",
    audio: "dun"
  },
  {
    german: "acht",
    tibetan: "བརྒྱད",
    phonetic: "gye",
    audio: "gye"
  },
  {
    german: "neun",
    tibetan: "དགུ",
    phonetic: "gu",
    audio: "gu"
  },
  {
    german: "zehn",
    tibetan: "བཅུ",
    phonetic: "chu",
    audio: "chu"
  }
  // Add more numbers here
];

export const alphabetWords = [
  {
    german: "",
    tibetan: "ཀ",
    phonetic: "ka",
    audio: "ka"
  },
  {
    german: "",
    tibetan: "ཁ",
    phonetic: "kha",
    audio: "kha"
  },
  {
    german: "",
    tibetan: "ག",
    phonetic: "ga",
    audio: "ga"
  },
  {
    german: "",
    tibetan: "ང",
    phonetic: "nga",
    audio: "nga2"
  },
  {
    german: "",
    tibetan: "ཅ",
    phonetic: "ca",
    audio: "ca"
  },
  {
    german: "",
    tibetan: "ཆ",
    phonetic: "cha",
    audio: "cha"
  },
  {
    german: "",
    tibetan: "ཇ",
    phonetic: "ja",
    audio: "ja"
  },
  {
    german: "",
    tibetan: "ཉ",
    phonetic: "nya",
    audio: "nya"
  },
  {
    german: "",
    tibetan: "ཏ",
    phonetic: "ta",
    audio: "ta"
  },
  {
    german: "",
    tibetan: "ཐ",
    phonetic: "tha",
    audio: "tha"
  },
  {
    german: "",
    tibetan: "ད",
    phonetic: "da",
    audio: "da"
  },
  {
    german: "",
    tibetan: "ན",
    phonetic: "na",
    audio: "na"
  },
  {
    german: "",
    tibetan: "པ",
    phonetic: "pa",
    audio: "pa"
  },
  {
    german: "",
    tibetan: "ཕ",
    phonetic: "pha",
    audio: "pha"
  },
  {
    german: "",
    tibetan: "བ",
    phonetic: "ba",
    audio: "ba"
  },
  {
    german: "",
    tibetan: "མ",
    phonetic: "ma",
    audio: "ma"
  },
  {
    german: "",
    tibetan: "ཙ",
    phonetic: "tsa",
    audio: "tsa"
  },
  {
    german: "",
    tibetan: "ཚ",
    phonetic: "tsha",
    audio: "tsha"
  },
  {
    german: "",
    tibetan: "ཛ",
    phonetic: "dza",
    audio: "dza"
  },
  {
    german: "",
    tibetan: "ཝ",
    phonetic: "wa",
    audio: "wa"
  },
  {
    german: "",
    tibetan: "ཞ",
    phonetic: "zha",
    audio: "zha"
  },
  {
    german: "",
    tibetan: "ཟ",
    phonetic: "za",
    audio: "za"
  },
  {
    german: "",
    tibetan: "འ",
    phonetic: "ɦa",
    audio: "ɦa"
  },
  {
    german: "",
    tibetan: "ཡ",
    phonetic: "ya",
    audio: "ya"
  },
  {
    german: "",
    tibetan: "ར",
    phonetic: "ra",
    audio: "ra"
  },
  {
    german: "",
    tibetan: "ལ",
    phonetic: "la",
    audio: "la"
  },
  {
    german: "",
    tibetan: "ཤ",
    phonetic: "sha",
    audio: "sha"
  },
  {
    german: "",
    tibetan: "ས",
    phonetic: "sa",
    audio: "sa"
  },
  {
    german: "",
    tibetan: "ཧ",
    phonetic: "ha",
    audio: "ha"
  },
  {
    german: "",
    tibetan: "ཨ",
    phonetic: "a",
    audio: "a"
  }
];

interface FlashCardProps {
  words: Array<{
    german: string;
    tibetan: string;
    phonetic: string;
    audio: string;
  }>;
}

const FlashCard: React.FC<FlashCardProps> = ({ words }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const playAudio = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    const newAudio = new Audio(`/audio/${words[currentIndex].audio}.wav`);
    newAudio.play();
    setAudio(newAudio);
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % words.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
  };

  const progress = ((currentIndex + 1) / words.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800">
                {words[currentIndex].german}
              </h2>
            </div>
            
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-8 mb-6">
              <p className="text-7xl text-center text-gray-900 leading-relaxed">
                {words[currentIndex].tibetan}
              </p>
            </div>
            
            <div className="text-center mb-4">
              <p className="text-2xl text-gray-600 font-medium">
                {words[currentIndex].phonetic}
              </p>
            </div>

            <button
              onClick={playAudio}
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 mb-4"
            >
              <Play size={24} />
              <span>Play</span>
            </button>
          </div>
          
          <div className="bg-gray-50 px-6 py-4 flex justify-between items-center gap-4 border-t border-gray-200">
            <button
              onClick={prevCard}
              className="px-6 py-2 bg-blue-500 text-white text-lg font-medium rounded-lg hover:bg-blue-600 transition-colors"
            >
              Zurück
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gray-500 text-white text-lg font-medium rounded-lg hover:bg-gray-600 transition-colors"
            >
              Main Menu
            </button>
            <button
              onClick={nextCard}
              className="px-6 py-2 bg-blue-500 text-white text-lg font-medium rounded-lg hover:bg-blue-600 transition-colors"
            >
              Weiter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;