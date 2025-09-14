import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send, Smile, Paperclip, Mic, X, Image as ImageIcon, File, MicOff, Square, Play, Pause } from "lucide-react";
import EmojiPicker from 'emoji-picker-react';

interface MessageComposerProps {
  onSendMessage: (content: string, attachmentUrl?: string, type?: 'text' | 'voice') => void;
  disabled?: boolean;
  isDarkTheme?: boolean;
}

interface FileAttachment {
  file: File;
  preview?: string;
  type: 'image' | 'document';
}

const MessageComposer = ({ onSendMessage, disabled = false, isDarkTheme = true }: MessageComposerProps) => {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || attachments.length > 0 || audioBlob) {
      if (audioBlob) {
        // Send voice message
        const audioUrl = URL.createObjectURL(audioBlob);
        onSendMessage("🎤 Voice message", audioUrl, 'voice');
        setAudioBlob(null);
        setRecordingTime(0);
      } else {
        // Send text message with attachments
        const attachmentInfo = attachments.map(att => att.file.name).join(', ');
        const fullMessage = message.trim() + (attachmentInfo ? `\n[Attachments: ${attachmentInfo}]` : '');
        onSendMessage(fullMessage, undefined, 'text');
      setMessage("");
        setAttachments([]);
      }
    }
  };

  const startRecording = async () => {
    try {
      // Check if browser supports media recording
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Voice recording is not supported in this browser. Please use a modern browser like Chrome, Firefox, or Safari.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const audioChunks: BlobPart[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start(1000); // Collect data every second
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check your browser permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setRecordingTime(0);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  const playAudio = () => {
    if (audioBlob && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => setIsPlaying(false);
    }
  }, [audioBlob]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const handleEmojiClick = (emojiObject: any) => {
    setMessage(prev => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    
    const newAttachments: FileAttachment[] = Array.from(files).map(file => {
      const type = file.type.startsWith('image/') ? 'image' : 'document';
      const attachment: FileAttachment = { file, type };
      
      if (type === 'image') {
        const reader = new FileReader();
        reader.onload = (e) => {
          attachment.preview = e.target?.result as string;
          setAttachments(prev => [...prev]);
        };
        reader.readAsDataURL(file);
      }
      
      return attachment;
    });
    
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  // Theme classes - WhatsApp mobile style
  const bgSecondary = isDarkTheme ? "bg-gray-900" : "bg-white";
  const bgTertiary = isDarkTheme ? "bg-gray-700" : "bg-gray-100";
  const bgQuaternary = isDarkTheme ? "bg-gray-600" : "bg-gray-200";
  const borderColor = isDarkTheme ? "border-gray-700" : "border-gray-200";
  const textPrimary = isDarkTheme ? "text-white" : "text-gray-900";
  const textSecondary = isDarkTheme ? "text-gray-400" : "text-gray-500";

  return (
    <div className="bg-white pt-2 pb-4 px-4 relative">
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-full left-4 mb-2 z-50">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            width={350}
            height={400}
            searchPlaceholder="Search emoji..."
            skinTonesDisabled
            lazyLoadEmojis
          />
        </div>
      )}

      {/* Voice Message Preview */}
      {audioBlob && (
        <div className="mb-3">
          <div className={`${bgTertiary} rounded-lg p-3 flex items-center gap-3`}>
            <button
              onClick={playAudio}
              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <div className="flex-1">
              <p className={`${textPrimary} text-sm font-medium`}>Voice Message</p>
              <p className={`${textSecondary} text-xs`}>{formatTime(recordingTime)}</p>
            </div>
            <button
              onClick={() => {
                setAudioBlob(null);
                setRecordingTime(0);
              }}
              className={`p-1 ${textSecondary} hover:${textPrimary} hover:${bgQuaternary} rounded-full transition-colors`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {audioBlob && (
            <audio
              ref={audioRef}
              src={URL.createObjectURL(audioBlob)}
              preload="metadata"
            />
          )}
        </div>
      )}

      {/* Recording Interface */}
      {isRecording && (
        <div className="mb-3">
          <div className={`${bgTertiary} rounded-lg p-4 flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div>
                <p className={`${textPrimary} text-sm font-medium`}>Recording...</p>
                <p className={`${textSecondary} text-xs`}>{formatTime(recordingTime)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={cancelRecording}
                className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-full transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              <button
                onClick={stopRecording}
                className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
              >
                <Square className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* File Attachments Preview */}
      {attachments.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {attachments.map((attachment, index) => (
            <div key={index} className={`relative ${bgTertiary} rounded-lg p-2 flex items-center gap-2`}>
              {attachment.type === 'image' && attachment.preview ? (
                <img 
                  src={attachment.preview} 
                  alt="Preview" 
                  className="w-12 h-12 object-cover rounded"
                />
              ) : (
                <File className={`w-8 h-8 ${textSecondary}`} />
              )}
              <div className="flex-1 min-w-0">
                <p className={`${textPrimary} text-sm truncate`}>{attachment.file.name}</p>
                <p className={`${textSecondary} text-xs`}>
                  {(attachment.file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={() => removeAttachment(index)}
                className={`p-1 ${textSecondary} hover:${textPrimary} hover:${bgQuaternary} rounded-full transition-colors`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 @container">
        <label className="flex flex-col min-w-40 h-12 flex-1">
          <div className="flex w-full flex-1 items-stretch rounded-full h-full bg-gray-100">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message..."
              disabled={disabled}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-full text-gray-900 focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-gray-500 px-4 text-base font-normal leading-normal"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            />
            <div className="flex border-none bg-transparent items-center justify-center pr-2">
              <div className="flex items-center gap-0.5 justify-end">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center p-2 rounded-full text-gray-500 hover:bg-gray-200"
                >
                  <Paperclip className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                      alert('Voice messages are not supported in this browser. Please type your message instead.');
                      return;
                    }
                  }}
                  onMouseDown={startRecording}
                  onMouseUp={stopRecording}
                  onMouseLeave={stopRecording}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    startRecording();
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    stopRecording();
                  }}
                  className={`flex items-center justify-center p-2 rounded-full transition-colors select-none ${
                    isRecording ? 'bg-red-500 text-white' : 'text-gray-500 hover:bg-gray-200'
                  }`}
                  style={{ userSelect: 'none' }}
                  title="Hold to record voice message"
                >
                  {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </label>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
          accept="image/*,.pdf,.doc,.docx,.txt"
        />
        
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={disabled || (!message.trim() && attachments.length === 0 && !audioBlob)}
          className="flex items-center justify-center size-12 shrink-0 rounded-full bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
      </div>
  );
};

export default MessageComposer;
