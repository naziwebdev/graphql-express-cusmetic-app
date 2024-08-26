exports.Cusmetic = `
type Cusmetic {
_id:ID
title:String
price:Int
image:String
category:Category
countAvailable:Int
}
`;

exports.Category = `
type Category{
_id:ID
title:String
cusmetics:[Cusmetic]
}
`;
