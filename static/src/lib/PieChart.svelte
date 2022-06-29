<script>
    // Based off of: https://sparkbox.com/foundry/how_to_code_an_SVG_pie_chart
    export let amount;
    export let interpolateTime;

    const thickness = 0.015;
</script>

<main>
    <svg viewBox="{-thickness / 2} {-thickness / 2} {1 + thickness} {1 + thickness}">
        <circle id="background" cx=0.5 cy=0.5 r=0.5></circle>
        <circle id="slice" style="transition-duration: {interpolateTime}s" stroke-dasharray="{amount * (Math.PI / 2)} 3.141592653589793" stroke-width=0.5 cx=0.5 cy=0.5 r=0.25 transform="rotate(-90) translate(-1)"></circle>
        <circle id="outline" stroke-width={thickness} cx=0.5 cy=0.5 r=0.5></circle>
    </svg>
</main>

<style>
    svg {
        width: 25px;
        height: 25px;

        display: block;
    }
    #background {
        fill: none;
    }
    #slice {
        stroke: #3250d2;
        fill: none;

        transition-timing-function: linear;
        transition-property: stroke-dasharray;
    }
    #outline {
        stroke: black;
        fill: none;
    }
</style>