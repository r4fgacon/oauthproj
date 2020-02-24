<template>

  <div class="Auth">

          <button
                  @click="handleClickLogin"
                  :disabled="!isInit"
          >get authCode</button>
          <button
                  @click="handleClickSignIn"
                  v-if="!isSignIn"
                  :disabled="!isInit"
          >sign in</button>
          <button
                  @click="handleClickSignOut"
                  v-if="isSignIn"
                  :disabled="!isInit"
          >sign out</button>
          <i class="fas fa-edit"></i>
          <p>isInit: {{isInit}}</p>
          <p>isSignIn: {{isSignIn}}</p>

  </div>

</template>

<script src="./scripts/mainAuth.js"></script>

<style src="./styles/auth.css"></style>
