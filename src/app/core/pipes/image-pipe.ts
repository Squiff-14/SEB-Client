import { ImageService } from '../services/messaging/image.service';
import { AuthService } from '../services/authentication/auth.service';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'authImage'
})

export class ImagePipe implements PipeTransform {

    constructor(private authservice: AuthService, private imgService: ImageService) { }

    async transform(src: string) {
        if(src.startsWith("data")){
            return src;
        } else{
            try {
                const imageBlob = await this.imgService.getImage(src).toPromise();
                const reader = new FileReader();
                return new Promise((resolve) => {
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.readAsDataURL(imageBlob);
                });
            }
            catch{
                console.log("replacement image")
            }
        }
    }
}
