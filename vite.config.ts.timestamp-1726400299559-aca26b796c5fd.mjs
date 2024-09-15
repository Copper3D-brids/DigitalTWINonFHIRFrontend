// vite.config.ts
import { defineConfig } from "file:///C:/Users/lgao142/Desktop/Development/dev/DigitalTwinFHIRAPP/digitaltwin-fhir-frontend-pwa/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/lgao142/Desktop/Development/dev/DigitalTwinFHIRAPP/digitaltwin-fhir-frontend-pwa/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { VitePWA } from "file:///C:/Users/lgao142/Desktop/Development/dev/DigitalTwinFHIRAPP/digitaltwin-fhir-frontend-pwa/node_modules/vite-plugin-pwa/dist/index.js";
import { fileURLToPath, URL } from "url";
import vueDevTools from "file:///C:/Users/lgao142/Desktop/Development/dev/DigitalTwinFHIRAPP/digitaltwin-fhir-frontend-pwa/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/lgao142/Desktop/Development/dev/DigitalTwinFHIRAPP/digitaltwin-fhir-frontend-pwa/vite.config.ts";
var vite_config_default = defineConfig({
  // base: import.meta.env.BASE_URL || '/app',
  plugins: [vue(), vueDevTools(), VitePWA({
    registerType: "prompt",
    injectRegister: false,
    pwaAssets: {
      disabled: false,
      config: true
    },
    manifest: {
      name: "DTsoFHIR",
      short_name: "DTsoFHIR",
      description: "A visualisation panel for display the FHIR data in Digital platform.",
      theme_color: "#ffffff"
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
      cleanupOutdatedCaches: true,
      clientsClaim: true
    },
    devOptions: {
      enabled: true,
      navigateFallback: "index.html",
      suppressWarnings: true,
      type: "module"
    }
  })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  base: "/DigitalTWINonFHIRFrontend/",
  build: {
    outDir: "./build",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    host: "0.0.0.0",
    port: 3005,
    open: true,
    cors: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsZ2FvMTQyXFxcXERlc2t0b3BcXFxcRGV2ZWxvcG1lbnRcXFxcZGV2XFxcXERpZ2l0YWxUd2luRkhJUkFQUFxcXFxkaWdpdGFsdHdpbi1maGlyLWZyb250ZW5kLXB3YVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbGdhbzE0MlxcXFxEZXNrdG9wXFxcXERldmVsb3BtZW50XFxcXGRldlxcXFxEaWdpdGFsVHdpbkZISVJBUFBcXFxcZGlnaXRhbHR3aW4tZmhpci1mcm9udGVuZC1wd2FcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2xnYW8xNDIvRGVza3RvcC9EZXZlbG9wbWVudC9kZXYvRGlnaXRhbFR3aW5GSElSQVBQL2RpZ2l0YWx0d2luLWZoaXItZnJvbnRlbmQtcHdhL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQge1ZpdGVQV0F9IGZyb20gXCJ2aXRlLXBsdWdpbi1wd2FcIjtcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ3VybCc7XG5pbXBvcnQgdnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIC8vIGJhc2U6IGltcG9ydC5tZXRhLmVudi5CQVNFX1VSTCB8fCAnL2FwcCcsXG4gIHBsdWdpbnM6IFt2dWUoKSwgdnVlRGV2VG9vbHMoKSwgVml0ZVBXQSh7XG4gICAgcmVnaXN0ZXJUeXBlOiAncHJvbXB0JyxcbiAgICBpbmplY3RSZWdpc3RlcjogZmFsc2UsXG5cbiAgICBwd2FBc3NldHM6IHtcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgIGNvbmZpZzogdHJ1ZSxcbiAgICB9LFxuXG4gICAgbWFuaWZlc3Q6IHtcbiAgICAgIG5hbWU6ICdEVHNvRkhJUicsXG4gICAgICBzaG9ydF9uYW1lOiAnRFRzb0ZISVInLFxuICAgICAgZGVzY3JpcHRpb246ICdBIHZpc3VhbGlzYXRpb24gcGFuZWwgZm9yIGRpc3BsYXkgdGhlIEZISVIgZGF0YSBpbiBEaWdpdGFsIHBsYXRmb3JtLicsXG4gICAgICB0aGVtZV9jb2xvcjogJyNmZmZmZmYnLFxuICAgIH0sXG5cbiAgICB3b3JrYm94OiB7XG4gICAgICBnbG9iUGF0dGVybnM6IFsnKiovKi57anMsY3NzLGh0bWwsc3ZnLHBuZyxpY299J10sXG4gICAgICBjbGVhbnVwT3V0ZGF0ZWRDYWNoZXM6IHRydWUsXG4gICAgICBjbGllbnRzQ2xhaW06IHRydWUsXG4gICAgfSxcblxuICAgIGRldk9wdGlvbnM6IHtcbiAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICBuYXZpZ2F0ZUZhbGxiYWNrOiAnaW5kZXguaHRtbCcsXG4gICAgICBzdXBwcmVzc1dhcm5pbmdzOiB0cnVlLFxuICAgICAgdHlwZTogJ21vZHVsZScsXG4gICAgfSxcbiAgfSldLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICB9XG4gIH0sXG4gIGJhc2U6IFwiL0RpZ2l0YWxUV0lOb25GSElSRnJvbnRlbmQvXCIsXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiBcIi4vYnVpbGRcIixcbiAgICBtaW5pZnk6IFwidGVyc2VyXCIsXG4gICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiBcIjAuMC4wLjBcIixcbiAgICBwb3J0OiAzMDA1LFxuICAgIG9wZW46IHRydWUsXG4gICAgY29yczogdHJ1ZSxcbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNmMsU0FBUyxvQkFBb0I7QUFDMWUsT0FBTyxTQUFTO0FBQ2hCLFNBQVEsZUFBYztBQUN0QixTQUFTLGVBQWUsV0FBVztBQUNuQyxPQUFPLGlCQUFpQjtBQUppUixJQUFNLDJDQUEyQztBQU8xVixJQUFPLHNCQUFRLGFBQWE7QUFBQTtBQUFBLEVBRTFCLFNBQVMsQ0FBQyxJQUFJLEdBQUcsWUFBWSxHQUFHLFFBQVE7QUFBQSxJQUN0QyxjQUFjO0FBQUEsSUFDZCxnQkFBZ0I7QUFBQSxJQUVoQixXQUFXO0FBQUEsTUFDVCxVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsSUFDVjtBQUFBLElBRUEsVUFBVTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUVBLFNBQVM7QUFBQSxNQUNQLGNBQWMsQ0FBQyxnQ0FBZ0M7QUFBQSxNQUMvQyx1QkFBdUI7QUFBQSxNQUN2QixjQUFjO0FBQUEsSUFDaEI7QUFBQSxJQUVBLFlBQVk7QUFBQSxNQUNWLFNBQVM7QUFBQSxNQUNULGtCQUFrQjtBQUFBLE1BQ2xCLGtCQUFrQjtBQUFBLE1BQ2xCLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRixDQUFDLENBQUM7QUFBQSxFQUNGLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNILEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDeEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxlQUFlO0FBQUEsTUFDakI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
