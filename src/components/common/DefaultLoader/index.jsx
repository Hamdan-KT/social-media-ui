import React from 'react'
import "./index.css"
import { Box } from '@mui/material';

function DefaultLoader({ sx = {}, size = 10 }) {
  return (
		/* From Uiverse.io by mrhyddenn */
		<div class="spinner center">
			<div class="spinner-blade"></div>
			<div class="spinner-blade"></div>
			<div class="spinner-blade"></div>
			<div class="spinner-blade"></div>
			<div class="spinner-blade"></div>
			<div class="spinner-blade"></div>
			<div class="spinner-blade"></div>
			<div class="spinner-blade"></div>
			<div class="spinner-blade"></div>
			<div class="spinner-blade"></div>
			<div class="spinner-blade"></div>
			<div class="spinner-blade"></div>
		</div>
	);
}

export default DefaultLoader