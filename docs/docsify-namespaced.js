/*!
 * docsify-namespaced
 * v0.1.1
 * https://github.com/palkan/docsify-namespaced
 * (c) 2020-2021 Vladimir Dementyev <dementiev.vm@gmail.com>
 * MIT license
 */
!(function () {
  "use strict";
  (window.$docsify = window.$docsify || {}),
    (window.$docsify.plugins = [
      function (n, a) {
        function r(n) {
          w ? (window.location.hash = n) : (window.location.href = n);
        }
        function l(n) {
          return (n =
            n || (w ? window.location.hash : window.location.pathname)).split(
            /\//
          );
        }
        function u(n, e, o, t) {
          e.values.includes(n[o + 1])
            ? t
              ? (n[o + 1] = t)
              : n.splice(o + 1, 1)
            : t && n.splice(o + 1, 0, t);
        }
        var s,
          f,
          d,
          w = !0;
        n.mounted(function () {
          var n = (s = a.config.namespaces).map(function (n) {
            var e = "(?:(".concat(n.values.join("|"), ")/)");
            return n.optional && (e += "?"), e;
          });
          (f = new RegExp("^#?/".concat(n.join("")))),
            (w = "hash" === a.router.mode);
          var o = l(),
            e = o.join("/"),
            t = 2 === o.length && "" === o[1];
          s.forEach(function (n, e) {
            n.selector &&
              ((n.selectElement = Docsify.dom.find(n.selector)),
              n.default &&
                ((n.selectElement.value = n.default),
                n.values.includes(o[e + 1]) || u(o, n, e, n.default)),
              Docsify.dom.on(n.selectElement, "click", function (n) {
                return n.stopPropagation();
              }),
              Docsify.dom.on(n.selectElement, "change", function (n) {
                return (function (n, e) {
                  var o = l();
                  u(o, s[e], e, n);
                  var t = o.join("/");
                  r(t);
                })(n.target.value, e);
              }));
          });
          var c = a.compiler.sidebar;
          a.compiler.sidebar = function () {
            return (function (n) {
              if (!d) return n;
              var c = new RegExp("^" + d);
              return (n = n.replace(
                /(href=['"])(#?[^'"]+)(["'])/g,
                function (n, e, o, t) {
                                console.log('!!!',o);
                  return o.match(c)
                    ? n
                    : [e, (o = o.replace(/^#?\//, d)), t].join("");
                }
              ));
            })(c.apply(this, arguments));
          };
          var i = o.join("/");
          t && i !== e && r(i);
        }),
          n.afterEach(function (n, e) {
            var o = (w ? window.location.hash : window.location.pathname).match(
              f
            );
            s.forEach(function (n, e) {
              n.selectElement &&
                (n.selectElement.value = (o && o[e + 1]) || "");
            }),
              (d = o ? o[0] : "/"),
              (a.config.currentNamespace = d),
              e(n);
          });
      },
    ].concat(window.$docsify.plugins || []));
})();
//# sourceMappingURL=docsify-namespaced.min.js.map
