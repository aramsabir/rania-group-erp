import { fromEvent } from 'rxjs';
import * as sidebarFn from '../sidebar/sidebar'

export function localStorageBackUp() {
  let html = document.querySelector('html')?.style;
  let body = document.querySelector('body');
    body?.classList.add('horizontal');
  if (localStorage.getItem('Dayonelight-primary-color') !== null) {
    body?.classList.add('light-mode');
    let light = document.getElementById('myonoffswitch1') as HTMLInputElement;
    light.checked = true;

    body?.classList.remove('dark-mode');
    body?.classList.remove('transparent-mode');
    html?.setProperty('--primary-bg-color',localStorage.getItem('Dayonelight-primary-color'));
    html?.setProperty('--primary-bg-hover',localStorage.getItem('Dayonelight-primary-color'));
    html?.setProperty('--primary-bg-border',localStorage.getItem('Dayonelight-primary-color'));
  }
  if (localStorage.getItem('Dayonedark-primary-color') !== null) {
    body?.classList.add('dark-mode');
    let dark = document.getElementById('myonoffswitch2') as HTMLInputElement;
    dark.checked = true;
    
    body?.classList.remove('light-mode');
    body?.classList.remove('transparent-mode');

    html?.setProperty('--primary-bg-color',localStorage.getItem('Dayonedark-primary-color'));
    html?.setProperty('--primary-bg-hover',localStorage.getItem('Dayonedark-primary-color'));
    html?.setProperty('--primary-bg-border',localStorage.getItem('Dayonedark-primary-color'));
  }
  if (localStorage.getItem('Dayonetransparent-primary-color') !== null) {
    body?.classList.add('transparent-mode');
    let transparent = document.getElementById('myonoffswitchTransparent') as HTMLInputElement;
    transparent.checked = true;
    
    body?.classList.remove('light-mode');
    body?.classList.remove('dark-mode');
    html?.setProperty('--primary-bg-color',localStorage.getItem('Dayonetransparent-primary-color'));
  }
  if (localStorage.getItem('Dayonetransparent-bg-color') !== null) {
    body?.classList.add('transparent-mode');
    let transparent = document.getElementById('myonoffswitchTransparent') as HTMLInputElement;
    transparent.checked = true;
    
    body?.classList.remove('light-mode');
    body?.classList.remove('dark-mode');
    html?.setProperty('--transparent-body',localStorage.getItem('Dayonetransparent-bg-color'));
  }
  if (localStorage.getItem('Dayonetransparent-bgImg-primary-color') !== null || localStorage.getItem('DayoneBgImage') !== null) {
    body?.classList.add('transparent-mode');
    let transparent = document.getElementById('myonoffswitchTransparent') as HTMLInputElement;
    transparent.checked = true;
    
    body?.classList.remove('light-mode');
    body?.classList.remove('dark-mode');
    let img:any = localStorage.getItem('DayoneBgImage');
    html?.setProperty('--primary-bg-color',localStorage.getItem('Dayonetransparent-bgImg-primary-color'));
    body?.classList.add(img);
  }
  if (localStorage.getItem('DayoneLightTheme') !== null ) {
    let light = document.getElementById('myonoffswitch1') as HTMLInputElement;
    light.checked = true;

    body?.classList.remove('dark-mode');
    body?.classList.remove('transparent-mode');
  }
  if (localStorage.getItem('DayoneDarkTheme') !== null ) {
    let dark = document.getElementById('myonoffswitch2') as HTMLInputElement;
    dark.checked = true;
    body?.classList.add('dark-mode');
    body?.classList.add('dark-menu');
    body?.classList.add('dark-header');

    body?.classList.remove('light-mode');
    body?.classList.remove('transparent-mode');
  }
  if (localStorage.getItem('DayoneTransparentTheme') !== null ) {
    let transparent = document.getElementById('myonoffswitchTransparent') as HTMLInputElement;
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
    styleId?.setAttribute('href','./assets/plugins/bootstrap/css/bootstrap.rtl.css');
    //remove
    body?.classList.remove('ltr');
    // sidebarFn.checkHoriMenu();
    let rtl = document.getElementById('myonoffswitch55') as HTMLInputElement;
    rtl.checked = true;
  }
  
  if (localStorage.getItem('DayoneHorizontal') !== null ) {
    let mainContent = document.querySelector('.main-content');
    let mainContainer = document.querySelectorAll('.main-container');
    let appSidebar = document.querySelector('.app-sidebar');
    let appSidebar3 = document.querySelector('.app-sidebar3');
    let mainSidemenu = document.querySelector('.main-sidemenu');
    let sideMenu = document.querySelector('.horizontal .side-menu');
    let header = document.querySelector('.header');
    let mainMenu = document.querySelector('.main-menu');
    let angle = document.querySelector('.angle');
    //add
    body?.classList.add('horizontal');
    mainContent?.classList.add('hor-content');
    mainContainer.forEach((e,i)=>{
      e?.classList.add('container');
    })
    header?.classList.add('hor-header');
    appSidebar3?.classList.add('horizontal-mainwrapper','container');
    sideMenu?.classList.add('flex-nowrap');
    appSidebar?.classList.add('horizontal-main', 'hor-menu');
    mainSidemenu?.classList.add('container');
    angle?.classList.add("horizontal-icon");
    mainMenu?.classList.add("horizontalMenu");

    // remove
    sideMenu?.classList.remove('flex-wrap');
    mainContent?.classList.remove('app-content');
    mainContainer.forEach((e,i)=>{
      e?.classList.remove('container-fluid', 'side-app');
    })
    body?.classList.remove('sidebar-mini');
    body?.classList.remove('sidenav-toggled');
    body?.classList.remove('horizontal-hover');
    header?.classList.remove('app-header');
    sidebarFn.checkHoriMenu(); 
    let horizontal = document.getElementById('myonoffswitch35') as HTMLInputElement;
    horizontal.checked = true;
  }
  if (localStorage.getItem('DayoneHorizontalHover') !== null ) {
    let mainContent = document.querySelector('.main-content');
    let mainContainer = document.querySelectorAll('.main-container');
    let appSidebar = document.querySelector('.app-sidebar');
    let appSidebar3 = document.querySelector('.app-sidebar3');
    let mainSidemenu = document.querySelector('.main-sidemenu');
    let sideMenu = document.querySelector('.horizontal .side-menu');
    let header = document.querySelector('.header');
    let mainMenu = document.querySelector('.main-menu');
    let angle = document.querySelector('.angle');
    
     //add
     body?.classList.add('horizontal');
     body?.classList.add('horizontal-hover');
     mainContent?.classList.add('hor-content');
     mainContainer.forEach((e,i)=>{
       e?.classList.add('container');
     })
     header?.classList.add('hor-header');
     appSidebar3?.classList.add('horizontal-mainwrapper','container');
     sideMenu?.classList.add('flex-nowrap');
     appSidebar?.classList.add('horizontal-main', 'hor-menu');
     mainSidemenu?.classList.add('container');
     angle?.classList.add("horizontal-icon");
     mainMenu?.classList.add("horizontalMenu");
 
     // remove
     sideMenu?.classList.remove('flex-wrap');
     mainContent?.classList.remove('app-content');
     mainContainer.forEach((e,i)=>{
       e?.classList.remove('container-fluid', 'side-app');
     })
     body?.classList.remove('sidebar-mini');
     body?.classList.remove('sidenav-toggled');
     header?.classList.remove('app-header');
     sidebarFn.checkHoriMenu();
     let horizontalHover = document.getElementById('myonoffswitch111') as HTMLInputElement;
     horizontalHover.checked = true;
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

export function customClickFn() { 
  let body = document.querySelector('body');
  let html = document.querySelector('html');
  let ltr = document.querySelectorAll('#myonoffswitch54');
  let rtl = document.querySelectorAll('#myonoffswitch55');
  let vertical = document.querySelectorAll('#myonoffswitch34');
  let horizontal = document.querySelectorAll('#myonoffswitch35');
  let horizontalHover = document.querySelectorAll('#myonoffswitch111');
  let defaultTheme: any = document.querySelector('#myonoffswitch18');
  let boxed: any = document.querySelector('#myonoffswitch19');
  let mainContent = document.querySelector('.main-content');
  let mainContainer = document.querySelectorAll('.main-container');
  let appHeader = document.querySelector('.app-header');
  let appSidebar = document.querySelector('.app-sidebar');
  let appSidebar3 = document.querySelector('.app-sidebar3');
  let mainMenu = document.querySelector('.main-menu');
  let mainSidemenu = document.querySelector('.main-sidemenu');
  let header = document.querySelector('.header');
  let angle = document.querySelector('.angle');
  let lightBtn = document.getElementById('myonoffswitch1') as HTMLInputElement;
  let darkBtn = document.getElementById('myonoffswitch2') as HTMLInputElement;
  let TransparentBtn = document.getElementById('myonoffswitchTransparent') as HTMLInputElement;
  let sideMenu = document.querySelector('.horizontal .side-menu');
  let lightMenu: any = document.querySelector('#background1');
  let colorMenu: any = document.querySelector('#background2');
  let darkMenu: any = document.querySelector('#background3');
  let gradientMenu: any = document.querySelector('#background11');
  let lightHeader: any = document.querySelector('#background4');
  let darkHeader: any = document.querySelector('#background6');
  let gradientHeader: any = document.querySelector('#background10');
  let colorHeader: any = document.querySelector('#background5');

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
  // Layouts
  fromEvent(vertical, 'click').subscribe(() => {
    //add
    mainContent?.classList.add('app-content');
    mainContainer.forEach((e,i)=>{
      e?.classList.add('container-fluid');
    })
    body?.classList.add('sidebar-mini');
    header?.classList.add('app-header');
    //remove
    body?.classList.remove('horizontal');
    body?.classList.remove('horizontal-hover');
    mainContent?.classList.remove('horizontal-content');
    mainContainer.forEach((e,i)=>{
      e?.classList.remove('container');
    })
    appHeader?.classList.remove('hor-header');
    mainContent?.classList.remove('hor-content');
    header?.classList.remove('side-header');
    appSidebar?.classList.remove('horizontal-main', 'hor-menu');
    mainMenu?.classList.remove('horizontalMenu');
    appSidebar3?.classList.remove('horizontal-mainwrapper', 'container');
    mainSidemenu?.classList.remove('container');

    document.querySelector('.slide-left')?.classList.add('d-none');
    document.querySelector('.slide-right')?.classList.add('d-none');
    document.querySelector('.slide-leftRTL')?.classList.add('d-none');
    document.querySelector('.slide-rightRTL')?.classList.add('d-none');
    localStorage.removeItem('DayoneHorizontal');
    localStorage.removeItem('DayoneHorizontalHover');
  });
  fromEvent(horizontal, 'click').subscribe(() => {
    
    //add
    body?.classList.add('horizontal');
    mainContent?.classList.add('hor-content');
    mainContainer.forEach((e,i)=>{
      e?.classList.add('container');
    })
    appHeader?.classList.add('hor-header');
    appSidebar3?.classList.add('horizontal-mainwrapper','container');
    sideMenu?.classList.add('flex-nowrap');
    appSidebar?.classList.add('horizontal-main', 'hor-menu');
    mainSidemenu?.classList.add('container');
    angle?.classList.add("horizontal-icon");
    mainMenu?.classList.add("horizontalMenu");

    // remove
    sideMenu?.classList.remove('flex-wrap');
    mainContent?.classList.remove('app-content');
    mainContainer.forEach((e,i)=>{
      e?.classList.remove('container-fluid', 'side-app');
    })
    header?.classList.remove('app-header');
    body?.classList.remove('sidebar-mini');
    body?.classList.remove('sidenav-toggled');
    body?.classList.remove('horizontal-hover');
    sidebarFn.checkHoriMenu();
    localStorage.setItem('DayoneHorizontal', 'true');
    localStorage.removeItem('DayoneHorizontalHover');
  });
  fromEvent(horizontalHover, 'click').subscribe(() => {
     //add
     body?.classList.add('horizontal');
     body?.classList.add('horizontal-hover');
     mainContent?.classList.add('hor-content');
     mainContainer.forEach((e,i)=>{
       e?.classList.add('container');
     })
     appHeader?.classList.add('hor-header');
     appSidebar3?.classList.add('horizontal-mainwrapper','container');
     sideMenu?.classList.add('flex-nowrap');
     appSidebar?.classList.add('horizontal-main', 'hor-menu');
     mainSidemenu?.classList.add('container');
     angle?.classList.add("horizontal-icon");
     mainMenu?.classList.add("horizontalMenu");
 
     // remove
     sideMenu?.classList.remove('flex-wrap');
     mainContent?.classList.remove('app-content');
     mainContainer.forEach((e,i)=>{
       e?.classList.remove('container-fluid', 'side-app');
     })
     header?.classList.remove('app-header');
     body?.classList.remove('sidebar-mini');
     body?.classList.remove('sidenav-toggled');
     sidebarFn.checkHoriMenu();
     localStorage.setItem('DayoneHorizontalHover', 'true');
     localStorage.removeItem('DayoneHorizontal');
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
  // menu
  fromEvent(lightMenu, 'click').subscribe(() => {
    body?.classList.add('light-menu');
    body?.classList.remove('color-menu');
    body?.classList.remove('dark-menu');
    body?.classList.remove('gradient-menu');
  });
  fromEvent(colorMenu, 'click').subscribe(() => {
    body?.classList.add('color-menu');
    body?.classList.remove('light-menu');
    body?.classList.remove('dark-menu');
    body?.classList.remove('gradient-menu');
  });
  fromEvent(darkMenu, 'click').subscribe(() => {
    body?.classList.add('dark-menu');
    body?.classList.remove('color-menu');
    body?.classList.remove('light-menu');
    body?.classList.remove('gradient-menu');
  });
  fromEvent(gradientMenu, 'click').subscribe(() => {
    body?.classList.add('gradient-menu');
    body?.classList.remove('color-menu');
    body?.classList.remove('light-menu');
    body?.classList.remove('dark-menu');
  });
  // header
  fromEvent(lightHeader, 'click').subscribe(() => {
    body?.classList.add('light-header');
    body?.classList.remove('color-header');
    body?.classList.remove('gradient-header');
    body?.classList.remove('dark-header');
  });
  fromEvent(darkHeader, 'click').subscribe(() => {
    body?.classList.add('dark-header');
    body?.classList.remove('light-header');
    body?.classList.remove('color-header');
    body?.classList.remove('gradient-header');
  });
  fromEvent(colorHeader, 'click').subscribe(() => {
    body?.classList.add('color-header');
    body?.classList.remove('light-header');
    body?.classList.remove('gradient-header');
    body?.classList.remove('dark-header');
  });
  fromEvent(gradientHeader, 'click').subscribe(() => {
    body?.classList.add('gradient-header');
    body?.classList.remove('light-header');
    body?.classList.remove('color-header');
    body?.classList.remove('dark-header');
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
  if( document.querySelector('body')?.classList.contains('light-header')){
    let light = document.getElementById('background4') as HTMLInputElement;
    light.checked = true;
  }
  // color header 
  if(document.querySelector('body')?.classList.contains('color-header')){
    let light = document.getElementById('background5') as HTMLInputElement;
    light.checked = true;
  }
  // gradient header 
  if(document.querySelector('body')?.classList.contains('gradient-header')){
    let light = document.getElementById('background10') as HTMLInputElement;
    light.checked = true;
  }
  // dark header 
  if(document.querySelector('body')?.classList.contains('dark-header')){
    let light = document.getElementById('background6') as HTMLInputElement;
    light.checked = true;
  }

  // light menu
  if(document.querySelector('body')?.classList.contains('light-menu')){
    let light = document.getElementById('background1') as HTMLInputElement;
    light.checked = true;
  }
  // color menu
  if(document.querySelector('body')?.classList.contains('color-menu')){
    let light = document.getElementById('background2') as HTMLInputElement;
    light.checked = true;
  }
  // gradient menu
  if(document.querySelector('body')?.classList.contains('gradient-menu')) {
    let light = document.getElementById('background11') as HTMLInputElement;
    light.checked = true;
  }
  // dark menu
  if(document.querySelector('body')?.classList.contains('dark-menu')) {
    let light = document.getElementById('background3') as HTMLInputElement;
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


