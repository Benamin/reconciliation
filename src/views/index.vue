<template>
  <div class="content">
    <div class="handle">
      <div class="handle-search">
        <span class="title">查&nbsp;&nbsp;询：</span>
        <el-select size="small" placeholder="年" v-model="obj.year">
          <el-option v-for="y of yearMap"
                     :label="y+'年'" :value="y"></el-option>
        </el-select>
        <el-select size="small" placeholder="月" v-model="obj.month">
          <el-option v-for="m of monthMap"
                     :label="m+'月'" :value="m"></el-option>
        </el-select>
        <el-select size="small" placeholder="日" v-model="obj.day">
          <el-option v-for="d of dayMap"
                     :label="d+'号'" :value="d"></el-option>
        </el-select>
        <el-select size="small" placeholder="请选择" v-model="obj.type">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="title">差&nbsp;&nbsp;额：</span>
        <span>{{equalBig}}</span>
        <el-input size="small" v-model="obj.equalBig"
                  placeholder=">=">
        </el-input>

        <span>{{equalSmall}}</span>
        <el-input size="small" v-model="obj.equalSmall"
                  placeholder="<=">
        </el-input>
        <el-button type="primary" size="small">查&nbsp;&nbsp;询</el-button>
        <el-button type="primary" size="small">手工调整</el-button>
      </div>
      <div class="handle-input">
        <span class="title">按比例批量调整：</span>
        CPO:
        <el-input size="small" v-model="CPO"
                  placeholder="CPO">
        </el-input>

        EMP:
        <el-input size="small" v-model="EMP"
                  placeholder="EMP">
        </el-input>
        Hubject:
        <el-input size="small" v-model="Hubject"
                  placeholder="Hubject"
        >
        </el-input>
        <el-button type="primary" size="small">提&nbsp;&nbsp;交</el-button>
        <el-button type="primary" size="small">调整后平账</el-button>
        <el-button type="primary" size="small">回滚已调</el-button>
        <el-button type="primary" size="small">结&nbsp;&nbsp;账</el-button>
        <el-button type="primary" size="small">对账报表</el-button>
        <el-button type="primary" size="small">结账报表发送</el-button>
        <el-select size="small" clearable placeholder="请选择">
          <el-option label="CPO" value="CPO"></el-option>
          <el-option label="EMP" value="EMP"></el-option>
        </el-select>
      </div>
    </div>

    <div class="split-search">
      <el-row class="search" :gutter="20">
        <el-col :span="9">
          <div class="search-head">
            <p>CPO充电明细CDR</p>
            <span class="label">选&nbsp;&nbsp;择：</span>
            <el-select size="small" clearable placeholder="请选择">
              <el-option label="EMP" value="CDR"></el-option>
            </el-select>
            <span class="label"> 充电站ID：</span>
            <el-input size="small"
                      placeholder="充电站ID"
            >
            </el-input>
            <span class="label">充电桩ID：</span>
            <el-input size="small"
                      placeholder="充电桩ID"
            >
            </el-input>
            <span class="label">订单ID：</span>
            <el-input size="small"
                      placeholder="订单ID"
            >
            </el-input>
          </div>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="date"
              label="明细"
              sortable
              width="150">
            </el-table-column>
            <el-table-column
              prop="name"
              label="金额"
              sortable
              width="80">
            </el-table-column>
            <el-table-column
              prop="address"
              label="调整金额">
            </el-table-column>
          </el-table>
          <div class="pagination-div">
            <el-pagination

              layout="prev, pager, next"
              :total="1000">
            </el-pagination>
          </div>
        </el-col>

        <el-col :span="9">
          <div class="search-head">
            <p>EMP用户账单</p>
            <span class="label">选&nbsp;&nbsp;择：</span>
            <el-select size="small" clearable placeholder="请选择">
              <el-option label="EMP" value="EMP"></el-option>
            </el-select>
            <span class="label">用户ID：</span>
            <el-input size="small"
                      placeholder="用户ID"
            >
            </el-input>
            <span class="label">账单ID：</span>
            <el-input size="small"
                      placeholder="账单ID"
            >
            </el-input>
          </div>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="date"
              label="明细"
              sortable
              width="150">
            </el-table-column>
            <el-table-column
              prop="name"
              label="金额"
              sortable
              width="80">
            </el-table-column>
            <el-table-column
              prop="address"
              label="调整金额">
            </el-table-column>
          </el-table>
          <div class="pagination-div">
            <el-pagination

              layout="prev, pager, next"
              :total="1000">
            </el-pagination>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="search-head" style="line-height: 120px">
            <p>处理结果</p>
          </div>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="name"
              sortable
              label="差异金额"
              width="120">
            </el-table-column>
            <el-table-column
              prop="address"
              label="备注">
            </el-table-column>
          </el-table>
          <div class="pagination-div">
            <el-pagination
              :pager-count="5"
              layout="prev, pager, next"
              :total="1000">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="bottom">
      <el-row :gutter="20">
        <el-col :span="8">
          <p>问题订单总金额：<span>200</span></p>
        </el-col>
        <el-col :span="8">
          <p>问题账单总金额：<span>0</span></p>
        </el-col>
        <el-col :span="8">
          <p>总差异金额：<span>200</span></p>
        </el-col>
      </el-row>
    </div>

  </div>
</template>
<script>
  export default {
    data () {
      return {
        equalBig: '>=',
        equalSmall: '<=',

        yearMap: [],
        monthMap: [],
        dayMap: [],

        obj: {
          year: '',
          month: '',
          day: '',
          type: '',
          equalBig: '',
          equalSmall: '',
          CPO: '',
          EMP: '',
          Hubject: '',
        },

        input1: '',
        options: [
          {value: ' 有差异账单'},
          {value: ' 无差异账单'},
          {value: ' 已处理账单'}
        ],
        tableData: [
          {
            date: '入账',
            name: '20000',
            address: '20'
          },
          {
            date: '消费',
            name: '20000',
            address: '20'
          },
          {
            date: '入账',
            name: '20000',
            address: '200'
          }, 
          {
            date: '消费',
            name: '20000',
            address: '100'
          },
          {
            date: '消费',
            name: '20000',
            address: '100'
          },
          {
            date: '消费',
            name: '20000',
            address: '100'
          }
          ]
      }
    },
    created () {
      const y = new Date().getFullYear()
      for (let i = y; i > 2000; i--) {
        this.yearMap.push(i)
      }
      for (let i = 1; i < 13; i++) {
        this.monthMap.push(i)
      }
      for (let i = 1; i < 31; i++) {
        this.dayMap.push(i)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .search {
    p {
      text-align: center;
      font-weight: 600;
    }
  }

  .el-input, .el-select {
    width: 150px;
  }

  .search > .el-col {
    border-right: 1px solid #dddddd;
  }

  .content {
    font-size: 14px;

    .handle > div {
      margin-bottom: 16px;

      > * {
        margin-right: 8px;
      }

      .el-input {
        margin-left: 5px;
      }
    }
  }

  .title {
    display: inline-block;
    width: 150px;
    text-align: right;
    font-weight: 500;
  }

  .label {
    display: inline-block;
    width: 80px;
    text-align: right;
    font-weight: 500;
  }

  .handle {
    padding: 20px 0;
  }

  .handle-input .el-input,
  .handle-search .el-input {
    width: 80px;
  }

  .handle-search .el-select {
    width: 100px;
  }

  .split-search {
    border-top: 1px solid #ddd;
    background-color: aliceblue;
    padding-bottom: 20px;
  }

  .el-table th, .el-table tr,
  .el-table th, .el-table tr {
    background-color: #f8f8f8;
  }

  .bottom {
    font-weight: bolder;
    text-align: center;

    span {
      color: #FF0014;
    }
  }

  .search-head {
    height: 120px;

    > div {
      margin-bottom: 10px;
    }
  }

  //分页
  .pagination-div {
    text-align: center;
  }
</style>
