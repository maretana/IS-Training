/*!
 * All Rights Reserved
 * This software is proprietary information of
 * Intelligent Sense
 * Use is subject to license terms.
 * Filename: main.js
 */

 /*
  * Author:      kchaves@intelligentsense.com
  * Date:        28/10/2013
  * Description: Template to create javascript namespaces and modules
  */

/**
 * Namespace declaration. Use the client's name and project. 
 */  
var IntSenseNamespace = window.IntSenseNamespace || {};

/*
 * Global logic
 * @namespace
 */
(function (pContext, $) {

    'use strict';

    //Namespace var
    var var1 = 'a';
    var var2 = 'b';

    /**
     * Public method to be used outside of the module.
     * 
     * @return {type} description.
     * @public
     */
    pContext.publicMethod = function () {
        return 'Hello Intelligent Sense.';
    };

    /**
     * Private method
     * private 
     */
    function callAPI() {
        //http://api.ht.fuseamplify.com/api/artist/top?aggregate=true
        return $.ajax({
            url : 'http://api.ht.fuseamplify.com/api/artist/top?aggregate=true',
            type : 'GET',
            dataType : 'jsonp'
        });
    }

    function renderPage(pData) {
        processData(pData);
        var source = $('#profileTemplate').html();
        var template = Handlebars.compile(source);
        var html = template(pData);
        $(document.body).append(html);
        addEvents();
    }

    function processData(pData) {
        var sortFunction = function(a, b) {
            return b.volume - a.volume; //sort in descendent order
        };
        pData.sort(sortFunction);
        $(pData).each(function(index, element){element.ranking = index + 1});
    }

    function addEvents() {
        $('.profile-container').each(function(index, element){
            var button = $(this).find('.profile-image-button');
            var content = $(this).find('.profile-content');
            button.click(function(event){
                content.toggle();
                var newText = button.text() === 'Hide' ? 'Show' : 'Hide';
                button.text(newText);
                return false;
            });
        });
    }

    /**
     * Module.
     *      Module description 
     *
     * @private
     * @namespace
     **/
    var IntSenseModule = (function() {

        /**
        * Module's private var
        **/
        var vars = {
            moduleVar: false
        };

        /**
         *  Private Method description
         * 
         * @private
         **/
        function modulePrivateMethod(pParams) {

        }

        /**
         *  Public Method description
         * 
         * @public
         **/
        function modulePublicMethod() {

        }

        /**
         * Init the module.
         * @public
         */
        function init() {
            //Called the methods to initialize the module 
            modulePrivateMethod({});
        }

        //Return the public methods of the module so that they are accessible outside this context. 
        return {
                    init : init,
                    modulePublicMethod: modulePublicMethod
                };
    })();


    /**
     * Initializes the module.
     * @private
     */
    function init() {

        //Called the methods required to initialize all the modules.
        IntSenseModule.init();
        
        callAPI().done(renderPage);
    }

    //Init.
    $(init);

}(IntSenseNamespace, jQuery));
