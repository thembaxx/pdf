import File from "./File";
import jsPDF from "jspdf";

// The dimensions are in millimeters.
const A4_PAPER_DIMENSIONS = {
  width: 210,
  height: 297,
};

const A4_PAPER_RATIO = A4_PAPER_DIMENSIONS.width / A4_PAPER_DIMENSIONS.height;

export const returnFileSize = (number) => {
  if (number < 1024) {
    return number + "bytes";
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + "KB";
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(1) + "MB";
  }
};

export const convertToFile = (file) => {
  if (!file) return null;

  let url = URL.createObjectURL(file);
  const size = returnFileSize(file.size);
  let name = file.name;
  const fileType = file.type.split("/")[0];
  const fileExt = file.type.split("/")[1];
  const dateModified = file.lastModified;

  return new Promise((resolve, reject) => {
    if (fileType === "image") {
      fileToImageURL(file).then((image) => {
        const uri = generatePdfFromImage(fileExt, image);
        let str = name.replace(fileExt, "pdf");
        name = str;
        URL.revokeObjectURL(url);
        resolve(new File(name, size, uri, fileType, fileExt, dateModified));
      });
    } else {
      resolve(new File(name, size, url, fileType, fileExt, dateModified));
    }
  });
};

const fileToImageURL = (file) => {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      resolve(image);
    };

    image.onerror = () => {
      reject(new Error("Failed to convert File to Image"));
    };

    image.src = URL.createObjectURL(file);
  });
};

const generatePdfFromImage = (fileExt, image) => {
  // Default export is A4 paper, portrait, using millimeters for units.
  const doc = new jsPDF();

  const imageDimensions = imageDimensionsOnA4({
    width: image.width,
    height: image.height,
  });

  doc.addImage(
    image.src,
    fileExt,
    // Images are vertically and horizontally centered on the page.
    (A4_PAPER_DIMENSIONS.width - imageDimensions.width) / 2,
    (A4_PAPER_DIMENSIONS.height - imageDimensions.height) / 2,
    imageDimensions.width,
    imageDimensions.height
  );

  const pdfURL = doc.output("bloburl");
  return pdfURL;
};

// Calculates the best possible position of an image on the A4 paper format,
// so that the maximal area of A4 is used and the image ratio is preserved.
const imageDimensionsOnA4 = (dimensions) => {
  const isLandscapeImage = dimensions.width >= dimensions.height;

  // If the image is in landscape, the full width of A4 is used.
  if (isLandscapeImage) {
    return {
      width: A4_PAPER_DIMENSIONS.width,
      height:
        A4_PAPER_DIMENSIONS.width / (dimensions.width / dimensions.height),
    };
  }

  // If the image is in portrait and the full height of A4 would skew
  // the image ratio, we scale the image dimensions.
  const imageRatio = dimensions.width / dimensions.height;
  if (imageRatio > A4_PAPER_RATIO) {
    const imageScaleFactor =
      (A4_PAPER_RATIO * dimensions.height) / dimensions.width;

    const scaledImageHeight = A4_PAPER_DIMENSIONS.height * imageScaleFactor;

    return {
      height: scaledImageHeight,
      width: scaledImageHeight * imageRatio,
    };
  }

  // The full height of A4 can be used without skewing the image ratio.
  return {
    width: A4_PAPER_DIMENSIONS.height / (dimensions.height / dimensions.width),
    height: A4_PAPER_DIMENSIONS.height,
  };
};
