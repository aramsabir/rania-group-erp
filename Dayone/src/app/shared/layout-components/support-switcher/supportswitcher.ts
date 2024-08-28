import { fromEvent } from 'rxjs';
import * as sidebarFn from '../sidebar/sidebar'

export function localStorageBackUp() {
  let html = document.querySelector('html')?.style;
  let body = document.querySelector('body');
  if (localStorage.getItem('Dayonelight-primary-color') !== null) {
    body?.classList.add('light-mode');
    let light = document.getElementById('myonoffswitchlight') as HTMLInputElement;
    light.checked = true;

    body?.classList.remove('dark-mode');
    body?.classList.remove('transparent-mode');
    html?.setProperty('--primary-bg-color',localStorage.getItem('Dayonelight-primary-color'));
    html?.setProperty('--primary-bg-hover',localStorage.getItem('Dayonelight-primary-color'));
    html?.setProperty('--primary-bg-border',localStorage.getItem('Dayonelight-primary-color'));
  }
  if (localStorage.getItem('Dayonedark-primary-color') !== null) {
    body?.classList.add('dark-mode');
    let dark = document.getElementById('myonoffswitchdark') as HTMLInputElement;
    dark.checked = true;
    
    body?.classList.remove('light-mode');
    body?.classList.remove('transparent-mode');

    html?.setProperty('--primary-bg-color',localStorage.getItem('Dayonedark-primary-color'));
    html?.setProperty('--primary-bg-hover',localStorage.getItem('Dayonedark-primary-color'));
    html?.setProperty('--primary-bg-border',localStorage.getItem('Dayonedark-primary-color'));
  }
  if (localStorage.getItem('Dayonetransparent-primary-color') !== null) {
    body?.classList.add('transparent-mode');
    let transparent = document.getElementById('myonoffswitchtransparent') as HTMLInputElement;
    transparent.checked = true;
    
    body?.classList.remove('light-mode');
    body?.classList.remove('dark-mode');
    html?.setProperty('--primary-bg-color',localStorage.getItem('Dayonetransparent-primary-color'));
  }
  if (localStorage.getItem('Dayonetransparent-bg-color') !== null) {
    body?.classList.add('transparent-mode');
    let transparent = document.getElementById('myonoffswitchtransparent') as HTMLInputElement;
    transparent.checked = true;
    
    body?.classList.remove('light-mode');
    body?.classList.remove('dark-mode');
    html?.setProperty('--transparent-body',localStorage.getItem('Dayonetransparent-bg-color'));
  }
  if (localStorage.getItem('Dayonetransparent-bgImg-primary-color') !== null || localStorage.getItem('DayoneBgImage') !== null) {
    body?.classList.add('transparent-mode');
    let transparent = document.getElementById('myonoffswitchtransparent') as HTMLInputElement;
    transparent.checked = true;
    
    body?.classList.remove('light-mode');
    body?.classList.remove('dark-mode');
    let img:any = localStorage.getItem('DayoneBgImage');
    html?.setProperty('--primary-bg-color',localStorage.getItem('Dayonetransparent-bgImg-primary-color'));
    body?.classList.add(img);
  }
  if (localStorage.getItem('DayoneLightTheme') !== null ) {
    let light = document.getElementById('myonoffswitchlight') as HTMLInputElement;
    light.checked = true;

    body?.classList.remove('dark-mode');
    body?.classList.remove('transparent-mode');
  }
  if (localStorage.getItem('DayoneDarkTheme') !== null ) {
    let dark = document.getElementById('myonoffswitchdark') as HTMLInputElement;
    dark.checked = true;
    body?.classList.add('dark-mode');

    body?.classList.remove('light-mode');
    body?.classList.remove('transparent-mode');
  }
  if (localStorage.getItem('DayoneTransparentTheme') !== null ) {
    let transparent = document.getElementById('myonoffswitchtransparent') as HTMLInputElement;
    transparent.checked = true;
    body?.classList.add('transparent-mode');

    body?.classList.remove('light-mode');
    body?.classList.remove('dark-mode');
  }
  if (localStorage.getItem('DayoneRtl') !== null ) {
    let html = document.querySelector('html');
    let styleId = document.querySelector('#style');
    //add
    body?.classList.add('rtl');
    html?.setAttribute('dir', 'rtl');
    styleId?.setAttribute('href','/assets/plugins/bootstrap/css/bootstrap.rtl.css');
    //remove
    body?.classList.remove('ltr');
  }

}

export function handleThemeUpdate(cssVars: any) {
  const root: any = document.querySelector(':root');
  const keys = Object.keys(cssVars);

  keys.forEach((key) => {
    root.style.setProperty(key, cssVars[key]);
  });
}
// to check the value is hexa or not
const isValidHex = (hexValue: any) =>
  /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hexValue);

const getChunksFromString = (st: any, chunkSize: any) =>
  st.match(new RegExp(`.{${chunkSize}}`, 'g'));
// convert hex value to 256
const convertHexUnitTo256 = (hexStr: any) =>
  parseInt(hexStr.repeat(2 / hexStr.length), 16);
// get alpha value is equla to 1 if there was no value is asigned to alpha in function
const getAlphafloat = (a: any, alpha: any) => {
  if (typeof a !== 'undefined') {
    return a / 255;
  }
  if (typeof alpha != 'number' || alpha < 0 || alpha > 1) {
    return 1;
  }
  return alpha;
};
// convertion of hex code to rgba code
export function hexToRgba(hexValue: any, alpha = 1) {
  if (!isValidHex(hexValue)) {
    return null;
  }
  const chunkSize = Math.floor((hexValue.length - 1) / 3);
  const hexArr = getChunksFromString(hexValue.slice(1), chunkSize);
  const [r, g, b, a] = hexArr.map(convertHexUnitTo256);
  return `rgba(${r}, ${g}, ${b}, ${getAlphafloat(a, alpha)})`;
}

export function dynamicLightPrimaryColor(primaryColor: any, color: any) {
  primaryColor.forEach((item: any) => {
    const cssPropName = `--primary-${item.getAttribute('data-id')}`;
    const cssPropName1 = `--primary-${item.getAttribute('data-id1')}`;
    const cssPropName2 = `--primary-${item.getAttribute('data-id2')}`;
    handleThemeUpdate({
      [cssPropName]: hexToRgba(color),
      [cssPropName1]: hexToRgba(color),
      [cssPropName2]: hexToRgba(color),
    });
  });
}
export function dynamicDarkPrimaryColor(primaryColor: any, color: any) {
  primaryColor.forEach((item: any) => {
      const cssPropName = `--primary-${item.getAttribute('data-id')}`;
      const cssPropName1 = `--primary-${item.getAttribute('data-id1')}`;
      const cssPropName2 = `--primary-${item.getAttribute('data-id2')}`;
    handleThemeUpdate({
      [cssPropName]: hexToRgba(color),
      [cssPropName1]: hexToRgba(color),
      [cssPropName2]: hexToRgba(color),
    });
  });
}
export function dynamicTrasnsparentPrimaryColor(primaryColor: any, color: any) {
  primaryColor.forEach((item: any) => {
    const cssPropName = `--primary-${item.getAttribute('data-id')}`;
    const cssPropName1 = `--primary-${item.getAttribute('data-id1')}`;
    const cssPropName2 = `--primary-${item.getAttribute('data-id2')}`;
    handleThemeUpdate({
      [cssPropName]: hexToRgba(color),
      [cssPropName1]: hexToRgba(color),
      [cssPropName2]: hexToRgba(color),
    });
  });
}
export function dynamicBgTrasnsparentPrimaryColor(
  primaryColor: any,
  color: any
) {
  primaryColor.forEach((item: any) => {
    const cssPropName1 = `--transparent-${item.getAttribute('data-id5')}`;
    handleThemeUpdate({
      [cssPropName1]: hexToRgba(color),
    });
  });
}
export function dynamicBgImgTrasnsparentPrimaryColor(
  primaryColor: any,
  color: any
) {
  primaryColor.forEach((item: any) => {
    const cssPropName = `--primary-${item.getAttribute('data-id')}`;
    const cssPropName1 = `--primary-${item.getAttribute('data-id1')}`;
    const cssPropName2 = `--primary-${item.getAttribute('data-id2')}`;
    handleThemeUpdate({
      [cssPropName]: hexToRgba(color),
      [cssPropName1]: hexToRgba(color),
      [cssPropName2]: hexToRgba(color),
    });
  });
}

export function customSwitcherClickFn() { 
  let body = document.querySelector('body');
  let html = document.querySelector('html');
  let ltr = document.querySelectorAll('#myonoffswitch54');
  let rtl = document.querySelectorAll('#myonoffswitch55');
  let lightBtn:any = document.getElementById('myonoffswitchlight');
  let darkBtn:any = document.getElementById('myonoffswitchdark');
  let TransparentBtn:any = document.getElementById('myonoffswitchtransparent');
  let defaultTheme: any = document.querySelector('#myonoffswitch18');
  let boxed: any = document.querySelector('#myonoffswitch19');

  let styleId = document.querySelector('#style');
  // LTR
  fromEvent(ltr, 'click').subscribe(() => {
    //add
    body?.classList.add('ltr');
    html?.setAttribute('dir', 'ltr');
    styleId?.setAttribute( 'href', './assets/plugins/bootstrap/css/bootstrap.css');
    //remove
    body?.classList.remove('rtl');
    sidebarFn.checkHoriMenu();
    localStorage.removeItem('DayoneRtl')
  });
  // RTL
  fromEvent(rtl, 'click').subscribe(() => {
    //add
    body?.classList.add('rtl');
    html?.setAttribute('dir', 'rtl');
    styleId?.setAttribute('href','./assets/plugins/bootstrap/css/bootstrap.rtl.css');
    //remove
    body?.classList.remove('ltr');
    sidebarFn.checkHoriMenu();
    localStorage.setItem('DayoneRtl', 'true');
  });
  // Theme
  fromEvent(lightBtn, 'click').subscribe(() => {
    lightBtn.checked = true;
    // add
    document.querySelector('body')?.classList.add('light-mode');
    localStorage.setItem('DayoneLightTheme', 'true');
    // remove
    localStorage.removeItem('DayoneDarkTheme');
    localStorage.removeItem('DayoneTransparentTheme');
    document.querySelector('body')?.classList.remove('dark-mode');
    document.querySelector('body')?.classList.remove('transparent-mode');
    document.querySelector('body')?.classList.remove('bg-img1');
    document.querySelector('body')?.classList.remove('bg-img2');
    document.querySelector('body')?.classList.remove('bg-img3');
    document.querySelector('body')?.classList.remove('bg-img4');
  });
  fromEvent(darkBtn, 'click').subscribe(() => {
    console.log('ok');
    
    darkBtn.checked = true;
    // add
    document.querySelector('body')?.classList.add('dark-mode');
    
    localStorage.setItem('DayoneDarkTheme', 'true');
    // remove
    localStorage.removeItem('DayoneLightTheme');
    localStorage.removeItem('DayoneTransparentTheme');
    document.querySelector('body')?.classList.remove('light-mode');
    document.querySelector('body')?.classList.remove('transparent-mode');
    document.querySelector('body')?.classList.remove('bg-img1');
    document.querySelector('body')?.classList.remove('bg-img2');
    document.querySelector('body')?.classList.remove('bg-img3');
    document.querySelector('body')?.classList.remove('bg-img4');
  });
  fromEvent(TransparentBtn, 'click').subscribe(() => {
    TransparentBtn.checked = true;
    // add
    document.querySelector('body')?.classList.add('transparent-mode');
    localStorage.setItem('DayoneTransparentTheme', 'true');
    // remove
    localStorage.removeItem('DayoneDarkTheme');
    localStorage.removeItem('DayoneLightTheme');
    document.querySelector('body')?.classList.remove('light-mode');
    document.querySelector('body')?.classList.remove('dark-mode');
    document.querySelector('body')?.classList.remove('bg-img1');
    document.querySelector('body')?.classList.remove('bg-img2');
    document.querySelector('body')?.classList.remove('bg-img3');
    document.querySelector('body')?.classList.remove('bg-img4');
    body?.classList.remove('light-menu');
    body?.classList.remove('color-menu');
    body?.classList.remove('dark-menu');
    body?.classList.remove('gradient-menu');
    body?.classList.remove('light-header');
    body?.classList.remove('color-header');
    body?.classList.remove('gradient-header');
    body?.classList.remove('dark-header');
  });
  // layout width  style
  fromEvent(defaultTheme, 'click').subscribe(() => {
    body?.classList.add('default');
    body?.classList.remove('boxed');
    sidebarFn.checkHoriMenu();
    // sidebarFn.checkDropdown()
  });
  fromEvent(boxed, 'click').subscribe(() => {
    body?.classList.add('boxed');
    body?.classList.remove('default');
    sidebarFn.checkHoriMenu();
  });
}

export function removeForTransparent(){
	if( document.querySelector('body')?.classList.contains('header-light')){
        document.querySelector('body')?.classList.remove('header-light')
    }
    // color header 
    if(document.querySelector('body')?.classList.contains('color-header')){
        document.querySelector('body')?.classList.remove('color-header')
    }
    // gradient header 
    if(document.querySelector('body')?.classList.contains('gradient-header')){
        document.querySelector('body')?.classList.remove('gradient-header')
    }
    // dark header 
    if(document.querySelector('body')?.classList.contains('dark-header')){
        document.querySelector('body')?.classList.remove('dark-header')
    }

    // light menu
    if(document.querySelector('body')?.classList.contains('light-menu')){
        document.querySelector('body')?.classList.remove('light-menu')
    }
    // color menu
    if(document.querySelector('body')?.classList.contains('color-menu')){
        document.querySelector('body')?.classList.remove('color-menu')
    }
    // gradient menu
    if(document.querySelector('body')?.classList.contains('gradient-menu')) {
        document.querySelector('body')?.classList.remove('gradient-menu')
    }
    // dark menu
    if(document.querySelector('body')?.classList.contains('dark-menu')) {
        document.querySelector('body')?.classList.remove('dark-menu')
    }
}

export function checkOptions(){
  // light header 
  if( document.querySelector('body')?.classList.contains('header-light')){
    let light = document.getElementById('myonoffswitch6') as HTMLInputElement;
    light.checked = true;
  }
  // color header 
  if(document.querySelector('body')?.classList.contains('color-header')){
    let light = document.getElementById('myonoffswitch7') as HTMLInputElement;
    light.checked = true;
  }
  // gradient header 
  if(document.querySelector('body')?.classList.contains('gradient-header')){
    let light = document.getElementById('myonoffswitch26') as HTMLInputElement;
    light.checked = true;
  }
  // dark header 
  if(document.querySelector('body')?.classList.contains('dark-header')){
    let light = document.getElementById('myonoffswitch8') as HTMLInputElement;
    light.checked = true;
  }

  // light menu
  if(document.querySelector('body')?.classList.contains('light-menu')){
    let light = document.getElementById('myonoffswitch3') as HTMLInputElement;
    light.checked = true;
  }
  // color menu
  if(document.querySelector('body')?.classList.contains('color-menu')){
    let light = document.getElementById('myonoffswitch4') as HTMLInputElement;
    light.checked = true;
  }
  // gradient menu
  if(document.querySelector('body')?.classList.contains('gradient-menu')) {
    let light = document.getElementById('myonoffswitch25') as HTMLInputElement;
    light.checked = true;
  }
  // dark menu
  if(document.querySelector('body')?.classList.contains('dark-menu')) {
    let light = document.getElementById('myonoffswitch5') as HTMLInputElement;
    light.checked = true;
  }
}

let myVarVal;
export function updateChanges(){
  let primaryColorVal = getComputedStyle(document.documentElement).getPropertyValue('--primary-bg-color').trim();
  
  //get variable
	myVarVal  =  localStorage.getItem("Dayonelight-primary-color") || localStorage.getItem("Dayonedark-primary-color") || localStorage.getItem("Dayonetransparent-primary-color") || localStorage.getItem("Dayonetransparent-bgImg-primary-color") || primaryColorVal;
	document.querySelector('html')?.style.setProperty('--primary-bg-color', myVarVal);

  let colorData1 = hexToRgba(myVarVal, 0.2)  
	document.querySelector('html')?.style.setProperty('--primary02', colorData1);

	let colorData2 = hexToRgba(myVarVal, 0.5)
	document.querySelector('html')?.style.setProperty('--primary05', colorData2);
	let colorData9 = hexToRgba(myVarVal, 0.9)
	document.querySelector('html')?.style.setProperty('--primary09', colorData9);
	let colorData8 = hexToRgba(myVarVal, 0.8)
	document.querySelector('html')?.style.setProperty('--primary08', colorData8);

}


