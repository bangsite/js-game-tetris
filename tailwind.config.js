/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{css}",
        "./src/**/*.{html,js}"],
    theme: {
        fontFamily: {
            title: ["Mona Sans", "sans-serif"],
            subtitle: ["IBM Plex Sans", "sans-serif"],
            text: ["Poppins", "sans-serif"],
            game: ["Press Start 2P", "serif"],
        },
        extend: {
            gridTemplateColumns: {
                'layout': '320px 200px',
            }
        },
    },
    plugins: [],
}

