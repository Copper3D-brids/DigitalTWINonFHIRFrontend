<template>
    <n-page-header :subtitle="subtitle" class="page-header-bg">
    <div class="flex flex-row justify-around">
        <slot></slot>
    </div>
    <template #avatar>
      <n-avatar
        :src="avatar"
      />
    </template>
    <template #title>
      <span>
        {{ title }}
      </span>
    </template>
    <template #header>
      <n-breadcrumb>
        <n-breadcrumb-item v-for="(name, i) in breadcrumbs" :key="i">
          <RouterLink v-if="name!=='primary'"  to="/primary/test">
            {{ name }}
          </RouterLink>
            <span v-else>{{ name }}</span>
        </n-breadcrumb-item>
      </n-breadcrumb>
    </template>
    
    <template #extra>
      <slot name="extra"></slot>
    </template>
    <template #footer>
        <p className="justify-items-end text-dark-600 xl:text-left">     
            {{ footer }}
        </p>
    </template>
  </n-page-header>
</template>

<script setup lang="ts">
import { useMessage, NBreadcrumb, NBreadcrumbItem, NPageHeader, NAvatar } from 'naive-ui';

const props = defineProps({
    breadcrumbs: Array<string>,
    avatar: String,
    title: String,
    subtitle: String,
    footer: String
});

const message = useMessage();


</script>

<style scoped>
.page-header-bg {
  @apply p-3 m-3 bg-zinc-100 rounded shadow-md
}
</style>