// const path = require("path")
// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions

//   const result = await graphql(`
//     {
//       lollies {
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

 
//   console.log(result);
//   result.data.lollies.getLollies.map((data) => {
//     createPage({
//       path: `${data.lollyPath}`,
//       component: path.resolve("./src/template/lollyPage.js"),
//       context: {
//         data: data,
//       },
//     });
//     })

// }
