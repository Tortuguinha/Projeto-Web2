import { useState } from "react";
import Form from "../../components/Form";
import { useDispatch } from "react-redux"
import { setAuth } from "../../redux/user/employeeSlice"
import { useAlert } from "../../context/AlertContext";
import { FaExclamation, FaCheck } from "react-icons/fa"
import { isValidEmail } from "../../utils/email-regex"
import employeeAPI from "../../api/employeeApi"

function SignInPage() {

	const [signInData, setSignInData] = useState({
		email: "",
		password: "",
	})

	const { showAlert } = useAlert();

	const [loading, setLoading] = useState(false)

	const dispatch = useDispatch()

	const handleLogin = async (e) => {
		e.preventDefault();

		if (!signInData.email || !signInData.password) {
			showAlert("error", "Por favor, preencha todos os campos!", FaExclamation);
			return;
        }

		if(!isValidEmail(signInData.email)) {
			showAlert("error", "E-mail inválido", FaExclamation);
			return;
		}

		try {
			setLoading(true)

			const { data } = await employeeAPI.loginEmployee({
				email: signInData.email,
				password: signInData.password
			})

			dispatch(setAuth(data))

			showAlert("success", "Logado com sucesso!", FaCheck)


		} catch(err) {
			console.error(err)
			showAlert(
				"error",
				err?.response?.data?.err || "Ocorreu um erro ao tentar logar.",
				FaExclamation
				)

		} finally {
			setLoading(false)
			setSignInData({
				email: "",
				password: ""
			})
		}

	};


	return (
		<main className="w-full h-auto flex items-center justify-center">
			<Form.FormRoot className={"w-72 space-y-4 flex flex-col justify-center"} onSubmit={handleLogin}>
				<Form.FormHeader>
					<Form.FormTitle className="text-center text-2xl" title="Entrar" />
				</Form.FormHeader>
				<Form.FormLabel >
					<Form.FormInput
						className="w-full"
						name="email"
						value={signInData.email}
						onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
						placeholder="example@email.com"
						type="email"
						required
					/>
				</Form.FormLabel>
				<Form.FormLabel>
					<Form.FormInput
						className="w-full"
						name="password"
						value={signInData.password}
						onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
						placeholder="********"
						type="password"
						required
					/>
				</Form.FormLabel>
				<Form.FormButton
					type="submit"
					className={loading ? "bg-blue-600" : "bg-blue-500"}
					label={loading ? "Entrando..." : "Entrar"}
					disabled={loading}
        		/>
			</Form.FormRoot>
		</main>
	)
}

export default SignInPage;
