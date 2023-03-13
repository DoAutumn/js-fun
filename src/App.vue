<script setup lang="ts">
import axios from "axios"
import { ref } from 'vue';
import { ElMessage } from "element-plus";

const menuList: any = ref([]), fileContent = ref(''), defActive = ref(''), searchValue = ref('');

axios.get(`https://gitee.com/api/v5/gists?access_token=44e933a2118c5bf20add2de1fa664da9`).then(res => {
  const list = res.data.filter((item: any) => item.description !== 'bookmarks')
  list.map((item: any, i: number) => {
    item.files = Object.keys(item.files).map((key: string, j: number) => {
      if (!i && !j) {
        defActive.value = key
        fileContent.value = item.files[key].content
      }
      return { key: key, file: item.files[key] }
    })
    return item
  })
  menuList.value = list
})

const handleClick = (item: any) => {
  fileContent.value = item.file.content
}

const handleCopy = () => {
  navigator.clipboard.writeText(fileContent.value)
  ElMessage({
    showClose: false,
    message: '复制成功.',
    type: 'success',
  })
}

const handleSearch = () => {
  for (let i = 0; i < menuList.value.length - 1; i++) {
    let item = menuList.value[i].files.find((a: any) => a.key.indexOf(searchValue.value) !== -1)
    if (item) {
      defActive.value = item.key
      fileContent.value = item.file.content
      return
    }
  }
  ElMessage({
    showClose: false,
    message: '未检索到相关内容.',
  })
}
</script>

<template>
  <div class="header">
    <div>
      <img src="/vite.svg" class="logo" alt="Vite logo" />
      <span class="title">前端常用代码</span>
    </div>
    <el-input v-model="searchValue" class="search" size="small" placeholder="搜索" @keyup.enter="handleSearch()" />
  </div>
  <div class="main">
    <div class="sidebar">
      <el-menu :default-active="defActive">
        <el-sub-menu v-for="item in menuList" :index="item.id">
          <template #title><span>{{ item.description }}</span></template>
          <el-menu-item v-for="sub in item.files" :index="sub.key" @click="handleClick(sub)">{{ sub.key }}</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="content">
      <template v-if="fileContent">
        <el-button type="primary" size="small" class="copy-btn" @click="handleCopy()">复制代码</el-button>
        <highlightjs language="javascript" :autodetect="false" :code="fileContent"></highlightjs>
      </template>
    </div>
  </div>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #DBDBDB;
  padding: 0 40px 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.search {
  width: 200px;
}

.logo {
  height: 25px;
}

.title {
  font-weight: bold;
  margin-left: 10px;
  font-size: 20px;
}

.main {
  position: relative;
  z-index: 1;
  overflow: hidden;
  padding-top: 50px;
  height: 100%;
}

.sidebar {
  position: fixed;
  z-index: 10;
  top: 50px;
  left: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  border-right: 1px solid #DBDBDB;
  width: 260px;
  padding-top: 10px;
}

.content {
  position: relative;
  margin-left: 260px;
  height: 100%;
  overflow: hidden;
  padding: 0 40px 20px 40px;
  color: #999;
}

.copy-btn {
  position: absolute;
  right: 40px;
  top: 13px;
}
</style>
