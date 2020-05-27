import { ApiProperty } from '@nestjs/swagger';
import { CheckinEntity } from '../entity/checkin.entity';
import { IsNumber, IsString } from 'class-validator';

export class CheckinDto {
    @ApiProperty({readOnly: true})
    id: number;

    @ApiProperty()
    @IsNumber()
    hikerId: number;

    @ApiProperty()
    @IsNumber()
    hikeId: number;

    @ApiProperty()
    @IsString()
    permitName: string;

    @ApiProperty({description: 'auto generated on create', nullable: true, readOnly: true, example: 1590361200000})
    @IsNumber()
    checkinTime: number;

    public toEntity(): CheckinEntity {
        const it = new CheckinEntity();
        it.hikerId = this.hikerId;
        it.hikeId = this.hikeId;
        it.checkinTime = new Date(this.checkinTime);

        return it;
    }

    public static fromEntity(entity: CheckinEntity): CheckinDto {
        const it = new CheckinDto();
        it.id = entity.id;
        it.hikerId = entity.hikerId;
        it.hikeId = entity.hikeId;
        it.checkinTime = new Date(entity.checkinTime).getTime();
        // it.permitName = entity.hike.permit.name;
        return it;
    }
}

export class CheckinTimeByTodayDto {
    @ApiProperty()
    hour: string;

    @ApiProperty()
    count: number;

    public static fromEntity(entity: any): CheckinTimeByTodayDto {
        const it = new CheckinTimeByTodayDto();
        it.hour = String(entity['hour(checkin_time)'])
        it.count = Number(entity['count(*)'])
        return it;
    }
}