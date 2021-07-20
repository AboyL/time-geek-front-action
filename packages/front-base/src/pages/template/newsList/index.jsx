export default {
  render() {
    return `
        <div class="newslist">
            <div class="if-show" v-if="show">我出来了</div>
            <div class="news-item" v-for="item in newslist">
                <div class="img"><img src="{{item.image}}"/></div>
                <div class="title">{{item.title}}</div>
            </div>
        </div>
    `;
  },
};
