import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3, SES } from 'aws-sdk';
import { AWSModule } from './aws/aws.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule,
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        useFactory: async (config: ConfigService) => {
          return {
            accessKeyId: config.get("AWS_ACCESS_KEY_ID"),
            secretAccessKey: config.get("AWS_SECRET_ACCESS_KEY"),
            region: config.get("AWS_REGION"),
            apiVersion: config.get("AWS_API_VERSION"),
          }
        },
        inject: [ConfigService]
      },
      services: [S3, SES],
    }),
    AWSModule,
  ],
})
export class AppModule { }
