import { Schema, model, models } from "mongoose";
import { Category } from '@types'

const CategorySchema = new Schema<Category>({
    _id: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        default: null,
    },

},
    {
        collection: "categories", //access to collection by name
        versionKey: false
    }
)

export default models.Category || model<Category>('Category', CategorySchema) // Avoids OverwriteModelError: Cannot overwrite `XXXX` model once compiled.