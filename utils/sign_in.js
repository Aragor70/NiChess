module.exports = (user, statusCode, res) => {

    const token = user.getSignToken()


    if (!token) {
        return ErrorResponse('Authorization error.', 422)
    }

    user.status = "Online"
    await user.save()

    res.status(statusCode).json({ success: true, token, user, message: `Hi ${user.name}.` })

}