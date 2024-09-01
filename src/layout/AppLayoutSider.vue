<template>
   <n-layout-sider
        collapse-mode="width"
        :collapsed-width="60"
        :width="width"
        :native-scrollbar="false"
        bordered
        show-trigger="bar"
        class="bg-transparent shadow-sm"
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
import { reactive, toRefs} from "vue";


type Props = {
  width: number,
  menuOptions: any[]
};

let p = withDefaults(defineProps<Props>(), {
  width:240,
  menuOptions: () => [] 
});
const state = reactive(p);
const { menuOptions, width } = toRefs(state);



</script>

<style scoped>

</style>