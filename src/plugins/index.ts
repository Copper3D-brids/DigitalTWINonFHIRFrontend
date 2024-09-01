import { loadFonts } from "./webfontloader";
import pinia from "@/store";
import router from '@/router';

import { App } from "vue";

export function registerPlugins(app: App){
    // loadFonts();
    app.use(router).use(pinia)
}