import React from "react";
import { convertToFile } from "../helpers";

const FilePicker = ({ returnDocuments }) => {
  const handleUploads = (e) => {
    const files = e.currentTarget.files;

    if (files.length === 0) return;
    const fileArray = files ? Array.from(files) : [];

    const fileToImagePromises = fileArray.map(convertToFile);
    Promise.all(fileToImagePromises).then((items) => {
      let set = new Set(items);
      returnDocuments([...set]);
    });
  };

  return (
    <div>
      <label for="file_uploads">Upload documents</label>
      <input
        type="file"
        id="file_uploads"
        name="file_uploads"
        multiple
        onChange={handleUploads}
      ></input>
    </div>
  );
};

export default FilePicker;
