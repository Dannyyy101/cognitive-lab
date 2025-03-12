'use client'
import Link from "next/link";
import {handleSignIn} from "@/lib/firebase/auth";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function Login() {
    const router = useRouter()
    const [authSwitch, setAuthSwitch] = useState<"login" | "register">("login")

    const handleAuthSwitch = (type: "login" | "register") => {
        setAuthSwitch(type)
    }
    return <main className="w-screen h-screen flex justify-center items-center flex-col">
        <AuthSwitch authType={authSwitch} handleAuthSwitch={handleAuthSwitch}/>
        {authSwitch === "login" ?
            <LoginForm router={router}/> : <RegisterForm router={router}/>}
    </main>
}

const LoginForm = ({router}:{router: AppRouterInstance}) => {
    return <section className="mt-6 w-[400px] h-[500px] border border-borderColor_default rounded-md p-4 flex flex-col">
        <h1 className="text-2xl font-bold">Willkommen zurück</h1>
        <p className="text-fgColor_muted">Logge dich ein um fortzufahren</p>
        <label className="text-sm mt-10">E-Mail</label>
        <input type={"email"} className="mt-1 w-full h-10 border border-borderColor_default pl-2 rounded-md"
               placeholder={"you@example.com"}/>
        <div className="w-full flex items-end">
            <label className="text-sm mt-4 w-1/2">Passwort</label>
            <Link className="hover:underline w-1/2 text-right text-xs text-fgColor_muted" href={"/forgot-password"}>Passwort
                vergessen?</Link>
        </div>
        <input type={"password"} className="mt-1 w-full h-10 border border-borderColor_default pl-2 rounded-md"/>
        <button className="w-full h-10 bg-bgColor_accent_emphasis rounded-md mt-8 text-fgColor_white">Einloggen</button>
        <div className="w-full flex mt-8 items-center">
            <hr className="bg-bgColor_disabled h-[1px] w-1/3"/>
            <p className="mx-2 text-sm text-fgColor_muted min-w-max">Oder verwende</p>
            <hr className="bg-bgColor_disabled h-[1px] w-1/3"/>
        </div>
        <button className="w-full h-10 bg-transparent border border-borderColor_default rounded-md mt-8"
                onClick={(e)=> handleSignIn(e, router)}>Google
        </button>
    </section>
}

interface AuthSwitchProps {
    authType: "login" | "register"
    handleAuthSwitch: (type: "login" | "register") => void
}

const AuthSwitch = ({authType, handleAuthSwitch}: AuthSwitchProps) => {
    return (<div className="w-[400px] bg-bgColor_disabled p-1 flex rounded-md">
        <button onClick={() => handleAuthSwitch("login")}
                className={`rounded-md h-8 w-1/2 ${authType === "login" ? "bg-bgColor_default" : "bg-transparent"}`}>Einloggen
        </button>
        <button onClick={() => handleAuthSwitch("register")}
                className={`rounded-md h-8 w-1/2 ${authType === "register" ? "bg-bgColor_default" : "bg-transparent"}`}>Registrieren
        </button>

    </div>)
}

const RegisterForm = ({router}:{router: AppRouterInstance}) => {
    return <section className="mt-6 w-[400px] h-[500px] border border-borderColor_default rounded-md p-4 flex flex-col">
        <h1 className="text-2xl font-bold">Erstelle einen Account</h1>
        <p className="text-fgColor_muted">Registriere dich ein um fortzufahren</p>
        <label className="text-sm mt-10">E-Mail</label>
        <input type={"email"} className="mt-1 w-full h-10 border border-borderColor_default pl-2 rounded-md"
               placeholder={"you@example.com"}/>
        <div className="w-full flex items-end">
            <label className="text-sm mt-4 w-1/2">Passwort</label>
            <Link className="hover:underline w-1/2 text-right text-xs text-fgColor_muted" href={"/forgot-password"}>Passwort
                vergessen?</Link>
        </div>
        <input type={"password"} className="mt-1 w-full h-10 border border-borderColor_default pl-2 rounded-md"/>
        <button className="w-full h-10 bg-bgColor_accent_emphasis rounded-md mt-8 text-fgColor_white">Einloggen</button>
        <div className="w-full flex mt-8 items-center">
            <hr className="bg-bgColor_disabled h-[1px] w-1/3"/>
            <p className="mx-2 text-sm text-fgColor_muted min-w-max">Oder verwende</p>
            <hr className="bg-bgColor_disabled h-[1px] w-1/3"/>
        </div>
        <button className="w-full h-10 bg-transparent border border-borderColor_default rounded-md mt-8"
                onClick={(e) =>handleSignIn(e, router)}>Google
        </button>
    </section>
}