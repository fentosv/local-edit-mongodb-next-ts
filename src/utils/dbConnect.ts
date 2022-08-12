import mongoose from 'mongoose'

const MONGODB_URI: string = process.env.MONGODB_URI ?? ''

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

// TS error: Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.
// let cached = global.mongoose

let global_typed = global as any
let cached = global_typed.mongoose

if (!cached) {
    cached = global_typed.mongoose = { conn: null, promise: null }
}

async function dbConnect() {

    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose
        })
    }
    cached.conn = await cached.promise
    console.log("MongoDB connected 🚀");
    return cached.conn
}

export default dbConnect
