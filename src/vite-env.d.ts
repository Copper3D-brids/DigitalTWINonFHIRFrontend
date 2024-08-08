/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/vue" />

declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
  }
  
declare module '@vicons/ionicons5';

interface Window {
  showDirectoryPicker?: () => Promise<any>;
}

// interface FileSystemDirectoryHandle {
//   children: Array<FileSystemDirectoryHandle | FileSystemFileHandle>;
// }

interface CustomFileSystemDirectoryHandle extends FileSystemDirectoryHandle {
  children: Array<CustomFileSystemDirectoryHandle | FileSystemFileHandle>;
}

interface ImportMeta {
  env: Record<string, string>
}
