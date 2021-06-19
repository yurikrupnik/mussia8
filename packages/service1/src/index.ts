import app from "./server";
import json from "../package.json";

const port = Number(process.env.PORT) || json.config.port || 8080;

app.listen(port, () => {
    console.log(`listening on porti ${port}`); // eslint-disable-line
});
