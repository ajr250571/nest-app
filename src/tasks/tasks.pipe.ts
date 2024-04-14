import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TasksPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.id) {
      const idNumber = parseInt(value.id.toString())
      if (isNaN(idNumber)) {
        throw new HttpException("El id debe ser un numero", HttpStatus.BAD_REQUEST)
      }
      return { ...value, id: idNumber };
    } else {
      return value
    }
  }
}
