import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'displayName'})
export class UsernamePipe implements PipeTransform {
  transform(value: string): string {
    let left  : string  = value.substring(0, 4)
    let right : string = value.slice(4);
    let two =  '*'.repeat(right.length);//right.replace(`a*z`,"*");
    return (left+two);
  }
}