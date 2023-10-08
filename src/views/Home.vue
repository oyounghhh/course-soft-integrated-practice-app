<template>
    <header>
        <div class="select-hospital">
            <span>xxx医院</span>
            <IconBox width="20px">
                <SvgPullDown />
            </IconBox>
        </div>
        <div class="inbox">
            <IconBox>
                <SvgNotice />
            </IconBox>
        </div>
    </header>
    <main>
        <div class="cover-box">
            <img :src="homeCoverImg" alt="首页封面" />
        </div>
        <nav>
            <ul class="menu-ul">
                <li v-for="menu of menus" class="menu-li">
                    <img :src="menu.img" :alt="menu.title" />
                    <p>
                        <span>{{ menu.title }}</span>
                        <span>{{ menu.info }}</span>
                    </p>
                </li>
            </ul>
        </nav>

        <!-- 我的健康报告 -->
        <div class="home-item">
            <h2>我的健康报告</h2>
            <div class="content report-physical">
                <p>
                    <span> 随时随地查看体检报告 </span>
                    <button>立即查看</button>
                </p>
            </div>
        </div>

        <!-- 推荐医生 -->
        <div class="home-item">
            <h2>推荐医生</h2>
            <div class="content">
                <ul class="recommend-doctor-ul">
                    <li v-for="doctor in doctorRecommend">
                        <img
                            :src="doctor.portrait"
                            alt="人像"
                            class="doctor-portrait"
                        />
                        <span class="doctor-name">{{ doctor.name }} </span>
                        <span class="doctor-info">{{ doctor.info }}</span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 健康评估 -->
        <div class="home-item">
            <h2>健康评估</h2>
            <div class="content">
                <ul class="healthy-assess">
                    <li v-for="item in healthyAssessObjs">
                        <div>
                            <img :src="item.img" :alt="item.info" />
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 健康咨询 -->
        <div class="home-item">
            <h2>健康咨询</h2>
            <div class="content">
                <ul class="health-consult">
                    <li v-for="item in healthConsult">
                        <div class="cover">
                            <img :src="item.coverUrl" :alt="item.intro" />
                        </div>
                        <div class="content">
                            <h3>{{ item.title }}</h3>
                            <p>{{ item.intro }}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </main>
    <FooterNavigate />
</template>

<script setup>
import FooterNavigate from '@/components/FooterNavigate.vue'
import IconBox from '@/components/IconBox.vue'
import SvgNotice from '@/assets/svg/notice.svg'
import SvgPullDown from '@/assets/svg/pull-down.svg'

import homeCoverImg from '@/assets/img/home-cover.png'

import healthConsultImg1 from '@/assets/img/health-consult1.png'
import healthConsultImg2 from '@/assets/img/health-consult2.png'

import assessImg01 from '@/assets/img/assess1.png'
import assessImg02 from '@/assets/img/assess2.png'
import assessImg03 from '@/assets/img/assess3.png'
import assessImg04 from '@/assets/img/assess4.png'
import assessImg05 from '@/assets/img/assess5.png'
import assessImg06 from '@/assets/img/assess6.png'

import menuImg01 from '@/assets/img/menu01.png'
import menuImg02 from '@/assets/img/menu02.png'
import menuImg03 from '@/assets/img/menu03.png'
import menuImg04 from '@/assets/img/menu04.png'
import menuImg05 from '@/assets/img/menu05.png'
import menuImg06 from '@/assets/img/menu06.png'

import doctorPortrait1 from '@/assets/img/doctor1.jpg'
import doctorPortrait2 from '@/assets/img/doctor2.jpg'
import doctorPortrait3 from '@/assets/img/doctor3.jpg'
import doctorPortrait4 from '@/assets/img/doctor4.jpg'
import doctorPortrait5 from '@/assets/img/doctor5.jpg'
import doctorPortrait6 from '@/assets/img/doctor6.jpg'
import doctorPortrait7 from '@/assets/img/doctor7.jpg'
import doctorPortrait8 from '@/assets/img/doctor8.jpg'

const menus = [
    { title: '免费咨询', info: '新兴冠状病毒肺炎', img: menuImg01 },
    { title: '网络问诊', info: '图文视频网络咨询', img: menuImg02 },
    { title: 'e心门诊', info: '复旦医科大学专家', img: menuImg03 },
    { title: '慢病管理', info: '血压血糖健康管理', img: menuImg04 },
    { title: '上门护理', info: '网上购买上门服务', img: menuImg05 },
    { title: '团检预约', info: '团体体检套餐定制', img: menuImg06 },
]

const doctorRecommend = [
    { name: 'A某某', portrait: doctorPortrait1, info: '主任医师' },
    { name: 'B某某', portrait: doctorPortrait2, info: '副主任医师' },
    { name: 'C某某', portrait: doctorPortrait3, info: '主任医师' },
    { name: 'D某某', portrait: doctorPortrait4, info: '主任医师' },
    { name: 'E某某', portrait: doctorPortrait5, info: '主任医师' },
    { name: 'F某某', portrait: doctorPortrait6, info: '主任医师' },
    { name: 'G某某', portrait: doctorPortrait7, info: '主任医师' },
    { name: 'H某某', portrait: doctorPortrait8, info: '主任医师' },
]

const healthyAssessObjs = [
    { img: assessImg01, info: '健康评估' },
    { img: assessImg02, info: '健康评估' },
    { img: assessImg03, info: '健康评估' },
    { img: assessImg04, info: '健康评估' },
    { img: assessImg05, info: '健康评估' },
    { img: assessImg06, info: '健康评估' },
]

const healthConsult = [
    {
        coverUrl: healthConsultImg1,
        title: '查出肺结核，我是不是要得肺癌了？',
        intro: '肺结核一定会导致肺癌吗？',
    },
    {
        coverUrl: healthConsultImg2,
        title: '体检发现甲状腺结节，怎么办？    ',
        intro: '日常需注意什么？',
    },
]
</script>

<style scoped lang="scss">
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

header {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;

    .select-hospital {
        display: flex;
        height: 100%;
        align-items: center;
    }
}
main {
    padding-bottom: 160px;

    ///////////////////封面
    .cover-box {
        margin: 5px;
        height: 100px;
        background-color: #eee;
    }

    ////////////////////导航选项卡
    nav {
        .menu-ul {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 10px;
            padding: 10px;
            .menu-li {
                height: 70px;
                border-radius: 4px;
                box-shadow: 0 0 5px 1px #ccc;
                display: flex;
                align-items: center;
                justify-content: space-evenly;
                img {
                    display: block;
                    width: 40px;
                    height: 40px;
                    object-fit: cover;
                }
                p {
                    display: flex;
                    flex-direction: column;
                    span:first-of-type {
                        font-size: 1.2rem;
                        color: black;
                        margin-bottom: 4px;
                    }
                    span:last-of-type {
                        font-size: 0.8rem;
                        color: #666;
                    }
                }
            }
        }
    }

    //////////////////首页其他选项
    .home-item {
        margin: 10px;

        h2 {
            margin: 10px 0;
            border-left: 4px solid skyblue;
            padding-left: 5px;
            font-size: 1.3rem;
        }

        //////////////////////////体检报告
        .report-physical {
            p {
                margin: 10px 10px 20px 10px;
                display: flex;
                justify-content: space-between;
            }
            button {
                border: none;
                padding: 4px 8px;
                background-color: #127a90;
                border-radius: 4px;
                color: whitesmoke;
                &:active {
                    filter: brightness(1.1);
                }
            }
        }

        ///////////////////////////推荐医生
        .recommend-doctor-ul {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 10px;
            padding: 10px;

            & > li {
                display: flex;
                flex-direction: column;
                align-items: center;

                & > .doctor-portrait {
                    display: block;
                    width: 60px;
                    height: 60px;
                    margin-bottom: 4px;
                    border-radius: 50%;
                    background-color: #ccc;
                }
                & > .doctor-name {
                    color: black;
                    font-size: 1rem;
                    font-weight: bold;
                }
                & > .doctor-info {
                    color: #666;
                    font-size: 0.9rem;
                }
            }
        }

        //////////////////////////健康评估
        .healthy-assess {
            width: 100%;
            overflow: auto;
            display: flex;
            padding-bottom: 10px;
            li {
                flex: 1 0 225px;
                height: 100px;
                margin: 0 10px;
                background-color: #ccc;
            }
        }

        //////////////////////////健康咨询
        .health-consult {
            li {
                width: 100%;
                padding: 10px;
                padding-right: 20px;
                overflow: hidden;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;

                &:not(:last-of-type) {
                    border-bottom: 1px solid #ccc;
                }
            }
            .cover {
                flex: none;
                width: 130px;
                height: 80px;
                margin-right: 10px;
                background-color: #ccc;
            }
            .content {
                width: calc(100% - 130px);
                height: 80px;
                padding: 10px 0;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                h3 {
                    flex: none;
                    width: 100%;
                    margin-bottom: 4px;
                    font-size: 1.2rem;
                    font-weight: bold;
                    color: black;
                    overflow: hidden;
                    overflow-wrap: break-word;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                p {
                    flex: none;
                    font-size: 1rem;
                    color: #666;
                }
            }
        }
    }
}
</style>
