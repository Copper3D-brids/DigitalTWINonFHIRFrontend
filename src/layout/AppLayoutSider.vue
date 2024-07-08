<template>
   <n-layout-sider
        collapse-mode="width"
        :collapsed-width="60"
        :width="240"

        :native-scrollbar="false"
        bordered
        show-trigger="bar"
    >
        <n-menu
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
        />
    </n-layout-sider>
</template>

<script setup lang="ts">
import { NLayoutSider, NMenu  } from 'naive-ui';
import { defineComponent, h, Component } from 'vue';
import { RouterLink } from 'vue-router';
import { useLayout } from '@/layout/composables/layout';
import { useIcons } from '@/layout/composables/icons';


const { renderIcon } = useLayout();
const {CogIcon, LaptopIcon, GameControllerIcon, RocketIcon, LibraryIcon,} = useIcons();

const generateRouterLabel = (routerName:string, labelName: string) => {
    return h(
        RouterLink,
        {
            to:{
                name: routerName
            }
        },
        {default: ()=> labelName}
    )
}

const menuOptions = [
  {
    label: () => generateRouterLabel("home", "Home"),
    key: 'overall',
    icon: renderIcon(LaptopIcon)
  },
  {
    label: () => generateRouterLabel("measurements", "Measurements"),
    key: 'primary-measurements',
    disabled: false,
    icon: renderIcon(LibraryIcon),
    children: [
        {
          label: () => generateRouterLabel("patients", "Patients"),
          key: 'patients',
          icon: renderIcon(CogIcon),
        },
    ]
  },
  {
    label: 'Workflow',
    key: 'Workflow',
    icon: renderIcon(RocketIcon),
    children: [
      {
        label: 'Workflow Tools',
        key: 'tools',
        icon: renderIcon(CogIcon),
      },
      {
        label: 'Workflow process',
        key: 'process',
        icon: renderIcon(GameControllerIcon)
      },
    ]
  }
]
</script>

<style scoped>

</style>