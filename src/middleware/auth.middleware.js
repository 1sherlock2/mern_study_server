const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }
  try {
    const token = req.headers.authorizations.split('')[1]

    if (!token) {
      return res.status(401).json({
        message: "Not authorizations"
      })
    }

    const decoded = jwt.verify(token, 'express_study')
    req.user = decoded
    next()

  } catch (e) {
    return res.status(401).json({
      message: "Not authorizations"
    })
  }
}

