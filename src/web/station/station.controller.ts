import { Controller, Logger, Get, Param, HttpStatus, HttpException } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StationService } from './station.service';
import { StationDto } from '../../share/dto/station.dto';


@ApiTags('station')
@Controller('station')
export class StationController {

  constructor(private stationSvc: StationService, private _logger: Logger) {
    _logger.setContext(StationController.name);
  }

  @Get()
  @ApiOperation({ summary: 'Get station list' })
  @ApiResponse({ status: HttpStatus.OK, type: StationDto, isArray: true, description: 'Get station list' })
  async getAll(): Promise<StationDto[]> {
    this._logger.debug('get all station');
    return this.stationSvc.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get station info' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: HttpStatus.OK, type: StationDto, description: 'Get station info by Id' })
  async getById(@Param('id') id: number): Promise<StationDto> {
    this._logger.debug(`get station id [${id}]`);
    const result = this.stationSvc.getById(id);
    if (!result) {
      throw new HttpException({ success: false, errorMessage: 'undefined' }, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

}
