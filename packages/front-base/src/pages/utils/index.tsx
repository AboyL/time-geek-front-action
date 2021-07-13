export async function writeFile(fileHandle, contents) {
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();
  // Write the contents of the file to the stream.
  await writable.write(contents);
  // Close the file and write the contents to disk.
  await writable.close();
}

export const TextPickerOpts = {
  types: [
    {
      description: 'Text',
      accept: {
        'text/plain': ['.txt', '.text'],
      }
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false
};

export const ImagePickerOpts = {
  types: [
    {
      description: 'Images',
      accept: {
        'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
      }
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false
};