import { Schema, model } from "mongoose"

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
})

const productModel = model("Product", productSchema)

export default productModel
