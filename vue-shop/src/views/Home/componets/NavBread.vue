<template>
  <div class="container">
    <el-breadcrumb class="nav" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <slot name="bread"></slot>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {};
</script>

<style  lang="scss" scoped>
.container {
  padding: 20px 0;
}
</style>