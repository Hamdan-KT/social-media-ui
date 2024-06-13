/* eslint-disable react/display-name */
import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

const PopOver = React.forwardRef(
	({ children, Button, PopOverProps, ButtonProps, onClose }, ref) => {
		const [anchorEl, setAnchorEl] = React.useState(null);

		const handleClick = (event) => {
			setAnchorEl(event.currentTarget);
		};

		const handleClose = () => {
			setAnchorEl(null);
			if (onClose) {
				onClose();
			}
		};

		const open = Boolean(anchorEl);
		const id = open ? "simple-popover" : undefined;

		const ModifiedChildren = React.Children.map(Button, (child) =>
			React.cloneElement(child, {
				"aria-describedby": id,
				onClick: handleClick,
				...ButtonProps,
			})
		);

		React.useImperativeHandle(ref, () => ({
			handleClose,
		}));

		return (
			<>
				{ModifiedChildren}
				<Popover
					id={id}
					open={open}
					anchorEl={anchorEl}
					onClose={handleClose}
					anchorOrigin={{
						vertical: "top",
						horizontal: "left",
					}}
					transformOrigin={{
						vertical: "bottom",
						horizontal: "left",
					}}
                    {...PopOverProps}
                    sx={{overflow: "auto"}}
				>
					{children}
				</Popover>
			</>
		);
	}
);

export default PopOver;
