import { useEffect, useRef, useState } from "react"
import { Button } from "antd"
import './index.less'
import Engine from './engine'
import NewsList from "./newsList";

export default () => {
  const rootRef = useRef(null)
  const [list, setList] = useState([])
  const [show, setShow] = useState(true)

  useEffect(() => {
    const v1 = new Engine().mounted(rootRef.current);
    if (list.length) {
      v1.render(NewsList, { newslist: list, show: show });
    }
    return () => {
      v1.unmouted()
    }
  }, [list,show])

  useEffect(() => {
    fetch("/api/newList", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: 1,
        count: 20,
      }),
    })
      .then((response) => response.json())
      .then(res => {
        setList(res.result)
      })
  }, [])

  return (
    <div>
      <Button onClick={() => setShow((pre) => !pre)} >改变显示</Button>
      <div ref={rootRef} ></div>
    </div>
  )
}