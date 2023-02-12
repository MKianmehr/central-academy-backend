import { ApiProperty } from "@nestjs/swagger";
import { Asset } from "../course.schema";

export class AssetWithId extends Asset {

    @ApiProperty()
    _id: string;

}