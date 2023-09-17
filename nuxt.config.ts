// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
export default defineNuxtConfig({
    app: {
        head: {
            title: 'New Paltz HvZ',
            meta: [
                {
                    // Creates <meta name="Description" content="Repo for Nuxt3">
                    name: "Founded in 2009, SUNY New Paltz presents the Humans Vs Zombies website! Here you can find details about the club, rules, events and if your a current student login to play weeklong!",
                    content: "Website for the Humans Vs Zombies club"
                }
            ]
        }
    },

    alias: {
        '@': resolve(__dirname, './src'),
    },
    css: [
        '~/assets/main.css'
    ],
    modules: [
        '@nuxt/content',
        '@pinia/nuxt',
        '@nuxtjs/supabase',
    ],


    // https://tailwindcss.com/docs/guides/nuxtjs#3
    // npm install -D tailwindcss postcss autoprefixer
    // npx tailwindcss init
    postcss: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
    },

    nitro:
    {
        plugins: [
            '~/server/index.ts'
        ],
        // https://nuxt.com/docs/2.x/configuration-glossary/configuration-generate
    },

    ssr: true, //false: resembles static website true: resembles server side rendering
    // https://nuxt.com/docs/api/composables/use-fetch --> Notice how theres a "Pending" portion of AsyncData (response)
    


})
