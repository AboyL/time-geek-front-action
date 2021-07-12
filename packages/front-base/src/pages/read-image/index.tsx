// 1. 读取本地图片
// 2. 修改图片
// 3. 保存图片
import { Button } from "antd"

const TextPickerOpts = {
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

const ImagePickerOpts = {
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
const pickerOptsMap = {
  text: TextPickerOpts,
  image: ImagePickerOpts
}

const type = 'image'
const pickerOpts = pickerOptsMap[type]


const getGrayImageBlob = (image) => {
  return new Promise(resolve => {
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height

    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0)
    const imageData = ctx.getImageData(0, 0, image.width, image.height)
    const data = imageData.data
    for (let i = 0, len = data.length; i < len; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];
      const alpha = data[i + 3];

      // 取得RGB平均值
      const average = Math.floor((red + green + blue) / 3);

      // 设置颜色，不管透明度
      data[i] = average;
      data[i + 1] = average;
      data[i + 2] = average;
    }
    ctx.putImageData(imageData, 0, 0);
    canvas.toBlob(blob => {
      resolve(blob)
    })
  })
}

const dealWithImage = (blob) => {
  return new Promise((resolve) => {
    const newImg = document.createElement('img')
    const url = URL.createObjectURL(blob);
    newImg.src = url
    newImg.onload = async function () {
      // no longer need to read the blob so it's revoked
      URL.revokeObjectURL(url);
      // 使用 canvas 进行处理
      const newBlob = await getGrayImageBlob(newImg)
      resolve(newBlob)
    };
    // document.body.appendChild(newImg);
  })
}

export default () => {
  const pickerImage = async () => {
    const [fileHandle] = await (window as any).showOpenFilePicker(pickerOpts);
    if (!fileHandle) {
      return
    }
    const file = await fileHandle.getFile();
    const contents = file
    const newContents = await dealWithImage(contents)
    const saveHandle = await getNewFileHandle()
    await writeFile(saveHandle, newContents)
  }

  async function getNewFileHandle() {
    const handle = await (window as any).showSaveFilePicker(pickerOpts);
    return handle;
  }

  async function writeFile(fileHandle, contents) {
    // Create a FileSystemWritableFileStream to write to.
    const writable = await fileHandle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(contents);
    // Close the file and write the contents to disk.
    await writable.close();
  }

  return (
    <div>
      <Button type="primary" onClick={pickerImage} >test</Button>
    </div>
  )
}