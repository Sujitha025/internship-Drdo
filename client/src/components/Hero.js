import { useState, useRef } from "react";
import styles from '../styles/Hero.module.css'
import { getUser, saveRecordedVideo } from '../helper/helper';
import { useAuthStore } from '../store/store';
import {toast,Toaster} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import convertVideoToBase64 from '../helper/convert';
const Hero = () => {
    const mimeType = 'video/webm';
	const navigate = useNavigate();
	const {username} = useAuthStore(state => state.auth);
	const [permission, setPermission] = useState(false);

	const mediaRecorder = useRef(null);

	const liveVideoFeed = useRef(null);

	const [recordingStatus, setRecordingStatus] = useState("inactive");

	const [stream, setStream] = useState(null);

	const [recordedVideo, setRecordedVideo] = useState(null);

	const [videoChunks, setVideoChunks] = useState([]);

	const getCameraPermission = async () => {
		setRecordedVideo(null);
		//get video and audio permissions and then stream the result media stream to the videoSrc variable
		if ("MediaRecorder" in window) {
			try {
				const videoConstraints = {
					audio: false,
					video: true,
				};
				const audioConstraints = { audio: true };

				// create audio and video streams separately
				const audioStream = await navigator.mediaDevices.getUserMedia(
					audioConstraints
				);
				const videoStream = await navigator.mediaDevices.getUserMedia(
					videoConstraints
				);

				setPermission(true);

				//combine both audio and video streams

				const combinedStream = new MediaStream([
					...videoStream.getVideoTracks(),
					...audioStream.getAudioTracks(),
				]);

				setStream(combinedStream);

				//set videostream to live feed player
				liveVideoFeed.current.srcObject = videoStream;
			} catch (err) {
				alert(err.message);
			}
		} else {
			alert("The MediaRecorder API is not supported in your browser.");
		}
	};

	const startRecording = async () => {
        setRecordingStatus("recording");
    
        const media = new MediaRecorder(stream, { mimeType });
    
        mediaRecorder.current = media;
    
        mediaRecorder.current.start();
    
        let localVideoChunks = [];
    
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localVideoChunks.push(event.data);
        };
    
        setVideoChunks(localVideoChunks);
    };
    
	const stopRecording = () => {
        setPermission(false);
        setRecordingStatus("inactive");
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
            mediaRecorder.current.onstop = () => {
                const videoBlob = new Blob(videoChunks, { type: mimeType });
                const videoUrl = URL.createObjectURL(videoBlob);
                setRecordedVideo(videoUrl);
                setVideoChunks([]);
    
                // Stop the media stream associated with the camera
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                }
            };
        }
    };
	const handleDownload = async () => {
		if (recordedVideo) {
		  try {
			const { data } = await getUser({ username });
			const videoResponse = await fetch(recordedVideo);
      const videoBlob = await videoResponse.blob();
      
      // Convert the video content (blob) to base64
      const base64VideoData = await convertVideoToBase64(videoBlob);
     // console.log(base64VideoData);
      // Save the base64 video data to the database
      const response = await saveRecordedVideo({ videoData: base64VideoData, userData: data });
	  console.log(response);
			if (response.message) {
			  toast.success(response.message);
			  // Create a temporary anchor element
			  const downloadLink = document.createElement('a');
			  // Set the href attribute to the recordedVideo URL
			  downloadLink.href = recordedVideo;
			  // Set the download attribute to specify the filename for the downloaded file
			  downloadLink.download = 'recorded_video.webm';
			  // Programmatically click the anchor element to trigger the download
			  //downloadLink.click();
			  //navigate('/home');
			} else if (response.error) {
			  toast.error(response.error);
			}
		  } catch (error) {
			console.error('Failed to save recorded video:', error);
			toast.error('Failed to save recorded video');
		  }
		}
	  };
	  
	

	return (
		<div className={styles.hero}>
		<Toaster position='top-center' reverseOrder={false}></Toaster>
		  {/* Video Recorder */}
		  <div className={styles.videoPlayerContainer}>
			<h2 className="text-center text-2xl font-bold mb-4 text-violet-600">Ready to Go!</h2>
			
			<div className={styles.videoPlayer}>
			  {!recordedVideo ? (
				<video ref={liveVideoFeed} autoPlay className="live-player"></video>
			  ) : null}
			  {recordedVideo ? (
				<div className="recorded-player">
				  <video className="recorded" src={recordedVideo} controls></video>
				  
				</div>
			  ) : null}
			</div>
			<main className="flex justify-center">
			  <div className={styles.videoControls}>
				{!permission ? (
					<button onClick={getCameraPermission} type="button" className="bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4 mt-4 border-b-4 border-violet-700 hover:border-violet-500 rounded">Get Camera</button>
				) : null}
				{permission && recordingStatus === "inactive" ? (
					<button onClick={startRecording} type="button" className="bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4 mt-4 border-b-4 border-violet-700 hover:border-violet-500 rounded">Start Recording</button>
				) : null}
				{recordingStatus === "recording" ? (
					<button onClick={stopRecording} type="button" className="bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4 mt-4 border-b-4 border-violet-700 hover:border-violet-500 rounded">Stop Recording</button>
				) : null}
			  </div>
			  {/* <a href={recordedVideo} download class="bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4 mt-4 ml-2 border-b-4 border-violet-700 hover:border-violet-500 rounded">Download Recording</a> */}
			  <button onClick={handleDownload} className="block bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4 mt-4 ml-2 border-b-4 border-violet-700 hover:border-violet-500 rounded">Submit</button>
				  {/* <a download href={recordedVideo} className="block bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4 mt-2 border-b-4 border-violet-700 hover:border-violet-500 rounded">
  Download Recording
</a> */}

			</main>
		  </div>
	  
		  {/* Questions */}
		  <div className={styles.questionsContainer}>
			<h3 className="text-2xl font-bold mb-4 ml-20 text-violet-600 md:text-gray-200">Questions</h3>
			<ol className="list-decimal pl-6 text-gray-700 mb-3">
			<div className="px-7 py-3 mb-3 bg-gray-200 shadow-md rounded-lg h-auto md:h-full">
            <li className="mb-1">What Are Your Reasons for Travelling to the Country?</li>
          </div>
		  <div className="px-7 py-3 mb-3  bg-gray-200 shadow-md rounded-lg h-auto md:h-full">
		  <li className="mb-2">For How Long Will You Be Staying in the Country?</li>
          </div>
			 
		  <div className="px-7 py-3 mb-3  bg-gray-200 shadow-md rounded-lg h-auto md:h-full">
		  <li className="mb-2">What Is Your Residential Address in India?</li>
          </div>
			 
		  <div className="px-7 py-3 mb-3 bg-gray-200 shadow-md rounded-lg h-auto md:h-full">
		  <li className="mb-2">How Are You Planning to Bear the Expenses of the Trip?</li>
          </div>
		  <div className="px-7 py-3 mb-3 bg-gray-200 shadow-md rounded-lg h-auto md:h-full">
		  <li className="mb-2">Can You Reduce the Duration of the Stay?</li>
          </div> 
			 
			</ol>
		  </div>
		  </div>
	  );
	  

};

export default Hero;