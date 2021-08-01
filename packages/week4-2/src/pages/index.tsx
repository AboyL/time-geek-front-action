import { useModel } from 'umi';

// 接收从父元素过来的参数
export default () => {
  const {content} = useModel('@@qiankunStateFromMaster', model => model);
  return (
    <div>{content}</div>
  )
}