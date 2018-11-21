const app = getApp();

Page({
  data:{
    date:"",
    title:"",
    readCount:"",
    source:"",
    content:[]
  },
  onLoad(query){
    let newsItem = app.globalData.newsList[query.index];
   
    this.setTitle(newsItem);

    this.getNewsDetails(newsItem.id);
  },
  
  getNewsDetails(id){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id
      },
      success: (res)=>{
        let result = res.data.result;
        this.setReadCountAndContent(result)
        console.log(result,app.globalData.newsList)
      }
    })
  },

  setTitle(item){
    this.setData({
      title: item.title,
      source: item.source,
      date: item.date
    })
  },

  setReadCountAndContent(res){
    this.setData({
      readCount:res.readCount,
      content:res.content
    })
    console.log("content",this.data.content)
  }
})