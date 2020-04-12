import React, { useEffect } from 'react'
import auth0 from '../lib/auth0'
import router from 'next/router'
import { db } from '../lib/db'
import { distance } from '../lib/geo'

const App = props => {
    useEffect(() => {
        if(!props.isAuth){
            router.push('/')
        }else if(props.forceCreate){
            router.push('/create-status')
        }
    })
    if(!props.isAuth || props.forceCreate){
        return null
    }
    return (
        <div>
            <h1>Status próximos a você!</h1>
            <table className="border-solid border-4 border-gray-600">
                <thead>
                    <tr>
                        <th class="border border-gray-400 px-4 py-2 text-gray-800">ID</th>
                        <th class="border border-gray-400 px-4 py-2 text-gray-800">Status</th>
                        <th class="border border-gray-400 px-4 py-2 text-gray-800">Coordenada</th>
                        <th class="border border-gray-400 px-4 py-2 text-gray-800">Distancia</th>
                    </tr>
                </thead>
                    { props.checkins.map(checkin => {
                        return (
                            <tr>
                                <td class="border border-gray-400 px-4 py-2">{checkin.id === props.user.sub && 'Seu Status'}</td>
                                <td class="border border-gray-400 px-4 py-2">{checkin.status}</td>
                                <td class="border border-gray-400 px-4 py-2">{JSON.stringify(checkin.coords)}</td>
                                <td class="border border-gray-400 px-4 py-2">{checkin.distance}</td>
                            </tr>
                        )
                    })}
            </table>            
            { /* <pre>{JSON.stringify(props, null, 2)}</pre> */ }
        </div>
    )
}

export default App

export async function getServerSideProps({ req, res }) {
    const session = await auth0.getSession(req)   
    if(session){
        const today = new Date()
        const currentDate = 
            today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate()
        const todaysChecking = await db
            .collection('markers')
            .doc(currentDate)
            .collection('checks')
            .doc(session.user.sub)
            .get()
        const todaysData = todaysChecking.data()
        let forceCreate = true
        if(todaysData){
            // pode ver os outros checkins
            forceCreate = false
            const checkins = await db
                .collection('markers')
                .doc(currentDate)
                .collection('checks')
                .near({
                    center: todaysData.coordinates,
                    radius: 1400
                }).get()
            
            const checkinsList = []
            checkins.docs.forEach(doc => {
                checkinsList.push({
                    id: doc.id,
                    status: doc.data().status,
                    coords: {
                        lat: doc.data().coordinates.latitude,
                        long: doc.data().coordinates.longitude,
                    },
                    distance: distance(
                        todaysData.coordinates.latitude, 
                        todaysData.coordinates.longitude,
                        doc.data().coordinates.latitude,
                        doc.data().coordinates.longitude,
                    )
                })
            })
            return {
                props: {
                    isAuth: true,
                    user: session.user,
                    forceCreate: false,
                    checkins: checkinsList
                }
            }
        }     

        return {
            props: {
                //isAuth: !!session.user,
                isAuth: true,
                user: session.user,
                forceCreate
            }
        }
    }

    return {
        props: {
            isAuth: false,
            user: { }
        }
    }    
}