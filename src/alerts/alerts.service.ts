import { ApiProperty } from '@nestjs/swagger';
import { Injectable } from '@nestjs/common';

export class Alerts {
    @ApiProperty()
    permitId: number;
  
    @ApiProperty()
    permitName: string;
  
    @ApiProperty()
    location: string;
    
    @ApiProperty()
    radius: number;

    @ApiProperty()
    alertLevelId: number;

    @ApiProperty( {required: false} )
    alertLevel: string;

    @ApiProperty()
    eventTypeId: number;

    @ApiProperty()
    eventType: string;

    @ApiProperty()
    eventInfo: string;

    @ApiProperty()
    eventTime: string;

    @ApiProperty()
    ttl: number;
    
    @ApiProperty()
    stationId: number;
  
    @ApiProperty()
    stationName: string;

    constructor(permitId: number, permitName: string, 
        location: string, radius: number, 
        alertLevelId: number, alertLevel: string, 
        eventTypeId: number, eventType: string, 
        eventInfo: string, eventTime: string, ttl: number, 
        stationId: number, stationName: string) 
        {
            this.permitId = permitId;
            this.permitName = permitName;
            this.location = location;
            this.radius = radius;
            this.alertLevelId = alertLevelId;
            this.alertLevel = alertLevel;
            this.eventTypeId = eventTypeId;
            this.eventType = eventType;
            this.eventInfo = eventInfo;
            this.eventTime = eventTime;
            this.ttl = ttl;
            this.stationId = stationId;
            this.stationName = stationName;
        }
}

@Injectable()
export class AlertsService {
    alerts = [
        new Alerts(1, 'Yushan National Park Permit', '23.468818, 120.954489', 3, 2, 'Caution', 1, 'Animal', 'Water Buffalloo nearby', '2020-05-19 17:00', 6, 1, 'Yushan'),
        new Alerts(2, 'Taroko National Park Permit', '24.174251, 121.565319', 5, 3, 'Danger', 1, 'Animal', 'Cobra spotted nearby', '2020-05-19 17:00', 6, 1, 'Taroko')
    ]

    getFakeAlerts() {
        return this.alerts
    }
}
