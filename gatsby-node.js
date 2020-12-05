// const path = require("path")
// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions

//   const { data } = await graphql(`
//     {
//       get_lollies {
//         getLollies {
//           recipientName
//           message
//           senderName
//           flavourTop
//           flavourMiddle
//           flavourBottom
//           lollyPath
//         }
//       }
//     }
//   `)

//   data.get_lollies.getLollies.forEach(({lollyPath}) => {
//     createPage({
//       path: `lolly/${lollyPath}`,
//       component: path.resolve("./src/template/lollyPage.js"),
//       context: {
//         lollyPath: lollyPath
//       },
//     })
//   })
// }
