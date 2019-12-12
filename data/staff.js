module.exports = `
query ($search: String) {
    Staff(search: $search) {
      id
      name {
        first
        last
        native
      }
     characters {
       edges {
         media {
           id
         }
         node {
           id
         }
       }
     }
   }
  }`