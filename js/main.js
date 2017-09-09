window.onload = function(){
    const myP5 = new p5();
    var ray_params = {
        width: 2,
        height: 100,
    };
    var animation_params = {
        selector: ".ray",
        waveWidth: 6,
        waveWidth_range: [1, 12],
        duration: 3,
        duration_range: [1, 60],
        delay: 0,
        delay_range: [0, 5],
    }

    controlKit = new ControlKit();
    controlKit
        .addPanel({
            label: "Animation",
        })
        .addGroup()
            .addSlider(animation_params, 'waveWidth', 'waveWidth_range')
            .addSlider(animation_params, 'duration', 'duration_range')
            .addSlider(animation_params, 'delay', 'delay_range')
    
    _.forEach($(".ray"), function ($elem, index, array) {
        let edgeCloseness = myP5.map(index + 0.5 - 0.5 * array.length, 0, 6, 0, 1);
        
        TweenMax.set($elem, {
            rotation: -90 + index * (180 / 11), 
            transformOrigin:"center bottom" ,
            height: ray_params.height - 50 * Math.abs(edgeCloseness),
            width: ray_params.width,
            x: edgeCloseness * 100,
            opacity: 0,
        });
    })

    function play() {
        wave(
            ".ray", 
            animation_params.waveWidth, 
            animation_params.duration, 
            animation_params.delay, 
            play,
        );
    }

    play();
}

function wave (selector, waveWidth, duration, delay, onComplete) {
    nSteps = $(selector).length;
    stepDuration = duration / nSteps;
    staggerDelay = duration / nSteps;
    TweenMax.staggerTo(selector, stepDuration, {opacity:1, delay: delay + 0},                    staggerDelay);
    TweenMax.staggerTo(selector, stepDuration, {
        opacity:0, 
        delay: delay + stepDuration * waveWidth,
    }, staggerDelay, onComplete);
}