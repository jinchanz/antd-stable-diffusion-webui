import { FileData } from "@/models/oss";

export function getServerEnv() {
  return _globalData?.serverEnv;
}

export async function sleep (ms) {
  return new Promise((resolve) => {
      setTimeout(resolve, ms);
  });
}

function createSuperLabel(url, id) {      
  const aTag = document.createElement("a");           
  aTag.setAttribute("href", url);      
  aTag.setAttribute("target", "_blank");      
  aTag.setAttribute("id", id);       
  // 防止反复添加      
  if(!document.getElementById(id)) {                               
      document.body.appendChild(aTag);      
  }      
  aTag.click();    
}

export const newPage = (url) => {
  createSuperLabel(url, Date.now())
};

export async function readFile(file): Promise<FileData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async function fileReadCompleted() {
      const tmpImg: any = document.createElement('img');
      tmpImg.src = reader.result;
      tmpImg.onload = function () {
        resolve({
          ratio: this.width / this.height,
          width: this.width,
          height: this.height,
          filename: file.name,
          type: file.type,
          src: reader.result,
        });
      };
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function uuid() {
  return crypto.randomUUID().replaceAll('-', '');
}

export function isValidHttpUrl(str) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  );
  return pattern.test(str);
}
