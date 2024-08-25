exports.User = `
type User {
_id:ID
username:String
email:String
phone:String
password:String
role:String
}
`;

exports.Auth = `
type Auth {
token:String,
user:User
}
`;

exports.createUserInput = `
input createUserInput {
username:String
email:String
phone:String
password:String
}
`;
