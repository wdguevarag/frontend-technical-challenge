import React, {Fragment, useEffect, useState} from 'react';
import {Grid} from '@material-ui/core';
import {useDispatch, useSelector, shallowEqual} from "react-redux";

import CircularProgress from '@material-ui/core/CircularProgress';

import imgCenter from '../assets/images/Illustration-1.png';
import ItemLogin from "../components/itemLogin/ItemLoginComponent";

import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';

import Policies from "../components/policies/PoliciesComponent";

// @ts-ignore
import {useHistory} from "react-router-dom";

import {getDataByApi} from '../store/actions/consumerApiActions'


import optionList from '../assets/data/optionList'
import typeDocs from '../assets/data/typeDocs'

import './style.css';

function StartPage() {

    const history = useHistory();
    const dispatch = useDispatch()

    const [typeDoc, setTypeDoc] = useState('1');
    const [typeDocSize, setTypeDocSize] = useState(8);

    const [phoneSize] = useState(9);

    const [fromValues, setFromValues] = useState({
        document: "", bornDate: "", phone: ""
    })

    const {document, bornDate, phone} = fromValues;

    const [validateCel, setValidateCel] = useState(false)
    const [validateCelMessage, setValidateCelMessage] = useState('hidden')

    const [validateDoc, setValidateDoc] = useState(false)
    const [validateDocMessage, setValidateDocMessage] = useState('hidden')

    const [validateApi, setValidateApi] = useState(false)
    const [validateApiMessage, setValidateApiMessage] = useState('hidden')

    const [validateDate, setValidateDate] = useState(false)
    const [validateDateMessage, setValidateDateMessage] = useState('hidden')

    const [progressState, setProgressState] = useState('hidden')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTypeDoc(event.target.value);
        switch (event.target.value) {
            case '1': {
                setTypeDocSize(8);
                break;
            }
            case '2': {
                setTypeDocSize(5);
                break;
            }
            default:
                break;
        }
    };

    const [policyValidation, setPolicyValidation] = useState<string>('hidden');

    const [policyState, setPolicyState] = React.useState({
        checkedPolicyOne: false,
        checkedPolicyTwo: false
    });

    const handleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPolicyState({...policyState, [event.target.name]: event.target.checked});
    };

    const handleInputChange = (event: { target: { name: any; value: any; }; }) => {

        const re = /[^0-9]/g;

        if (event.target.name === 'document' || event.target.name === 'phone') {
            setFromValues({
                ...fromValues,
                [event.target.name]: event.target.value.replace(re, '')
            })
        } else {
            setFromValues({
                ...fromValues,
                [event.target.name]: event.target.value
            })
        }

    }

    const validateData = () => {

        (!policyState.checkedPolicyOne || !policyState.checkedPolicyTwo) ?
            setPolicyValidation('show') : setPolicyValidation('hidden');

        (!phone || phone.length < 9) ? setValidateCel(true) : setValidateCel(false);
        (!phone || phone.length < 9) ? setValidateCelMessage('show') : setValidateCelMessage('hidden');

        (!document || document.length !== typeDocSize) ? setValidateDoc(true) : setValidateDoc(false);
        (!document || document.length !== typeDocSize) ? setValidateDocMessage('show') : setValidateDocMessage('hidden');

        (!bornDate) ? setValidateDate(true) : setValidateDate(false);
        (!bornDate) ? setValidateDateMessage('show') : setValidateDateMessage('hidden');

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (!validateApi && !validateDoc && !validateCel && !validateDate && policyState.checkedPolicyOne && policyState.checkedPolicyTwo)
            ? history.push("/stepone") : '';

    };

    // @ts-ignore
    const {person} = useSelector(store => store, shallowEqual)

    useEffect(() => {
        if (fromValues.document.length === typeDocSize) {
            setProgressState('show')
            dispatch(getDataByApi(fromValues.document));
        } else setProgressState('hidden')
    }, [fromValues.document])

    useEffect(() => {
        if (person.error) {
            setValidateApi(true)
            setValidateApiMessage('show')
            setProgressState('hidden')
        } else {
            setValidateApi(false)
            setValidateApiMessage('hidden')
            setProgressState('hidden')
        }
        if (fromValues.phone) setProgressState('hidden')
    }, [person.error, fromValues.phone])

    useEffect(() => {
        setValidateApi(false)
        setValidateApiMessage('hidden')
    }, [fromValues.document])

    useEffect(() => {
        setFromValues({
            ...fromValues,
            document: fromValues.document ? fromValues.document : person.document,
            bornDate: person.bornDate,
            phone: person.phone
        })
    }, [person])

    return (
        <Fragment>

            <img src={imgCenter} className={'login__image-center'}/>
            <Grid container>
                <Grid item sm={6}>

                    <div className={'leftSection'}>

                        <div className={'leftSection__info'}>

                            <div className={'login__title'}>
                                Seguro de
                                <div className={'login__title-health'}>Salud</div>
                            </div>

                            <div className={'login__details'}>
                                {
                                    optionList.map((item, i) => (
                                            <ItemLogin key={i} icon={item.icon} description={item.description}/>
                                        )
                                    )
                                }
                            </div>
                        </div>

                        <div className={'leftSection__copyright'}>
                            &copy; RIMAC Seguros y Reaseguros.
                        </div>

                    </div>
                </Grid>

                <Grid item sm={6}>

                    <div className={'rightSection'}>

                        <div className={'rightSection__text-title'}>
                            Obtén tu <span className={'rightSection__text-bold'}>seguro ahora</span>
                        </div>
                        <div className={'rightSection__text-subtitle'}>
                            Ingresa los datos para comenzar.
                        </div>

                        <Grid container>
                            <Grid item sm={3}>
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    value={typeDoc}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                >
                                    {typeDocs.map((option, i) => (
                                        <MenuItem key={i} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item sm={7}>
                                <TextField
                                    id="document"
                                    name="document"
                                    value={document}
                                    label="Nro. de Documento"
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleInputChange}
                                    error={validateDoc}
                                    inputProps={{maxLength: typeDocSize, min: "1950-01-01", max: "2021-01-01"}}
                                />
                                <div
                                    className={`rightSection__messageValidation rightSection__message-${validateDocMessage}`}>
                                    Ingrese documento válido ({typeDocSize} dígitos).
                                </div>
                                <div
                                    className={`rightSection__messageValidation rightSection__message-${validateApiMessage}`}>
                                    Error al buscar documento ingresado.
                                </div>
                            </Grid>

                            <Grid item sm={2}>
                                <div className={`rightSection__loader rightSection__message-${progressState}`}>
                                    <CircularProgress/>
                                </div>
                            </Grid>

                            <Grid item sm={10}>
                                <div className={'rightSection__personalInput'}>
                                    <TextField
                                        id="bornDate"
                                        name="bornDate"
                                        value={bornDate}
                                        label="Fecha de nacimineto"
                                        type="date"
                                        variant="outlined"
                                        fullWidth
                                        error={validateDate}
                                        onChange={handleInputChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                                <div
                                    className={`rightSection__messageValidation rightSection__message-${validateDateMessage}`}>
                                    Ingrese una fecha válida.
                                </div>
                            </Grid>

                            <Grid item sm={10}>
                                <div className={'rightSection__personalInput'}>
                                    <TextField
                                        id="phone"
                                        name="phone"
                                        value={phone}
                                        label="Celular"
                                        variant="outlined"
                                        fullWidth
                                        error={validateCel}
                                        onChange={handleInputChange}
                                        inputProps={{maxLength: phoneSize}}
                                    />
                                </div>
                                <div
                                    className={`rightSection__messageValidation rightSection__message-${validateCelMessage}`}>
                                    Ingrese celular válido ({phoneSize} dígitos).
                                </div>
                            </Grid>

                            <Grid item sm={9}>
                                <Policies policyState={policyState} handleChangeCheck={handleChangeCheck}
                                          policyValidation={policyValidation}/>
                            </Grid>

                            <Grid item sm={12}>
                                <div className={'rightSection__personalInput'}>
                                    <button className={`rightSection__personalButton pointer`} onClick={validateData}>
                                        COMENCEMOS
                                    </button>
                                </div>
                            </Grid>

                        </Grid>
                    </div>

                </Grid>
            </Grid>

        </Fragment>
    );
}

export default StartPage;
