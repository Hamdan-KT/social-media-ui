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

export const createImage = (url) =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener("load", () => resolve(image));
		image.addEventListener("error", (error) => reject(error));
		image.src = url;
	});

export const createURLfromImage = (imgFile) => {
	if (!imgFile) {
		throw new Error("Select File To Create URL");
	}
	return URL.createObjectURL(imgFile);
};

export const getCroppedImg = (imageSrc, crop) => {
	const image = new Image();
	image.src = imageSrc;
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	canvas.width = crop.width;
	canvas.height = crop.height;

	image.onload = () => {
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
	};

	return new Promise((resolve) => {
		canvas.toBlob((blob) => {
			resolve(URL.createObjectURL(blob));
		}, "image/png");
	});
};
