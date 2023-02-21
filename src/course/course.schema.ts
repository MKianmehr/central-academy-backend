import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import slugify from "slugify";



export type CourseDocument = HydratedDocument<Course>
export type LessonDocument = HydratedDocument<Lesson>
export type AssetDocument = HydratedDocument<Asset>

export enum _Class {
    Chapter = 'chapter',
    Quiz = 'quiz',
    Practice = 'practice',
    Lecture = 'lecture',
    Asset = "asset",
}

export enum _type {
    Quiz = "quiz",
    CodingExercise = "coding-exercise",
}

export enum AssetType {
    Video = "video",
    File = "file",
    Article = "article"
}

@Schema({ timestamps: true })
export class Asset {
    @ApiProperty()
    @Prop({ trim: true, required: true, enum: _Class })
    _class: _Class;

    @ApiProperty()
    @Prop({ trim: true, minlength: 3, maxlength: 320 })
    title?: string;

    @ApiProperty()
    @Prop({ trim: true, enum: AssetType })
    asset_type: AssetType;


    @ApiProperty()
    @Prop({ type: {} })
    thumbnail_url?: {};

    @ApiProperty()
    @Prop({ type: {} })
    source_url?: {};

    @ApiProperty()
    @Prop({ trim: true })
    content_summary?: string;

    @ApiProperty()
    @Prop()
    time_estimation?: number;

    @ApiProperty()
    @Prop({ type: [] })
    processing_errors?: []
}

export const AssetSchema = SchemaFactory.createForClass(Asset)

@Schema({ timestamps: true })
export class Lesson {

    @ApiProperty()
    @Prop({ trim: true, required: true, enum: _Class })
    _class: _Class;

    @ApiProperty()
    @Prop({ trim: true, minlength: 3, maxlength: 320, required: true })
    title: string;

    @ApiProperty()
    @Prop({ trim: true, enum: _type })
    type?: _type;

    @ApiProperty()
    @Prop({ trim: true, minlength: 3, maxlength: 320 })
    description: string;

    @ApiProperty()
    @Prop({ default: false, })
    is_published?: boolean;

    @ApiProperty()
    @Prop({ default: true })
    is_draft?: boolean;

    @ApiProperty()
    @Prop({ required: true, default: 0 })
    duration?: number;

    @ApiProperty()
    @Prop({ type: Number })
    pass_percent?: number;

    @ApiProperty()
    @Prop({})
    num_assessments?: number;

    @ApiProperty()
    @Prop({ default: false })
    is_downloadable?: boolean;

    @ApiProperty()
    @Prop({ default: false })
    is_free?: boolean;

    @ApiProperty()
    @Prop()
    asset?: Asset;

    @ApiProperty()
    @Prop({ type: [AssetSchema], default: [] })
    supplementary_assets?: Asset[];

    @ApiProperty()
    @Prop({ trim: true, lowercase: true, required: true })
    slug: string;

    @ApiProperty()
    @Prop({ trim: true, type: {}, minlength: 200 })
    content?: {};

    @ApiProperty()
    @Prop({ trim: true, type: {} })
    video_link?: {};

    @ApiProperty()
    @Prop({ type: Boolean, default: false })
    free_preview?: boolean;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson)


@Schema({ timestamps: true })
export class Course {

    @ApiProperty()
    @Prop({ trim: true, minlength: 3, maxlength: 60, required: true, unique: true })
    name: string;

    @ApiProperty()
    @Prop({ trim: true, lowercase: true, required: true })
    slug: string;

    @ApiProperty()
    @Prop({ trim: true, type: {}, minlength: 200 })
    description: {};

    @ApiProperty()
    @Prop({ lowercase: true, default: 0 })
    price: number;

    @ApiProperty()
    @Prop({ default: {}, type: {} })
    image: {};

    @ApiProperty()
    @Prop({ trim: true, lowercase: true })
    category: string;

    @ApiProperty()
    @Prop({ default: false })
    published: boolean;

    @ApiProperty()
    @Prop({ default: true })
    paid: boolean;

    @ApiProperty()
    @Prop({ type: Types.ObjectId, ref: "User", required: true })
    instructor: Types.ObjectId;

    @ApiProperty()
    @Prop({ type: [LessonSchema] })
    lessons: Lesson[];
}

export const CourseSchema = SchemaFactory.createForClass(Course)


CourseSchema.pre<CourseDocument>('save', async function (next) {
    const course = this;
    if (course.isModified('slug')) {
        course.slug = slugify(course.slug.toLowerCase())
    }
    next();
});

LessonSchema.pre<LessonDocument>('save', async function (next) {
    const lesson = this;
    if (lesson.isModified('slug')) {
        lesson.slug = slugify(lesson.slug.toLowerCase())
    }
    next();
});