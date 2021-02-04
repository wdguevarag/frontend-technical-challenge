import React from 'react';
import './style.css';

import blueHeart from '../../assets/images/blue_heart.png';
import greyHeart from '../../assets/images/grey_heart.png';

import listBenefits from '../../assets/data/listBelefits';

function ItemBenefit(props: { benefits: any }) {

    return (
        <div>
            {
                listBenefits.map((item, i) => (
                    <div key={i} className={`itemBenefit itemBenefit__${props.benefits[i] ? 'enabled' : 'disabled'}`}>
                        <img src={props.benefits[i] ? blueHeart : greyHeart} className={'itemBenefit__icon'}/>
                        <span className={'temBenefit__enfasis'}>{item.enfasis}</span>{item.description}
                    </div>
                ))
            }
        </div>
    );
}

export default ItemBenefit;
