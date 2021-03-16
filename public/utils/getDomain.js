
function getDomain() {
  const reg = /(?<domain>^[^:]*:\/\/[^/]*)/;
  const url = window.location.href;
  const result = reg.exec(url);

  if (!result) throw new Error('window.location.href is not a url');

  return result.groups.domain;
}

export default getDomain;