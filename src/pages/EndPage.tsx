import React, {Fragment, useEffect} from 'react';
import {Grid} from '@material-ui/core';

import imgCenter from '../assets/images/Illustration-1.png';

// @ts-ignore
import {useHistory} from "react-router-dom";

import {shallowEqual, useSelector} from "react-redux";

import './style.css';

function StepTwoPage() {

    const history = useHistory();

    // @ts-ignore
    const {person} = useSelector(store => store, shallowEqual)

    const validateData = () => {
        history.push("/start")
        window.scrollTo(0, 0);
        window.location.reload();
    }

    useEffect(() => {

        // eslint-disable-next-line
        !person.document ? history.push("/start") : '';
        window.scrollTo(0, 0);

    }, [person])

    return (
        <Fragment>

            <img src={imgCenter} className={'steep__image-center'}/>
            <Grid container>
                <Grid item sm={4}>

                    <div className={'stepLeftSection'}>
                    </div>
                </Grid>

                <Grid item sm={7}>

                    <div className={'stepRightSection__end'}>

                        <div className={'rightSection__textService-menu rightSection__topBorder-end'}/>

                        <div className={'rightSection__text-end'}>
                            ¡Gracias por <span className={'rightSection__text-bold'}>confiar en nosotros!</span>
                        </div>
                        <div className={'rightSection__text-subEnd'}>
                            Queremos conocer mejor la salud de los asegurados. Un asesor <span
                            className={'rightSection__text-subEnfasis'}>
                            se pondrá en contacto </span>
                            contigo en las siguientes <span className={'rightSection__text-subEnfasis'}>48 horas.</span>
                        </div>

                        <div className={'rightSection__personalInput rightSection__content-alignRight'}>
                            <button
                                className={`rightSection__personalButton rightSection__personalButton-health pointer`}
                                onClick={validateData}>
                                IR A SALUD
                            </button>
                        </div>

                    </div>

                </Grid>
            </Grid>

        </Fragment>
    );
}

export default StepTwoPage;
