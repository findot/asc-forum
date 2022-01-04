import { Pipe, PipeTransform } from '@angular/core';

import { formatDistance } from 'date-fns';

import { Publication } from 'src/app/core/interfaces/Publication';


@Pipe({ name: 'datestring' })
export class DatestringPipe implements PipeTransform {

  transform(publication?: Publication): string {
    if (!publication) return '';
    
    const now = new Date();
    const publicationDate = Date.parse(publication.published!);
    return formatDistance(publicationDate, now, { addSuffix: true });
  }

}
