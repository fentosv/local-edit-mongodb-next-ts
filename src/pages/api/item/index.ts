import type { NextApiRequest, NextApiResponse } from 'next'


import dbConnect from "@utils/dbConnect";
import ItemModel from "@models/Item";
import getItems from '@utils/getItems';

// Google JSON style guide:
// Successful response returns object {data: XXX }
// Error response returns object {error: {code: XXX, message: XXX} }

// https://google.github.io/styleguide/jsoncstyleguide.xml?showone=data#data

// JSON:API styleguide
// https://medium.com/@bojanmajed/standard-json-api-response-format-c6c1aabcaa6d
// Successful response returns object {success: true, message: XXX, data: XXX }
// Error response returns object {success: false, message: XXX, errorcode: XXX, data :{} }


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()
  const { method, body } = req

  switch (method) {

    case 'GET':
      try {
        const data = await getItems()

        if (!data) {
          return res
            .status(404)
            .json({ error: "Not found" })
        }
        return res
          .json(data)

      } catch (error) {
        return res
          .status(400)
          .json({ error: error })
      }
    //POST api/item
    case 'POST':
      try {
        const item = new ItemModel(body)

        await item.save()

        return res
          .status(200)
          .json(item)

      } catch (error) {
        return res
          .status(400)
          .json({ error: error })
      }

    //DELETE api/item
    case 'DELETE':
      try {
        if (body === 'items') {
          // Delete all 
          await ItemModel.deleteMany({})

          return res
            .status(200)
            .json({ success: true })

        }
      } catch (error) {

        return res
          .status(400)
          .json({ success: false, error: error })
      }

    default:
      return res
        .status(500)
        .json({ error: 'Error 500' })
  }
}
