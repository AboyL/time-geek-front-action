export default {
  render() {
    return `
        <div class="newslist">
            <div class="if-show" v-if="show">我出来了</div>
            <div class="news-item" v-for="item in newslist">
                <div class="img" v-if="item.info.showImage" ><img src="{{item.image}}"/></div>
                <div class="date" v-if="item.info.showDate">{{item.time}}</div>
                <div class="img">{{item.info.name}}</div>
            </div>
        </div>
    `;
  },
};
