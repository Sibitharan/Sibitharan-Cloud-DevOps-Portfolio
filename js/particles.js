"use strict";

/*
=========================================================
CLOUD NETWORK PARTICLES
Premium Cloud & DevOps Portfolio
=========================================================
*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const canvas =
            document.getElementById(
                "cloudParticles"
            );


        if (!canvas) {

            console.warn(
                "Cloud particle canvas not found."
            );

            return;

        }


        const ctx =
            canvas.getContext(
                "2d"
            );


        if (!ctx) {

            console.warn(
                "Canvas context unavailable."
            );

            return;

        }


        /* =================================================
           CONFIG
        ================================================= */

        const CONFIG = {

            desktopParticles: 45,

            tabletParticles: 32,

            mobileParticles: 20,

            connectionDistance: 120,

            particleMinSize: 1,

            particleMaxSize: 2,

            particleMinSpeed: 0.08,

            particleMaxSpeed: 0.22,

            particleOpacityMin: 0.15,

            particleOpacityMax: 0.32,

            mouseRadius: 110,

            mouseForce: 0.015

        };


        /* =================================================
           VARIABLES
        ================================================= */

        let width = 0;

        let height = 0;

        let dpr = 1;

        let particles = [];

        let animationFrame = null;

        let isPageVisible = true;


        /* =================================================
           MOUSE
        ================================================= */

        const mouse = {

            x: null,

            y: null

        };


        /* =================================================
           GET PARTICLE COUNT
        ================================================= */

        function getParticleCount() {

            if (
                window.innerWidth <= 600
            ) {

                return CONFIG.mobileParticles;

            }


            if (
                window.innerWidth <= 1024
            ) {

                return CONFIG.tabletParticles;

            }


            return CONFIG.desktopParticles;

        }


        /* =================================================
           RESIZE
        ================================================= */

        function resizeCanvas() {

            width =
                window.innerWidth;


            height =
                window.innerHeight;


            dpr =
                Math.min(
                    window.devicePixelRatio || 1,
                    1.5
                );


            canvas.width =
                Math.floor(
                    width * dpr
                );


            canvas.height =
                Math.floor(
                    height * dpr
                );


            canvas.style.width =
                `${width}px`;


            canvas.style.height =
                `${height}px`;


            ctx.setTransform(

                dpr,

                0,

                0,

                dpr,

                0,

                0

            );


            createParticles();

        }


        /* =================================================
           PARTICLE
        ================================================= */

        class Particle {

            constructor() {

                this.x =
                    Math.random() *
                    width;


                this.y =
                    Math.random() *
                    height;


                const speed =

                    CONFIG.particleMinSpeed +

                    Math.random() *

                    (
                        CONFIG.particleMaxSpeed -

                        CONFIG.particleMinSpeed
                    );


                const angle =

                    Math.random() *

                    Math.PI *

                    2;


                this.vx =

                    Math.cos(angle) *

                    speed;


                this.vy =

                    Math.sin(angle) *

                    speed;


                this.size =

                    CONFIG.particleMinSize +

                    Math.random() *

                    (
                        CONFIG.particleMaxSize -

                        CONFIG.particleMinSize
                    );


                this.opacity =

                    CONFIG.particleOpacityMin +

                    Math.random() *

                    (
                        CONFIG.particleOpacityMax -

                        CONFIG.particleOpacityMin
                    );

            }


            update() {


                /* -----------------------------------------
                   MOVEMENT
                ----------------------------------------- */

                this.x +=
                    this.vx;


                this.y +=
                    this.vy;


                /* -----------------------------------------
                   MOUSE INTERACTION
                ----------------------------------------- */

                if (

                    mouse.x !== null &&

                    mouse.y !== null

                ) {


                    const dx =

                        this.x -

                        mouse.x;


                    const dy =

                        this.y -

                        mouse.y;


                    const distance =

                        Math.sqrt(

                            dx * dx +

                            dy * dy

                        );


                    if (

                        distance <

                        CONFIG.mouseRadius

                    ) {


                        const force =

                            (
                                CONFIG.mouseRadius -

                                distance

                            ) /

                            CONFIG.mouseRadius;


                        const safeDistance =

                            Math.max(

                                distance,

                                1

                            );


                        this.vx +=

                            (
                                dx /

                                safeDistance

                            ) *

                            force *

                            CONFIG.mouseForce;


                        this.vy +=

                            (
                                dy /

                                safeDistance

                            ) *

                            force *

                            CONFIG.mouseForce;

                    }

                }


                /* -----------------------------------------
                   SPEED LIMIT
                ----------------------------------------- */

                const speed =

                    Math.sqrt(

                        this.vx * this.vx +

                        this.vy * this.vy

                    );


                const maxSpeed =
                    0.35;


                if (

                    speed >

                    maxSpeed

                ) {


                    this.vx =

                        (
                            this.vx /

                            speed

                        ) *

                        maxSpeed;


                    this.vy =

                        (
                            this.vy /

                            speed

                        ) *

                        maxSpeed;

                }


                /* -----------------------------------------
                   WRAP AROUND SCREEN
                ----------------------------------------- */

                if (
                    this.x < -10
                ) {

                    this.x =
                        width + 10;

                }


                if (
                    this.x >
                    width + 10
                ) {

                    this.x =
                        -10;

                }


                if (
                    this.y < -10
                ) {

                    this.y =
                        height + 10;

                }


                if (
                    this.y >
                    height + 10
                ) {

                    this.y =
                        -10;

                }

            }


            draw() {

                ctx.beginPath();


                ctx.arc(

                    this.x,

                    this.y,

                    this.size,

                    0,

                    Math.PI * 2

                );


                ctx.fillStyle =

                    `rgba(
                        150,
                        180,
                        205,
                        ${this.opacity}
                    )`;


                ctx.fill();

            }

        }


        /* =================================================
           CREATE PARTICLES
        ================================================= */

        function createParticles() {

            particles = [];


            const count =

                getParticleCount();


            for (

                let i = 0;

                i < count;

                i++

            ) {

                particles.push(

                    new Particle()

                );

            }

        }


        /* =================================================
           CONNECTIONS
        ================================================= */

        function drawConnections() {

            for (

                let i = 0;

                i < particles.length;

                i++

            ) {


                for (

                    let j = i + 1;

                    j < particles.length;

                    j++

                ) {


                    const p1 =
                        particles[i];


                    const p2 =
                        particles[j];


                    const dx =

                        p1.x -

                        p2.x;


                    const dy =

                        p1.y -

                        p2.y;


                    const distance =

                        Math.sqrt(

                            dx * dx +

                            dy * dy

                        );


                    if (

                        distance <

                        CONFIG.connectionDistance

                    ) {


                        const opacity =

                            (
                                1 -

                                (
                                    distance /

                                    CONFIG.connectionDistance
                                )

                            ) *

                            0.10;


                        ctx.beginPath();


                        ctx.moveTo(

                            p1.x,

                            p1.y

                        );


                        ctx.lineTo(

                            p2.x,

                            p2.y

                        );


                        ctx.strokeStyle =

                            `rgba(
                                120,
                                155,
                                185,
                                ${opacity}
                            )`;


                        ctx.lineWidth =
                            0.6;


                        ctx.stroke();

                    }

                }

            }

        }


        /* =================================================
           ANIMATION
        ================================================= */

        function animate() {


            if (
                !isPageVisible
            ) {

                animationFrame =
                    null;

                return;

            }


            ctx.clearRect(

                0,

                0,

                width,

                height

            );


            drawConnections();


            for (

                const particle

                of particles

            ) {

                particle.update();

                particle.draw();

            }


            animationFrame =

                requestAnimationFrame(

                    animate

                );

        }


        /* =================================================
           MOUSE
        ================================================= */

        window.addEventListener(

            "mousemove",

            (event) => {


                mouse.x =

                    event.clientX;


                mouse.y =

                    event.clientY;

            },

            {
                passive: true
            }

        );


        window.addEventListener(

            "mouseleave",

            () => {


                mouse.x = null;

                mouse.y = null;

            }

        );


        /* =================================================
           RESIZE
        ================================================= */

        let resizeTimer;


        window.addEventListener(

            "resize",

            () => {


                clearTimeout(

                    resizeTimer

                );


                resizeTimer =

                    setTimeout(

                        resizeCanvas,

                        150

                    );

            },

            {
                passive: true
            }

        );


        /* =================================================
           TAB VISIBILITY
        ================================================= */

        document.addEventListener(

            "visibilitychange",

            () => {


                isPageVisible =

                    !document.hidden;


                if (

                    isPageVisible &&

                    !animationFrame

                ) {

                    animate();

                }

            }

        );


        /* =================================================
           INITIALIZE
        ================================================= */

        resizeCanvas();

        animate();


    }

);