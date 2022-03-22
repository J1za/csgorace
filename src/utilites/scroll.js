export default function SmoothVerticalScrolling(e, time, where = 'bottom') {
    switch(where) {
        case 'bottom':
            var eAmt = e.scrollHeight / 100;
            var curTime = 0;
            while (curTime <= time) {
                setTimeout(() => {
                    e.scrollBy(0, eAmt);
                }, curTime, eAmt)
                curTime += time / 100;
            }
            break;
        case 'top':
            e.scrollTo({
                top: 0
            })
            // var eAmt = e.scrollTop / 100;
            // var curTime = 0;
            // while (curTime <= time) {
            //     setTimeout(() => {
            //         e.scrollBy(eAmt, 0);
            //     }, curTime, eAmt)
            //     curTime += time / 100;
            // }
            break;
        default: 
            break;
    }
}