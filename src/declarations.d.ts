declare module "*.css";
declare module 'fuzzysearch' {
  function fuzzysearch(needle: string, haystack: string): boolean;
  export default fuzzysearch;
}