

export const GET_USER_EMAIL = () => {
    if(localStorage.userInfo)
    {
        const {userInfo} = localStorage;
        return JSON.parse(userInfo).email;  
    }
    else return null;
}

export const GET_USER_ADDRESS = () => {
    if(localStorage.userInfo)
    {
        const {userInfo} = localStorage;
        return JSON.parse(userInfo).address;  
    }
    else return null;
}