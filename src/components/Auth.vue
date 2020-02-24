<template>

  <div class="Auth">
          <p></p>
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


      <p v-if="isSignIn">{{ login() }}</p>
  </div>

</template>

<script src="./scripts/mainAuth.js"></script>

<style src="./styles/auth.css"></style>
