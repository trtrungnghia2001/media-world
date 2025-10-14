import express from 'express'
import swaggerUi from 'swagger-ui-express'

import swaggerDocument from './swagger.js'
import authRouter from './auth/auth.route.js'
import uploadRouter from './upload/upload.route.js'
import adminRouter from './admin/admin.route.js'
import mediaRouter from './media/media.route.js'
import { authMiddleware } from '#server/shared/middlewares/auth.middleware'

const routerV1 = express.Router()

routerV1.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

routerV1.use('/admin', adminRouter)
routerV1.use('/auth', authRouter)
routerV1.use('/upload', uploadRouter)
routerV1.use('/media', authMiddleware, mediaRouter)

export default routerV1
