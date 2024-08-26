const cusmeticTypes = require("./types/cusmetic.types");
const orderTypes = require("./types/order.types");
const userTypes = require("./types/user.types");

module.exports = `#graphql

${cusmeticTypes.Cusmetic}
${cusmeticTypes.Category}
${orderTypes.Order}
${orderTypes.CreateOrderInput}
${userTypes.User}
${userTypes.Auth}
${userTypes.createUserInput}

type Query {
categories : [Category]!
cusmetices : [Cusmetic]!
orders:[Order]!
users:[User]!
cusmetic(id:ID!):Cusmetic
order(id:ID!):Order
getMe:User

}


type Mutation {
addCusmetic(title:String!,price:Int!,category:ID!,countAvailable:Int!):Cusmetic
addCategory(title:String!):Category
createOrder(input:CreateOrderInput!):Order
deliverOrder(id:ID!):Order
removeOrder(id:ID!):Order
removeCategory(id:ID!):Category
removeUser(id:ID!):User
removeCusmetic(id:ID!):Cusmetic
editCategory(title:String,id:ID!):Category
editCusmetic(title:String,price:Int,category:ID,countAvailable:Int,id:ID!):Cusmetic
loginUser(identifier:String!,password:String!):Auth
registerUser(input:createUserInput!):Auth

}


`;
