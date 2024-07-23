<template>
    <n-flex justify="center" align="center" style="height: 100%; padding: 5px 0px;">
        <n-icon size="20">
            <earth-icon/>
        </n-icon>

        <n-gradient-text type="error">
            Auckland Bioengineering Institute
        </n-gradient-text>
    </n-flex>
</template>

<script setup lang="ts">
import { NFlex, NIcon, NGradientText} from 'naive-ui';
import { useIcons } from '@/layout/composables/icons';

const {EarthIcon} = useIcons();
</script>

<style scoped>

</style>