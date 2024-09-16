import {createRouter, createWebHistory, createWebHashHistory} from "vue-router";
import AdminFHIRView from "../view/fhir/admin-fhir/AdminFHIRView.vue";
import AppLayoutFHIR from '@/layout/AppLayoutFHIR.vue';
import MeasurementsView from "@/view/fhir/admin-fhir/measurements/MeasurementsView.vue";
import Patients from "@/view/fhir/admin-fhir/measurements/Patients.vue";
import AppLayoutAnnotator from "@/layout/AppLayoutAnnotator.vue";
import AnnotatorView from "@/view/annotator/AnnotatorView.vue";
import Annotator from "@/view/annotator/index.vue";
import PrimaryView from "@/view/annotator/measurements/PrimaryView.vue";
import testaaa from "@/view/annotator/measurements/testaaa.vue";
import HomeView from "@/view/home/HomeView.vue";
import WorkflowView from "@/view/annotator/workflow/WorkflowView.vue";
import LoginView from "@/view/home/LoginView.vue";
import AppLayoutHome from "@/layout/AppLayoutHome.vue";
import FHIRResource from "@/view/fhir/user-fhir/index.vue";
import { decryptKey } from '@/view/home/components/utils';

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path:"/",
            component: AppLayoutHome,
            children:[
                {
                    path:"/",
                    name:"home",
                    component: HomeView,
                },
                {
                    path:"/login",
                    name:"login",
                    component: LoginView
                },
            ]
        },
        {
            path:"/annotator",
            name:"index-annotator",
            component: Annotator
        },
        {
            path:"/annotator",
            component: AppLayoutAnnotator,
            children:[
                {
                    //query parameter {type: "measurements"| "workflow" | "workflow tool" | "workflow tool process"}
                    path:"/annotator",
                    name:"home-annotator",
                    component: AnnotatorView
                },
                {
                    // path:"/annotator/:name",
                    path:"/measurements",
                    name:"measurements",
                    component: PrimaryView
                },
                {
                    // path:"/annotator/:name",
                    path:"/workflow",
                    name:"workflow",
                    component: WorkflowView
                },
                {
                    path:"/primary/test",
                    name:"annotatortest",
                    component: testaaa
                }
            ]
        },
        {
            path:"/admin-fhir",
            component: AppLayoutFHIR,
            meta: { requiresAuth: true, requiresAdmin: true },
            children:[
                {
                    path:"/admin-fhir",
                    name:"admin-home-fhir",
                    component: AdminFHIRView,
                },
                {
                    path:"/fhir-details",
                    name:"fhir-details",
                    component: FHIRResource,
                },
                {
                    path:"/admin-fhir/measurements",
                    name:"admin-fhir-measurements",
                    component: MeasurementsView,
                    children:[
                        {
                            path:"/admin-fhir/measurements/patients",
                            name:"admin-fhir-patients",
                            component: Patients
                        }
                    ]
                }
            ]
        },
        {
            path: "/error",
            name: "error",
            component: () => import("@/view/error/index.vue")
        }
    ]
})

// @ts-ignore
router.beforeEach((to, from, next) => {
    let isAuthenticated = false;
    let userRole = '';
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const localData = typeof window !== "undefined" ? window.localStorage.getItem('adminAccessKey') : null;

        if(!!localData) {
            const decryptedData = decryptKey(localData);
            const timestamp = decryptedData.split('-')[2];
            const diff = Date.now() - parseInt(timestamp);
            if(diff < 1000 * 60 * 30){
                isAuthenticated = true;
                userRole = decryptedData.split('-')[0];
            }else{
                localStorage.removeItem('accessKey');
            }

        }
        if (!isAuthenticated) {
            next({ name: 'login' });
        } else if (to.matched.some(record => record.meta.requiresAdmin) && userRole !== 'admin') {
            console.log('not admin');
            next({ name: 'login' });
        } else {
            next();
        }
    } else {
      next(); 
    }
  });

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