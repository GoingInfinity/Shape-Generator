$(document).ready(function() {

  Physics(function(world) {
    // Width and Height of Canvas
    var viewWidth = $('canvas').width();
    var viewHeight = $('canvas').height();

    // Brings in PhysicsJS functionality to canvas
    var renderer = Physics.renderer('canvas', {
      el: 'canvas',
    });

    // add the renderer
    world.add(renderer);
    // render on each step
    world.on('step', function() {
      world.render();
    });

    // Boundaries canvas window
    var viewportBounds = Physics.aabb(5, 5, viewWidth, viewHeight);

    // Adds a shape on click
    $('#generate').on('click', function(e) {
      var color = $('#color input:checked').val();
      var shape = $('#shape input:checked').val();

      switch (shape) {
        case 'Square':
          world.add(
            Physics.body('rectangle', {
              x: Math.floor(Math.random() * (viewWidth - 0)) + 0,
              y: viewHeight - 100,
              width: 80,
              height: 80,
              styles: {
                strokeStyle: color,
                fillStyle: 'white',
                lineWidth: 14,
              },
            })
          );
          break;
        case 'Circle':
          world.add(
            Physics.body('circle', {
              x: Math.floor(Math.random() * (viewWidth - 0)) + 0,
              y: viewHeight - 100,
              radius: 40,
              styles: {
                strokeStyle: color,
                fillStyle: 'white',
                lineWidth: 14,
              },
            })
          );
          break;
        case 'Triangle':
          world.add(
            Physics.body('convex-polygon', {
              x: Math.floor(Math.random() * (viewWidth - 0)) + 0,
              y: viewHeight - 100,
              vertices: [{ x: 0, y: 0 }, { x: 45, y: 90 }, { x: 90, y: 0 }],
              styles: {
                strokeStyle: color,
                fillStyle: 'white',
                lineWidth: 14,
              },
            })
          );
          break;
      }
    });

    // Detects collision of other objects
    world.add(Physics.behavior('sweep-prune'));
    world.add(Physics.behavior('body-impulse-response'));
    world.add(Physics.behavior('body-collision-detection'));

    // Detects collision of boundaries
    world.add(
      Physics.behavior('edge-collision-detection', {
        aabb: viewportBounds,
        restitution: 0.1,
        cof: 0.1,
      })
    );

    // Gravity settings
    world.add(
      Physics.behavior('constant-acceleration', {
        acc: {
          y: -0.001,
        },
      })
    );

    // subscribe to ticker to advance the simulation
    Physics.util.ticker.on(function(time, dt) {
      world.step(time);
    });
  });
});
