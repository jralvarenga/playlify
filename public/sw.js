if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,i,t)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const r={uri:location.origin+s.slice(1)};return Promise.all(i.map((s=>{switch(s){case"exports":return n;case"module":return r;default:return e(s)}}))).then((e=>{const s=t(...e);return n.default||(n.default=s),n}))})))}}define("./sw.js",["./workbox-56079563"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/04c4d4b164cff131e0561e23ef8dd2e9e342056c.5be962afc7278fb64bb9.js",revision:"jlU0HRRMmSTMAoM5zKX7I"},{url:"/_next/static/chunks/commons.f77e57fca051f39446a9.js",revision:"jlU0HRRMmSTMAoM5zKX7I"},{url:"/_next/static/chunks/ebb779d1567c4d3c8b6befa2f42218facc054724.23d761eee6ef0f5bacc3.js",revision:"jlU0HRRMmSTMAoM5zKX7I"},{url:"/_next/static/chunks/framework.4b81eedf2fcdb09bf521.js",revision:"jlU0HRRMmSTMAoM5zKX7I"},{url:"/_next/static/chunks/main-69f99557d89f9daff274.js",revision:"jlU0HRRMmSTMAoM5zKX7I"},{url:"/_next/static/chunks/pages/_app-a0b795201c2fb79dad74.js",revision:"jlU0HRRMmSTMAoM5zKX7I"},{url:"/_next/static/chunks/pages/_error-3e198ee905fce3422b9c.js",revision:"jlU0HRRMmSTMAoM5zKX7I"},{url:"/_next/static/chunks/pages/index-423e844b174e67849cfe.js",revision:"jlU0HRRMmSTMAoM5zKX7I"},{url:"/_next/static/chunks/pages/index.res-35a6802444088bd26b36.js",revision:"jlU0HRRMmSTMAoM5zKX7I"},{url:"/_next/static/chunks/pages/new-playlist-6fd2d38432c5b7f8ba63.js",revision:"jlU0HRRMmSTMAoM5zKX7I"},{url:"/_next/static/chunks/polyfills-af28de04c604a2479390.js",revision:"jlU0HRRMmSTMAoM5zKX7I"},{url:"/_next/static/chunks/webpack-50bee04d1dc61f8adf5b.js",revision:"jlU0HRRMmSTMAoM5zKX7I"},{url:"/_next/static/jlU0HRRMmSTMAoM5zKX7I/_buildManifest.js",revision:"jlU0HRRMmSTMAoM5zKX7I"},{url:"/_next/static/jlU0HRRMmSTMAoM5zKX7I/_ssgManifest.js",revision:"jlU0HRRMmSTMAoM5zKX7I"},{url:"/favicon.ico",revision:"77389b145645098373e87394cd4ea717"},{url:"/font/Poppins-Regular.ttf",revision:"8b6af8e5e8324edfd77af8b3b35d7f9c"},{url:"/global.css",revision:"fc40660276745fb940bfe8a3bb435545"},{url:"/icons/icon-128.png",revision:"e3efe1eec5ed06393fc2ede2eb77a05f"},{url:"/icons/icon-192.png",revision:"c9e67d147bf1a04313c107de2fec16b3"},{url:"/icons/icon-512.png",revision:"7fd504a1b6d62fc249d255c788fed10d"},{url:"/img/logo.png",revision:"916985c2c65dfe0eb545562a0f3bd3d0"},{url:"/manifest.json",revision:"f2e52bbc7c20adf3fd6b6d52a62a152a"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{requestWillFetch:async({request:e})=>(Request(),console.log("production"),e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));