import * as handler from '@helpers/handler'

describe('helpers/handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })

  describe('buildHandlerResponse', () => {
    const headers = handler.defaultHeaders
    it('should return a handler response', () => {
      const statusCode = handler.STATUS_CODE.OK
      const body = ''

      const output = handler.buildHandlerResponse(statusCode, body, headers)
      
      expect(output.statusCode).toEqual(statusCode)
      expect(JSON.parse(output.body)).toEqual(body)
      expect(output.headers).toEqual(headers)
    })

    it('should add additional headers', () => {
      const statusCode = handler.STATUS_CODE.OK
      const body = ''
      const headers: handler.Headers = {
        a: 'b'
      }

      const output = handler.buildHandlerResponse(statusCode, body, headers)

      expect(output.headers).toMatchObject({ a: 'b' })
    })
  })

  describe('ok', () => {
    it('should return status code 200', () => {
      const spy = jest.spyOn(handler, 'buildHandlerResponse')
      const body = ''

      handler.ok(body)

      expect(spy.mock.calls[0]?.[0]).toEqual(handler.STATUS_CODE.OK)
    })
  })

  describe('created', () => {
    it('should return status code 201', () => {
      const spy = jest.spyOn(handler, 'buildHandlerResponse')

      handler.created('')

      expect(spy.mock.calls[0]?.[0]).toEqual(handler.STATUS_CODE.CREATED)
    })
  })

  describe('serverError', () => {
    it('should return status code 500', () => {
      const spy = jest.spyOn(handler, 'buildHandlerResponse')

      handler.serverError('' as unknown as Error)

      expect(spy.mock.calls[0]?.[0]).toEqual(handler.STATUS_CODE.INTERNAL_SERVER_ERROR)
    })

    it('should return status code 500 with Error type', () => {
      const spy = jest.spyOn(handler, 'buildHandlerResponse')

      handler.serverError({ message: ''} as Error)

      expect(spy.mock.calls[0]?.[0]).toEqual(handler.STATUS_CODE.INTERNAL_SERVER_ERROR)
    })
  })

  describe('notFoundError', () => {
    it('should return status code 404', () => {
      const spy = jest.spyOn(handler, 'buildHandlerResponse')

      handler.notFoundError('')

      expect(spy.mock.calls[0]?.[0]).toEqual(handler.STATUS_CODE.NOT_FOUND)
    })
  })
})
