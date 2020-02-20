// pages/edit/edit.js
//初始化数据库
const db = wx.cloud.database();
const note = db.collection('note');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noteData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      noteData: options
    });
  },
  cancel() {
    wx.navigateBack({
      url: '/pages/index/index'
    })
    wx.showToast({
      title: '已取消操作',
    })
  },
  upNote(events){
    let content = events.detail.value.content;
    let name = this.data.noteData.name;
    //统一不同平台时间格式
    Date.prototype.toLocaleString = function () {
      return this.getFullYear() + '-' + (this.getMonth() + 1) + '-' + this.getDate() +
        ' ' + this.getHours() + ':' + this.getMinutes() + ':' + this.getSeconds()
    }
    let time = new Date().toLocaleString();
    note.doc(this.data.noteData.id).update({
      data: {
        content: content,
        name: name,
        time: time
      }
    }).then(res => {
      wx.navigateBack({
        url: '/pages/index/index'
      })
      wx.showToast({
        title: '添加成功',
      })
    }).catch(err => {
      console.log('更新失败');
    });
  }
  
})