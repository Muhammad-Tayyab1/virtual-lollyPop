const path = require("path")
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const { data } = await graphql(`
    {
      lollies {
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
      path: `lolly/${data.lollyPath}`,
      component: path.resolve("./src/template/lollyPage.js"),
      context: {
        data: data
      },
    })

}
