import { useRef, useEffect } from 'react'
import * as monaco from 'monaco-editor';
import { Button } from "antd"
import styles from './style.less';
import { writeFile, TextPickerOpts } from '../utils'

export default () => {
  const editorRef = useRef<HTMLDivElement>(null)
  const fileHandleRef = useRef<any>(null)
  const editorInsRef = useRef<monaco.editor.IStandaloneCodeEditor>(null)


  const pickerFile = async () => {
    const [fileHandle] = await (window as any).showOpenFilePicker(TextPickerOpts);
    console.log('fileHandle', fileHandle);
    if (!fileHandle) {
      return
    }
    const file = await fileHandle.getFile();
    const contents = await file.text()
    fileHandleRef.current = fileHandle
    editorInsRef.current.setValue(contents)
  }

  const saveFile = async () => {
    if (!fileHandleRef.current || !editorInsRef.current) {
      return
    }
    const contents = editorInsRef.current.getValue()
    await writeFile(fileHandleRef.current, contents)
  }

  useEffect(() => {
    if (editorRef.current) {
      const editorIns = monaco.editor.create(editorRef.current, {
        language: 'txt',
        value: "",
        folding: true,
        theme: 'vs-dark',
        scrollbar: {
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
        },
      });
      editorInsRef.current = editorIns
    }
  }, [editorRef]);

  return (
    <div className={styles['wrapper']} >
      <div className={styles['btn-container']}>
        <Button onClick={pickerFile}>读取文件</Button>
        <Button onClick={saveFile} >保存</Button>
      </div>
      <div></div>
      <div style={{ height: 800, width: 800 }} ref={editorRef} ></div>
    </div>
  )
}