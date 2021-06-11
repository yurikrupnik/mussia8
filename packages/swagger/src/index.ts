import path from "path";
import swaggerUi from "swagger-ui-express";
import { Router } from "express";

function swaggerUI(url: string) {
    // todo module
    const r = Router();
    r.get("/swagger.json", (req, res) => {
        res.header("Content-Type", "application/json");
        res.sendFile(path.join(__dirname, "swagger.json"));
        // res.sendFile("swagger.json");
    });
    r.use("/doc", swaggerUi.serve);
    r.get(
        "/doc",
        swaggerUi.setup(
            {},
            {
                swaggerOptions: {
                    url: `${url}/swagger.json`
                }
            }
        )
    );
    return r;
}

export default swaggerUI;
