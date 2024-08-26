const yup = require("yup");

exports.categoryValidator = yup.object({
  title: yup
    .string()
    .min(3, "this field must be at least 3 chars")
    .required("username is required"),
});
