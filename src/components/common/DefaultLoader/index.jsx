import React from 'react'
import "./index.css"
import { Box } from '@mui/material';

function DefaultLoader({ sx = {}, size = 10 }) {
	let width = 80
	let height = 80

	let MainStyle = {
		width: width,
		height: height
	}
	let BarStyle = {
		// animation: "lds-spinner 1.2s linear infinite",
		"&::after": {
			content: `""`,
			position: "absolute",
			display: "block",
			width: "2px",
			height: "8px",
			background: `#464545`,
			// top: 3,
			// left: 37,
			zIndex: 5,
			borderRadius: "20%",
		},
	};
  return (
		<Box className="lds-spinner" sx={MainStyle}>
			{Array.from({ length: 8 }, (item, index) => (
				<Box key={index} sx={{ ...BarStyle, '--i': index }}></Box>
			))}
		</Box>
	);
}

// transform: `rotate(calc(${index} * 30deg)) translateY(3px)`,
// 	// animationDelay: `calc(-1s + ${index} * 0.1s);`
// 	animationDelay: `calc(-1s + ${index} * 0.1s);`,

export default DefaultLoader