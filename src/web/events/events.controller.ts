import { ApiResponse, ApiParam, ApiTags, ApiOperation, ApiQuery, ApiBody } from '@nestjs/swagger';
import {
  Controller,
  Param,
  Query,
  Body,
  Get,
  Put,
  Post,
  Req,
  HttpStatus,
  Logger,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { EventService } from './events.service';
import { HikooResponse, CountResponseDto, HikooBadReqResponse } from '../../share/dto/generic.dto';
import { EventDto, EventViewDto, ModifyEventDto } from 'src/share/dto/event.dto';
import { EventsGateway } from './events.gateway';

@ApiTags('event')
@Controller('event')
export class EventsController {
  constructor(
    private eventSvc: EventService,
    private _eventGateway: EventsGateway,
    private _logger: Logger,
  ) {
    _logger.setContext(EventsController.name);
  }

  @Get()
  @ApiOperation({ summary: 'Get event list' })
  @ApiQuery({ name: 'startIndex', type: 'number', required: true })
  @ApiQuery({ name: 'count', type: 'number', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: EventViewDto, isArray: true, description: 'Return list of event' })
  async getAllEvent(
    @Query('startIndex') startIndex: number,
    @Query('count') count: number): Promise<EventViewDto[]> {
    this._logger.debug(`@Get, startIndex = [${startIndex}], count = [${count}]`);
    startIndex = (startIndex !== null ? startIndex : 0);
    count = (count !== null ? count : 10);
    return this.eventSvc.getAllView(startIndex, count);
  }

  @Get('count')
  @ApiOperation({ summary: 'Get event count ' })
  @ApiResponse({ status: HttpStatus.OK, type: CountResponseDto, description: 'Return count of event' })
  async getAllEventCount(): Promise<CountResponseDto> {
    this._logger.debug(`@Get count`);
    return this.eventSvc.getCount();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get event detail' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: HttpStatus.OK, type: EventViewDto, isArray: false, description: 'Return event detail' })
  async getEvent(@Param('id') id: number): Promise<EventViewDto> {
    this._logger.debug(`@Get, id = [${id}]`);
    const result = this.eventSvc.getViewById(id);
    if (!result) {
      throw new HttpException({ success: false, errorMessage: 'undefined' }, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  // @Post()
  // @HttpCode(200)
  // @ApiOperation({ summary: 'Create new Event' })
  // @ApiResponse({ status: 200, type: HikooResponse })
  // async createEvent(@Body() event: EventDto): Promise<HikooResponse> {
  //     this._logger.debug(`@Post, info: ${event.eventInfo}`);
  //     event.stat = EventStatusEnum.PENDING;
  //     return await this.eventSvc.create(event);
  // }

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Modify more event detail' })
  @ApiBody({ type: ModifyEventDto, isArray: true })
  @ApiResponse({ status: HttpStatus.OK, type: HikooResponse })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HikooBadReqResponse })
  async modifyEvent(@Body() data: ModifyEventDto[]): Promise<HikooResponse> {
    this._logger.debug(`@Put event`);
    return this.eventSvc.modify(data);
  }


  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Modify events detail' })
  @ApiBody({ type: ModifyEventDto, isArray: false })
  @ApiResponse({ status: HttpStatus.OK, type: HikooResponse })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HikooBadReqResponse })
  async modifyEventbyId(
    @Param('id') id: number,
    @Body() data: ModifyEventDto): Promise<HikooResponse> {
    this._logger.debug(`@Put event`);
    console.log(data);
    return this.eventSvc.modify([data]);
  }

  @Post('notify')
  @HttpCode(HttpStatus.OK)
  onNotifyEvent(@Req() request, @Body() event: EventDto): HikooResponse {
    console.log(`sourceIp = ${request.ip} ${request.connection.remoteAddress}`);
    const ip = request.ip || request.connection.remoteAddress;
    if (typeof (ip) !== 'string' || ip.indexOf('127.0.0.1') < 0) {
      throw new HttpException({
        success: false,
        errorMessage: 'notify can only be call by localhost',
      }, HttpStatus.BAD_REQUEST);
    }
    this._eventGateway.newEvent(event);
    return { success: true };
  }
}
