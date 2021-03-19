
import { getRecord } from '../models/Record.js';

export default async function (ctx, next) { 
  const { alias } = /\/(?<alias>[^/]*)/.exec(ctx.request.url).groups;

  const shortUrlResult = await getRecord({ alias }); // TODO: connect with db
  
  console.log(alias, shortUrlResult);

  if (!shortUrlResult) {
    return next();
  }

  return ctx.redirect(shortUrlResult.target);

  // if (shortUrlResult.isUrl) {
  //   return ctx.redirect(shortUrlResult.result);
  // } 
  // else if (shortUrlResult.isText) {
  //   return ctx.response.body = shortUrlResult.result; // TODO: use SPA page to display
  // }
  // else {
  //   return ctx.response.status(500);
  // }
}