const useJwt=()=>{
    const jwt= localStorage.getItem('jwt')
    return jwt
}
export default useJwt