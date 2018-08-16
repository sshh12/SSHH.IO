let colors = { // R,G,B
    'red': [211, 47, 47],
    'blue': [57, 73, 171],
    'green': [56, 142, 60],
    'yellow': [251, 192, 45],
    'purple': [149, 117, 205],
    'pink': [240, 98, 146],
    'orange': [239, 108, 0],
    'grey': [97, 97, 97],
    'teal': [0, 150, 136]
};

// HTML elements
let canvas;
let userinput;
let colorkey;
let filtersel;

// Angle/Position vars
let camX = 0,
    camY = 120;
let rotX = 0,
    rotY = 0;
let centX = 0,
    centY = 0,
    centZ = 0;
let scl = .3;

// Options
let selected = [];
let coloring = 'random';
let filtering = 'none';

function setup() { // init()

    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.parent("app");

    centerPoints();
    ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 2000);

    userinput = select('#username');
    userinput.input(updateUserInput);

    colorkey = document.getElementById("colorkey");
    filtersel = document.getElementById("filtersel");

}

function centerPoints() { // Verify and Correct Points to be around (0,0,0)

    let sumX = 0,
        sumY = 0,
        sumZ = 0;

    for (let i = 0; i < points.length; i++) {
        sumX += points[i][0];
        sumY += points[i][1];
        sumZ += points[i][2];
    }

    centX = sumX / points.length;
    centY = sumY / points.length;
    centZ = sumZ / points.length;

    for (let i = 0; i < points.length; i++) {
        points[i][0] -= centX;
        points[i][1] -= centY;
        points[i][2] -= centZ;
        points[i][0] *= 5000;
        points[i][1] *= 5000;
        points[i][2] *= 5000;
    }

}

function draw() { // Update Screen

    background(20);

    camera(camX, camY);

    scale(scl);
    rotateX(rotX);
    rotateY(rotY);

    ambientLight(220);

    for (let i = 0; i < points.length; i++) {

        if (notFiltered(i)) {

            push();

            translate(points[i][0], points[i][1], points[i][2]);

            let color = getColor(i);
            specularMaterial(color[0], color[1], color[2]);

            if (selected.includes(i)) {
                sphere(35);
            } else {
                sphere(6);
            }

            pop();

        }

    }

}

/// Look Up Methods and Option Setters

function setFilter(f) {

    filtering = f;

    if (filtering === "none") {

        filtersel.innerHTML = "None";

    } else if (filtering === "fulldata") {

        filtersel.innerHTML = "Only Users with All Data";

    }

}

function notFiltered(index) {

    if (filtering === "none") {

        return true;

    } else if (filtering === "fulldata") {

        return labels[index][1] != "?";

    }

    return false;

}

let wrapColor = (txt, color) => (`<span style='color:rgb(${color[0]},${color[1]},${color[2]})'>${txt}</span>`);

function setColor(c) {

    coloring = c;

    if (coloring === "random") {

        colorkey.innerHTML = 'Random Colors';

    } else if (coloring === "highest") {

        let subcolors = Object.values(colors);

        colorkey.innerHTML = wrapColor("Science", subcolors[0]) + " " +
            wrapColor("Math", subcolors[1]) + " " +
            wrapColor("English", subcolors[2]) + " " +
            wrapColor("Language", subcolors[3]) + " " +
            wrapColor("Art", subcolors[4]) + " " +
            wrapColor("Sports", subcolors[5]) + " " +
            wrapColor("Social Studies", subcolors[6]) + " " +
            wrapColor("Engineering", subcolors[7]);

    } else if (coloring === "lowest") {

        let subcolors = Object.values(colors);

        colorkey.innerHTML = wrapColor("Science", subcolors[0]) + " " +
            wrapColor("Math", subcolors[1]) + " " +
            wrapColor("English", subcolors[2]) + " " +
            wrapColor("Language", subcolors[3]) + " " +
            wrapColor("Art", subcolors[4]) + " " +
            wrapColor("Sports", subcolors[5]) + " " +
            wrapColor("Social Studies", subcolors[6]) + " " +
            wrapColor("Engineering", subcolors[7]);

    } else if (coloring === "dist") {

        colorkey.innerHTML = wrapColor("Close", colors.blue) + " " +
            wrapColor("to", colors.green) + " " +
            wrapColor("Far", colors.red);

    } else if (coloring === "gender") {

        colorkey.innerHTML = wrapColor("Male", colors.blue) + " " +
            wrapColor("Female", colors.pink);

    } else if (coloring === "grade") {

        colorkey.innerHTML = wrapColor("<9", colors.yellow) + " " +
            wrapColor("9", colors.blue) + " " +
            wrapColor("10", colors.green) + " " +
            wrapColor("11", colors.purple) + " " +
            wrapColor("12", colors.red);

    } else if (coloring === "language") {

        colorkey.innerHTML = wrapColor("English", colors.blue) + " " +
            wrapColor("Spanish", colors.yellow) + " " +
            wrapColor("Chinese", colors.red) + " " +
            wrapColor("Arabic", colors.green) + " " +
            wrapColor("Vietnamese", colors.orange) + " " +
            wrapColor("Bengali", colors.purple) + " " +
            wrapColor("Indonesian", colors.teal) + " " +
            wrapColor("Russian", colors.pink);

    }

}

let dists = [];
let maxDist = 0;

function getColor(index) {

    if (coloring === "random") {

        return [index % 210 + 45, index * 7 % 210 + 45, index * index % 210 + 45];

    } else if (coloring === "highest") {

        let d = features[index];
        return Object.values(colors)[d.indexOf(max(d))];

    } else if (coloring === "lowest") {

        let d = features[index].concat([1000]);
        return Object.values(colors)[d.indexOf(min(d.filter(Boolean)))];

    } else if (coloring === "dist" && selected.length >= 1) {

        if (dists.length === 0) {

            maxDist = 0;
            for (let point of points) {

                let dist = 0;
                for (let sIndex of selected) {

                    dist += (pow(point[0] - points[sIndex][0], 2) +
                        pow(point[1] - points[sIndex][1], 2) +
                        pow(point[2] - points[sIndex][2], 2));

                }

                dists.push(dist);
                maxDist = max(maxDist, dist);

            }

        }

        let colorDegree = round((1 - dists[index] / maxDist) * 240);

        let col = color('hsl(' + colorDegree + ', 100%, 50%)'); // Heatmap Style Coloring

        return [red(col), green(col), blue(col)];

    } else if (coloring === "gender") {

        let gender = labels[index][1];
        if (gender === "male") {
            return colors.blue;
        } else if (gender === "female") {
            return colors.pink;
        }

    } else if (coloring === "grade") {

        let grade = labels[index][3];
        if (grade < 9) {
            return colors.yellow;
        } else if (grade === 9) {
            return colors.blue;
        } else if (grade === 10) {
            return colors.green;
        } else if (grade === 11) {
            return colors.purple;
        } else if (grade === 12) {
            return colors.red;
        }

    } else if (coloring === "language") {

        let language = labels[index][2];
        if (language === "english") {
            return colors.blue;
        } else if (language === "spanish") {
            return colors.yellow;
        } else if (language.includes("chinese")) {
            return colors.red;
        } else if (language === "arabic") {
            return colors.green;
        } else if (language === "russian") {
            return colors.pink;
        } else if (language === "vietnamese") {
            return colors.orange;
        } else if (language.includes("bengali")) {
            return colors.purple;
        } else if (language === "indonesian") {
            return colors.teal;
        }

    }

    return [255, 255, 255];

}

/// Events

function mouseDragged() { // Orbit/Pan

    if (mouseButton === RIGHT) {

        camX += (pmouseX - mouseX) / 10;
        camY += (pmouseY - mouseY) / 10;

    } else if (mouseButton === LEFT) {

        rotY += (pmouseX - mouseX) / 200;
        rotX += (pmouseY - mouseY) / 200;

    }

}

function mouseWheel(ev) { // Zoom

    scl -= ev.delta / 1200;
    scl = constrain(scl, .1, 6);

}

function windowResized() {

    resizeCanvas(windowWidth, windowHeight);

}

function updateUserInput() { // Update Selection

    selected = [];
    let vals = userinput.value().replace("s", "").replace(" ", "").split(",").map(hash);
    if (vals.length >= 1) {
        for (let i = 0; i < labels.length; i++) {
            if (vals.includes(labels[i][0])) {
                selected.push(i);
            }
        }
    }
    document.getElementById("userlabel").innerHTML = `Users (${selected.length})`;
    dists = [];

}

let hash = (value) => {
    let shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(value);
    return shaObj.getHash("HEX");
}
