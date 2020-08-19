<template>
  <div id="app">
    <div v-if="!hasLogin">
      <input v-model="username" placeholder="请输入用户名"/>
      <input v-model="password" placeholder="请输入密码"/>
      <button @click="handleLogin">login</button>
    </div>
   
    <div v-else>
      <h1>home</h1>
      <button @click="handleClick">test jwt</button>  &nbsp;
     <button @click="handleLoginOut">loginOut</button>
    </div>
    
  </div>
</template>

<script>
// import "../env";
import { login, loginOut, getUserInfor} from './api/user'
import { setToken } from './utils/auth'

export default {
  name: "App",
  data() {
    return {
      username: "",
      password: "",
      hasLogin: false
    };
  },
  mounted() {
   // console.log(window.env.apiUrl)
  },
  methods: {
   handleClick(){
      getUserInfor("").then(res => {
        console.log(res)
      });
    },
    async handleLogin(){
      let res = await login({username: this.username , password: this.password})
      console.log(res)
      if(res.code == 200){
        setToken(res.token)
        this.hasLogin = true
      }
    },
    async handleLoginOut(){
       let res = await loginOut()
       if(res.code == 200){
        setToken(null)
        this.hasLogin = false
      }
    }
  }
};
</script>