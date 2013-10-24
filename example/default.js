(function($document, $tessellate) {

    var initialise = function initialise() {

        var colours     = $document.querySelector('section.colours'),
            tessellate  = new $tessellate(colours);

        colours.onclick = function onClick(event) {
            tessellate.remove(event.target);
        }

    };

    document.addEventListener('DOMContentLoaded', initialise);

})(window.document, window.Tessellate);