AFRAME.registerComponent('drive', {

    init: function () {

        var gameStateValue = this.el.getAttribute("game")

        if (gameStateValue == "play") {
            
            this.driveCar()

        }
    },

    isVelocityActive: function () {

        console.log("Velocity is active.")
        return Math.random() < 0.25;

    },

    driveCar: function () {

        var multiply = 10;
        var wheelRotation = 0;


        window.addEventListener('keydown', function (e) {

            var wheel = document.querySelector("#control-wheel")

            if (e.code == "ArrowRight" && wheelRotation > -40) {  
                              
                wheelRotation -= 5
                wheel.setAttribute("rotation", { x: 0, y: 0, z: wheelRotation })

            }
            if (e.code == "ArrowLeft" && wheelRotation < 40) { 

                wheelRotation += 5
                wheel.setAttribute("rotation", { x: 0, y: 0, z: wheelRotation })
            }
            
            var cameraRig = document.querySelector("#camera-rig")
            var cameraRotation = cameraRig.getAttribute("rotation")

            var cameraPosition = cameraRig.getAttribute("position")
            var cameraMoveControl = cameraRig.getAttribute("movement-controls")

            console.log(cameraMoveControl.speed)
            cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})
            console.log(cameraMoveControl.speed)

            var cameraDirection = new THREE.Vector3();
            cameraRig.object3D.getWorldDirection(cameraDirection);

            if (e.code == "ArrowRight") {
                cameraRotation.y -= 5
                cameraRig.setAttribute("rotation", { x: 0, y: cameraRotation.y, z: 0 })                
                cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})

            }

            if (e.code == "ArrowLeft") {
                cameraRotation.y += 5
                cameraRig.setAttribute("rotation", { x: 0, y: cameraRotation.y, z: 0 })             
                cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})

            }

            // Add Acceleration and Break

        })

        //Key Up Events
        window.addEventListener('keyup', function (e) {
            var cameraRig = document.querySelector("#camera-rig")
            var cameraDirection = new THREE.Vector3();
            cameraRig.object3D.getWorldDirection(cameraDirection);
            var cameraMoveControl = cameraRig.getAttribute("movement-controls")

            if (e.code == "Space") {             
                var startCar = document.querySelector("#control-break")
                startCar.setAttribute("material", "color", "gray")
            }

            if (e.code == "ArrowUp") {
                if (multiply > 10) {
                    multiply -= 0.5
                    cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})
                }

            }
        })
    }

});