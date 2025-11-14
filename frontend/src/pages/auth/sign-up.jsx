import { useState } from "react";
import employeeApi from "../../api/employeeApi";
import { FaCheck, FaExclamation } from "react-icons/fa";
import { useAlert } from "../../context/AlertContext";
import Form from "../../components/Form";

function SignUpPage() {
  const { showAlert } = useAlert();

  const [registerData, setRegisterData] = useState({
    fullName: "",
    cpf: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const emptyFields = Object.keys(registerData).filter(key => !registerData[key]);
      if (emptyFields.length > 0) {
        showAlert("error", "Por favor, preencha todos os campos!", FaExclamation);
        return;
      }

      await employeeApi.registerEmployee({
        name: registerData.fullName,
        cpf: registerData.cpf,
        email: registerData.email,
        password: registerData.password,
        confirmPassword: registerData.confirmPassword,
      })

      showAlert("success", "Operação concluída com sucesso!", FaCheck);

      setRegisterData({
        fullName: "",
        cpf: "",
        email: "",
        password: "",
        confirmPassword: ""
      });

    } catch (err) {
      console.error(err);
      showAlert("error", "Ocorreu um erro no cadastro.", FaExclamation);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full h-auto flex items-center justify-center">
      <Form.FormRoot
        className="w-72 space-y-4 flex flex-col justify-center"
        onSubmit={handleSubmit}
      >
        <Form.FormHeader>
          <Form.FormTitle className="text-center text-2xl" title="Cadastro" />
        </Form.FormHeader>

        <Form.FormLabel htmlFor="full-name">
          <Form.FormInput
            className="w-full"
            name="full-name"
            value={registerData.fullName}
            onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
            placeholder="Nome Completo"
            type="text"
            required
          />
        </Form.FormLabel>

        <Form.FormLabel htmlFor="cpf">
          <Form.FormInput
            className="w-full"
            name="cpf"
            value={registerData.cpf}
            onChange={(e) => setRegisterData({ ...registerData, cpf: e.target.value })}
            placeholder="000.000.000-00"
            type="text"
            required
          />
        </Form.FormLabel>

        <Form.FormLabel htmlFor="email">
          <Form.FormInput
            className="w-full"
            name="email"
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            placeholder="example@email.com"
            type="email"
            required
          />
        </Form.FormLabel>

        <Form.FormLabel htmlFor="password">
          <Form.FormInput
            className="w-full"
            name="password"
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            placeholder="********"
            type="password"
            required
          />
        </Form.FormLabel>

        <Form.FormLabel htmlFor="confirm-password">
          <Form.FormInput
            className="w-full"
            name="confirm-password"
            value={registerData.confirmPassword}
            onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
            placeholder="********"
            type="password"
            required
          />
        </Form.FormLabel>
        <Form.FormButton
          type="submit"
          className={loading ? "bg-blue-600" : "bg-blue-500"}
          label={loading ? "Cadastrando..." : "Cadastrar"}
          disabled={loading}
        />
      </Form.FormRoot>
    </main>
  );
}

export default SignUpPage;
