
export default function (ctx, next) { 
  // console.log('shortUrl router', ctx);

  const shortUrlResult = null; // TODO: connect with db

  if (!shortUrlResult) {
    return next();
  }

  if (shortUrlResult.isUrl) {
    return ctx.redirect(shortUrlResult.result);
  } 
  else if (shortUrlResult.isText) {
    return ctx.response.body = shortUrlResult.result; // TODO: use SPA page to display
  }
  else {
    return ctx.response.status(500);
  }
}