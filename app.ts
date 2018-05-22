import * as express from 'express'
import { Request, Response, NextFunction } from "express"
import * as createError from 'http-errors'
import * as path from 'path'
import * as favicon from 'serve-favicon'
import * as logger from 'morgan'
import apiRouter from './api/index'

class App {
  public app: express.Application
  constructor() {
    this.app = express()
    this.config()
    this.routes()
  }

  private config(): void {
    this.app.use(logger('dev'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(express.static(path.join(__dirname, '../cryptoxrates')))
    this.app.use('/', express.static(path.join(__dirname, '../cryptoxrates')))
  }

  private routes(): void {
    const router = express.Router()

    this.app.use('/api', apiRouter)
    
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
  }
}

export default new App().app
