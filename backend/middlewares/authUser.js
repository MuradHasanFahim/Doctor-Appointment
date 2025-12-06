import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.token || req.headers.authorization?.split(" ")[1]
    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized, Login Again" })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Attach to request
    req.user = { id: decoded.id }

    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({ success: false, message: "Invalid or expired token" })
  }
}

export default authUser
