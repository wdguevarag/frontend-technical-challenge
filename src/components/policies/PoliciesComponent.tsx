import React from 'react';
import {CheckboxProps, Grid, withStyles} from '@material-ui/core';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";

const GreenCheckbox = withStyles({
    root: {
        color: 'dimgrey',
        '&$checked': {
            color: '#83cc5e',
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

function Policies(props: { policyState: any, policyValidation: string, handleChangeCheck: any }) {

    return (
        <>
            <div className={'rightSection__personalInput'}>
                <Grid container>
                    <Grid item sm={2}>
                        <FormControlLabel
                            control={<GreenCheckbox checked={props.policyState.checkedPolicyOne}
                                                    onChange={props.handleChangeCheck}
                                                    name="checkedPolicyOne"/>} label={null}/>
                    </Grid>
                    <Grid item sm={10}>
                        <div className={'rightSection__text-checkConditions'}>Acepto la <span
                            className={'rightSection__text-linkInfo pointer'}>Política de Protección de Datos Personales y los Términos y Condiciones.</span>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className={'rightSection__personalInput'}>
                <Grid container>
                    <Grid item sm={2}>
                        <FormControlLabel
                            control={<GreenCheckbox checked={props.policyState.checkedPolicyTwo}
                                                    onChange={props.handleChangeCheck}
                                                    name="checkedPolicyTwo"/>} label={null}/>
                    </Grid>
                    <Grid item sm={10}>
                        <div className={'rightSection__text-checkConditions'}>Acepto la <span
                            className={'rightSection__text-linkInfo pointer'}>Política de Envío de Comunicaciones Comerciales.</span>
                        </div>
                    </Grid>
                </Grid>
            </div>

            <div className={`rightSection__messageValidation rightSection__message-${props.policyValidation}`}>
                Confirmar términos y condiciones.
            </div>
        </>
    );
}

export default Policies;
