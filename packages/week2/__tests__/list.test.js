class ListNode {
  value;
  next = null;
  constructor({
    value,
  }) {
    this.value = value
  }
}

// 链表
class List {
  head = null
  push (value) {
    if (!this.head) {
      this.head = new ListNode({ value })
    } else {
      let current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = new ListNode({ value })
    }
  }

  display (cb) {
    let current = this.head
    while (current) {
      cb(current.value)
      current = current.next
    }
  }

  // 反转链表
  reverse () {
    let newHead = null
    while (this.head) {
      let old = newHead
      newHead = this.head
      this.head = this.head.next
      newHead.next = old
    }
    this.head = newHead
  }

  getArr () {
    let arr = []
    this.display((item) => {
      arr.push(item)
    })
    return arr
  }
}

test('typeof', () => {
  const list = new List()
  list.push(1)
  list.push(2)
  expect(list.getArr()).toEqual([1, 2])
  list.reverse()
  expect(list.getArr()).toEqual([2, 1])
  list.push(3)
  list.push(4)
  expect(list.getArr()).toEqual([2, 1, 3, 4])
})