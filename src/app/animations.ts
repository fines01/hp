import {trigger, state, style, transition, animate, group, query, stagger, keyframes } from '@angular/animations';
import { reduce } from 'rxjs';

export const slideDownAnimation = [ // menu slide-down
    trigger('slideDown', [
        state('open', style( { opacity: 1,tansform: 'translateY(0)', })),//color: 'red',
        state('closed', style({ opacity: 0, transform: 'translateY(-300px)', })),//color: 'white'
        transition('open <=> closed', [
            animate('225ms ease-out'),
        ]),
    ])
]

export const SlideInAnimation = [
  trigger('slideIn', [
    state('in', style( { opacity: 1, transform: 'translateX(0)', })),
    state('out', style( { opacity: 0, transform: 'translateX(-100px)', })),
    transition('out <=> in', [animate('225ms ease-in')]),
  ])
]

export const SlideInRightAnimation = [
  trigger('slideInRight', [
    state('in', style( { opacity: 1, transform: 'translateX(0)', })),
    state('out', style( { opacity: 0, transform: 'translateX(100px)', })),
    transition('out <=> in', [animate('225ms ease-in')]),
  ])
]

export const slideUpAnimation = [
   trigger('slideUp', [
        state('in', style( {opacity: 1, transform: 'translateY(0) scale(1)', })),
        state('out', style({ opacity: 0, transform: 'translateY(+100px) scale(0)', })),
        transition('in <=> out', [
            animate('450ms ease-out'),
        ]),
    ])
]
