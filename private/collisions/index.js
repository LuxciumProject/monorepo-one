function main(context) {
  "use strict";

  context.addEventListener('keydown',
    (e) => {
      switch (e.code) {
        // case 'KeyF': show_fps = !show_fps; break;
        // case 'KeyR': randomRules(); break;
        // case 'KeyS': symmetricRules(); break;
        // case 'KeyP': randomAtoms(100, false); break;
        // case 'KeyO': randomAtoms(500, true); break;
        // case 'BracketRight': time_scale *= 1.1; break;
        // case 'BracketLeft': time_scale /= 1.1; break;
        // case 'Digit1': cutOff /= 1.1; break;
        // case 'Digit2': cutOff *= 1.1; break;
        // case 'KeyM': printRules(); break;
        default: console.log('keydown', e.code);
      }
    });

  context.addEventListener('keyup',
    (e) => {
      switch (e.code) {
        // case 'KeyF': show_fps = !show_fps; break;
        // case 'KeyR': randomRules(); break;
        // case 'KeyS': symmetricRules(); break;
        // case 'KeyP': randomAtoms(100, false); break;
        // case 'KeyO': randomAtoms(500, true); break;
        // case 'BracketRight': time_scale *= 1.1; break;
        // case 'BracketLeft': time_scale /= 1.1; break;
        // case 'Digit1': cutOff /= 1.1; break;
        // case 'Digit2': cutOff *= 1.1; break;
        // case 'KeyM': printRules(); break;
        default: console.log('keyup', e.code);
      }
    });
  context.addEventListener('click',
    (e) => {
      // pulse = pulseDuration;
      // pulse_x = e.clientX;
      console.log('click', e,);
      // pulse_y = e.clientY;
    }
  );




  void function showCustomMenu() {
    const menu = new nw.Menu();
    menu.append(new nw.MenuItem({ label: 'Item A' }));
  };

  let menu = document.querySelector("#context-menu");
  let active = "context-menu--active";
  let menuState = 0;
  function toggleMenuOn() {
    if (menuState !== 1) {
      menuState = 1;
      menu.classList.add(active);
    }
  }

  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    console.log(e);
  });

  void function contextMenuListener(el) {
    el.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      toggleMenuOn();
    });
  };

  void (function (active) {
    "use strict";
    // START © 2014-2015, Call Me Nick  (Nick Salloum)
    /*
        MIT license https://github.com/callmenick/Custom-Context-Menu
        Copyright 2014-2015, Call Me Nick (Nick Salloum)
    */
    if (active === true) {

      //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////
      //
      // H E L P E R    F U N C T I O N S
      //
      //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////

      /**
       * Function to check if we clicked inside an element with a particular class
       * name.
       *
       * @param {Object} e The event
       * @param {String} className The class name to check against
       * @return {Boolean}
       */
      function clickInsideElement(e, className) {
        var el = e.srcElement || e.target;

        if (el.classList.contains(className)) {
          return el;
        } else {
          while ((el = el.parentNode)) {
            if (el.classList && el.classList.contains(className)) {
              return el;
            }
          }
        }

        return false;
      }

      /**
       * Get's exact position of event.
       *
       * @param {Object} e The event passed in
       * @return {Object} Returns the x and y position
       */
      function getPosition(e) {
        var posx = 0;
        var posy = 0;

        if (!e) var e = window.event;

        if (e.pageX || e.pageY) {
          posx = e.pageX;
          posy = e.pageY;
        } else if (e.clientX || e.clientY) {
          posx =
            e.clientX +
            document.body.scrollLeft +
            document.documentElement.scrollLeft;
          posy =
            e.clientY +
            document.body.scrollTop +
            document.documentElement.scrollTop;
        }

        return {
          x: posx,
          y: posy
        };
      }

      //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////
      //
      // C O R E    F U N C T I O N S
      //
      //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////

      /**
       * Variables.
       */
      var contextMenuClassName = "context-menu";
      var contextMenuItemClassName = "context-menu__item";
      var contextMenuLinkClassName = "context-menu__link";
      var contextMenuActive = "context-menu--active";

      var taskItemClassName = "task";
      var taskItemInContext;

      var clickCoords;
      var clickCoordsX;
      var clickCoordsY;

      var menu = document.querySelector("#context-menu");
      var menuItems = menu.querySelectorAll(".context-menu__item");
      var menuState = 0;
      var menuWidth;
      var menuHeight;
      var menuPosition;
      var menuPositionX;
      var menuPositionY;

      var windowWidth;
      var windowHeight;

      /**
       * Initialise our application's code.
       */
      function init() {
        contextListener();
        clickListener();
        keyupListener();
        resizeListener();
      }

      /**
       * Listens for contextmenu events.
       */
      function contextListener() {
        document.addEventListener("contextmenu", function (e) {
          taskItemInContext = clickInsideElement(e, taskItemClassName);

          if (taskItemInContext) {
            e.preventDefault();
            toggleMenuOn();
            positionMenu(e);
          } else {
            taskItemInContext = null;
            toggleMenuOff();
          }
        });
      }

      /**
       * Listens for click events.
       */
      function clickListener() {
        document.addEventListener("click", function (e) {
          var clickeElIsLink = clickInsideElement(e, contextMenuLinkClassName);

          if (clickeElIsLink) {
            e.preventDefault();
            menuItemListener(clickeElIsLink);
          } else {
            var button = e.which || e.button;
            if (button === 1) {
              toggleMenuOff();
            }
          }
        });
      }

      /**
       * Listens for keyup events.
       */
      function keyupListener() {
        window.onkeyup = function (e) {
          if (e.keyCode === 27) {
            toggleMenuOff();
          }
        };
      }

      /**
       * Window resize event listener
       */
      function resizeListener() {
        window.onresize = function (e) {
          toggleMenuOff();
        };
      }

      /**
       * Turns the custom context menu on.
       */
      function toggleMenuOn() {
        if (menuState !== 1) {
          menuState = 1;
          menu.classList.add(contextMenuActive);
        }
      }

      /**
       * Turns the custom context menu off.
       */
      function toggleMenuOff() {
        if (menuState !== 0) {
          menuState = 0;
          menu.classList.remove(contextMenuActive);
        }
      }

      /**
       * Positions the menu properly.
       *
       * @param {Object} e The event
       */
      function positionMenu(e) {
        clickCoords = getPosition(e);
        clickCoordsX = clickCoords.x;
        clickCoordsY = clickCoords.y;

        menuWidth = menu.offsetWidth + 4;
        menuHeight = menu.offsetHeight + 4;

        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;

        if (windowWidth - clickCoordsX < menuWidth) {
          menu.style.left = windowWidth - menuWidth + "px";
        } else {
          menu.style.left = clickCoordsX + "px";
        }

        if (windowHeight - clickCoordsY < menuHeight) {
          menu.style.top = windowHeight - menuHeight + "px";
        } else {
          menu.style.top = clickCoordsY + "px";
        }
      }

      /**
       * Dummy action function that logs an action when a menu item link is clicked
       *
       * @param {HTMLElement} link The link that was clicked
       */
      function menuItemListener(link) {
        console.log(
          "Task ID - " +
          taskItemInContext.getAttribute("data-id") +
          ", Task action - " +
          link.getAttribute("data-action")
        );
        toggleMenuOff();
      }

      /**
       * Run the app.
       */
      init();
    }
    /*
        Nick Salloum
        March 25, 2015
        Building a Custom Right-Click (Context) Menu with JavaScript
        https://www.sitepoint.com/building-custom-right-click-context-menu-javascript/
        MIT license https://github.com/callmenick/Custom-Context-Menu
        Copyright 2014-2015, Call Me Nick (Nick Salloum)
    */
    /*
    Nick Salloum is a web designer & developer from Trinidad & Tobago:
    «
      I'm a web designer & developer from Trinidad & Tobago, with a degree
      in Mechanical Engineering. I love the logical side of the web, and
      I'm an artist/painter at heart. I endorse progressive web techniques,
      and try to learn something every day. I try to impart my knowledge
      as much as possible on my personal blog, http://callmenick.com I love
      food, I surf every weekend, and I have an amazing creative
      partnership with fellow mischief maker Elena. Together, we run
      SAYSM.
     »
    */
    // END © 2014-2015, Call Me Nick (Nick Salloum)
  })(false);

  // window.oncontextmenu = contextMenuListener
  // function () {
  //   showCustomMenu();
  //   return false;     // cancel default menu
  // };
}
