import { nanoid } from 'nanoid';

export const S3PARAMS = (type: string, base64Data: Buffer) => ({
    Bucket: "c-academy",
    Key: `${nanoid()}.${type}`,
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: "base64",
    ContentType: `image/${type}`
})