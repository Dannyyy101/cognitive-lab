'use client'
import Link from 'next/link'
import { useState } from 'react'
import { login, signup } from '@/app/auth/action'

export default function Login() {
    const [authSwitch, setAuthSwitch] = useState<'login' | 'register'>('login')

    const handleAuthSwitch = (type: 'login' | 'register') => {
        setAuthSwitch(type)
    }
    return (
        <main className="w-screen h-screen flex items-center flex-col">
            <AuthSwitch authType={authSwitch} handleAuthSwitch={handleAuthSwitch} />
            {authSwitch === 'login' ? <LoginForm /> : <RegisterForm />}
        </main>
    )
}

const LoginForm = () => {
    return (
        <form className="mt-6 w-[400px] h-[500px] border border-borderColor_default rounded-md p-4 flex flex-col">
            <h1 className="text-2xl font-bold">Willkommen zurück</h1>
            <p className="text-fgColor_muted">Logge dich ein um fortzufahren</p>
            <label className="text-sm mt-10">E-Mail</label>
            <input
                type={'email'}
                id="email"
                name="email"
                required={true}
                className="text-fgColor_default bg-transparent mt-1 w-full h-10 border border-borderColor_default pl-2 rounded-md"
                placeholder={'you@example.com'}
            />
            <div className="w-full flex items-end">
                <label className="text-sm mt-4 w-1/2">Passwort</label>
                <Link className="hover:underline w-1/2 text-right text-xs text-fgColor_muted" href={'/forgot-password'}>
                    Passwort vergessen?
                </Link>
            </div>
            <input
                id="password"
                name="password"
                type="password"
                required={true}
                className="text-fgColor_default bg-transparent mt-1 w-full h-10 border border-borderColor_default pl-2 rounded-md"
            />
            <button
                className="w-full h-10 bg-bgColor_accent_emphasis rounded-md mt-8 text-fgColor_white"
                formAction={login}
            >
                Einloggen
            </button>
            <div className="w-full flex mt-8 items-center">
                <hr className="bg-bgColor_disabled h-[1px] w-1/3" />
                <p className="mx-2 text-sm text-fgColor_muted min-w-max">Oder verwende</p>
                <hr className="bg-bgColor_disabled h-[1px] w-1/3" />
            </div>
            <button
                type={'submit'}
                className="text-fgColor_default w-full h-10 bg-transparent border border-borderColor_default rounded-md mt-8"
            >
                Google
            </button>
        </form>
    )
}

interface AuthSwitchProps {
    authType: 'login' | 'register'
    handleAuthSwitch: (type: 'login' | 'register') => void
}

const AuthSwitch = ({ authType, handleAuthSwitch }: AuthSwitchProps) => {
    return (
        <div className="w-[400px] bg-bgColor_disabled p-1 flex rounded-md mt-32">
            <button
                onClick={() => handleAuthSwitch('login')}
                className={`text-fgColor_default rounded-md h-8 w-1/2 ${authType === 'login' ? 'bg-bgColor_default' : 'bg-transparent'}`}
            >
                Einloggen
            </button>
            <button
                onClick={() => handleAuthSwitch('register')}
                className={`text-fgColor_default rounded-md h-8 w-1/2 ${authType === 'register' ? 'bg-bgColor_default' : 'bg-transparent'}`}
            >
                Registrieren
            </button>
        </div>
    )
}

const RegisterForm = () => {
    return (
        <form className="mt-6 w-[400px] min-h-[500px] border border-borderColor_default rounded-md p-4 flex flex-col">
            <h1 className="text-2xl font-bold">Erstelle einen Account</h1>
            <p className="text-fgColor_muted">Registriere dich ein um fortzufahren</p>
            <label className="text-sm mt-2">Vorname</label>
            <input
                type={'text'}
                id="firstName"
                name="firstName"
                required={true}
                className="text-fgColor_default bg-transparent mt-1 w-full h-10 border border-borderColor_default pl-2 rounded-md"
            />
            <label className="text-sm mt-2">Nachname</label>
            <input
                type={'text'}
                id="lastName"
                name="lastName"
                required={true}
                className="text-fgColor_default bg-transparent mt-1 w-full h-10 border border-borderColor_default pl-2 rounded-md"
            />
            <label className="text-sm mt-2">E-Mail</label>
            <input
                type={'email'}
                id="email"
                name="email"
                required={true}
                className="text-fgColor_default bg-transparent mt-1 w-full h-10 border border-borderColor_default pl-2 rounded-md"
                placeholder={'you@example.com'}
            />
            <div className="w-full flex items-end">
                <label className="text-sm mt-4 w-1/2">Passwort</label>
            </div>
            <input
                id="password"
                name="password"
                type="password"
                required={true}
                className="text-fgColor_default bg-transparent mt-1 w-full h-10 border border-borderColor_default pl-2 rounded-md"
            />
            <button
                className="w-full h-10 bg-bgColor_accent_emphasis rounded-md mt-8 text-fgColor_white"
                formAction={signup}
            >
                Registrieren
            </button>
            <div className="w-full flex mt-8 items-center">
                <hr className="bg-bgColor_disabled h-[1px] w-1/3" />
                <p className="mx-2 text-sm text-fgColor_muted min-w-max">Oder verwende</p>
                <hr className="bg-bgColor_disabled h-[1px] w-1/3" />
            </div>
            <button
                className="text-fgColor_default h-10 bg-transparent border border-borderColor_default rounded-md mt-8"
                type={'submit'}
            >
                Google
            </button>
        </form>
    )
}
