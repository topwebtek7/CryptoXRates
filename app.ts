import * as express from 'express'
import { Request, Response, NextFunction } from "express"
import * as createError from 'http-errors'
import * as path from 'path'
import * as favicon from 'serve-favicon'
import * as logger from 'morgan'
import * as cors from "cors"
import apiRouter from './api/index'
import * as YAML from 'yamljs'
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = YAML.load('./doc/api.yaml')

const options:cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  // origin: API_URL,
  preflightContinue: false
}

class App {
  public app: express.Application
  constructor() {
    this.app = express()
    this.config()
    this.routes()
  }

  private config(): void {
    this.app.use(cors(options))
    this.app.use(logger('dev'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(express.static(path.join(__dirname, '../cryptoxrates')))
    this.app.use('/', express.static(path.join(__dirname, '../cryptoxrates')))
  }

  private routes(): void {
    const router = express.Router()

    this.app.use('/api', apiRouter)
    this.app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    
    router.use(function(req: Request, res: Response, next: NextFunction) {
      next(createError(404))
    })
    // error handler
    router.use(function(err, req: Request, res: Response, next: NextFunction) {
      // set locals, only providing error in development
      res.locals.message = err.message
      res.locals.error = req.app.get('env') === 'development' ? err : {}
    
      // render the error page
      res.sendStatus(err.status || 500)
    })

    this.app.use('/', router)
    this.app.options("*", cors(options))
  }
}

export default new App().app
