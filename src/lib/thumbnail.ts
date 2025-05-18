import ffmpeg from 'fluent-ffmpeg'


export function createThumbnail(name: number) {
    //for windows
    // ffmpeg.setFfmpegPath('C:\\Users\\aayus\\Downloads\\ffmpeg-master-latest-win64-gpl\\bin\\ffmpeg.exe')

    ffmpeg('public/videos/' + name)
        .screenshots({
            timestamps: ['1'],
            filename: name + '.jpg',
            folder: 'public/thumbnails',
            size: '320x180'
        });
}

