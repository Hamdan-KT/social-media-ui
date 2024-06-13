export const createImage = (url) =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener("load", () => resolve(image));
		image.addEventListener("error", (error) => reject(error));
		image.src = url;
	});

export const createURLfromImage = (imgFile) => {
	if (!imgFile) {
		throw new Error("Select File To Create URL")
	}
	return URL.createObjectURL(imgFile);
}