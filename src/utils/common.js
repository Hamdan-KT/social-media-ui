// change file to dataurl
export const fileToDataURL = (file) => {
	return new Promise((resolve, reject) => {
		let baseURL = "";
		const reader = new FileReader();
		if (file) {
			reader.readAsDataURL(file);
			reader.onload = () => {
				baseURL = reader.result;
				resolve(baseURL);
			};
			reader.onerror = reject;
		}
	});
};

// create an image instance
export const createImage = (url) =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener("load", () => resolve(image));
		image.addEventListener("error", (error) => reject(error));
		image.src = url;
	});

// creating blob url form image or file
export const createURLfromImage = (imgFile) => {
	if (!imgFile) {
		throw new Error("Select File To Create URL");
	}
	return URL.createObjectURL(imgFile);
};

export function getRadianAngle(degreeValue) {
	return (degreeValue * Math.PI) / 180;
}

// getting croppend image from react-easy-crop lib
export const getCroppedImg = (
	imageSrc,
	crop,
	rotation = 0,
	flip = { x: 1, y: 1 }
) => {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.src = imageSrc;

		image.onload = () => {
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");

			if (!ctx) {
				return null;
			}

			const rotRad = getRadianAngle(rotation);

			// set canvas size to match the bounding box
			canvas.width = crop.width;
			canvas.height = crop.height;

			// translate canvas context to a central location to allow rotating and flipping around the center
			ctx.translate(crop.width / 2, crop.height / 2);
			ctx.rotate(rotRad);
			ctx.scale(flip.x, flip.y);
			ctx.translate(-crop.width / 2, -crop.height / 2);

			console.log({ rotation });
			console.log({ flip });

			// Draw the cropped image onto the new canvas
			ctx.drawImage(
				image,
				crop.x,
				crop.y,
				crop.width,
				crop.height,
				0,
				0,
				crop.width,
				crop.height
			);

			// As Base64 string
			// return croppedCanvas.toDataURL('image/jpeg');
			canvas.toBlob((blob) => {
				if (!blob) {
					reject(new Error("Canvas is empty"));
					return;
				}
				resolve(URL.createObjectURL(blob));
			}, "image/jpeg");
		};

		image.onerror = (error) => {
			reject(error);
		};
	});
};

export const getEditedImage = (imageSrc, filter = {}) => {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.src = imageSrc;

		image.onload = () => {
			// Create a canvas element
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");

			// Set canvas dimensions to the image dimensions
			canvas.width = image.width;
			canvas.height = image.height;

			ctx.filter = `brightness(${filter?.Brightness ?? 100}%) contrast(${
				filter?.Contrast ?? 100
			}%) saturate(${filter?.Saturation ?? 100}%)`;
			// Draw the full image on the canvas
			ctx.drawImage(image, 0, 0);

			// Convert the canvas to a Blob and create an object URL
			canvas.toBlob((blob) => {
				if (!blob) {
					reject(new Error("Canvas is empty"));
					return;
				}

				// // Create an object URL from the Blob
				// const url = URL.createObjectURL(blob);
				// resolve(url);
				// Create a File object from the Blob with a .jpg extension
				const file = new File([blob], "edited-image.jpg", {
					type: "image/jpeg",
				});
				resolve(file);
			}, "image/jpeg");
		};

		image.onerror = (error) => {
			reject(error);
		};
	});
};

export const getCroppedImgFile = (
	imageSrc,
	crop,
	rotation = 0,
	flip = { x: 1, y: 1 }
) => {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.src = imageSrc;

		image.onload = () => {
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");

			if (!ctx) {
				return null;
			}

			const rotRad = getRadianAngle(rotation);

			// set canvas size to match the bounding box
			canvas.width = crop.width;
			canvas.height = crop.height;

			// translate canvas context to a central location to allow rotating and flipping around the center
			ctx.translate(crop.width / 2, crop.height / 2);
			ctx.rotate(rotRad);
			ctx.scale(flip.x, flip.y);
			ctx.translate(-crop.width / 2, -crop.height / 2);

			console.log({ rotation });
			console.log({ flip });

			// Draw the cropped image onto the new canvas
			ctx.drawImage(
				image,
				crop.x,
				crop.y,
				crop.width,
				crop.height,
				0,
				0,
				crop.width,
				crop.height
			);

			// As Base64 string
			// return croppedCanvas.toDataURL('image/jpeg');
			canvas.toBlob((blob) => {
				if (!blob) {
					reject(new Error("Canvas is empty"));
					return;
				}
				// Create a File object from the Blob with a .jpg extension
				const file = new File([blob], "edited-image.jpg", {
					type: "image/jpeg",
				});
				resolve(file);
			}, "image/jpeg");
		};

		image.onerror = (error) => {
			reject(error);
		};
	});
};

// format media duration to wavesurfer lib
export const formatDuration = (seconds) => {
	const date = new Date(0);
	date.setSeconds(seconds);
	return date.toISOString().substring(14, 19);
};

export const handleApiCallError = (error) => {
	if (error.name == "AxiosError") {
		throw error.response.data;
	} else throw error;
};

export const blobUrlToFile = async (blobUrl, fileName, mimeType) => {
	try {
		// Fetch the Blob data from the Blob URL
		const response = await fetch(blobUrl);
		const blob = await response.blob();

		// Create and return a File object
		return new File([blob], fileName, { type: mimeType });
	} catch (error) {
		console.error("Error converting Blob URL to File:", error);
		throw error;
	}
};