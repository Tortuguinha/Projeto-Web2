const { JWTPrismaFactory } = require("../../repositories/prisma/JWTPrismaRepository")
const { MakeLogout } = require("../../use-cases/factories/makeLogout")

async function LogoutController() {
	try {
		const employee = req.user

		const repoFact = new JWTPrismaFactory()
		const logoutFactory = MakeLogout(repoFact)

		await logoutFactory.exec(employee.payload.sub)

		const { refreshToken } = req.cookies

		await repoFact.createRepository().remove(refreshToken)
		
		res.clearCookie('refreshToken', { httpOnly: true, sameSite: "lax", secure: true })
       	res.clearCookie('accessToken', { httpOnly: true, sameSite: "lax", secure: true })

        res
            .status(200)
            .json({
                auth: false,
                user: null
            })

	} catch(err) {
		const status = err.status || 500;

		res.status(status).json({
			message: err.message || "Ocorreu um erro inesperado.",
		});
	}
}

module.exports = { LogoutController }