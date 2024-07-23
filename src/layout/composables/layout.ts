import { h, Component, computed} from 'vue';
import {NIcon} from "naive-ui";
import { h } from 'vue';
import { RouterLink } from 'vue-router';

export function useLayout(){

    const renderIcon = (icon: Component) => {
        return () => h(NIcon, null, { default: () => h(icon) })
    }

    const generateRouterLabel = (routerName:string, labelName: string, name: string|null=null) => {

        return h(
            RouterLink,
            {
                to:{
                    name: routerName,
                    params: { },
                    query: {name}
                },
            },
            {default: ()=> labelName}
        )
        
    }

    return {renderIcon, generateRouterLabel}
}