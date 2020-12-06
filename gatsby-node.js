// const path = require("path")
// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions

//   const result = await graphql(`
//   query MyQuery {
//     lollies {
//       getLollies {
//         lollyPath
//         message
//       }
//     }
//   }
// `)


//   console.log(result);
//   result.data.lollies.getLollies.forEach(({ node }) => {
//     createPage({
//       path: `${node.lollyPath}`,
//       component: path.resolve("./src/template/lollyPage.js"),
//       context: {
//         lollyPath: node.lollyPath
//       },
//     });
//   })

// }
