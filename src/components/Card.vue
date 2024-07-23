<template>
   
   <div class="c_card_container">
        <input type="radio" name="select" id="c_card_slide_1" checked hidden>
        <input type="radio" name="select" id="c_card_slide_2" hidden>
        <input type="radio" name="select" id="c_card_slide_3" hidden>

        <div class="c_card_slider">
            <label for="c_card_slide_1" class="c_card_slide c_card_slide-1"></label>
            <label for="c_card_slide_2" class="c_card_slide c_card_slide-2"></label>
            <label for="c_card_slide_3" class="c_card_slide c_card_slide-3"></label>
        </div>

        <n-flex  align="center" v-for="(d, i) in props.data" class="c_card_detail" :key="i" :class="'c_card_detail-'+ (i+1)"> 
           
            <div class="c_card_img">
                <img :src="d.icon" alt="none"/>
            </div>
            <div class="c_card_content">
                <div class="c_card_title">{{ d.title }}</div>
                <div class="c_card_text">
                     <n-scrollbar class="" content-class="c_card_scrollbar" >
                           <slot :name="'card-slot-'+ i"></slot>
                    </n-scrollbar>
                </div>
            </div>
        </n-flex>
    </div>
    
</template>

<script setup lang="ts">

import { NScrollbar, NFlex } from "naive-ui";
import { defineProps } from 'vue';

interface IData {
    title: string;
    icon: string;
    text: string;
}

const props = defineProps<{ data: IData[] }>();

</script>

<style >

.c_card_container{
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 25px;
    box-shadow: 0 10px 50px rgba(0,0,0,0.3);
    position: relative;
}
.c_card_detail{
    width: 100%;
    height: 100%;
    padding-left: 30px;
    /* 绝对定位 */
    position: absolute;
    /* 溢出隐藏 */
    overflow: hidden;
}
.c_card_detail .c_card_img{
    /* min-width: 50px;
    min-height: 50px; */
    width: 10rem;
    height: 10rem;
    border-radius: 1rem;
    overflow: hidden;
    /* 防止被挤压 */
    flex-shrink: 0;
    box-shadow: 0 10px 50px rgba(0,0,0,0.2);
}
.c_card_detail .c_card_img img{
    width: 100%;
    height: 100%;
    /* 图片默认隐藏 */
    opacity: 0;
    /* 过渡效果 */
    transition: 0.6s;
}
/* 通过单选框的checked来显示指定图片 */
/* ~是兄弟选择器 */
#c_card_slide_1:checked ~ .c_card_detail-1 img,
#c_card_slide_2:checked ~ .c_card_detail-2 img,
#c_card_slide_3:checked ~ .c_card_detail-3 img{
    /* 图片显示 */
    opacity: 1;
    /* 过渡延迟 */
    transition-delay: 0.2s;
}
.c_card_detail .c_card_content{
    flex: 1;
    padding: 0 3rem;
    position: relative;
    /* 默认偏右一点 */
    left: 2rem;
    /* 文本内容默认隐藏 */
    opacity: 0;
    /* 过渡效果 */
    transition: 0.6s;
}
/* 通过单选框的checked来显示指定文本内容 */
#c_card_slide_1:checked ~ .c_card_detail-1 .c_card_content,
#c_card_slide_2:checked ~ .c_card_detail-2 .c_card_content,
#c_card_slide_3:checked ~ .c_card_detail-3 .c_card_content{
    opacity: 1;
    z-index: 9;
    left: 0;
    transition-delay: 0.3s;
}
.c_card_detail .c_card_title{
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 20px;
}
.c_card_detail .c_card_text{
    font-size: 0.8rem;
    color: #555;
    text-align: justify;
    margin-bottom: 25px;
}

.c_card_scrollbar {
    max-height: 120px;
}

/* 指示器 */
.c_card_slider{
    position: absolute;
    bottom: 25px;
    left: 55%;
    transform: translateX(-50%);
    z-index: 1;
}
.c_card_slider .c_card_slide {
    width: 3rem;
    height: 0.6rem;
    background-color: #dfdfdf;
    display: inline-flex;
    margin: 0 3px;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
/* 指示器的黑色进度条 */
.c_card_slider .c_card_slide::before {
    content: "";
    width: 0%;
    height: 100%;
    background-color: #000;
    border-radius: 5px;
    position: absolute;
    left: 0;
    top: 0;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.6s;
}
/* 通过单选框的checked来显示指定指示器的黑色进度条 */
#c_card_slide_1:checked ~ .c_card_slider .c_card_slide-1::before,
#c_card_slide_2:checked ~ .c_card_slider .c_card_slide-2::before,
#c_card_slide_3:checked ~ .c_card_slider .c_card_slide-3::before{
    width: 100%;
    transform: scaleX(1);
}


@media (max-width: 1200px) {
    .c_card_detail .c_card_img {
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        margin-top: 10px;
        width: 7rem;
        height: 7rem;
    }
}

@media (max-width: 992px) {
    
}

@media (max-width: 768px) {

    .c_card_detail .c_card_img {
        width: 5rem;
        height: 5rem;
    }
    .c_card_detail {
        flex-flow: column !important;
        align-items: center !important;
        justify-content: center !important;
        padding-left: 0;
    }
    .c_card_detail .c_card_content {
        margin-bottom: 25px;
        left: 0;
        padding: 0 10px;
    }
    .c_card_slider {
        bottom: 10px;
        left: 50%;
    }
    .c_card_slider .c_card_slide{
        width: 5vw;
        height: 1vh;
    }
}

@media (max-width: 576px) {

    .c_card_detail .c_card_img {
        width: 4rem;
        height: 4rem;
    }
    
} 
</style>