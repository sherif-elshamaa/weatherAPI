import mongoose from 'mongoose'
import config from '../config'

const connectDB = async () => {
  try {
    await mongoose.connect(config.database as string)
    console.log('MongoDB connected')
  } catch (error) {
    console.error((error as Error).message)
    process.exit(1)
  }
}

export const dropCollections = async () => {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    await collection.deleteMany({})
  }
}

export default connectDB
