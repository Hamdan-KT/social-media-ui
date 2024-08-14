import React, { useEffect, useState } from "react";

function useOutSlideClick(ref, callBack = () => {}) {
	const [outSide, setOutside] = useState();

	useEffect(() => {
		function handleOutSlideClick(e) {
			if (ref.current && !ref.current.contains(e.target)) {
				setOutside(true);
				callBack();
			} else {
				setOutside(false);
			}
		}
		document.addEventListener("click", handleOutSlideClick, true);

		// clean up function
		return () => {
			document.removeEventListener("click", handleOutSlideClick, true);
		};
	}, [ref]);

	return { outSide, ref };
}

export default useOutSlideClick;
