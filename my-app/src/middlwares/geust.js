export default function geust({ next, router }) {
    if (localStorage.getItem('token'))
    {
        return router.push('/dashboard');
    }
    return next();
}