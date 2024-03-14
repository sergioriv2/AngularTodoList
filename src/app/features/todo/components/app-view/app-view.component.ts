import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from '../../../../animations/slide-in.animation';

@Component({
    selector: 'app-component',
    templateUrl: './app-view.component.html',
    styleUrl: './app-view.component.css',
    // animations: [slideInAnimation],
})
export class AppViewComponenet {
    constructor(private contexts: ChildrenOutletContexts) {}

    getRoutesAnimationData() {
        const animation =
            this.contexts.getContext('primary')?.route?.snapshot?.data?.[
                'animation'
            ];

        return animation;
    }
}
