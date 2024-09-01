<template>
    <div class="main">
        <div class="container">
            <div class="drop size-72 3xl:size-96 shadow-fancy-1" :class="props.class" :style="`--clr:${props.color};`">
                <div class="content">
                    <h2>
                        {{ props.header }}
                    </h2>
                    <p>
                        <slot></slot>
                    </p>
                    <RouterLink :to="props.to"> {{ props.title }} </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// https://9elements.github.io/fancy-border-radius/
const props = defineProps({
    to: {
    type: String,
    default: '/'
    },
    header: {
    type: String,
    default: '01'
    },
    title: {
    type: String,
    default: 'Read More'
    },

    color: {
        type: String,
        default: '#ff0f5b'
    },
    class: {
        type: String,
        default: ''
    }
});
</script>

<style scoped>
@import '../assets/css/google-front.css';

.main {
    font-family: 'Poppins', sans-serif;
}
.container{
    @apply flex justify-center items-center relative flex-wrap gap-x-16 gap-y-10;
}

.container .drop{
    @apply relative transition-all duration-500 ease-in-out flex justify-center items-center hover:rounded-full;
}

.container .drop::before{
  content: '';
  position: absolute;
  top:40px;
  left: 55px;
  width: 30px;
  height: 30px;
  background-color: #fff;
  border-radius: 50%;
  opacity: 0.9;
}
.container .drop::after{
  content: '';
  position: absolute;
  top: 75px;
  left: 80px;
  width: 15px;
  height: 15px;
  background-color: #fff;
  border-radius: 50%;
  opacity: 0.9;
}
.container .drop .content{
  @apply relative flex flex-col items-center justify-center text-center p-10 gap-4
}
.container .drop .content h2{
  position: relative;
  width: 70px;
  height: 70px;
  background-color: #eff0f4;
  border-radius: 50%;
  box-shadow: inset 2px 5px 10px rgba(0, 0, 0, .1),
  inset -2px -5px 10px rgba(255, 255, 255, 1),
  15px 15px 10px rgba(0, 0, 0, .05),
  15px 10px 15px rgba(0, 0, 0, .025);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  color: var(--clr);
}
.container .drop .content a{
  position: relative;
  padding: 10px 25px;
  background-color: var(--clr);
  text-decoration: none;
  color: #fff;
  border-radius: 25px;
  font-weight: 500;
  text-shadow: 0 2px 2px rgba(0, 0, 0, .25);
  opacity: 0.75;
  transition: 0.5s;
}
.container .drop .content a:hover{
  opacity: 1;
}

.container .drop .content a::before{
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 65%;
  height: 5px;
  border-radius: 5px;
  top:6px;
  background-color: rgba(255, 255, 255, 0.4);
}
</style>