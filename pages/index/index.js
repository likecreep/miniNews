const app = getApp()

Page({
  data:{
    type: [
      {name:'国内', value:'gn'},
      {name:'国际', value:'gj'},
      {name:'财经', value:'cj'},
      {name:'娱乐', value:'yl'},
      {name:'军事', value:'js'},
      {name:'体育', value:'ty'},
      {name:'其他',value:'other'}
    ],
    selectedType: 'gn',
    swiperItems:[],
    newsList:[]
  },

  onLoad(){
   this.getNews()
  },

  onPullDownRefresh(){
    this.getNews(wx.stopPullDownRefresh);
  },

  getNews(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.selectedType
      },
      success: (res) => {
        let result = res.data.result;
        this.setDataFormat(result);
        this.setNews(result);
        
        // 在globaldata中保存格式化好的result
        app.globalData.newsList = result;
        
        console.log(res)
      },
      complete: ()=> {
        callback && callback();
      }
    })
  },

  setDataFormat(result){
    result.forEach(item=>{
      let date = new Date(item.date);
      item.date= `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
      item.source = `${!!item.source ? item.source : '未知来源'}`,
        item.firstImage = `${!!item.firstImage ? item.firstImage : '/images/default-news.jpg'}`
    })
  },

  setNews(result){
    let swiperItems = result;
    if(result.length>3)
      swiperItems = result.slice(0,3);
    this.setData({
      swiperItems,
      newsList:result
    })
    console.log(result);
    console.log(swiperItems);
  },

  // 点击导航菜单切换新闻类别
  setNewsType(event){
    this.setData({
      selectedType:event.target.dataset.value
    });

    this.getNews();
  },

  // 点击跳转到新闻详情页
  navigateToNewsDetail(event){
    wx.navigateTo({
      url: `/pages/detail/detail?index=${event.currentTarget.dataset.index}`
    })
  }

})
