import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return(
        <div className="bg-gray-500 py-4">
            <Link href="/sobre">
                <a>Sobre</a>
            </Link>
            <Link href="/cadastro">
                <a>Cadastro</a>
            </Link>
            <Link href="/entrar">
                <a>Entrar</a>
            </Link>
        </div>
    )
}

export default Navbar