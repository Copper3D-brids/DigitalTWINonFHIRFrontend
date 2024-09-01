import { h, Component, computed} from 'vue';
import {NIcon} from "naive-ui";
import { RouterLink } from 'vue-router';

export function useLayout(){

    const renderIcon = (icon: Component) => {
        return () => h(NIcon, null, { default: () => h(icon) })
    }

    const generateRouterLabel = (routerName:string, labelName: string, params?:{[key:string]:any}, query?:{[key:string]:any}) => {

        return h(
            RouterLink,
            {
                to:{
                    name: routerName,
                    params: params || {},
                    query: query || {}
                },
            },
            {default: ()=> labelName}
        )
        
    }

    return {renderIcon, generateRouterLabel}
}