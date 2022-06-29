import { GET_DATA, UPDATE_DATA } from "../constant/bitcoinConstant"

export const getData = (data) =>{
    return {
        type: GET_DATA,
        payload : data
    }
}

export const updateData = (data) =>{
    return {
        type:UPDATE_DATA,
        payload:data
    }
}