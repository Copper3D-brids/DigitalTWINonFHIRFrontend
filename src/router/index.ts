import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../view/fhir/HomeView.vue";
import AppLayoutFHIR from '@/layout/AppLayoutFHIR.vue';
import MeasurementsView from "@/view/fhir/measurements/MeasurementsView.vue";
import Patients from "@/view/fhir/measurements/Patients.vue";
import AppLayoutAnnotator from "@/layout/AppLayoutAnnotator.vue";
import HomeViewAnnotator from "@/view/annotator/HomeView.vue";
import PrimaryView from "@/view/annotator/measurements/PrimaryView.vue";
import testaaa from "@/view/annotator/measurements/testaaa.vue";
import ts from "typescript";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path:"/",
            component: AppLayoutAnnotator,
            children:[
                {
                    path:"/",
                    name:"home-annotator",
                    component: HomeViewAnnotator
                },
                {
                    // path:"/annotator/:name",
                    path:"/annotator",
                    name:"annotator",
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
                component: HomeView
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
router.beforeEach((to, from, next) => {
    const lastRoute = localStorage.getItem('lastRoute')
    if (lastRoute && lastRoute.startsWith('/annotator') && to.path.startsWith('/annotator')) {
      next('/')
    } else {
      next()
    }
    localStorage.setItem('lastRoute', to.path)
  })


export default router;