type BadRequestError = {
  data: {
    errorMessages: Array<string>
  }
}
export function isBadRequestError(error: unknown): error is BadRequestError {


  return (
    !!error &&
    typeof error === 'object' &&
    'data' in error &&
    typeof error.data === 'object' &&
    !!error.data &&
    'errorMessages' in error.data &&
    Array.isArray(error.data.errorMessages)
  )
}
