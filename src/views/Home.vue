<template>
    <header>
        <div class="select-hospital">
            <span>xxx医院</span>
            <span>v</span>
        </div>
        <div class="inbox">
            <span>消息</span>
        </div>
    </header>
    <main>
        <div class="cover-box"></div>
        <nav>
            <ul class="main-options">
                <li class="main-option option-item">
                    <i></i>
                    <p>
                        <span>免费咨询</span>
                        <span>新兴冠状病毒肺炎</span>
                    </p>
                </li>
                <li class="main-option option-item">
                    <i></i>
                    <p>
                        <span>网络问诊</span>
                        <span>图文视频网络咨询</span>
                    </p>
                </li>
                <li class="main-option option-item">
                    <i></i>
                    <p>
                        <span>e心门诊</span>
                        <span>复旦医科大学专家</span>
                    </p>
                </li>
                <li class="main-option option-item">
                    <i></i>
                    <p>
                        <span>慢病管理</span>
                        <span>血压血糖健康管理</span>
                    </p>
                </li>
                <li class="main-option option-item">
                    <i></i>
                    <p>
                        <span>上门护理</span>
                        <span>网上购买上门服务</span>
                    </p>
                </li>
                <li class="main-option option-item">
                    <i></i>
                    <p>
                        <span>团检预约</span>
                        <span>团体体检套餐定制</span>
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
                    <li v-for="doctor in doctorRecommend" class="">
                        <i class="doctor-portrait"></i>
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
                        <div></div>
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
                        <div class="cover"></div>
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

const doctorRecommend = [
    {
        name: 'A某某',
        info: '主任医师',
    },
    {
        name: 'B某某',
        info: '副主任医师',
    },
    {
        name: 'C某某',
        info: '主任医师',
    },
    {
        name: 'D某某',
        info: '主任医师',
    },
    {
        name: 'E某某',
        info: '主任医师',
    },
    {
        name: 'F某某',
        info: '主任医师',
    },
    {
        name: 'G某某',
        info: '主任医师',
    },
    {
        name: 'H某某',
        info: '主任医师',
    },
]

const healthyAssessObjs = ['', '', '', '', '', '', '']

const healthConsult = [
    {
        title: '查出肺结核，我是不是要得肺癌了？',
        intro: '肺结核一定会导致肺癌吗？',
    },
    {
        title: '体检发现甲状腺结节，怎么办？    ',
        intro: '日常需注意什么？',
    },
]
</script>

<style scoped>
header {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
}
main {
    padding-bottom: 160px;
}
main .cover-box {
    margin: 5px;
    height: 100px;
    background-color: #eee;
}

/* ---------------选项卡-------------- */

.main-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    padding: 10px;
}
.main-option {
    height: 70px;
    border-radius: 4px;
    box-shadow: 0 0 5px 1px #ccc;
}

.option-item {
    display: flex;
    align-items: center;
    justify-content: center;
}
.option-item i {
    display: block;
    width: 40px;
    height: 40px;
}
.option-item p {
    display: flex;
    flex-direction: column;
}
.option-item p span:first-of-type {
    font-size: 1.2rem;
    color: black;
    margin-bottom: 4px;
}
.option-item p span:last-of-type {
    font-size: 0.8rem;
    color: #666;
}

/* --------------首页其他选项--------------- */

.home-item {
    margin: 10px;
}
.home-item h2 {
    margin: 10px 0;
    border-left: 4px solid skyblue;
    padding-left: 5px;
    font-size: 1.3rem;
}

/* ---------体检报告 */
.report-physical p {
    margin: 10px 10px 20px 10px;
    display: flex;
    justify-content: space-between;
}
.report-physical button {
    border: none;
    padding: 4px 8px;
    background-color: #127a90;
    border-radius: 4px;
    color: whitesmoke;
}
.report-physical button:active {
    filter: brightness(1.1);
}
/* ---------推荐医生 */
.recommend-doctor-ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    padding: 10px;
}
.recommend-doctor-ul > li {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.recommend-doctor-ul > li > .doctor-portrait {
    display: block;
    width: 60px;
    height: 60px;
    margin-bottom: 4px;
    border-radius: 50%;
    background-color: #ccc;
}
.recommend-doctor-ul > li > .doctor-name {
    color: black;
    font-size: 1rem;
    font-weight: bold;
}
.recommend-doctor-ul > li > .doctor-info {
    color: #666;
    font-size: 0.9rem;
}

/* ----------健康评估 */
.healthy-assess {
    width: 100%;
    overflow: auto;
    display: flex;
    padding-bottom: 10px;
}
.healthy-assess li {
    flex: 1 0 150px;
    height: 100px;
    margin: 0 10px;
    background-color: #ccc;
}

/* ----------健康咨询 */
.health-consult li {
    width: 100%;
    padding: 10px;
    padding-right: 20px;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.health-consult li:not(:last-of-type) {
    border-bottom: 1px solid #ccc;
}

.health-consult li .cover {
    flex: none;
    width: 130px;
    height: 80px;
    margin-right: 10px;
    background-color: #ccc;
}

.health-consult li .content {
    width: calc(100% - 130px);
    height: 80px;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.content h3 {
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
.content p {
    flex: none;
    font-size: 1rem;
    color: #666;
}
</style>
