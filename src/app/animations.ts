import {
  trigger,
  state,
  style,
  transition,
  animate,
  group,
  query,
  stagger,
  keyframes,
} from '@angular/animations';
import {
  reduce
} from 'rxjs';

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
    transition('open <=> closed', [
      animate('225ms linear'),
    ]),
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
      animate('450ms ease-out'),
    ]),
  ])
]

export const slideInBarAnimation = [
 trigger('slideInBar', [
    // Transition from any state to any state
    transition('out <=> in', [
      // Initially the all children (= labels) are not visible
      query('.progress-bar', style({ opacity: 0, transform: 'translateX(-15px)' }), {
        optional: true,
      }),
      // Each child will appear sequentially with the delay of 500ms
      query(
        '.progress-bar',
        stagger('125ms', [
          animate(
            '125ms ease-in',
            style({ opacity: 1, transform: 'translateX(0)' })
          ),
        ]),
        { optional: true }
      ),
    ]),
  ]),
]

export const barAnimation = [
  trigger('staggerItems', [
    transition('*<=>*', [ // each time the binding value changes
      query(':leave', [
        style({
          opacity: 1,
          transform: 'translateX(0)'
        }),
        stagger(125, [
          animate('125ms', style({
            opacity: 0,
            transform: 'translateX(-15px)'
          })),
        ])
      ], {optional: true}),
      query(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-15px)'
        }),
        stagger('125ms', [
          animate('125ms', style({
            opacity: 1,
            transform: 'translateX(0)'
          }))
        ]),
      ], {
        optional: true
      })
    ])
  ])
]

// export const slideInBorderAnimation = [
//   trigger('showDivider', [
//     state('out', style({
//       border:'none',
//     })),
//     state('in', style({
//       borderBottom: 'border-bottom: 3px solid #2dfcd8',
//     })),
//     transition('out <=> in', [animate('425ms ease-out')]),
//   ])
// ]
