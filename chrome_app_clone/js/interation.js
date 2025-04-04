const numLines = 12;
const spacing = 20;
const colors = ['#ff3c38', '#fcd12a', '#3a86ff', '#ff8800'];
let lines = [];

function setup() {
    createCanvas(windowWidth, windowHeight);

    const topCount = numLines / 2;
    const bottomCount = numLines / 2;

    // 상단 라인
    for (let i = 0; i < topCount; i++) {
        let y = map(i, 0, topCount - 1, 60, height / 3 - 40); // 위쪽 여백 추가
        lines.push(createLine(y, colors[i % colors.length]));
    }

    // 하단 라인
    for (let i = 0; i < bottomCount; i++) {
        let y = map(i, 0, bottomCount - 1, height * 2 / 3, height - 100); // 아래쪽 여백 추가
        lines.push(createLine(y, colors[i % colors.length]));
    }
}

function createLine(baseY, color) {
    let points = [];
    for (let x = 0; x <= width; x += 3) {
    points.push({
        x: x,
        baseY: baseY,
        currentY: baseY
    });
    }
    return { points, color };
}

function draw() {
    clear();

    for (let line of lines) {
    stroke(line.color);
    strokeWeight(2.5);
    noFill();
    beginShape();
    for (let pt of line.points) {
        let d = dist(mouseX, mouseY, pt.x, pt.baseY);
        if (d < 100) {
        // 마우스에서 멀어지게 밀어냄
        let falloff = 1 - d / 100;
        let force = pow(falloff, 2) * 20; // ? 둥글한 감쇠
        pt.currentY = lerp(pt.currentY, pt.baseY + (pt.baseY < mouseY ? -force : force), 0.3);
        } else {
        // 천천히 원래 위치로 복귀
        pt.currentY = lerp(pt.currentY, pt.baseY, 0.2);
        }
        vertex(pt.x, pt.currentY);
    }
    endShape();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    lines = []; 
    setup();
  }