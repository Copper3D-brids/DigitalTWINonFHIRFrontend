import { h, Component, computed} from 'vue';
import {NIcon} from "naive-ui";

export function useLayout(){

    const renderIcon = (icon: Component) => {
        return () => h(NIcon, null, { default: () => h(icon) })
    }

    return {renderIcon}
}