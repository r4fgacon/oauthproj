<template>
    <div class="Hangman">
        <h1>
            {{ header }}
        </h1>
        <p>
            {{ hint }}
        </p>
        <div class="ProgressFields">
            <div v-for="field in capitalProgressFields" v-bind:key="field.id" class="ProgressField">
            {{ field }}
            </div>
        </div>

        <img alt="" :src="imageSrc()">

        <p v-if="gameOn" class="UsedLetter">
            Used letters:
        </p>
        <div class="UsedLetters">
            <div v-for="letter in usedLetters" v-bind:key="letter.id" class="UsedLetter">
                {{ letter }}

            </div>
        </div>

        <button @click="newGame()">
            New Game
        </button>
    </div>
</template>

<script src="./scripts/mainHangman.ts"></script>

<style src="./styles/hangman.css"></style>