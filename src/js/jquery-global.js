/* fancybox 3 is a bare IIFE that reads the global jQuery the moment it evaluates,
   and the page's own code reaches for window.$ too. Import declarations are
   hoisted, so the assignment cannot live in script.js next to the plugin
   imports — it would run after them. Hence this module: importing it first
   guarantees the global exists before any plugin evaluates. */
import jQuery from 'jquery';

window.jQuery = window.$ = jQuery;

export default jQuery;
