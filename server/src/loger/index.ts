import logger from 'pino'
import dayjs from 'dayjs'

const isoTime = () => `,"time":"${new Date(Date.now()).toISOString()}"`
const log = logger({
    transport: {
        target: 'pino-pretty',
        options: {
          colorize: true
        }
      },
      base: {
          pid: false
      },
      timestamp: isoTime
})

export default log