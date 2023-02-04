export const SESParams = (toAddress: string, template: string) => {
    return {
        Source: process.env.EMAIL_FROM,
        Destination: {
            ToAddresses: [toAddress]
        },
        ReplyToAddresses: [process.env.EMAIL_FROM],
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: template
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Reset Password"
            }
        }
    }
}