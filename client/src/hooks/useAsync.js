import { useReducer, useEffect } from "react"
const initialState = {
    loading: false,
    data: null,
    error: null
}
// 로딩중? 데이터 받기 성공? 데이터 받기 실패
// LOADING , SUCCESS, ERROR
function reducer(state, action){
    switch(action.type) {
        case "LOADING":
            return {
                loading: true,
                data: null,
                error: null
            };
        case "SUCCESS":
            return {
                loading: false,
                data: action.data,
                error: null
            }
        case "ERROR":
            return {
                loading: false,
                data: null,
                error: action.error
            }
        default:
            return state;
    }
}

function useAsync(callback, deps = []) {
    // console.log("useAsync진입: ", deps);
    const [state, dispatch] = useReducer(reducer, initialState);
    const fetchDate = async () => {
        dispatch({type: "LOADING"});
        try {
            const data = await callback(); //callback은 getProduct()
            // console.log("어싱크data: ", data);
            dispatch({
                type: "SUCCESS",
                data: data
            })
            if(data==false){
                dispatch({
                    type: "ERROR",
                    error: "강제에러"
                })  
            }
        }
        catch(e){
            dispatch({
                type: "ERROR",
                error: e
            })
        }
    }
    useEffect(()=>{ // useEffect(()=>{}, [])는 처음 1회만 실행 
        fetchDate();
    // eslint-disable-next-line
    }, deps); //deps는 빈배열([]) 34라인
    return [state, fetchDate];
}
export default useAsync