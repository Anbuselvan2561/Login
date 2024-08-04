const sendToken = (user, statusCode, res) => {

    const token = user.getJwtToken();

    res.status(statusCode)
    .cookie('token',token)
    .json({
        success : true,
        token,
        user
})
};

module.exports = sendToken;
