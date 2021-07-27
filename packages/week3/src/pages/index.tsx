import { useState, useRef, useEffect } from 'react'
import * as monaco from 'monaco-editor';
import { Button } from "antd"
import styles from './style.less';
// import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import initText from './template'
import axios from 'axios';

export default () => {
  const editorRef = useRef<HTMLDivElement>(null)
  const editorInsRef = useRef<monaco.editor.IStandaloneCodeEditor>(null)
  const [CustomComponent, setComponent] = useState(() => {
    return () => {
      return <div>空白组件</div>
    }
  })
  useEffect(() => {
    if (editorRef.current) {
      const editorIns = monaco.editor.create(editorRef.current, {
        language: 'javascript',
        value: initText,
        theme: 'vs-dark',
        scrollbar: {
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
        },
      });
      editorInsRef.current = editorIns
    }
  }, [editorRef]);

  const sendContext = () => {
    const text = editorInsRef.current.getValue()
    axios.post('/_api/test', {
      text: text
    }).then((res: any) => {
      console.log('res', res);
      // 获取远程的js
      const script = document.createElement('script')
      script.src = `/${res.data.hash}.js`
      document.body.appendChild(script)
      script.onload = () => {
        console.log(
          (window as any).component
        );
        const newComponent = (window as any).component
        setComponent(() => newComponent.default)
      }
    })
  }

  return (
    <div className={styles['wrapper']} >
      <div className={styles['btn-container']}>
        <Button onClick={sendContext} >提交</Button>
      </div>
      <div className={styles['container']} >
        <div className={styles['editor-container']} >
          <div style={{ height: 800, width: 800 }} ref={editorRef} ></div>
        </div>
        <div>
          {CustomComponent()}
        </div>
      </div>
    </div>
  )
}