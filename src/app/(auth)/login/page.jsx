import "../../globals.css"
import LoginForm from "./components/loginForm"


export default function Login() {
    return (
        <>
            <div className="bg-primary-orange w-full rounded-t-3xl h-[calc(100vh-33vh)] flex justify-center items-center">
                <div className="bg-primary-orange-light w-[80%] max-w-[1300px] h-[55vh] p-8 rounded-3xl shadow-lg flex justify-center items-center">
                    <LoginForm/>
                </div>
            </div>
        </>
    );
}