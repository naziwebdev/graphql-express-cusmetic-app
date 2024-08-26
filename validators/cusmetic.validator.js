const yup = require("yup");

exports.cusmeticValidator = yup.object({
  title: yup
    .string()
    .min(3, "this field must be at least 3 chars")
    .required("username is required"),
  price: yup.number().required("this field is required"),
  category: yup
    .string()
    .matches(/^[0-9a-fA-F]{24}$/, "id is invalid")
    .required("this field is required"),
  countAvailable: yup.number().required("this field is required"),
});
