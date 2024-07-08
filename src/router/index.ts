import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../view/HomeView.vue";
import AppLayout from '@/layout/AppLayout.vue';
import MeasurementsView from "@/view/measurements/MeasurementsView.vue";
import Patients from "@/view/measurements/Patients.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[{
        path:"/",
        component: AppLayout,
        children:[
            {
                path:"/",
                name:"home",
                component: HomeView
            },
            {
                path:"/measurements",
                name:"measurements",
                component: MeasurementsView,
                children:[
                    {
                        path:"/patients",
                        name:"patients",
                        component: Patients
                    }
                ]
            }
        ]
    }]
})

export default router;