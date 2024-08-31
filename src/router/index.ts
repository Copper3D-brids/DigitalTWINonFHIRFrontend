import {createRouter, createWebHistory} from "vue-router";
import FHIRView from "../view/fhir/FHIRView.vue";
import AppLayoutFHIR from '@/layout/AppLayoutFHIR.vue';
import MeasurementsView from "@/view/fhir/measurements/MeasurementsView.vue";
import Patients from "@/view/fhir/measurements/Patients.vue";
import AppLayoutAnnotator from "@/layout/AppLayoutAnnotator.vue";
import AnnotatorView from "@/view/annotator/AnnotatorView.vue";
import PrimaryView from "@/view/annotator/measurements/PrimaryView.vue";
import testaaa from "@/view/annotator/measurements/testaaa.vue";
import HomeView from "@/view/home/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path:"/",
            name:"home",
            component: HomeView
        },
        {
            path:"/annotator",
            component: AppLayoutAnnotator,
            children:[
                {
                    path:"/annotator",
                    name:"home-annotator",
                    component: AnnotatorView
                },
                {
                    // path:"/annotator/:name",
                    path:"/annotator/primary",
                    name:"primary",
                    component: PrimaryView
                },
                {
                    path:"/primary/test",
                    name:"annotatortest",
                    component: testaaa
                }
            ]
        },
        {
        path:"/fhir",
        component: AppLayoutFHIR,
        children:[
            {
                path:"/fhir",
                name:"home-fhir",
                component: FHIRView
            },
            {
                path:"/fhir/measurements",
                name:"fhir-measurements",
                component: MeasurementsView,
                children:[
                    {
                        path:"/fhir/measurements/patients",
                        name:"fhir-patients",
                        component: Patients
                    }
                ]
            }
        ]
    }]
})

// @ts-ignore
// router.beforeEach((to, from, next) => {
//     const lastRoute = localStorage.getItem('lastRoute')
//     if (lastRoute && lastRoute.startsWith('/primary') && to.path.startsWith('/primary')) {
//       next('/')
//     } else {
//       next()
//     }
//     localStorage.setItem('lastRoute', to.path)
//   })


export default router;