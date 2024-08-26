const yup = require("yup");

exports.orderValidator = yup.object({
  cusmetic: yup
    .string()
    .matches(/^[0-9a-fA-F]{24}$/, "id is invalid")
    .required("this field is required"),
  count: yup.number().required("this field is required"),
});
