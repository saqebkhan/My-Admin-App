<template>
  <div class="container">
    <div v-if="!authenticated">
      <button @click="login" style="margin: 20px; float: right">
        Admin Login
      </button>
    </div>
    <div v-else>
      <button @click="logout" style="float: right; margin: 5px; display: block">
        Logout
      </button>
      <h2
        style="
          font-family: sans-serif;
          color: #6a5acd;
          text-align: center;
          font-weight: bold;
          margin: 25px;
        "
      >
        You are logged in as an administrator
      </h2>
    </div>
    <CrudOperation :isAthenticated="authenticated" />
  </div>
</template>

<script>
import { graphScopes } from "./config";
import { myMSALObj } from "./config";
import CrudOperation from "./CrudOperation.vue";
export default {
  components: { CrudOperation },
  data() {
    return {
      authenticated: false,
    };
  },
  methods: {
    async login() {
      try {
        await myMSALObj.loginPopup(graphScopes);
        sessionStorage.setItem("clientId", myMSALObj.clientId);
        this.authenticated = true;
      } catch (err) {
        console.error(err);
      }
    },
    async logout() {
      try {
        await myMSALObj.logout();
        sessionStorage.removeItem("clientId");
        this.authenticated = false;
      } catch (err) {
        console.error(err);
      }
    },
  },
  created() {
    if (sessionStorage.getItem("clientId") === myMSALObj.clientId) {
      console.log(myMSALObj);
      this.authenticated = true;
      console.log(this.authenticated);
    } else {
      this.authenticated = false;
      console.log(this.authenticated);
    }
  },
};
</script>
