
// @ts-ignore
import { ConsumerApi } from "../../consumers/consumers";
// @ts-ignore
import TYPES from "../types/types";


export const getDataByApi = (document: string) => {

    console.log('Dentro del API!')

    return async (dispatch: (arg0: { type: any; payload: { data: any, document: string }; }) => void)  => {

        try {
            const data = await ConsumerApi('https://randomuser.me/api ', 'GET')
            console.log('DATA=> ', data);

            dispatch({
                type: TYPES.personData, payload: {data, document}
            })
        }

        catch (e) {
            console.log(e);
            dispatch({
                type: TYPES.personError, payload: e
            })
        }
    }


}

