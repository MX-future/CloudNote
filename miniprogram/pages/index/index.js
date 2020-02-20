// pages/index/index.js
//初始化数据库
const db = wx.cloud.database();
const note = db.collection('note');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
  },
  onLoad() {
    note.get().then(res => {
      this.setData({
        data: res.data
      });
    });
  },
  onShow(){
    this.onLoad();
  },
  toAdd(){
    wx.navigateTo({
      url: '/pages/add/add'
    })
  },
  toEdit(e){
    let name = e.currentTarget.dataset.name;
    let content = e.currentTarget.dataset.content;
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/edit/edit?name=${name}&content=${content}&id=${id}`,
    })
  },
  //删除便签
  deleNote(e){
    wx.showModal({
      title: '删除便签',
      content: '确认将删除该条便签',
      confirmText: '删除',
      success: res => {
        if (res.confirm) {
          let id = e.currentTarget.dataset.id;
          note.doc(id).remove({}).then(res => {
            wx.showToast({
              title: '删除成功',
            });
            this.onLoad()
          }).catch(err => {
            console.log('删除失败')
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //下拉刷新
  onPullDownRefresh(){
    note.get().then(res => {
      this.setData({
        data: res.data
      });
      wx.stopPullDownRefresh();
    });
  }
})