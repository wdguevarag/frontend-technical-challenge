import React from 'react';
import {Grid} from '@material-ui/core';

function ItemLogin(props: {icon: string, description: string}) {

    return (

        <Grid container>

            <Grid item xs={1}>
                <img src={props.icon} className={'login__details-icon'}/>
            </Grid>

            <Grid item xs={11}>
                <div className={'login__details-description'}>{props.description}</div>
            </Grid>

        </Grid>

  );
}

export default ItemLogin;
