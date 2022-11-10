import {trigger, state, style, transition, animate, group, query, stagger, keyframes, } from '@angular/animations';
import { RouteReuseStrategy } from '@angular/router';
// import { reduce } from 'rxjs';

export const slideDownAnimation = [ // menu slide-down
  trigger('slideDown', [
    state('open', style({
      opacity: 1,
      tansform: 'translateY(0)',
    })), //color: 'red',
    state('closed', style({
      opacity: 0,
      transform: 'translateY(-300px)',
    })), //color: 'white'
    transition('open <=> closed', [animate('525ms ease-out')]),
  ])
]

export const slideInAnimation = [
  trigger('slideIn', [
    state('in', style({
      opacity: 1,
      transform: 'translateX(0)',
    })),
    state('out', style({
      opacity: 0,
      transform: 'translateX(-10vw)',
    })),
    transition('out <=> in', [animate('425ms ease-out')]),
  ])
]

export const slideInReverseAnimation = [
  trigger('slideInReverse', [
    state('in', style({
      opacity: 1,
      transform: 'translateX(0)',
    })),
    state('out', style({
      opacity: 0,
      transform: 'translateX(10vw)',
    })),
    transition('out <=> in', [animate('425ms ease-out')]),
  ])
]

export const slideUpAnimation = [
  trigger('slideUp', [
    state('in', style({
      opacity: 1,
      transform: 'translateY(0) scale(1)',
    })),
    state('out', style({
      opacity: 0,
      transform: 'translateY(16px) scale(0)',
    })),
    transition('in <=> out', [
      animate('550ms ease-out'),
    ]),
  ])
]

export const slideInBarAnimation = [
  trigger('slideInBar', [
    transition('out <=> in', [
      // Initially the all children (= labels) are not visible
      query('.progress-bar', style({ opacity: 0, transform: 'translateX(-16px)' }), {
        optional: true,
      }),
      // Each child will appear sequentially with the delay of 650ms
      query(
        '.progress-bar',
        stagger('100ms', [
          animate(
            '550ms ease-out',
            style({ opacity: 1, transform: 'translateX(0)' })
          ),
        ]),
        { optional: true }
      ),
    ]),
  ]),
]

export const turnCardsAnimation = [
  trigger('turnCard', [
    transition('out <=> in', [
      // initial state of all children
      query('.skill-card',style( {opacity: 0.5, transform: 'rotateY(90deg)'}),{optional:true}),
      // animate all children with the delay of x  ms
      query('.skill-card',stagger('100ms', [animate('450ms ease-in', style({opacity:1, transform:'rotateY(0)'}))]),{optional:true}),
    ]),
  ]),
]

export const slideUpToplinkAnimation = [
  trigger('slideUpLink', [
    state('in', style({
      opacity: 0.65, //'{{ baseOpacity }}
      transform: '{{ baseTransform }}'
      // transform: 'translate(-50%, -100%) scale(1)', // '{{ baseTransformPosition }}'
    }),{params:{baseTransform: ''}}),
    state('out', style({
      opacity: 0,
      transform: 'translate(-50%, 16px) scale(0)',
    })),
    transition('in <=> out', [
      animate('450ms ease-out'),
    ]),
  ])
]
