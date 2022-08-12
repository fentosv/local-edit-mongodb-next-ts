import dbConnect from "@utils/dbConnect";
import CategoryModel from "@models/Category";
import type { NextApiRequest, NextApiResponse } from 'next'

// /api/category
// POST request with body='categories'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()

  const { method, body } = req
  switch (method) {
    //POST api/category
    case 'POST':
      try {

        if (body === 'categories') {
          CategoryModel.insertMany([
            { _id: "TypeScript", path: ",Books,Programming,Languages,JavaScript," },
            { _id: "Programming", path: ",Books," },
            { _id: "MongoDB", path: ",Books,Programming,Databases," },
            { _id: "Books", path: null },
            { _id: "Databases", path: ",Books,Programming," },
            { _id: "Languages", path: ",Books,Programming," },
            { _id: "JavaScript", path: ",Books,Programming,Languages," },
            { _id: "UX", path: ",Teams," },
            { _id: "UI", path: ",Teams," },
            { _id: "Name1", path: ",Teams,UX," },
            { _id: "Name2", path: ",Teams,UI," },
            { _id: "Teams", path: null },
            { _id: "dbm", path: ",Books,Programming,Databases," }
          ])

          return res
            .status(200)
            .json({ success: true })

        }
      } catch (error) {

        return res
          .status(400)
          .json({ success: false, error: error })
      }

    case 'DELETE':
      try {
        if (body === 'categories') {
          // Delete all 
          await CategoryModel.deleteMany({})

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
        .json({ success: false, error: 'Something went wrong' })
  }
}


