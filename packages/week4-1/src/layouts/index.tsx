import { useEffect, useState } from 'react'
import { IRouteComponentProps, useModel } from 'umi'
import styles from './index.less'
export default function Layout({ children, location, route, history, match }: IRouteComponentProps) {
  const [list, setList] = useState([])
  // const { content, setContent } = useModel('content', model => model);
  const { content, setContent } = useModel('@@qiankunStateForSlave');

  useEffect(() => {
    fetch('/list').then((response) => response.json())
      .then(res => {
        if (res) {
          setList(res)
          setContent(res && res[0]?.content)
        }
      })
  }, [])
  return (
    <div>
      <div className={styles['header']} >
        header
      </div>
      <div className={styles['container']} >
        <div className={styles['nav-list']}>
          {
            list.map(v => (
              <div key={v.title} className={styles['nav-item']} onClick={() => setContent(v.content)}>
                {v.title}
              </div>
            ))
          }
        </div>
        <div className={styles['content']}>
          {
            content === null ? (
              <div>暂无内容</div>
            ) : children
          }
        </div>
      </div>
    </div>
  )
}