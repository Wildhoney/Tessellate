(function($window) {

    /**
     * @module Tessellate
     * @param container {Object}
     * @constructor
     */
    $window.Tessellate = function Tessellate(container) {

        if (typeof container === 'undefined') {
            throw 'You must pass the container when instantiating.';
        }

        // Store a reference to the container, and create the ghosts
        // for its children.
        this.container = container;
        this.container.classList.add('tessellate-container');
        this._createGhosts();

    };

    /**
     * @property prototype
     * @type {Object}
     */
    $window.Tessellate.prototype = {

        /**
         * @property container
         * @type {Object}
         */
        container: null,

        /**
         * @method remove
         * @param entity {Object}
         * Responsible for removing an element from the DOM, as well as its ghost, and then repositioning all of
         * the elements in the DOM.
         * @return {Boolean}
         */
        remove: function remove(entity) {

            // Find the ID for the element to be removed, as well as its ghost.
            var id      = entity.getAttribute('data-tessellate-ghost'),
                ghost   = this.container.querySelector('*[data-tessellate-entity="' + id + '"]');

            // Remove both the current element and its related ghost.
            entity.remove();
            ghost.remove();

            this.reposition();
            return true;

        },

        /**
         * @method reposition
         * Responsible for repositioning the elements based on their ghosts.
         * @return {void}
         */
        reposition: function reposition() {

            var ghosts = this._getChildren();

            for (var index = 0, maxLength = ghosts.length; index < maxLength; index++) {

                // Find the related ghosts, as well as the actual physical entities.
                var ghost   = ghosts[index],
                    id      = ghost.getAttribute('data-tessellate-ghost'),
                    entity   = this.container.querySelector('*[data-tessellate-entity="' + id + '"]');

                // Update their `top` and `left` properties based on the offset of their
                // ghosts.
                entity.style.top     = ghost.offsetTop + 'px';
                entity.style.left    = ghost.offsetLeft + 'px';

            }

        },

        /**
         * @method _getChildren
         * @returns {NodeList}
         * @private
         */
        _getChildren: function _getChildren() {
            return this.container.querySelectorAll('*[data-tessellate]');
        },

        /**
         * @method _createGhosts
         * @private
         */
        _createGhosts: function _createGhosts() {

            var ghosts = this._getChildren();

            for (var index = 0, maxLength = ghosts.length; index < maxLength; index++) {

                var ghost   = ghosts[index],
                    entity   = ghost.cloneNode();

                // Replace the `data-tessellate` attribute with the `data-tessellate-ghost`
                // node, and add a class as well so that it can be hidden.
                entity.removeAttribute('data-tessellate');
                ghost.setAttribute('data-tessellate-ghost', index);
                entity.setAttribute('data-tessellate-entity', index);

                // Append the ghost to the container in the same order.
                this.container.appendChild(entity);

                // Place the ghosts directly above the children.
                entity.style.top     = ghost.offsetTop + 'px';
                entity.style.left    = ghost.offsetLeft + 'px';

                // Add the position absolute to the ghost.
                entity.classList.add('tessellate-entity');
                ghost.classList.add('tessellate-ghost');

            }

        }

    };


})(window);