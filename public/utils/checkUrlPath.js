
export default function checkUrlPath() {
  const reg = /(?<domain>[^:]*:\/\/[^/]*)\/(?<path1>[^#]*(?=\/))\/?#\/?(?<path2>.*)/;
  const url = window.location.href;
  const result = reg.exec(url);
  if (!result) return;

  const { domain, path1, path2 } = result.groups;
  
  window.location.href = `${domain}/#/${path1}/${path2}`;
}