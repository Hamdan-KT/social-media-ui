import { useEffect, useState } from "react";

export function useDebounceValue(initialValue, delay = 500) {
	const [value, setValue] = useState(initialValue);
	const [debouncedValue, setDebouncedValue] = useState(initialValue);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return { debouncedValue, value, setValue };
}
