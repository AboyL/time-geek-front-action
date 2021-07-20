export default {
  // 支持自定义函数，API 参考 express@4
  'POST /api/newList': (req, res) => {
    res.json({
      result: [
        {
          image: "https://img1.baidu.com/it/u=3708508319,3501527973&fm=26&fmt=auto&gp=0.jpg",
          title: "新闻1",
          time: "2021-07-11 10:00:32",
          info: { showImage: true, showDate: true, name: "aaa" }
        },
        {
          image: "https://img1.baidu.com/it/u=3708508319,3501527973&fm=26&fmt=auto&gp=0.jpg",
          title: "新闻2",
          time: "2021-07-12 10:00:32",
          info: { showImage: true, showDate: false, name: "aaa" }
        },
      ]
    })
  },
}