import { loadFonts } from "./webfontloader";
import pinia from "@/store";
import router from '@/router';

import { App } from "vue";

export function registerPlugins(app: App){
    // loadFonts();
    app.use(router).use(pinia);

    app.config.errorHandler = (err, instance, info) => {
        console.error('Global Error:', err, info);
        console.log('Instance:', instance);
        
        // Redirect to the error page or homepage
        router.push('/error');
    };
}