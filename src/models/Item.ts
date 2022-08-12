import { Schema, model, models } from "mongoose";
import { Item } from '@types'

const ItemSchema: Schema = new Schema<Item>({
    _id: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subcategory: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    }
},
    {
        collection: "items", //access to collection by name
        versionKey: false
    }
)

export default models.Item || model<Item>('Item', ItemSchema) // Avoids OverwriteModelError: Cannot overwrite `XXXX` model once compiled.