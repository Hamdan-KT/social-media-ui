import { Box, styled } from '@mui/material';
import React from 'react'

const ContentBox = styled(Box)(({ theme }) => ({
	width: "max-content",
	height: "max-content",
	display: "flex",
	background: theme.palette.background.paper,
	alignItems: "center",
	justifyContent: "center",
	overflow: "hidden",
}));

function FilterAdjustment() {
  return (
    <ContentBox>FilterAdjustment</ContentBox>
  )
}

export default FilterAdjustment