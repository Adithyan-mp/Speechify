import React, { useState, useRef } from 'react';
import axios from 'axios';

const Recorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleRecordClick = async () => {
    if (isRecording) {
      // Stop recording and send data to backend
      mediaRecorderRef.current.stop();
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
          const formData = new FormData();
          formData.append('audio', audioBlob, 'recording.mp3');

          try {
            await axios.post('/upload', formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Recording uploaded successfully!');
          } catch (error) {
            console.error('Error uploading recording:', error);
          }

          audioChunksRef.current = []; // Reset chunks
        };

        mediaRecorderRef.current.start();
      } catch (err) {
        console.error('Error accessing microphone:', err);
      }
    }
    setIsRecording(!isRecording);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'audio/mp3') {
      const formData = new FormData();
      formData.append('audio', file);

      try {
        await axios.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log('Uploaded audio file successfully!');
      } catch (error) {
        console.error('Error uploading audio file:', error);
      }
    } else {
      console.error('Please upload an MP3 file!');
    }
  };

  return (
    <div>
      <div>
        <button onClick={handleRecordClick} className={`record-button ${isRecording ? 'recording' : ''}`}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
      </div>

      <div className="upload-section">
        <label htmlFor="audio-upload" className="upload-label">
          <span>Upload MP3</span>
        </label>
        <input
          type="file"
          id="audio-upload"
          accept="audio/mp3"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default Recorder;
