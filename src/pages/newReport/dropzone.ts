import Dropzone from 'dropzone';

export function initDropzone(buttonEl: any) {
  return new Dropzone(buttonEl, {
    url: '/falsa',
    autoProcessQueue: false,
    maxFiles: 1,
    acceptedFiles: 'image/*',
    init: function () {
      this.on('addedfile', () => {
        if (this.files.length > 1) {
          this.removeFile(this.files[0]);
        }
      });
    },
  });
}
