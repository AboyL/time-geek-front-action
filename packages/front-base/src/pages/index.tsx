import { Link } from 'umi';
import styles from './index.less'
export default () => {

  return (
    <div className={styles['wrapper']} >
      <Link to="/read-image">选择图片并且进行灰度处理</Link>
      <Link to="/monaco-editor">monaco-editor测试</Link>
      <Link to="/template">模板引擎渲染</Link>
    </div>
  )
}