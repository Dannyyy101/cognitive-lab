'use client'
import { UserUnauthorized } from '@/components/auth/UserUnauthorized'
import { Role } from '@/types/dtos/userDTO'
import { useEffect, useState } from 'react'
import { User } from '@/types/models/user.types'

export default function Users() {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        fetch('/api/users').then((response) =>
            response.json().then((result) => {
                setUsers(result)
                console.log(result)
            })
        )
    }, [])

    const roles: Role[] = ['user', 'admin']

    return (
        <UserUnauthorized>
            <main className="w-screen h-screen items-center flex justify-center flex-col">
                <div className="w-11/12 mb-2">
                    <h1 className="text-3xl text-fgColor_default">Benutzer</h1>
                </div>
                <section className="w-11/12 flex justify-center">
                    <table className="w-full border-borderColor_default border rounded-md text-left">
                        <thead>
                            <tr className="h-10">
                                <th className="text-fgColor_default pl-4">Name</th>
                                <th className="text-fgColor_default pl-4">E-Mail</th>
                                <th className="text-fgColor_default pl-4">Rolle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className="border-borderColor_default border text-fgColor_default ">
                                    <td className="flex ml-4 my-1 items-center">
                                        <p className="pl-2">
                                            {user.firstName} {user.lastName}
                                        </p>
                                    </td>
                                    <td className="pl-4">{user.email}</td>
                                    <td className="pl-4">
                                        <select
                                            className="bg-transparent w-20 appearance-none pl-2 border-borderColor_default border hover:cursor-pointer"
                                            defaultValue={user.roles[0]}
                                        >
                                            {roles.map((role) => (
                                                <option key={role} className="text-fgColor_default">
                                                    {role}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </UserUnauthorized>
    )
}
