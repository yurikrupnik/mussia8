import nc from "next-connect";
import { all } from "../../../middlewares";
import { list } from "../../../utils/methods";

import Model from "../../../models/User";

const handler = nc().use(all);

handler.get(list(Model));

export default handler;
