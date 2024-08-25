exports.Cusmetic = `
type Cusmetic {
_id:ID
title:String
price:Number
image:String
category:Category
countAvailabe:Number
}
`;

exports.Category = `
type Category{
_id:ID
title:String
cusmetics:[Cusmetic]
}
`;
