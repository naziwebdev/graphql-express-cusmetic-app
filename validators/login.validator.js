const yup = require("yup");

exports.loginValidator = yup.object({
  identifier: yup
    .string()
    .min(3, "this field must be at least 3 chars")
    .required("username is required"),
  password: yup
    .string()
    .required("password is required")
    .min(6, "this field must be at least 6 chars")
    .max(20, "this field must be less than 20 chars")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "رمز عبور باید حاوی حروف بزرگ و کوچک و اعداد و علائم باشد"
    ),
});
