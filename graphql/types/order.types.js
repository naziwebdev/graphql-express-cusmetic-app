exports.Order = `
type Order {
_id:ID
cusmetic:Cusmetic
user:User
count:Int
isDeliver: Boolean
}
`;

exports.CreateOrderInput = `
input CreateOrderInput {
cusmetic:ID
count:Int

}
`;
