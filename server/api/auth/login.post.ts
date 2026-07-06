// POST /api/auth/login — validate password
const DEFAULT_PASSWORD = 'admin123'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.password) {
    throw createError({ statusCode: 400, statusMessage: 'Password is required' })
  }

  if (body.password === DEFAULT_PASSWORD) {
    return {
      success: true,
      token: `savora_session_${Date.now()}`,
      message: 'Login successful',
    }
  }

  throw createError({ statusCode: 401, statusMessage: 'Invalid password' })
})
