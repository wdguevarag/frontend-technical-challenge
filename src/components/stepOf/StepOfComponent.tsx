import React from 'react';
import './style.css';

import iconBack from '../../assets/images/iconBack.svg';
import {Grid} from "@material-ui/core";

function StepOf(props: {step: number, of: number, redirect: any}) {

    return (

        <div>
            <Grid container>
                <Grid item sm={1}>
                    <div className={'rightSection__back-border pointer'} onClick={props.redirect}>
                        <img src={iconBack} className={'rightSection__back-icon'}/>
                    </div>
                </Grid>
                <Grid item sm={4}>
                    <span className={'rightSection__back-stepActual'}>PASO {props.step}</span> DE {props.of}
                </Grid>
            </Grid>
        </div>
  );
}

export default StepOf;
