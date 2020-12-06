const path = require("path")
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
  {
      get_lollies {
        getLollies {
          recipientName
          message
          senderName
          flavourTop
          flavourMiddle
          flavourBottom
          lollyPath
        }
      }
    }
  `)

  
    createPage({
      path: `${result.lollyPath}`,
      component: path.resolve("./src/template/lollyPage.js"),
      context: {
        result: result
      },
    })
  
}
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // page.matchPath is a special key that’s used for matching pages

  // only on the client.


};