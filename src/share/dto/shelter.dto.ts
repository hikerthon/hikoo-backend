import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min, MaxLength } from 'class-validator';
import { ShelterEntity } from '../entity/shelter.entity';

export class ShelterDto {
  @ApiProperty({ readOnly: true })
  id: number;

  @ApiProperty({ maxLength: 255 })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty()
  @IsNumber()
  capacity: number;

  @ApiProperty({ nullable: false, minimum: -90, maximum: 90 })
  @IsNumber()
  @Min(-90)
  @Max(90)
  latpt: number;

  @ApiProperty({ nullable: false, minimum: -180, maximum: 180 })
  @IsNumber()
  @Min(-180)
  @Max(180)
  lngpt: number;

  public toEntity(): ShelterEntity {
    const it = new ShelterEntity();
    it.id = this.id;
    it.name = this.name;
    it.capacity = this.capacity;
    it.latpt = this.latpt;
    it.lngpt = this.lngpt;
    return it;
  }

  public static fromEntity(entity: ShelterEntity): ShelterDto {
    const it = new ShelterDto();
    it.id = entity.id;
    it.name = entity.name;
    it.capacity = Number(entity.capacity);
    it.latpt = Number(entity.latpt);
    it.lngpt = Number(entity.lngpt);

    return it;
  }
}


export class ShelterAroundMeDto extends ShelterDto {

  @ApiProperty()
  @IsString()
  shelterName: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(9999999)
  distanceMeter: number;

  public static convert(entity: any): ShelterAroundMeDto {
    const it = ShelterDto.fromEntity(entity);
    (it as ShelterAroundMeDto).shelterName = entity.shelter_name;
    (it as ShelterAroundMeDto).distanceMeter = entity.distance_mtr;
    return (it as ShelterAroundMeDto);
  }
}