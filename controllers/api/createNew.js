
import newLogger from "../../common/logger.js";
import { getRandomString } from "../../common/randomString.js";
import { Record } from "../../models/Record.js";
import isUrl from "../../common/isUrl.js";
import ErrorMap from "../../common/ErrorMap.js";

const { debug, info } = newLogger('controllers/api/createNew', true);

async function getUniqueAlias() {
  while (true) {
    const alias = getRandomString();
    if (!await Record.exists({ alias })) {
      return alias;
    }
  }
}

async function createNew(ctx) {
  const { target } = ctx.request.body;

  if (!isUrl(target)) {
    ctx.response.status = 400;
    ctx.response.message = ErrorMap.INVALID_TARGET;
    return;
  }

  let record = await Record.findOne({ target });
  if (record) {
    const { alias } = record;
    return ctx.response.body = { alias, target };
  }

  const alias = await getUniqueAlias();
  
  record = new Record({ alias, target });
  await record.save();

  ctx.response.body = { alias, target };
}

export default createNew;