import React from 'react';
import {Grid} from '@material-ui/core';
import './style.css';

import checkSelected from '../../assets/images/gl_selected.png';
import checkUnselected from '../../assets/images/gl_unselected.png';

function CardPlan(props: {planId: number, name: string, cost: number, state: boolean, selectPlan: any}) {

    return (


            <div className={`pointer non-selectable cardPlan__border cardPlan__border-${props.state ? 'selected': 'unselected'}`}
            onClick={()=>props.selectPlan(props.planId)}>

                <div className={'cardDetailPlan__iconState'}>
                <img src={ props.state ? checkSelected: checkUnselected} className={'cardPlan__icon-select'} />
                    <div className={'cardDetailPlan__name'}>
                        {props.name}
                    </div>
                </div>

                <div className={'cardDetailPlan__ammount'}>
                    <span className={'cardDetailPlan__ammount-simbol'}>S/.</span>{props.cost}
                </div>

                <div className={'cardDetailPlan__name'}>
                    mensual
                </div>
            </div>

  );
}

export default CardPlan;
