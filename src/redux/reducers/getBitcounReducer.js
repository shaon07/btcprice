import { GET_DATA, UPDATE_DATA } from "../constant/bitcoinConstant";

const initData = {
    loading:false,
    info:[]
}

const getBitcounReducer = (state=initData,action)=>{
    switch (action.type) {
        case GET_DATA:
           return {
            ...state,
            loading:true
           }
        case UPDATE_DATA :
            return {
                loading:false,
                info:[...action.payload]
            }
        default:
           return state;
    }
}

export default getBitcounReducer;