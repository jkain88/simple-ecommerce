/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#030E4F',
                secondary: '#FFFFFF',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
