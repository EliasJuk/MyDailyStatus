import { initAuth0 } from '@auth0/nextjs-auth0'

export default initAuth0({
    clientId: 'LqXZJBHrAQiuHvDHArzevVwagiJuDA1g',
    clientSecret: '123456',
    scope: 'user',
    domain: 'https://ghostbr.auth0.com',
    redirectUri: 'http://localhost:3000/api/callback',
    postLogoutRedirectUri: 'http://localhost:3000',
    session: {
        cookieSecret: 'abcdefghijklmnopqrstuvwxyzabcdef',
        cookieLifetime: 3600
    }
})