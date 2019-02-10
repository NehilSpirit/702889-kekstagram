
export default class Effects {
constructor() {
const escCode = 27;
const maxX = 455;
const propScale = 100;
const step = 25;
const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');
const imgUploadEffects = imgUploadOverlay.querySelector('.img-upload__effects');
const imgUploadPreviewImg = imgUploadOverlay.querySelector('.img-upload__preview img');
const imgUpload = document.querySelector('.img-upload__effect-level');
const effectLevelDepth = imgUpload.querySelector('.effect-level__depth');
const previewImg = document.querySelector('.img-upload__preview img');
const dialogHandle = document.querySelector('.effect-level__pin');
const controlSmaller = document.querySelector('.scale__control--smaller');
const controlBigger = document.querySelector('.scale__control--bigger');
const controlValue = document.querySelector('.scale__control--value');
const effectsPreview = document.querySelectorAll('.effects__preview');

const Effect = {
  none: 'effects__preview--none',
  chrome: 'effects__preview--chrome',
  sepia: 'effects__preview--sepia',
  marvin: 'effects__preview--marvin',
  phobos: 'effects__preview--phobos',
  heat: 'effects__preview--heat',
};
this.field = {
    escCode,
    maxX,
    propScale,
    step,
    uploadFile,
    imgUploadOverlay,
    uploadCancel,
    imgUploadEffects,
    imgUploadPreviewImg,
    imgUpload,
    effectLevelDepth,
    previewImg,
    dialogHandle,
    controlSmaller,
    controlBigger, 
    controlValue,
    effectsPreview
}
this.Effect = Effect;

}

/* удаляет класс hidden у переданого обьекта */
removeClass(obj, className) {
  obj.classList.remove(className);
}

/* добавляет класс hidden у переданого обьекта */
addClass(obj, className) {
  obj.classList.add(className);
}

/* загружает фото  пользователя */
previewFile(elem) {
  const preview = elem;
  const file = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    preview.src = reader.result;
    this.field.effectsPreview.forEach((elem) => {
    elem.style.backgroundImage  =`url('${reader.result}')`;
  });
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = '../img/upload-default-image.jpg';
    this.field.effectsPreview = '../img/upload-default-image.jpg';
  }
}
// изменить размер изображения
changeSizeImg() {
  this.field.controlSmaller.addEventListener('click', () => { 
    this.reduceImg()
  });
  this.field.controlBigger.addEventListener('click', () => { 
    this.enlargeImg();
    });
}
// уменьшает изображение
reduceImg() {
  let val = this.field.controlValue.value;
  if(parseInt(val) >= 25 && parseInt(val) <= 100) {
    if(parseInt(val) != 25) {
      this.field.controlValue.value = `${parseInt(val) - this.field.step}%`;
      this.field.imgUploadPreviewImg.style.transform = `scale(${(parseInt(val) - this.field.step )/this.field. propScale})`
    }
  }
}
// увеличить изображение
enlargeImg() {
  let val = this.field.controlValue.value;
  if(parseInt(val) >= 25 && parseInt(val) <= 100) {
    if(parseInt(val) != 100) {
      this.field.controlValue.value = `${parseInt(val) + this.field.step}%`;
      this.field.imgUploadPreviewImg.style.transform = `scale(${(parseInt(val) + this.field.step )/ this.field.propScale})`
    }
  }
}
// при переключении эффекта ставит полунок и длину линии на 100% */
returnSliderDefault() {
 this.field.dialogHandle.style.left = `${this.field.maxX}px`;
 this.field.effectLevelDepth.style.width = `${this.field.maxX}px`; 
 this.field.imgUploadPreviewImg.style.filter = '';
}

/* при переключении эфекта возвращает CSS по дефолту */
returnDefaultEffect(name) {
  let filter = this.field.imgUploadPreviewImg.style.filter;
  const img = this.field.imgUpload;
  if (name === this.Effect.chrome) {
    filter = 'grayscale(1)';
    this.removeClass(img, 'hidden');
    this.returnSliderDefault(); 
  } else if (name === this.Effect.sepia) {
    filter = 'sepia(1)';
    this.removeClass(img, 'hidden');
    this.returnSliderDefault();
  } else if (name === this.Effect.marvin) {
    filter = 'invert(100%)';
    this.removeClass(img, 'hidden');
    this.returnSliderDefault();
  } else if (name === this.Effect.phobos) {
    filter = 'blur(5px)';
    this.removeClass(img, 'hidden');
    this.returnSliderDefault();
  } else if (name === this.Effect.heat) {
    filter = 'brightness(3)';
    this.removeClass(img, 'hidden');
    this.returnSliderDefault();
  } else {
    //filter = '';
    this.returnSliderDefault();
    img.classList.add('hidden');
  }
}

/* переключает класс у переданого обьекта */
toggleClass(obj, className) {
  const classes = obj.classList;
  if (classes.length > 0) {
    classes.value = '';
    obj.classList.add(className);
    this.returnDefaultEffect(className);
  } else {
    obj.classList.add(className);
    this.returnDefaultEffect(className);
  }
}

addImg() {
  this.field.uploadFile.addEventListener('change', () => { 
    this.previewFile(this.field.imgUploadPreviewImg); });
}
/* при изменении значения поля вызывает функцию переключения эффектов */
showEffect() {
  this.addImg();
  this.changeSizeImg();
this.field.imgUploadEffects.addEventListener('input', (evt) => {
  const val = evt.target.value;
  this.toggleClass(this.field.imgUploadPreviewImg, this.Effect[val]);
});
}

}
