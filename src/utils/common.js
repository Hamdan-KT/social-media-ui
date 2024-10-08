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

// getting croppend image from react-easy-crop lib
export const getCroppedImg = (imageSrc, crop) => {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.src = imageSrc;

		image.onload = () => {
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");

			canvas.width = crop.width;
			canvas.height = crop.height;

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

			canvas.toBlob((blob) => {
				if (!blob) {
					reject(new Error("Canvas is empty"));
					return;
				}
				resolve(URL.createObjectURL(blob));
			}, "image/png");
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
