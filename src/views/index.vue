<template>
  <div class="content">
    <el-button @click="login">登录</el-button>
    <div class="handle">
      <el-row :gutter="20">
        <el-col :span="12" class="search-left">
          <div class="handle-search">
            <span class="title" style="width: 60px;">查&nbsp;&nbsp;询：</span>
            <el-select size="small" placeholder="年" v-model="obj.year">
              <el-option v-for="y of yearMap" :key="y"
                         :label="y+'年'" :value="y"></el-option>
            </el-select>
            <el-select size="small" placeholder="月" v-model="obj.month">
              <el-option v-for="m of monthMap" :key="m"
                         :label="m+'月'" :value="m"></el-option>
            </el-select>
            <el-select size="small" placeholder="日" v-model="obj.day">
              <el-option v-for="d of dayMap" :key="d"
                         :label="d+'号'" :value="d"></el-option>
            </el-select>
            <el-select size="small" placeholder="请选择" style="width: 120px;" v-model="obj.type">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button type="primary" size="small">查&nbsp;&nbsp;&nbsp;询</el-button>
          </div>
          <div class="handle-input">
            <span class="title" style="width: 60px;">操&nbsp;&nbsp;作：</span>
            <el-button type="primary" size="small">调整后平账</el-button>
            <el-button type="primary" size="small">回滚已调</el-button>
            <el-button type="primary" size="small">结&nbsp;&nbsp;&nbsp;账</el-button>
            <el-button type="primary" size="small">对账报表</el-button>
            <el-button type="primary" size="small">结账报表发送</el-button>
            <el-select size="small" clearable v-model="obj.type" style="width: 120px;" placeholder="请选择">
              <el-option label="CPO" value="CPO"></el-option>
              <el-option label="EMP" value="EMP"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="12" class="search-right">
          <div class="handle-search">
            <span class="title">差&nbsp;&nbsp;额：</span>
            <span>{{equalBig}}</span>
            <el-input size="small" v-model="obj.equalBig"
                      placeholder=">=">
            </el-input>

            <span>{{equalSmall}}</span>
            <el-input size="small" v-model="obj.equalSmall"
                      placeholder="<=">
            </el-input>
            <el-button type="primary" size="small">查&nbsp;&nbsp;&nbsp;询</el-button>
          </div>
          <div class="handle-input">
            <span class="title">按比例批量调整：</span>
            CPO:
            <el-input size="small" v-model="obj.CPO"
                      placeholder="CPO">
            </el-input>

            EMP:
            <el-input size="small" v-model="obj.EMP"
                      placeholder="EMP">
            </el-input>
            Hubject:
            <el-input size="small" v-model="obj.Hubject"
                      placeholder="Hubject"
            >
            </el-input>
            <el-button type="primary" size="small">提&nbsp;&nbsp;&nbsp;交</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="split-search">
      <el-row class="search" :gutter="20">
        <el-col :span="9">
          <div class="search-head">
            <p>CPO充电明细CDR</p>
            <div class="head-item">
              <span class="label">选&nbsp;&nbsp;择：</span>
              <el-select size="small" v-model="obj.value1" clearable placeholder="请选择">
                <el-option label="CPO" value="CPO"></el-option>
              </el-select>
              <span class="label"> 充电站ID：</span>
              <el-input size="small" v-model="obj.value2"
                        placeholder="充电站ID">
              </el-input>
            </div>
            <div class="head-item">
              <span class="label">充电桩ID：</span>
              <el-input size="small" v-model="obj.value3"
                        placeholder="充电桩ID">
              </el-input>
              <span class="label">订单ID：</span>
              <el-input size="small" v-model="obj.value4"
                        placeholder="订单ID">
              </el-input>
            </div>
          </div>
          <el-table
            :data="tableData1"
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
        </el-col>

        <el-col :span="9">
          <div class="search-head">
            <p>EMP用户账单</p>
            <div class="head-item">
              <span class="label">选&nbsp;&nbsp;择：</span>
              <el-select size="small" v-model="obj.value7" clearable placeholder="请选择">
                <el-option label="EMP" value="EMP"></el-option>
              </el-select>
              <span class="label">用户ID：</span>
              <el-input size="small" v-model="obj.value5"
                        placeholder="用户ID">
              </el-input>
            </div>
            <div class="head-item">
              <span class="label">账单ID：</span>
              <el-input size="small" v-model="obj.value6"
                        placeholder="账单ID">
              </el-input>
            </div>
          </div>
          <el-table
            :data="tableData2"
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
            :data="tableData3"
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
        </el-col>
      </el-row>
    </div>

    <div class="bottom">
      <el-row :gutter="20">
        <el-col :span="9">
          <p>问题订单总金额：<span>200</span></p>
        </el-col>
        <el-col :span="9">
          <p>问题账单总金额：<span>0</span></p>
        </el-col>
        <el-col :span="6">
          <p>总差异金额：<span>200</span></p>
        </el-col>
      </el-row>
    </div>

  </div>
</template>
<script>
  import md5 from 'js-md5';
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
          value1: '',
          value2: '',
          value3: '',
          value4: '',
          value5: '',
          value6: '',
          value7: ''
        },

        input1: '',
        options: [
          {value: ' 有差异账单'},
          {value: ' 无差异账单'},
          {value: ' 已处理账单'}
        ],
        tableData1: [
          {
            date: '入账',
            name: true,
            address: '0'
          },
          {
            date: '消费',
            name: false,
            address: '0'
          },
          {
            date: '入账',
            name: '20.45',
            address: '0'
          },
          {
            date: '消费',
            name: '9.00',
            address: '0'
          },
          {
            date: '消费',
            name: '30.50',
            address: '0'
          },
          {
            date: '消费',
            name: '34.00',
            address: '0'
          },
          {
            date: '消费',
            name: '29.56',
            address: '0'
          },
          {
            date: '消费',
            name: '16.97',
            address: '0'
          },
          {
            date: '入账',
            name: '22.00',
            address: '0'
          }
        ],
        tableData2: [
          {
            date: '入账',
            name: '35.00',
            address: '0'
          },
          {
            date: '消费',
            name: '23.00',
            address: '0'
          },
          {
            date: '入账',
            name: '8.54',
            address: '0'
          },
          {
            date: '消费',
            name: '23.90',
            address: '0'
          },
          {
            date: '消费',
            name: '34.00',
            address: '0'
          },
          {
            date: '消费',
            name: '21.00',
            address: '0'
          },
          {
            date: '消费',
            name: '7.00',
            address: '0'
          },
          {
            date: '消费',
            name: '23.65',
            address: '0'
          },
          {
            date: '入账',
            name: '23.56',
            address: '0'
          }
        ],
        tableData3: [
          {
            date: '入账',
            name: '28.65',
            address: '0'
          },
          {
            date: '消费',
            name: '12.45',
            address: '0'
          },
          {
            date: '入账',
            name: '11.91',
            address: '0'
          },
          {
            date: '消费',
            name: '14.90',
            address: '0'
          },
          {
            date: '消费',
            name: '3.50',
            address: '0'
          },
          {
            date: '消费',
            name: '13.00',
            address: '0'
          },
          {
            date: '消费',
            name: '22.56',
            address: '0'
          },
          {
            date: '消费',
            name: '6.68',
            address: '0'
          },
          {
            date: '入账',
            name: '1.56',
            address: '0'
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
    },
    methods: {
      login(){
        const d = Date.now()
        const timeStamp = Math.round(d / 1000) + ''
        const nonce = this.uuidNum()
        const content = {
          'stationNo': '6000000',
          'stationBranch': '',
          'userName': '吴超',
          'password': '88888',
        }
        const sign = `appId=52492bf5765840b192fac6c7ca3d10c8&secretKey=48c85555fbf14d489536070b32c6998f&timeStamp=${timeStamp}&nonce=${nonce}&content=${JSON.stringify(content)}`
        console.log(sign)
        const header = {
          timeStamp: timeStamp,
          nonce: nonce,
          appId: '52492bf5765840b192fac6c7ca3d10c8',
          sign: md5(sign)
        }
        this.$api.userlogin(content, header, res => {
          console.log(res)
        })
      },
      /** 产生一个随机的15位长度整数 */
      uuidNum () {
        let text = ''
        const possible = '0123456789'
        text += possible.charAt(Math.floor(Math.random() * possible.length))
        return text + new Date().getTime()
      }
    }
  }
</script>
<style lang="scss">
  .search {
    p {
      text-align: center;
      font-weight: 600;
    }
  }

  .el-input, .el-select {
    width: 150px;
  }

  .search > .el-col:nth-child(2n) {
    border-right: 1px solid #dddddd;
    border-left: 1px solid #dddddd;
  }

  .content {
    font-size: 14px;

    .handle > div {
      .el-input {
        margin-left: 5px;
      }
    }
  }

  .search-left,
  .search-right {
    border: 1px solid #409eff;
    padding: 20px 10px;
    margin-left: -1px;
  }

  .title {
    display: inline-block;
    width: 120px;
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

  .handle-search {
    margin-bottom: 20px;
  }

  .split-search {
    border-top: 1px solid #ddd;
    background-color: aliceblue;
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

  .el-table {
    tr:nth-child(2n) {
      background-color: #f0f8ff;
    }
  }
</style>
