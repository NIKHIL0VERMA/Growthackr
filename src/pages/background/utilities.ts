export function isValidPage(tab: chrome.tabs.Tab | undefined): boolean {
    if (tab == null || tab == undefined || !tab.url || !tab.id) return false;
  
    if (
      (!tab.url.startsWith('http:') &&
        !tab.url.startsWith('https:') &&
        !tab.url.startsWith('file:')) ||
      tab.url.startsWith('chrome://') ||
      tab.url.startsWith('chrome-extension://')
    )
      return false;
    return true;
  }

  export function extractHostName(url: string | undefined): string {
    let hostname;
    if (url == undefined) return '';
  
    if (url.startsWith('file:')) {
      return url;
    }
  
    if (url.indexOf('//') > -1) {
      hostname = url.split('/')[2];
    } else {
      hostname = url.split('/')[0];
    }
  
    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];
  
    if (hostname.startsWith('www.')) {
      hostname = hostname.substring(4);
    }
      
    return hostname;
  }
  