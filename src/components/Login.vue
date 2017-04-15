<template>
  <div class="fit">
    <div id="container">
      <img src="../assets/MarkdownLogo.jpg" alt="">
      <div>
        <div id="fm-inputs">
          <!-- inputs -->
          <label>
            <el-input v-model="username" placeholder="请输入邮箱地址" type="email" @change="checkEmail">
              <i class="el-icon-z-email" slot="prepend"></i>
            </el-input>
            <p v-if="!isEmail">请输入正确的邮箱格式</p>
          </label>
          <label>
            <el-input v-model="password" placeholder="请输入密码" type="password" @change="checkPassword">
              <i class="el-icon-z-password" slot="prepend"></i>
            </el-input>
            <p v-if="!isPasswordLengthEnough">密码长度至少6位</p>
          </label>
        </div>
        <div id="fm-btns">
          <!-- buttons -->
          <el-button size="large" class="btn-login" @click="login">登录</el-button>
          <p>
            还没有账号？注册一个吧~
            <el-button size="small" type="danger" :plain="true">立即注册</el-button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  requestLogin,
  isLoggedIn
} from '../api/api.js'
import {
  emailCheck
} from '../utils/common.js'
export default {
  data() {
      return {
        username: 'a@qq.com',
        password: '111',
        isEmail: true,
        isPasswordLengthEnough: true
      }
    },
    methods: {
      checkEmail: function() {
        this.isEmail = emailCheck(this.username);
      },
      checkPassword: function() {
        this.isPasswordLengthEnough = (this.password.length >= 3);
      },
      login: function() {
        // 输入验证
        if (!(this.username && this.password && this.isEmail && this.isPasswordLengthEnough)) {
          console.log('pass fail');
          this.$message({
            showClose: true,
            message: '邮箱格式或密码长度没有验证通过哦！',
            type: 'error'
          });
          return;
        }

        let _this = this;
        requestLogin(this.username, this.password).then(() => {
          console.log('login success');
          _this.$router.push({
            name: 'editor'
          })
        }, (err) => {
          console.log(err);
          let errorLoginMsg
          switch (err.code) {
            case 211:
              errorLoginMsg = "用户不存在，立即注册一个吧~";
              _this.username = '';
              _this.password = '';
              break;
            case 210:
              errorLoginMsg = "用户名与密码不匹配，请重新输入密码。";
              _this.password = '';
              break;
            default:
              errorLoginMsg = "赶紧注册一个账号并开始使用吧~~";
              break;
          }
          _this.$message({
            showClose: true,
            message: errorLoginMsg,
            type: 'error'
          });
        })

      }
    },
    created: function() {
      if (isLoggedIn()) {
        this.$router.push({
          name: 'editor'
        })
      }
    }
}
</script>
<style scoped>
.fit {
  width: 100%;
  height: 100%;
  background: url('../assets/LoginBackgroundImage.png') center center;
  background-size: cover;
  position: relative;
}

#container {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  text-align: center;
}

#container img {
  width: 200px;
  border-radius: 50%;
  border: 1px solid #fff;
  background-color: #fff;
  margin-bottom: 20px;
}

#fm-inputs {
  margin: 0 auto;
  width: 300px;
}

#fm-inputs label {
  display: block;
  margin-bottom: 10px;
}

#fm-inputs p {
  font-size: 14px;
  font-family: "微软雅黑";
  color: red;
  text-align: left;
  padding-left: 40px;
  margin-top: 5px;
}

#fm-btns .btn-login {
  width: 300px;
  margin-bottom: 10px;
}

#fm-btns p {
  font-size: 12px;
}
</style>
