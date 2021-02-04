import React, {Fragment, useEffect, useState} from 'react';
import {Grid} from '@material-ui/core';

import imgCenter from '../assets/images/Illustration-1.png';

// @ts-ignore
import {useHistory} from "react-router-dom";
import StepOf from "../components/stepOf/StepOfComponent";

import {shallowEqual, useSelector} from "react-redux";
import CardPlan from "../components/cardPlan/CardPlan";
import CardDetailPlan from "../components/cardDetailPlan/CardDetailPlan";

import iconBack from '../assets/images/iconBack.svg';

import plans from "../assets/data/plans"

function StepTwoPage() {

    const history = useHistory();

    const [allPlans, setAllPlans] = useState(plans);

    const [selectedPlan, setSelectedPlan] = useState(0);

    // @ts-ignore
    const {person} = useSelector(store => store, shallowEqual)

    const goBack = () => {
        history.push("/stepone")
    }

    const selectPlan = (id: number) => {

        let copyPlans = [...allPlans];

        copyPlans.map((item, i) => {
            (id === i) ? item.state = true : item.state = false;
        })

        setSelectedPlan(id)
        setAllPlans(copyPlans)
    }

    const validateData = () => {
        history.push("/end")
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

                    <div className={'stepRightSection'}>

                        <StepOf step={2} of={7} redirect={goBack}/>

                        <div className={'rightSection__text-title'}>
                            Elige <span className={'rightSection__text-bold'}>tu protección</span>
                        </div>
                        <div className={'rightSection__text-smallsubtitle'}>
                            Selecciona tu plan de salud ideal.
                        </div>

                        <Grid container>
                            {
                                allPlans.map((item, i) => (
                                        <Grid item sm={3} key={i}>
                                            <CardPlan key={i} planId={item.planId} name={item.name} cost={item.cost}
                                                      state={item.state} selectPlan={selectPlan}/>
                                        </Grid>
                                    )
                                )
                            }

                            <Grid item sm={12}>
                                <CardDetailPlan selectedPlan={selectedPlan}/>
                            </Grid>

                        </Grid>


                        <div className={'rightSection__textService cardDetailPlan__coverage'}>
                            Revisa nuestros <div className={'rightSection__textService-bold'}>servicios y exclusiones</div>
                        </div>

                        <div className={'rightSection__textService-menu cardDetailPlan__coverage'}>
                            <Grid container>
                                <Grid item sm={11}>
                                    Servicios brindados
                                </Grid>
                                <Grid item sm={1}>
                                    <img src={iconBack} className={'rightSection__back-iconRotate pointer'}/>
                                </Grid>
                            </Grid>
                        </div>

                        <div className={'rightSection__textService-menu cardDetailPlan__coverage'}>
                            <Grid container>
                                <Grid item sm={11}>
                                    Exclusiones
                                </Grid>
                                <Grid item sm={1}>
                                    <img src={iconBack} className={'rightSection__back-iconRotate pointer'}/>
                                </Grid>
                            </Grid>
                        </div>

                        <div className={'rightSection__personalInput rightSection__content-alignRight'}>

                            <button className={`rightSection__personalButton rightSection__personalButton-withoutBorder pointer`}>
                                ENVIAR COTIZACIÓN POR CORREO
                            </button>

                            <button className={`rightSection__personalButton rightSection__personalButton-buy pointer`} onClick={validateData}>
                                COMPRAR PLAN
                            </button>
                        </div>

                    </div>

                </Grid>
            </Grid>

        </Fragment>
    );
}

export default StepTwoPage;
