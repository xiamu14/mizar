export function getQueryString(name: string, url?: string) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = (url ?? window.location.search).substring(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
}
