import { Animation } from 'ionic-angular/animations/animation';
import { isPresent } from 'ionic-angular/util/util';
import { PageTransition } from 'ionic-angular/transitions/page-transition';

const DURATION = 500;

export class SlideUpTransition extends PageTransition {

    init() {
        super.init();

        const enteringView = this.enteringView;
        const leavingView = this.leavingView;
        const opts = this.opts;

        this.duration(isPresent(opts.duration) ? opts.duration : DURATION);

        const backDirection = (opts.direction === 'back');

        if (enteringView) {
            const enteringPageEle: Element = enteringView.pageRef().nativeElement;

            const enteringContent = new Animation(this.plt, enteringView.pageRef());
            this.add(enteringContent);

            if (backDirection) {
                //enteringContent.fromTo(OPACITY, OPAQUE, OPAQUE, true);
                enteringContent.fromTo("-webkit-transform", "translate(0, -100%)", "translate(0, 0%)", false);
                enteringContent.fromTo("-moz-transform", "translate(0, -100%)", "translate(0, 0%)", false);
                enteringContent.fromTo("-ms-transform", "translate(0, -100%)", "translate(0, 0%)", false);
                enteringContent.fromTo("transform", "translate(0, -100%)", "translate(0, 0%)", false);
            } else {
                //enteringContent.fromTo(OPACITY, TRANSPARENT, OPAQUE, true);
                enteringContent.fromTo("-webkit-transform", "translate(0, 100%)", "translate(0, 0%)", false);
                enteringContent.fromTo("-moz-transform", "translate(0, 100%)", "translate(0, 0%)", false);
                enteringContent.fromTo("-ms-transform", "translate(0, 100%)", "translate(0, 0%)", false);
                enteringContent.fromTo("transform", "translate(0, 100%)", "translate(0, 0%)", false);
            }
        }

        if (leavingView && leavingView.pageRef()) {
            const leavingPageEle: Element = leavingView.pageRef().nativeElement;

            const leavingContent = new Animation(this.plt, leavingView.pageRef());
            this.add(leavingContent);

            if (backDirection) {
                //leavingContent.fromTo(OPACITY, OPAQUE, TRANSPARENT, false);
                leavingContent.fromTo("-webkit-transform", "translate(0, 0%)", "translate(0, 100%)", false);
                leavingContent.fromTo("-moz-transform", "translate(0, 0%)", "translate(0, 100%)", false);
                leavingContent.fromTo("-ms-transform", "translate(0, 0%)", "translate(0, 100%)", false);
                leavingContent.fromTo("transform", "translate(0, 0%)", "translate(0, 100%)", false);
            } else {
                //leavingContent.fromTo(OPACITY, OPAQUE, OPAQUE, false);
                leavingContent.fromTo("-webkit-transform", "translate(0, 0%)", "translate(0, -100%)", false);
                leavingContent.fromTo("-moz-transform", "translate(0, 0%)", "translate(0, -100%)", false);
                leavingContent.fromTo("-ms-transform", "translate(0, 0%)", "translate(0, -100%)", false);
                leavingContent.fromTo("transform", "translate(0, 0%)", "translate(0, -100%)", false);
            }
        }
    }

}