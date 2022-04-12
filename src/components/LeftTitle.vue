<template>
    <h3>
        <slot></slot>
    </h3>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
h3{
    font-weight: bold;
    font-size: 1.05rem;
    border-left: 2px solid #d33a31;
    margin: 16px 0;
    padding-left: 0.5rem;
}
</style>