import express from "express";
import { ORIGIN, PORT } from "../config/config.service.js";
import { authenticateDb, redicConnection } from "./DB/index.js";
import {globalErrorHandling,NotFoundException,} from "./common/utils/response/index.js";
import { AuthRouter, userRouter, messageRouter } from "./modules/index.js";
import path from "node:path";
import cors from "cors";
import { deleteUnconfirmedUsers } from "./jobs/index.js";
import helmet from "helmet";
import { ipKeyGenerator, rateLimit } from "express-rate-limit";
import geoip from 'geoip-lite'
async function bootStrap() {
  const app = express();
  const port = process.env.PORT || PORT;
  //Proxy
  app.set("trust proxy" , true)
  
  //cors
  const corsOptions = {
    origin: ORIGIN,
    credentials : true,
    optionsSuccessStatus: 200,
  };

  // rate limiter 
  const limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    limit: (req)=>{
      const geo = geoip.lookup(req.ip)
      const country = geo?.country
      return country == "EG" ? 5 : 3
    },
    standardHeaders : "draft-8",
    skipSuccessfulRequests : true,
    keyGenerator : (req)=>{
      const ipV6 = ipKeyGenerator(req.headers['x-forwarded-for'] , 56) || req.ip
      return `${ipV6}-${req.path}`
    }
  });

  //global Middlewares
  app.use(cors(corsOptions), helmet(), limiter, express.json());

  //Use Image
  app.use("/sarah/profile",express.static(path.join(path.resolve(), "src", "upload", "profile")),);

  //DB
  await authenticateDb();
  //Redis
  await redicConnection();
  //Cron-jobs
  await deleteUnconfirmedUsers();
  //application routing
  app.get("/", (req, res) => res.send("Hello World!"));
  app.use("/saraha/auth", AuthRouter);
  app.use("/saraha/profile", userRouter);
  app.use("/saraha/message", messageRouter);
  // invalid routing
  app.get("{/*dummy}", (req, res) => {
    return NotFoundException();
  });
  //Global Error Handling
  app.use(globalErrorHandling);
  app.listen(port, () => console.log(`listening on ${port}`));
}
export default bootStrap;
