import React, {useEffect, useState} from 'react';
import {Grid} from '@material-ui/core';
import './style.css';

import planImage from '../../assets/images/Illustration.png';
import checkUnselected from '../../assets/images/gl_unselected.png';
import {useSelector} from "react-redux";
import ItemBenefit from "../itemBenefit/ItemBenefit";

const detailPlans = [
    {
        planId: 0,
        coverageMax: 1,
        name: 'BÁSICO',
        benefits: [true, true, false, false, false, false]
    },
    {
        planId: 1,
        coverageMax: 5,
        name: 'AVANZADO',
        benefits: [true, true, true, true, false, false]
    },
    {
        planId: 2,
        coverageMax: 10,
        name: 'PREMIUM',
        benefits: [true, true, true, true, true, false]
    },
    {
        planId: 3,
        coverageMax: 20,
        name: 'FULL',
        benefits: [true, true, true, true, true, true]
    }
]

function CardDetailPlan(props: {selectedPlan: number}) {

    const [selectedPlan, setSelectedPlan] = useState(detailPlans[props.selectedPlan]);

    useEffect(()=>{
        setSelectedPlan(detailPlans[props.selectedPlan])
    },[props.selectedPlan])

    return (


            <div className={`pointer non-selectable cardDetailPlan__border`}>

                <div className={`cardDetailPlan__title-content`}>
                    <div className={`cardDetailPlan__title-text`}>Cuentas con estos beneficios:</div>
                </div>
                <div className={'cardDetailPlan__body-general'}>
                    <div className={'cardDetailPlan__coverage'}>
                    <Grid container>
                        <Grid item sm={8}>
                            <div className={'cardDetailPlan__subtitle'}>
                                Cobertura máxima
                            </div>
                            <div className={'cardDetailPlan__ammount'}>
                                S/{selectedPlan.coverageMax}MM
                            </div>
                            <div className={'cardDetailPlan__typePlan-content'}>
                                <div className={'cardDetailPlan__typePlan-text'}>
                                    PLAN {selectedPlan.name}
                                </div>
                            </div>
                        </Grid>

                        <Grid item sm={4}>
                            <div className={'cardDetailPlan__typePlan-imageContent'}>
                                <img src={planImage} className={'cardDetailPlan__typePlan-image'} />
                            </div>
                        </Grid>
                    </Grid>
                </div>
                </div>
                <div className={'cardDetailPlan__body-benefits'}>
                    <ItemBenefit benefits={selectedPlan.benefits}/>
                </div>
            </div>



  );
}

export default CardDetailPlan;
