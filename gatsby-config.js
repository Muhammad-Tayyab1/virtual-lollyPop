module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        // This type will contain remote schema Query type
        typeName: "Lolly",
        // This is field under which it's accessible
        fieldName: "get_lollies",
        // Url to query from
        url:
          "https://lollypop-project.netlify.app/.netlify/functions/createLolly",
          refetchInterval: 60,
      },
    },
  ],
}
