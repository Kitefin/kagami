
import axios from 'axios';  
import {NODE_URL} from "../config"; 

export const get_Email_by_wallet = async (userAddress) => {
    const url = NODE_URL + `/api/cluster/${userAddress}`;
    try { 
        const res = await axios.post(url, userAddress); 
        const userInfo = {address: userAddress, email: res.data.email};  
        localStorage.userInfo = JSON.stringify( userInfo );
    }
    catch(err) {
        console.log(err) 
    } 
}

export const GET_USER_EMAIL = () => {
    if(localStorage.userInfo)
    {
        const {userInfo} = localStorage;
        const {email, address} = JSON.parse(userInfo); 
        if(email === null)
        {
            const url = NODE_URL + `/api/cluster/${address}`;
           
                axios.post(url, address)
                .then( res => {
                    if(res.data.email !== null)
                    {
                        console.log(res.data.email)
                        const userInfo = {address: address, email: res.data.email};  
                        localStorage.userInfo = JSON.stringify( userInfo );
                    }
                    else { return null; }
                } )
                .catch(err => {return null; }) 
           
        }
        else return email;
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