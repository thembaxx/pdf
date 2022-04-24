class File {
  constructor(name, size, url, fileType, fileExt, dateModified) {
    this.name = name;
    this.size = size;
    this.url = url;
    this.fileType = fileType;
    this.fileExt = fileExt;
    this.dateModified = dateModified;
  }
}

export default File;
