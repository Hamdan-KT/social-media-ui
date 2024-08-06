import { useState, useRef, useEffect } from "react";

const useStopwatch = () => {
	const [startTime, setStartTime] = useState(null);
	const [elapsedTime, setElapsedTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const intervalRef = useRef(null);

	useEffect(() => {
		return () => clearInterval(intervalRef.current);
	}, []);

	const start = () => {
		if (!isRunning) {
			setIsRunning(true);
			setStartTime(Date.now());
			intervalRef.current = setInterval(() => {
				setElapsedTime((prevTime) => prevTime + 1);
			}, 1000); // Update every second
		}
	};

	const stop = () => {
		if (isRunning) {
			clearInterval(intervalRef.current);
			setIsRunning(false);
			setElapsedTime(
				(prevTime) => prevTime + Math.floor((Date.now() - startTime) / 1000)
			);
		}
	};

	const reset = () => {
		clearInterval(intervalRef.current);
		setIsRunning(false);
		setStartTime(null);
		setElapsedTime(0);
	};

	const getTimeInstance = () => {
		return new Date(elapsedTime * 1000); // Return Date object representing elapsed time in milliseconds
	};

	return { elapsedTime, isRunning, start, stop, reset, getTimeInstance };
};

export default useStopwatch;
