<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover" style="height: 290px">
        <div class="user">
          <el-avatar
            class="avatarIcon"
            :src="iconUrl + userInfo.icon"
          ></el-avatar>
          <div class="userinfo">
            <p class="name">{{ userInfo.nickName }}</p>
            <p class="access">{{ userInfo.role }}</p>
          </div>
        </div>
        <div class="login-info">
          <p>
            上次修改时间：<span>{{ userInfo.date }}</span>
          </p>
          <p>上次登录地点：<span>浙江省杭州市</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="height: 560px; margin-top:20px;">
        <p style="text-align:center">图书借阅榜</p>
        <el-table :data="tableData">
          <el-table-column
            show-overflow-tooltip
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card
          shadow="hover"
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover">
        <Echart style="height: 280px" :chartData="echartData.order"></Echart>
      </el-card>
      <div class="graph">
        <el-card shadow="hover">
          <Echart style="height: 280px" :chartData="echartData.user"></Echart>
        </el-card>
        <el-card shadow="hover">
          <Echart
            style="height: 280px"
            :chartData="echartData.video"
            :isAxisChart="false"
          ></Echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import Echart from '../../components/EChart'
import { iconUrl } from '@/api/api'
import { mapState } from 'vuex'
import { api_home } from '../../api/api'
export default {
  components: {
    Echart,
  },
  computed: {
    ...mapState(['userInfo']),
  },
  data() {
    return {
      iconUrl: iconUrl,
      tableData: [],
      tableLabel: {
        name: '书名',
        todayBuy: '今日借阅',
        monthBuy: '本月借阅',
        totalBuy: '总借阅',
      },
      countData: [
        {
          name: '今日借阅图书量',
          value: 1024,
          icon: 'notebook-2',
          color: '#2ec7c9',
        },
        {
          name: '今日收藏图书量',
          value: 210,
          icon: 'star-on',
          color: '#ffb980',
        },
        {
          name: '今日新增评论量',
          value: 105,
          icon: 'chat-dot-square',
          color: '#5ab1ef',
        },
        {
          name: '本月借阅书量',
          value: 7888,
          icon: 'notebook-2',
          color: '#2ec7c9',
        },
        {
          name: '本月收藏书量',
          value: 882,
          icon: 'star-on',
          color: '#ffb980',
        },
        {
          name: '本月新增评论量',
          value: 1025,
          icon: 'chat-dot-square',
          color: '#5ab1ef',
        },
      ],
      // 定义图表数据
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    }
  },
  methods: {
    getTableData() {
      api_home().then((res) => {
        this.tableData = res.tableData
        // 订单折线图
        const order = res.orderData
        this.echartData.order.xData = order.date
        // 第一步取出series中的name部分键名
        let keyArray = Object.keys(order.data[0])
        keyArray.forEach((key) => {
          this.echartData.order.series.push({
            name: key === 'wechat' ? '小程序' : key,
            data: order.data.map((item) => item[key]),
            type: 'line',
          })
        })
        // 用户柱状图
        this.echartData.user.xData = res.userData.map((item) => item.date)
        this.echartData.user.series.push({
          name: '新增用户',
          data: res.userData.map((item) => item.new),
          type: 'bar',
        })
        this.echartData.user.series.push({
          name: '活跃用户',
          data: res.userData.map((item) => item.active),
          type: 'bar',
          barGap: 0,
        })
        // 视频饼状图
        this.echartData.video.series.push({
          data: res.videoData,
          type: 'pie',
        })
      })
    },
  },
  created() {
    this.getTableData()
  },
}
</script>

<style lang="scss" scoped>
.home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    .avatarIcon {
      display: flex;
      justify-content: center;
      height: 150px;
      width: 150px;
      border: 3px solid #006a80 !important;
    }
    .userinfo {
      margin-left: 40px;
      .name {
        font-size: 32px;
        margin-bottom: 10px;
      }
      .access {
        color: #999;
      }
    }
  }
  .login-info {
    p {
      line-height: 28px;
      font-size: 14px;
      color: #999;
      span {
        color: #666;
        margin-left: 60px;
      }
    }
  }
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
      width: 32%;
      margin-bottom: 20px;
    }
    .icon {
      font-size: 30px;
      width: 80px;
      height: 80px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .detail {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .num {
      font-size: 30px;
      margin-bottom: 10px;
    }
    .txt {
      font-size: 14px;
      text-align: center;
      color: #999;
    }
  }
  .graph {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .el-card {
      width: 49%;
    }
  }
}
</style>
