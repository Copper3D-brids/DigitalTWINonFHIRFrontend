/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/vue" />

declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
  }
  
declare module '@vicons/ionicons5';
declare module 'uuid';

interface Window {
  showDirectoryPicker?: () => Promise<any>;
}

// interface FileSystemDirectoryHandle {
//   children: Array<FileSystemDirectoryHandle | FileSystemFileHandle>;
// }

type Category = "Measurements" | "Workflow" | "Workflow tool" | "Workflow tool process";

interface CustomFileSystemDirectoryHandle extends FileSystemDirectoryHandle {
  children: Array<CustomFileSystemDirectoryHandle | FileSystemFileHandle>;
  category?: Category;
}

interface ImportMeta {
  env: Record<string, string>
}
