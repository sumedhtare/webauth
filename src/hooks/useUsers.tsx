import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext';
import { user } from '../types/interface';

const serverURL: string = process.env.SERVER_URL || 'http://localhost:8000'
const updateInterval: number = Number(process.env.UPDATE_INTERVAL) || 3000

export const useUsers = () => {
    const { token } = useContext(AuthContext);
    
    const [users, setUsers] = useState<user[] | null>(null)

    const getOnlineUsers = async () => {
        if (token) {
            try {
                const res = await fetch(`${serverURL}/api/logged-in-users`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`
                    },
                })
                 const resJson:user[] = await res.json();
                setUsers(resJson)
            }
            catch (e) {
                console.log('An error occurred', e);
            }
        }
    }

    const getUserById = async (id: number) => {
        try {
            const res = await fetch(`${serverURL}/api/users/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
            })

            const resJson:user = await res.json();
            return resJson
        }
        catch (e) {
            console.log('An error occurred', e);
        }
    }

    useEffect(() => {

        const interval = setInterval(() => {
            getOnlineUsers()
        }, updateInterval);

        return ()=> clearInterval(interval)

    }, [])

    return { users, getUserById }
}

