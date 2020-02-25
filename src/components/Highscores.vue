<template>
    <div class="Highscores">
        <div class="hs">
            <h1> Highscores </h1>
            <div v-for="highscore in highscores" v-bind:key="highscore.id" class="highscore">
                <img :src=highscore.userData.pictureUrl class="picture">
                <p class="name"> {{ highscore.userData.name }}</p>
                <p class="score" >{{ highscore.score }}</p>
            </div>
        </div>

    </div>
</template>

<script src="./scripts/mainHighscores.ts"></script>

<style src="./styles/highscores.css"></style>

