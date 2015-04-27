var builder_iframe = true;

(function($)
{
	$('[data-component*="builder."]')
	.each(function(){
		var o = $(this).attr('data-component').split('.'),
			k = o[1],
			v = o[2];

		var p = $(this).parents('[data-component]').first();
		p.attr('data-builder-' + k, v);
	});

	$('[data-builder-saveComponent="original"]').each(function(){
      	$(this)
      	.data('original', $.trim($(this).html()))
      	.attr('data-builder-exclude', 'children');
    });

    $('#overlay, #overlay-hover').appendTo('body');

    // var container = builder.container;
    // if ($(container).length > 1)
    //   $($(container).get(0)).replaceWith($(container).get($(container).length - 1));

    // $(function()
    // {
    // 	CKEDITOR.disableAutoInline = true;
    // 	CKEDITOR.editorConfig = function(config)
	   //  {
	   //    config.removeFormatTags = false;
	   //    config.allowedContent = true;

	   //    config.toolbarGroups = [
	   //      { name: 'undo' },
	   //      { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
	   //      { name: 'links' },
	   //      { name: 'insert' },
	   //      { name: 'forms' },
	   //      { name: 'others' },
	   //      { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
	   //      { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align' ] },
	   //      { name: 'styles' },
	   //      { name: 'colors' },
	   //      { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
	   //      { name: 'tools' }
	   //    ];

	   //    config.removeButtons = 'Underline,Subscript,Superscript';
	   //    config.removeDialogTabs = 'image:advanced;link:advanced';
	   //  };

	   //  CKEDITOR.dtd.$removeEmpty.i = 0;

    // });

})(jQuery);