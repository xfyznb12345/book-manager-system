import Mock from 'mockjs'

//  图表数据
let List = []
export default {
  getStatisticalData: () => {
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          vue: Mock.Random.integer(500, 8000),
          wechat: Mock.Random.integer(500, 8000),
          ES6: Mock.Random.integer(500, 8000),
          Redis: Mock.Random.integer(500, 8000),
          React: Mock.Random.integer(500, 8000),
          springboot: Mock.Random.integer(500, 8000)
        })
      )
    }
    return {
      code: 200,
      data: {
        // 饼图
        videoData: [
          {
            name: 'springboot',
            value: Mock.Random.integer(1000, 10000)
          },
          {
            name: 'vue',
            value: Mock.Random.integer(1000, 10000)
          },
          {
            name: '小程序',
            value: Mock.Random.integer(1000, 10000)
          },
          {
            name: 'ES6',
            value: Mock.Random.integer(1000, 10000)
          },
          {
            name: 'Redis',
            value: Mock.Random.integer(1000, 10000)
          },
          {
            name: 'React',
            value: Mock.Random.integer(1000, 10000)
          }
        ],
        // 柱状图
        userData: [
          {
            date: '周一',
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(100, 1000)
          },
          {
            date: '周二',
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(100, 1000)
          },
          {
            date: '周三',
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(100, 1000)
          },
          {
            date: '周四',
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(100, 1000)
          },
          {
            date: '周五',
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(100, 1000)
          },
          {
            date: '周六',
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(100, 1000)
          },
          {
            date: '周日',
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(100, 1000)
          }
        ],
        // 折线图
        orderData: {
          date: [
            '20191001',
            '20191002',
            '20191003',
            '20191004',
            '20191005',
            '20191006',
            '20191007'
          ],
          data: List
        },
        tableData: [
          {
            name: 'Angular',
            todayBuy: Mock.Random.integer(100, 1000),
            monthBuy: Mock.Random.integer(3000, 5000),
            totalBuy: Mock.Random.integer(40000, 1000000)
          },
          {
            name: 'Uni-app',
            todayBuy: Mock.Random.integer(100, 1000),
            monthBuy: Mock.Random.integer(3000, 5000),
            totalBuy: Mock.Random.integer(40000, 1000000)
          },
          {
            name: 'Express',
            todayBuy: Mock.Random.integer(100, 1000),
            monthBuy: Mock.Random.integer(3000, 5000),
            totalBuy: Mock.Random.integer(40000, 1000000)
          },
          {
            name: 'JavaScript',
            todayBuy: Mock.Random.integer(100, 1000),
            monthBuy: Mock.Random.integer(3000, 5000),
            totalBuy: Mock.Random.integer(40000, 1000000)
          },
          {
            name: '小程序',
            todayBuy: Mock.Random.integer(100, 1000),
            monthBuy: Mock.Random.integer(3000, 5000),
            totalBuy: Mock.Random.integer(40000, 1000000)
          },
          {
            name: 'Vue',
            todayBuy: Mock.Random.integer(100, 1000),
            monthBuy: Mock.Random.integer(3000, 5000),
            totalBuy: Mock.Random.integer(40000, 1000000)
          },
          {
            name: 'springboot',
            todayBuy: Mock.Random.integer(100, 1000),
            monthBuy: Mock.Random.integer(3000, 5000),
            totalBuy: Mock.Random.integer(40000, 1000000)
          },
          {
            name: 'React',
            todayBuy: Mock.Random.integer(100, 1000),
            monthBuy: Mock.Random.integer(3000, 5000),
            totalBuy: Mock.Random.integer(40000, 1000000)
          },
          {
            name: 'Redis',
            todayBuy: Mock.Random.integer(100, 1000),
            monthBuy: Mock.Random.integer(3000, 5000),
            totalBuy: Mock.Random.integer(40000, 1000000)
          },
          {
            name: 'Node',
            todayBuy: Mock.Random.integer(100, 1000),
            monthBuy: Mock.Random.integer(3000, 5000),
            totalBuy: Mock.Random.integer(40000, 1000000)
          },
        ]
      }
    }
  }
}
