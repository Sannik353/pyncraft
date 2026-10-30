/** @type {import('tailwindcss').Config} */
module.exports = { content: ['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { ivory:'#F7F3EB', sand:'#D6C5AE', walnut:'#8C6548', charcoal:'#292C24', olive:'#536047' }, fontFamily: { display:['var(--font-cormorant)','serif'], sans:['var(--font-dm-sans)','sans-serif'] } } }, plugins: [] }
