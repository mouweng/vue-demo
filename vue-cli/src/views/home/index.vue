<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card :shadow="hover">
        <div class="user">
          <avatar username="mouweng"></avatar>
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登陆时间 : <span>2022-02-15</span></p>
          <p>上次登陆地点 : <span>浙江杭州</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :prop="key"
            :label="val"
            :key="key">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num" style="display: flex;">
        <el-card v-for="item in countData" :key="item.name" :body-style="{display: flex, padding: 0}" style="width: 500px">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
          <div class="detail">
            <p class="num">${{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card></el-card>
      <div class="graph" style="display: flex">
        <el-card style="height: 260px; width: 50%"></el-card>
        <el-card style="height: 260px; width: 50%"></el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import Avatar from 'vue-avatar'
export default {
  name: 'Home',
  data () {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      tableLabel: {
        date: '日期',
        name: '姓名',
        address: '地址'
      },
      countData: [
        {
          name: '今日支付订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日支付订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日支付订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日支付订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日支付订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日支付订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        }
      ]
    }
  },
  components: {
    Avatar
  }
}
</script>

<style>
</style>
