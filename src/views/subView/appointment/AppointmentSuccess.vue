<template>
    <ViewHeader title="预约成功"></ViewHeader>

    <main>
        <div class="top">
            <span class="iconbox">
                <IconBox width="50px" height="50px">
                    <SvgSuccess />
                </IconBox>
            </span>
            <h1>恭喜预约成功！</h1>
            <p>请体检用户携带本人身份证到店认证</p>
        </div>
        <button class="a-text font-bold">查看订单</button>
        <button class="a-button">继续为家人预约</button>
        <div class="info">
            <p class="font-color-not-main">您的信息已经发送至体检机构</p>
            <p class="font-color-not-main">预约成功后会发送短信至您的手机</p>
            <p class="font-color-not-main">客服电话<span>4008-XXX-XXX</span></p>
        </div>
    </main>
</template>

<script setup>
import ViewHeader from '@/components/ViewHeader.vue'
import IconBox from '@/components/IconBox.vue'
import SvgSuccess from '@/assets/svg/success.svg'
</script>

<style scoped lang="scss">
main {
    display: flex;
    flex-direction: column;
    align-items: center;

    --color: #00c6a4;

    .top {
        width: 100%;
        margin-bottom: 30px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        position: relative;

        --bg-height: 140px;

        &::before {
            content: '';
            position: absolute;
            width: 100%;
            height: var(--bg-height);
            top: 0;
            left: 0;
            background: linear-gradient(0deg, var(--color), #00a5c8);
        }

        .iconbox {
            margin-top: var(--bg-height);
            transform: translateY(-50%);
            background: white;
            padding: 20px;
            border-radius: 50%;

            :deep(path) {
                fill: var(--color);
            }
        }
        h1 {
            color: var(--color);
            margin-bottom: 20px;
        }
    }

    button {
        border: none;
        background: transparent;
    }
    .a-text {
        color: var(--color);
        font-size: 1.2rem;
        margin: 10px;
    }
    .a-button {
        width: 300px;
        height: 50px;
        margin: 20px;
        background: linear-gradient(45deg, var(--color), #00a5c8);
        color: white;
        font-size: 1.2rem;
        border-radius: 5px;
    }

    .info {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        p {
            margin: 6px;
        }
    }
}
</style>
