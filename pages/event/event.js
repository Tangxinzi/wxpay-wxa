Page({
  data: {
    total_fee: 1
  },
  pay () {
    /**
     * 请求登录凭证。
     */
    wx.login({
      success: (loginResponse) => {
        console.log(loginResponse)
        /**
         * 请求支付参数。
         */
        wx.request({
          url: 'http://sandbox.ferer.net/checkout/pay',
          // url: 'http://127.0.0.1:3333/checkout/pay',
          method: 'POST',
          data: {
            code: loginResponse.code,
            total_fee: this.data.total_fee
          },
          success: (paramsResponse) => {
            const params = paramsResponse.data

            /**
             * 请求支付。
             */
            wx.requestPayment({
              ...params,
              success: (paymentResponse) => {
                console.log(paymentResponse)
                if (paymentResponse.errMsg === 'requestPayment:ok') {
                  wx.showToast({
                    title: '支付成功',
                    icon: 'success',
                    duration: 2000
                  })

                  setTimeout(() => {
                    wx.switchTab({
                      url: '/pages/event/event'
                    })
                  }, 2000)
                }
              }
            })
          }
        })
      }
    })
  }
})
