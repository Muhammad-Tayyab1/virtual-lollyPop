const path = require("path")
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
  query MyQuery{
      LOLLIES {
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

  result.data.LOLLIES.getLollies.map((data) => {
    createPage({
      path: `${data.lollyPath}`,
      component: path.resolve("./src/template/lollyPage.js"),
      context: {
        data: data,
      },
    });
  });
}
