import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from "@utils/dbConnect";
import ItemModel from "@models/Item";


//Con esta página creamos una ruta de creación de blogs en nuestra base de datos.
//Se accede a través de la ruta /api/blog y hay que mandar un POST con la info

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()

  const { method, body } = req
  switch (method) {
    //POST api/blog
    case 'POST':
      try {
        if (body === 'items') {
          ItemModel.insertMany([
            { _id: 'bike_1', title: 'Bike WhatEver', category: 'Sports', subcategory: 'Cycling', text: 'text' },
            { _id: 'tablet_1', title: 'Tablet Dunno', category: 'Electronics', subcategory: 'Tablets', text: 'text' },
            { _id: 'airfryer_1', title: 'Airfryer Random', category: 'Kitchen', subcategory: 'Airfryers', text: 'text' },
            { _id: 'bed_1', title: 'Bed Comfortable Sleep v.5', category: 'Home', subcategory: 'Beds', text: 'text' },
            { _id: 'haircrimper_1', title: 'Hair Crimper Marvelous', category: 'Selfcare', subcategory: 'Hair Crimper', text: 'text' },
          ])
          // Si no se pone nada de status, va a ser 200
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


