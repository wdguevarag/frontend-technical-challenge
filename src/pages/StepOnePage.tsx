import React, {Fragment, useEffect, useState} from 'react';
import {Grid, withStyles} from '@material-ui/core';

import imgCenter from '../assets/images/Illustration-1.png';

import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';

// @ts-ignore
import {useHistory} from "react-router-dom";
import StepOf from "../components/stepOf/StepOfComponent";

import Radio, {RadioProps} from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import {shallowEqual, useSelector} from "react-redux";

import typeDocs from '../assets/data/typeDocs'

import './style.css';

function StepOnePage() {

    const history = useHistory();

    // @ts-ignore
    const {person} = useSelector(store => store, shallowEqual)

    const [typeDoc, setTypeDoc] = useState('1');
    const [typeDocSize, setTypeDocSize] = useState(8);

    const [stateButtonContinue, setStateButtonContinue] = useState('disabled');

    const [fromValues, setFromValues] = useState({
        document: "", bornDate: "", names: "", mlastname: "", flastname: "", gender: "", insured: ""
    })

    const {document, bornDate, names, mlastname, flastname, gender, insured} = fromValues;

    const [validateName, setValidateName] = useState(false)
    const [validateNameMessage, setValidateNameMessage] = useState('hidden')

    const [validateFln, setValidateFln] = useState(false)
    const [validateFlnMessage, setValidateFlnMessage] = useState('hidden')

    const [validateDoc, setValidateDoc] = useState(false)
    const [validateDocMessage, setValidateDocMessage] = useState('hidden')

    const [validateDate, setValidateDate] = useState(false)
    const [validateDateMessage, setValidateDateMessage] = useState('hidden')

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

    const [valueGender, setValueGender] = React.useState('masculino');

    const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueGender((event.target as HTMLInputElement).value);
        setFromValues({
            ...fromValues,
            gender: event.target.value
        })
    };

    const [valueInsured, setValueInsured] = React.useState('');

    const handleChangeInsured = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueInsured((event.target as HTMLInputElement).value);
        setFromValues({
            ...fromValues,
            insured: event.target.value
        })
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

        (!names) ? setValidateName(true) : setValidateName(false);
        (!names) ? setValidateNameMessage('show') : setValidateNameMessage('hidden');

        (!flastname) ? setValidateFln(true) : setValidateFln(false);
        (!flastname) ? setValidateFlnMessage('show') : setValidateFlnMessage('hidden');

        (!document || document.length !== typeDocSize) ? setValidateDoc(true) : setValidateDoc(false);
        (!document || document.length !== typeDocSize) ? setValidateDocMessage('show') : setValidateDocMessage('hidden');

        (!bornDate) ? setValidateDate(true) : setValidateDate(false);
        (!bornDate) ? setValidateDateMessage('show') : setValidateDateMessage('hidden');

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (!validateName && !validateDoc && !validateFln && !validateDate)
            ? history.push("/steptwo") : '';
    };

    const goBack = () => {
        history.push("/start")
    }

    const GreenRadio = withStyles({
        root: {
            color: 'dimgrey',
            '&$checked': {
                color: '#83cc5e',
            },
        },
        checked: {},
    })((props: RadioProps) => <Radio color="default" {...props} />);

    useEffect(() => {

        // eslint-disable-next-line
        !person.document ? history.push("/start") : '';

        window.scrollTo(0, 0);

        setFromValues({
            ...fromValues,
            document: person.document,
            bornDate: person.bornDate,
            flastname: person.lastname,
            names: person.name,
            gender: valueGender,
            insured: valueInsured
        })

        setValueGender(person.gender)

    }, [person])

    useEffect(() => {
        if (fromValues.insured) setStateButtonContinue('enabled');
    }, [fromValues.insured])

    return (
        <Fragment>

            <img src={imgCenter} className={'steep__image-center'}/>
            <Grid container>
                <Grid item sm={4}>

                    <div className={'stepLeftSection'}>
                    </div>
                </Grid>

                <Grid item sm={7}>

                    <div className={'stepRightSection'}>

                        <StepOf step={1} of={7} redirect={goBack}/>

                        <div className={'rightSection__text-title'}>
                            Hola, <span className={'rightSection__text-bold'}>{person.name}</span>
                        </div>
                        <div className={'rightSection__text-smallsubtitle'}>
                            Valida que los datos sean correctos.
                        </div>

                        <div className={'rightSection__text-subtitle'}>
                            Datos personales del titular
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
                                    {typeDocs.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
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
                            </Grid>

                            <Grid item sm={10}>
                                <div className={'rightSection__personalInput'}>
                                    <TextField
                                        id="names"
                                        name="names"
                                        value={names}
                                        label="Nombres"
                                        variant="outlined"
                                        fullWidth
                                        error={validateName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div
                                    className={`rightSection__messageValidation rightSection__message-${validateNameMessage}`}>
                                    Ingrese nombre.
                                </div>
                            </Grid>


                            <Grid item sm={10}>
                                <div className={'rightSection__personalInput'}>
                                    <TextField
                                        id="flastname"
                                        name="flastname"
                                        value={flastname}
                                        label="Apellido Paterno"
                                        variant="outlined"
                                        fullWidth
                                        error={validateFln}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div
                                    className={`rightSection__messageValidation rightSection__message-${validateFlnMessage}`}>
                                    Ingrese apellido paterno.
                                </div>
                            </Grid>


                            <Grid item sm={10}>
                                <div className={'rightSection__personalInput'}>
                                    <TextField
                                        id="mlastname"
                                        name="mlastname"
                                        value={mlastname}
                                        label="Apellido Materno"
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleInputChange}
                                    />
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
                                <FormControl component="fieldset">
                                    <div className={'rightSection__textRadio'}>Género</div>
                                    <RadioGroup aria-label="gender" name="gender1" value={valueGender}
                                                onChange={handleChangeGender}>
                                        <FormControlLabel disabled value="male" control={<GreenRadio/>}
                                                          label="Masculino"/>
                                        <FormControlLabel disabled value="female" control={<GreenRadio/>}
                                                          label="Femenino"/>
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            <Grid item sm={10}>
                                <FormControl component="fieldset">
                                    <div className={'rightSection__textRadio'}>¿A quién vamos a asegurar?</div>
                                    <RadioGroup aria-label="gender" name="insured" value={valueInsured}
                                                onChange={handleChangeInsured}>
                                        <FormControlLabel value="me" control={<GreenRadio/>} label="Solo a mi"/>
                                        <FormControlLabel value="family" control={<GreenRadio/>}
                                                          label="A mi y a mi familia"/>
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            <Grid item sm={12}>
                                <div className={'rightSection__personalInput rightSection__content-alignRight'}>
                                    <button
                                        className={`non-selectable rightSection__personalButton pointer button__${stateButtonContinue}`}
                                        onClick={validateData}>
                                        CONTINUAR {' >'}
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

export default StepOnePage;
