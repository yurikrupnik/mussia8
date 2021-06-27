import path from "path";
import swaggerUi from "swagger-ui-express";
import { IRouter, Request, Response, Router } from "express";

function swaggerUI(url: string, dest: string): IRouter {
    const route = Router();
    route.get("/swagger.json", (req: Request, res: Response) => {
        res.header("Content-Type", "application/json");
        res.sendFile(path.join(process.cwd(), dest, "swagger.json"));
    });
    route.use("/doc", swaggerUi.serve);
    route.get(
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
    return route;
}

export default swaggerUI;
