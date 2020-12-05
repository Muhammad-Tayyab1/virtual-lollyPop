// const path = require("path")
// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions

//   const { result } = await graphql(`
//     {
//       LOLLIES {
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

//   result.LOLLIES.getLollies.forEach(node => {
//     createPage({
//       path: `${node.lollyPath}`,
//       component: path.resolve("./src/template/lollyPage.js"),
//       context: {
//         flavourTop: node.flavourTop,
//         flavourMiddle: node.flavourMiddle,
//         flavourBottom: node.flavourBottom,
//         lollyPath: node.lollyPath,
//         message: node.message,
//         senderName: node.senderName,
//         recipientName: node.recipientName,
//       },
//     })
//   })
// }
