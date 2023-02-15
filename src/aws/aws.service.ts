import { Injectable } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3, SES } from 'aws-sdk';
import { template } from './templates/reset-password.template'
import { SESParams } from './ses.params';
import { S3PARAMS } from './s3.params';
import { ImageDto } from './dtos/image.dto';


@Injectable()
export class AWSService {
    constructor(
        @InjectAwsService(S3) private readonly s3: S3,
        @InjectAwsService(SES) private readonly ses: SES,
    ) {
    }

    async sendEmail(toAddress: string, name: string, url: string) {
        const html = template({
            name,
            requestTypeMessage: "A password reset for your account was requested.",
            pleaseMessage: "Please click the button below to change your password.",
            infoMessage: "Note that this link is valid for 24 hours. After the time limit has expired, you will have to resubmit the request for a password reset.",
            url,
            buttonText: "Change your password",
            academyMessage: "Delivered by Central Academy"
        })
        const response = await this.ses.sendEmail(SESParams(toAddress, html)).promise()
    }

    async sendImage(image: string) {
        const base64Data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""),
            "base64")

        const type = image.split(";")[0].split("/")[1]
        try {
            const res = await this.s3.upload(S3PARAMS(type, base64Data)).promise()
            return res
        } catch (e) {
            return e
        }
    }

    async removeImage(image: ImageDto) {
        return await this.s3.deleteObject({ Bucket: image.Bucket, Key: image.Key }).promise()
    }
}