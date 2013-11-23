(function(global) {
  var Kinetic = global.Kinetic, _ = global._, geom = global.geom;

  var r = Math.random;

  var randomColor = function() {
    return "#" + (Math.floor(r() * 16777215)).toString(16);
  };

  var data = [
    { title: "Test One" },
    { title: "Test One" },
    { title: "Test One" },
    { title: "Test One" },
    { title: "Test One" },
    { title: "Test One" },
    { title: "Test One" },
    { title: "Test One" },
    { title: "Test One" },
    { title: "Test One" },
  ];

  var stage = new Kinetic.Stage({
    draggable: true,
    width: 1000,
    height: 400,
    container: "content"
  });

  var layer = new Kinetic.Layer();
  stage.add(layer);

  var mainGroups = _.map(data, function(item) {
    var grpDim = {
      w: 40,
      h: 40
    };

    var grp = new Kinetic.Group({
      x: r() * 150,
      y: r() * 150,
      width: grpDim.w,
      height: grpDim.h,
      draggable: true
    });
    grp.item = item;
    layer.add(grp);

    var rect = new Kinetic.Rect({
      x: 0,
      y: 0,
      width: grp.getWidth(),
      height: grp.getHeight(),
      fill: randomColor()
    });

    grp.isColliding = (function (other) {
      return geom.twod.rect.overlaps(
        this.getX(),
        this.getY(),
        this.getWidth(),
        this.getHeight(),
        other.getX(),
        other.getY(),
        other.getWidth(),
        other.getHeight()
      );
    }).bind(grp);

    grp.isCollidingAny = (function () {
      var self = this;
      return _.any(self.getParent().getChildren(), function(sib) {
        return self !== sib && self.isColliding(sib);
      })
    }).bind(grp);

    grp.relationToSiblings = function() {
      var i, g, result = [], thisPoint = new geom.twod.Point(this.getX(), this.getY());
      for (i = 0; i < amaxi; i++) {
        g = mainGroups[i];
        if (g === this) { continue; }
        result.push({
          node: g,
          vector: geom.twod.vector(
            thisPoint,
            new geom.twod.Point(g.getX(), g.getY())
          )
        });
      }
      return _.sortBy(result, function(sib) {
        return sib.vector.magnitude;
      });
    };

    grp.add(rect);

    /*grp.on("dragend", function(event) {
      var r = grp.relationToSiblings();
      console.log(r);
    });*/

    return grp;
  });

  var lines = _.map(mainGroups, function(grp) {
    var line = new Kinetic.Line({
      points: [
        grp.getWidth() / 2, grp.getHeight() / 2,
        100, 100
      ],
      stroke: "black",
      strokeWidth: 2
    });

    grp.add(line);
    line.from = grp;

    return line;
  });

  var updateLines = function() {
    _.each(lines, function(line) {
      var grp = line.getParent();
      var nearest = grp.relationToSiblings()[0].node;

      line.setPoints([
        grp.getWidth() / 2, grp.getHeight() / 2,
        nearest.getX() - grp.getX() + nearest.getWidth() / 2, nearest.getY() - grp.getY() + nearest.getHeight() / 2
      ])
    });
  };

  var amaxi = mainGroups.length;
  var speed = {
    max: 20,
    min: 1
  };

  var accel = {
    max: 2,
    min: 0.8
  };

  var anim = new Kinetic.Animation(function(frame) {
    var i, g, rels, td = frame.timeDiff, tds = td / 1000;

    for(i = 0; i < amaxi; i++) {
      g = mainGroups[i];
      if(g.isCollidingAny()) {
        rels = g.relationToSiblings();
        
      } else {

      }
    }

    updateLines();

  }, layer);
  anim.start();

  //debug
  window.test = stage;

})(this);
