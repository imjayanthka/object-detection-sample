let classColorMap = {};

window.onload = () => {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var img = new Image();
  img.src = "./imgs/beatles.jpg";
  img.id = "img";
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
  };
};

const img = document.getElementById("canvas");
cocoSsd.load().then(model => {
  model.detect(img).then(predictions => {
    predictions.forEach(element => {
      const clr = selectColor(element.class);
      drawRect(element.bbox, clr);
    });
  });
});

const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const selectColor = colorClass => {
  if (!(colorClass in classColorMap)) {
    const clr = getRandomColor();
    classColorMap[colorClass] = clr;
    return clr;
  } else {
    return classColorMap[colorClass];
  }
};

const drawRect = (bbox, color) => {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.rect(bbox[0], bbox[1], bbox[2], bbox[3]);
  ctx.strokeStyle = color;
  ctx.closePath();
  ctx.stroke();
};
