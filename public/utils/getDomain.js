
function getDomain(url = window.location.href) {
  const reg = /(?<domain>^[^:]*:\/\/[^/]*)/;
  const result = reg.exec(url);

  if (!result) throw new Error('window.location.href is not a url');

  return result.groups.domain;
}

export default getDomain;