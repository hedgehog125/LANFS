<script>
    import { onMount } from "svelte";


    // Based off of: https://stackoverflow.com/questions/21205652/how-to-draw-a-circle-sector-in-css
    export let amount;
    export let interpolateTime;
    let interpolatedAmount = amount;
    let interpolateSpeed;
    let lastAmount;

    const thickness = 0.005;
    const shrunkCenter = 0.5 - thickness;
    const scaleNumber = 2 + (thickness * 3); // Scales the end coordinates back up to reach the edge, minus the line thickness and a bit more
    const innerColor = "darkgrey";
    const outerColor = "lightgrey";
    const outlineColor = "black";

    let [endX, endY] = [[], []];
    const updateCoords = value => {
        let x = 0.5 + (Math.sin(value * (Math.PI * 2)) / scaleNumber);
        let y = 0.5 - (Math.cos(value * (Math.PI * 2)) / scaleNumber);
        let passedHalf = value > 0.5;
        let bottomY = (1 - (thickness / 2));

        endX[0] = passedHalf? 0.5 : x;
        endY[0] = passedHalf? bottomY : y;

        endX[1] = passedHalf? x : 0.5;
        endY[1] = passedHalf? y : bottomY;
    };
    $: {
        updateCoords(interpolatedAmount); // This is the only value change that actually has to be detected
    }

    let animFrame, lastTimestamp;
    const update = timestamp => {
        if (lastTimestamp == null) {
            interpolatedAmount = amount; 
        }
        else {
            let timePassed = timestamp - lastTimestamp;

            if (lastAmount != amount) {
                console.log(amount);
                interpolateSpeed = ((amount - lastAmount) / interpolateTime) / 1000;

                lastAmount = amount;
            }
            // Calculate change if different, then change by the divided difference. Use the time elapsed
            if (Math.abs(interpolatedAmount - amount) > 0.01) {
                interpolatedAmount += interpolateSpeed * timePassed;
            }
        }

        lastTimestamp = timestamp;
        animFrame = requestAnimationFrame(update);
    };
    onMount(_ => {
        update();

        return _ => {
            cancelAnimationFrame(animFrame);
        };
    });
</script>

<main>
    <svg viewBox="0 0 1 1" width=500 height=500>
        <circle fill={outerColor} cx=0.5 cy=0.5 r={shrunkCenter}></circle>
        <path fill={innerColor} d="M0.5,0.5 L0.5,{thickness} A{shrunkCenter},{shrunkCenter} 1 0,1 {endX[0]},{endY[0]} z"></path>
        <path fill={innerColor} d="M0.5,0.5 L0.5,{1 - thickness} A{shrunkCenter},{shrunkCenter} 1 0,1 {endX[1]},{endY[1]} z"></path>
        <circle fill="none" stroke={outlineColor} stroke-width={thickness} cx=0.5 cy=0.5 r={shrunkCenter}></circle>
    </svg>
</main>

<style>
    svg > path {
        transition: d linear 16.6666666667ms;
    }
</style>