import { useEffect, useState } from 'react'
import { IRouteComponentProps, useModel } from 'umi'
import styles from './index.less'

const getList = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const list = []
      for (let i = 0; i < 10; i++) {
        list.push({
          title: `title${i}`,
          content: `content${i}`,
        })
      }
      resolve(list)
    }, 100);
  })
}
export default function Layout({ children, location, route, history, match }: IRouteComponentProps) {
  const [list, setList] = useState([])
  // const { content, setContent } = useModel('content', model => model);
  const { content, setContent } = useModel('@@qiankunStateForSlave');

  useEffect(() => {
    // fetch('/list')
    getList()
      // .then((response) => response.json())
      .then((res: any) => {
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