import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, CheckCircle2, XCircle } from 'lucide-react';

interface TibetanWordSTTProps {
  correctWord: string;
  alternatives?: string[];
}

const TibetanWordSTT = ({ correctWord, alternatives = [] }: TibetanWordSTTProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [response, setResponse] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Reset states when card changes
  useEffect(() => {
    setResponse('');
    setIsCorrect(null);
    setError('');
  }, [correctWord]);

  // Check if running on iOS
  const isIOS = () => {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
  };

  // Helper function to clean Tibetan strings
  const cleanTibetanString = (str: string): string => {
    let cleaned = str.trim();
    while (cleaned.endsWith('་') || cleaned.endsWith('།')) {
      cleaned = cleaned.slice(0, -1);
    }
    return cleaned;
  };

  const startRecording = async () => {
    try {
      setError('');
      setResponse('');
      setIsCorrect(null);

      const constraints = {
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 16000,
          channelCount: 1
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      // Check supported MIME types in order of preference
      const mimeTypes = [
        'audio/webm',
        'audio/ogg',
        'audio/mp4',
        'audio/aac'
      ];

      let selectedType = '';
      for (const type of mimeTypes) {
        if (MediaRecorder.isTypeSupported(type)) {
          selectedType = type;
          console.log('Selected MIME type:', type);
          break;
        }
      }

      if (!selectedType) {
        throw new Error('No supported audio MIME type found');
      }

      const options = {
        audioBitsPerSecond: 16000,
        mimeType: selectedType
      };

      mediaRecorderRef.current = new MediaRecorder(stream, options);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
          console.log('Chunk size:', event.data.size);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: selectedType });
        console.log('Final blob size:', audioBlob.size);

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());

        // Send to API automatically when recording stops
        await sendToAPI(audioBlob, selectedType);
      };

      if (isIOS()) {
        mediaRecorderRef.current.start(100);
      } else {
        mediaRecorderRef.current.start();
      }

      setIsRecording(true);
    } catch (err) {
      console.error('Recording error:', err);
      setError(`Error accessing microphone: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendToAPI = async (audioBlob: Blob, selectedType: string) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, `recording.${selectedType.split('/')[1]}`);
      formData.append('lang', 'bo');

      console.log('Sending to API...');
      const apiResponse = await fetch('/api/stt', {
        method: 'POST',
        body: formData,
      });

      console.log('API Response status:', apiResponse.status);
      const data = await apiResponse.json();
      console.log('API Response data:', data);

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.output) {
        setResponse(data.output);
        
        // Check main word and alternatives
        const cleanOutput = cleanTibetanString(data.output);
        const cleanCorrect = cleanTibetanString(correctWord);
        
        // Check main word first
        let isMatch = cleanOutput === cleanCorrect;
        
        // If no match found, check alternatives
        if (!isMatch && alternatives.length > 0) {
          isMatch = alternatives.some(alt => 
            cleanTibetanString(alt) === cleanOutput
          );
        }
        
        console.log('Comparing:', { 
          cleanOutput, 
          cleanCorrect, 
          alternatives: alternatives.map(cleanTibetanString),
          isMatch 
        });
        
        setIsCorrect(isMatch);
      } else {
        console.log('Unexpected response structure:', data);
        setError('No transcription received');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Error details:', err);
      setError(`Failed to convert speech to text: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="w-full flex flex-col items-center space-y-2">
      {/* Mic Button */}
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`p-3 rounded-full ${isRecording
          ? 'bg-red-500 hover:bg-red-600'
          : 'bg-blue-500 hover:bg-blue-600'
        } text-white transition-colors disabled:bg-gray-300 shadow-lg`}
        title={isRecording ? "Stop Recording" : "Start Recording"}
      >
        {isRecording ? (
          <Square className="w-5 h-5" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </button>

      {/* Response Display */}
      {(response || isLoading) && (
        <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-lg">
          <div className="font-tibetan text-xl text-gray-900">
            {isLoading ? '...' : response}
          </div>
          {isCorrect !== null && (
            isCorrect ? (
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            ) : (
              <XCircle className="w-6 h-6 text-red-500" />
            )
          )}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="text-red-500 text-sm text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default TibetanWordSTT;