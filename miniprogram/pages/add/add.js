// pages/add/add.js
//初始化数据库
const db = wx.cloud.database();
const note = db.collection('note');
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  cancel(){
    wx.navigateBack({
      url: '/pages/index/index'
    })
    wx.showToast({
      title: '已取消操作',
    })
  },
  addNote(events){
    let content = events.detail.value.content;
    let app = getApp();
    let name = app.globalData.userName;
    
    //统一不同平台时间格式
    Date.prototype.toLocaleString = function () {
      return this.getFullYear() + '-' + (this.getMonth() + 1) + '-' + this.getDate() + 
      ' ' + this.getHours() + ':' + this.getMinutes() + ':' + this.getSeconds()
    }
    let time = new Date().toLocaleString();
    //添加数据，data是必需的
    note.add({
      data: {
        content: content,
        name: name,
        time: time
      }
    }).then(res => {
      console.log(res);
      wx.navigateBack({
        url: '/pages/index/index'
      })
      wx.showToast({
        title: '添加成功',
      })
    }).catch(err => {
      console.log('添加失败');
    });
  }
})