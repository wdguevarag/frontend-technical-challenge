// @ts-ignore
import TYPES from '../types/types'
import moment from 'moment';

const initialState = {
    error: null,
    document: '',
    name: '',
    lastname: '',
    gender: '',
    bornDate: '',
    phone: ''
}


export const PersonDataReducer = (state = initialState, action: any) => {
    console.log('action=> ', action)
    switch (action.type) {
        case TYPES.personData:
            return {
                ...state,
                error: null,
                document: action.payload.document,
                name: action.payload.data.results[0].name.first,
                lastname: action.payload.data.results[0].name.last,
                gender: action.payload.data.results[0].gender,
                bornDate: moment(action.payload.data.results[0].dob.date).format('YYYY-MM-DD'),
                phone: action.payload.data.results[0].phone.replace('-','')

        }

        case TYPES.personError:
            return {
                ...initialState,
                error: action.payload
            }
        default: return state;
    }
}
