import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

export const orderSchema = toTypedSchema(
  yup.object({
    productCode: yup.string().required("Product code is required"),
    // productSize: yup.string().required("Product size is required"),
  })
);
