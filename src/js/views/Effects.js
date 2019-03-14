
export default class Effects {
constructor() {
this.maxX = 455;
this.propScale = 100;
this.step = 25;
this.minSize = 25;
this.maxXSize = 100;
this.uploadFile = document.querySelector('#upload-file');
this.imgUploadOverlay = document.querySelector('.img-upload__overlay');
this.uploadCancel = document.querySelector('#upload-cancel');
this.imgUploadEffects = document.querySelector('.img-upload__effects');
this.imgUploadPreviewImg = document.querySelector('.img-upload__preview img');
this.imgUpload = document.querySelector('.img-upload__effect-level');
this.effectLevelDepth = document.querySelector('.effect-level__depth');
this.previewImg = document.querySelector('.img-upload__preview img');
this.dialogHandle = document.querySelector('.effect-level__pin');
this.controlSmaller = document.querySelector('.scale__control--smaller');
this.controlBigger = document.querySelector('.scale__control--bigger');
this.controlValue = document.querySelector('.scale__control--value');
this.effectsPreview = document.querySelectorAll('.effects__preview');

this.Effect = {
  none: 'effects__preview--none',
  chrome: 'effects__preview--chrome',
  sepia: 'effects__preview--sepia',
  marvin: 'effects__preview--marvin',
  phobos: 'effects__preview--phobos',
  heat: 'effects__preview--heat',
};
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
    this.effectsPreview.forEach((elem) => {
    elem.style.backgroundImage  =`url('${reader.result}')`;
  });
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = '../img/upload-default-image.jpg';
    this.effectsPreview = '../img/upload-default-image.jpg';
  }
}

// изменить размер изображения
changeSizeImg() {
  this.controlSmaller.addEventListener('click', () => { 
    this.reduceImg()
  });
  this.controlBigger.addEventListener('click', () => { 
    this.enlargeImg();
    });
}

// уменьшает изображение
reduceImg() {
  let val = this.controlValue.value;
  if(parseInt(val) >= this.minSize && parseInt(val) <= this.maxXSize) {
    if(parseInt(val) != this.minSize) {
      this.controlValue.value = `${parseInt(val) - this.step}%`;
      this.imgUploadPreviewImg.style.transform = `scale(${(parseInt(val) - this.step )/this.propScale})`
    }
  }
}
// увеличить изображение
enlargeImg() {
  let val = this.controlValue.value;
  if(parseInt(val) >= this.minSize && parseInt(val) <= this.maxXSize) {
    if(parseInt(val) != this.maxXSize) {
      this.controlValue.value = `${parseInt(val) + this.step}%`;
      this.imgUploadPreviewImg.style.transform = `scale(${(parseInt(val) + this.step )/ this.propScale})`
    }
  }
}
// при переключении эффекта ставит полунок и длину линии на 100% */
returnSliderDefault() {
 this.dialogHandle.style.left = `${this.maxX}px`;
 this.effectLevelDepth.style.width = `${this.maxX}px`; 
 this.imgUploadPreviewImg.style.filter = '';
}

/* при переключении эфекта возвращает CSS по дефолту */
returnDefaultEffect(name) {
  let filter = this.imgUploadPreviewImg.style.filter;
  const img = this.imgUpload;
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
  this.uploadFile.addEventListener('change', () => { 
    this.previewFile(this.imgUploadPreviewImg); });
}

/* при изменении значения поля вызывает функцию переключения эффектов */
showEffect() {
  this.addImg();
  this.changeSizeImg();
this.imgUploadEffects.addEventListener('change', (evt) => {
  const val = evt.target.value;
  this.toggleClass(this.imgUploadPreviewImg, this.Effect[val]);
});
}

}
