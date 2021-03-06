import { Controller, Logger, Get, Param, HttpStatus, HttpException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { TrailService } from './trail.service';
import { TrailDto } from '../../share/dto/trail.dto';

@ApiTags('trail')
@Controller('trail')
export class TrailController {

  constructor(private trailsSvc: TrailService, private _logger: Logger) {
    _logger.setContext(TrailController.name);
  }

  @Get()
  @ApiOperation({ summary: 'Get trail list' })
  @ApiResponse({ status: HttpStatus.OK, type: TrailDto, isArray: true, description: 'Get trail list' })
  async getAll(): Promise<TrailDto[]> {
    this._logger.debug('get all trail');
    return this.trailsSvc.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get trail info by id' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: HttpStatus.OK, type: TrailDto, description: 'Get trail info by id' })
  async getById(@Param('id') id: number): Promise<TrailDto> {
    this._logger.debug(`get trail id [${id}]`);
    const result = this.trailsSvc.getById(id);
    if (!result) {
      throw new HttpException({ success: false, errorMessage: 'undefined' }, HttpStatus.BAD_REQUEST);
    }
    return result;
  }
}
