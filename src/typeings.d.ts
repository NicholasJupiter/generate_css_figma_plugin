declare module 'vue/types/vue' {
  interface Vue {}
}

declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
