const userInfo = () => {
    return JSON.parse(sessionStorage.getItem('userLoginInfo') || '{}')
}
const registrationInfo = () => {
    return JSON.parse(localStorage.getItem('registrationInfo') || '{}')
}
export {
    userInfo,
    registrationInfo
}