const list = []
for (let i = 0; i < 10; i++) {
  list.push({
    title: `title${i}`,
    content: `content${i}`,
  })
}

export default {
  'GET /list': list
}