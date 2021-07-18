import { IRouteComponentProps } from 'umi';
// import styles from './index.less';
import './index.less';
import { useState } from 'react';
import UedCenter from './ued-center'
export default function Layout({ children, location, route, history, match }: IRouteComponentProps) {
  const [theme, setTheme] = useState({
    title: 'red'
  })

  const chooseColor = () => {
    setTheme((preState) => ({
      title: preState.title === 'blue' ? 'red' : 'blue'
    }))
  }
  return (
    <div>
      <UedCenter theme={theme} >
        {/* <div onClick={chooseColor} className={styles['theme-container']} >主题</div> */}
        <div className="title" >title</div>
        <div onClick={chooseColor} className={'theme-container'} >主题</div>
        {children}
      </UedCenter>
    </div>
  )
}