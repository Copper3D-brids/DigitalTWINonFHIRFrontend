import { loadFonts } from "./webfontloader";
import pinia from "@/store";
import router from '@/router';

import { App } from "vue";

export function registerPlugins(app: App){
    // loadFonts();
    app.use(router).use(pinia);

    app.config.errorHandler = (err: any, instance, info) => {
        if (err.isAxiosError) {
            console.log('Axios Error:', err);
            return;
          }
        console.error('Global Error:', err, info);
        
        // Redirect to the error page or homepage
        router.push('/error');
    };
}