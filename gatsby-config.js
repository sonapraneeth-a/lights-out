module.exports = {
    siteMetadata: {
        title: "Lights Out - Gatsby App",
        version: "0.11.1",
        siteUrl: "https://sonapraneeth-a.github.io/lights-out/",
        description: "Lights Out puzzle in Gatsby react",
        keywords: "lights-out, gatsby, react, material-ui",
    },
    plugins: [
        {
            resolve: "gatsby-plugin-nprogress",
            options: {
              // Setting a color is optional.
              color: "tomato",
              // Disable the loading spinner.
              showSpinner: false,
            },
        },
        {
            resolve: "gatsby-plugin-google-analytics",
            options: {
                trackingId: "UA-90733014-2",
            },
        },
        {
            resolve: "gatsby-plugin-manifest",
            options: {
              name: "LightsOut",
              short_name: "Lights Out - Gatsby",
              start_url: "/",
              background_color: "#f7f0eb",
              theme_color: "#a2466c",
              display: "fullscreen",
              icons: [
                {
                  // Everything in /static will be copied to an equivalent
                  // directory in /public during development and build, so
                  // assuming your favicons are in /static/favicons,
                  // you can reference them here
                  src: "/favicons/android-chrome-192x192.png",
                  sizes: "192x192",
                  type: "image/png",
                },
                {
                  src: "/favicons/android-chrome-512x512.png",
                  sizes: "512x512",
                  type: "image/png",
                },
              ],
            },
        },
        {
            resolve: `gatsby-plugin-sass`,
            options: {
              precision: 8,
            },
        },
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-typography",
        "gatsby-plugin-offline",
    ],
    pathPrefix: "/lights-out",
};
