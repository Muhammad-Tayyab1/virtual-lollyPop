const path = require("path")
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const { data } = await graphql(`
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

  data.get_lollies.getLollies.forEach(node => {
    createPage({
      path: `lolly/${node.link}`,
      component: path.resolve("./src/template/lollyPage.js"),
      context: {
        flavourTop: node.flavourTop,
        flavourMiddle: node.flavourMiddle,
        flavourBottom: node.flavourBottom,
        lollyPath: node.lollyPath,
        message: node.message,
        senderName: node.senderName,
        recipientName: node.recipientName,
      },
    })
  })
}