import dbConnect from "@utils/dbConnect";
import ItemModel from "@models/Item";

import { Item } from '@types'

export default async function getItems(): Promise<Item[]> {
  await dbConnect()
  const result = await ItemModel.find({})

  const data = result.map((doc) => {
    const item = doc.toObject()
    return item
  })

  return data
}
