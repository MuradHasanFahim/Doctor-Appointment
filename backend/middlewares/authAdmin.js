import jwt from 'jsonwebtoken'

const authAdmin = async (req, res, next) => {
  try {
    const token = req.headers.atoken
    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized, Login Again" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Ensure it's the right admin
    if (decoded.email !== process.env.ADMIN_EMAIL || decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: "Forbidden: Not Authorized" })
    }

    req.admin = decoded // store payload for later use if needed
    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({ success: false, message: "Invalid or expired token" })
  }
}

export default authAdmin
