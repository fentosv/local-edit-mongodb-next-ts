import type { NextApiRequest, NextApiResponse } from 'next'

import ItemModel from "@models/Item";
import dbConnect from "@utils/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await dbConnect()

    //GET api/blog/[id] - We get the item through the ID
    //DELETE api/blog/[id] - We delete the item through the ID
    //PUT api/blog/[id] - We edit the item through the ID

    //El query de la req lleva un id, lo sacamos
    const { method, query: { id }, body } = req

    switch (method) {
        case 'GET':
            try {
                const item = await ItemModel.findById(id).lean()

                if (!item) {
                    return res
                        .status(404)
                        .json({ error: "Item not found" })
                }
                return res
                    .json({ success: true, data: item })

            } catch (error) {
                return res
                    .status(400)
                    .json({ error: error })
            }
        case 'PUT':
            try {
                const item = await ItemModel.findByIdAndUpdate(
                    id,
                    body,
                    {
                        new: true, //retorna el actualizado
                        runValidators: true //usa las validaciones que pusimos en la base de datos
                    }
                )
                if (!item) {
                    return res
                        .status(404)
                        .json({ error: 'Error: not found' })
                }

                return res
                    .json({ data: item })

            } catch (error) {
                return res
                    .status(400)
                    .json({ error: error })
            }
        case 'DELETE':
            try {
                const item = await ItemModel.findByIdAndDelete(id).lean()

                if (!item) {
                    return res
                        .status(404)
                        .json({ success: false, error: 'Error: not found' })
                }
                return res
                    .json({ success: true, data: item })

            } catch (error) {
                return res
                    .status(400)
                    .json({ success: false, error: error })
            }

        default:
            return res
                .status(500)
                .json({ success: false, error: 'Error 500' })
    }
}