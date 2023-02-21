import { nanoid } from 'nanoid';
import { Express } from 'express'

export const S3VideoPARAMS = (video: Express.Multer.File) => {
    const parts = video.originalname.split(".")
    const type = parts[parts.length - 1]
    return {
        Bucket: "c-academy",
        Key: `${nanoid()}.${type}`,
        Body: video.buffer,
        ACL: 'public-read',
        ContentType: video.mimetype,
    }
}