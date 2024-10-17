import "../../globals.css";
import LoginForm from "./components/loginForm";

export default function Login() {
    return (
        <>
            <div className="bg-bg-blue w-full min-h-screen flex flex-col justify-center items-center py-20">
                <img 
                    src="/images/Logo_textoBlanco.png" 
                    alt="Logo linsi"
                    className="w-64 h-auto object-contain mb-6"
                />
                
                <div className="w-full max-w-md p-8">
                    <LoginForm />
                </div>
            </div>
        </>
    );
}
