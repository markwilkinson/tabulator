tabulator.Icon = {};
tabulator.Icon.src= []
tabulator.Icon.tooltips= []

var iconPrefix = tabulator.iconPrefix; // e.g. 'chrome://tabulator/content/';

////////////////////////// Common icons

tabulator.Icon.src.icon_expand = UI.icons.originalIconBase + 'tbl-expand-trans.png';
tabulator.Icon.src.icon_more = UI.icons.originalIconBase + 'tbl-more-trans.png'; // looks just like expand, diff semantics
// Icon.src.icon_expand = UI.icons.originalIconBase + 'clean/Icon.src.Icon.src.icon_expand.png';
tabulator.Icon.src.icon_collapse = UI.icons.originalIconBase + 'tbl-collapse.png';
tabulator.Icon.src.icon_internals = UI.icons.originalIconBase + 'tango/22-emblem-system.png'
tabulator.Icon.src.icon_instances = UI.icons.originalIconBase + 'tango/22-folder-open.png'
tabulator.Icon.src.icon_foaf = UI.icons.originalIconBase + 'foaf/foafTiny.gif';
tabulator.Icon.src.icon_social = UI.icons.originalIconBase + 'social/social.gif';
tabulator.Icon.src.icon_mb = UI.icons.originalIconBase + 'microblog/microblog.png';
tabulator.Icon.src.icon_shrink = UI.icons.originalIconBase + 'tbl-shrink.png';  // shrink list back up
tabulator.Icon.src.icon_rows = UI.icons.originalIconBase + 'tbl-rows.png';
// Icon.src.Icon.src.icon_columns = 'icons/tbl-columns.png';

// Status balls:

tabulator.Icon.src.icon_unrequested = UI.icons.originalIconBase + '16dot-blue.gif';
// tabulator.Icon.src.Icon.src.icon_parse = UI.icons.originalIconBase + '18x18-white.gif';
tabulator.Icon.src.icon_fetched = UI.icons.originalIconBase + '16dot-green.gif';
tabulator.Icon.src.icon_failed = UI.icons.originalIconBase + '16dot-red.gif';
tabulator.Icon.src.icon_requested = UI.icons.originalIconBase + '16dot-yellow.gif';
// Icon.src.icon_maximize = UI.icons.originalIconBase + 'clean/Icon.src.Icon.src.icon_con_max.png';

// Panes:
tabulator.Icon.src.icon_CVPane = UI.icons.originalIconBase + 'CV.png';
tabulator.Icon.src.icon_defaultPane = UI.icons.originalIconBase + 'about.png';
tabulator.Icon.src.icon_visit = UI.icons.originalIconBase + 'tango/22-text-x-generic.png';
tabulator.Icon.src.icon_dataContents = UI.icons.originalIconBase + 'rdf_flyer.24.gif';  //@@ Bad .. find better
tabulator.Icon.src.icon_n3Pane = UI.icons.originalIconBase + 'w3c/n3_smaller.png';  //@@ Bad .. find better
tabulator.Icon.src.icon_RDFXMLPane = UI.icons.originalIconBase + '22-text-xml4.png';  //@@ Bad .. find better
tabulator.Icon.src.icon_imageContents = UI.icons.originalIconBase + 'tango/22-image-x-generic.png'
tabulator.Icon.src.icon_airPane = UI.icons.originalIconBase + '1pt5a.gif';
tabulator.Icon.src.icon_LawPane = UI.icons.originalIconBase + 'law.jpg';
tabulator.Icon.src.icon_pushbackPane = UI.icons.originalIconBase + 'pb-logo.png';

// For photo albums (By albert08@csail.mit.edu)
tabulator.Icon.src.icon_photoPane = UI.icons.originalIconBase + 'photo_small.png';
tabulator.Icon.src.icon_tagPane = UI.icons.originalIconBase + 'tag_small.png';
tabulator.Icon.src.icon_TinyTag = UI.icons.originalIconBase + 'tag_tiny.png';
tabulator.Icon.src.icon_photoBegin = UI.icons.originalIconBase + 'photo_begin.png';
tabulator.Icon.src.icon_photoNext = UI.icons.originalIconBase + 'photo_next.png';
tabulator.Icon.src.icon_photoBack = UI.icons.originalIconBase + 'photo_back.png';
tabulator.Icon.src.icon_photoEnd = UI.icons.originalIconBase + 'photo_end.png';
tabulator.Icon.src.icon_photoImportPane = UI.icons.originalIconBase + 'flickr_small.png';
//Icon.src.icon_CloseButton = UI.icons.originalIconBase + 'close_tiny.png';
//Icon.src.icon_AddButton = UI.icons.originalIconBase + 'addphoto_tiny.png';

// For that one we need a document with grid lines.  Make data-x-generix maybe

// actions for sources;
tabulator.Icon.src.icon_retract = UI.icons.originalIconBase + 'retract.gif';
tabulator.Icon.src.icon_refresh = UI.icons.originalIconBase + 'refresh.gif';
tabulator.Icon.src.icon_optoff = UI.icons.originalIconBase + 'optional_off.PNG';
tabulator.Icon.src.icon_opton = UI.icons.originalIconBase + 'optional_on.PNG';
tabulator.Icon.src.icon_map = UI.icons.originalIconBase + 'compassrose.png';
tabulator.Icon.src.icon_retracted = tabulator.Icon.src.icon_unrequested
tabulator.Icon.src.icon_retracted = tabulator.Icon.src.icon_unrequested;

tabulator.Icon.src.icon_time = iconPrefix+'icons/Wclocksmall.png';

// Within outline mode:

tabulator.Icon.src.icon_telephone = UI.icons.originalIconBase + 'silk/telephone.png';
tabulator.Icon.src.icon_time = UI.icons.originalIconBase + 'Wclocksmall.png';
tabulator.Icon.src.icon_remove_node = UI.icons.originalIconBase + 'tbl-x-small.png'
tabulator.Icon.src.icon_add_triple = UI.icons.originalIconBase + 'tango/22-list-add.png';
tabulator.Icon.src.icon_add_new_triple = UI.icons.originalIconBase + 'tango/22-list-add-new.png';
tabulator.Icon.src.icon_show_choices = UI.icons.originalIconBase + 'userinput_show_choices_temp.png'; // looks just like collapse, diff smmantics

// Inline Justification
tabulator.Icon.src.icon_display_reasons = UI.icons.originalIconBase + 'tango/22-help-browser.png';
tabulator.Icon.tooltips[tabulator.Icon.src.icon_display_reasons] = 'Display explanations';

// Other tooltips
tabulator.Icon.tooltips[tabulator.Icon.src.icon_add_triple] = 'Add more'
tabulator.Icon.tooltips[tabulator.Icon.src.icon_add_new_triple] = 'Add one'
tabulator.Icon.tooltips[tabulator.Icon.src.icon_remove_node] = 'Remove'
tabulator.Icon.tooltips[tabulator.Icon.src.icon_expand] = 'View details.'
tabulator.Icon.tooltips[tabulator.Icon.src.icon_collapse] = 'Hide details.'
tabulator.Icon.tooltips[tabulator.Icon.src.icon_shrink] = 'Shrink list.'
tabulator.Icon.tooltips[tabulator.Icon.src.icon_internals] = 'Under the hood'
tabulator.Icon.tooltips[tabulator.Icon.src.icon_instances] = 'List'
tabulator.Icon.tooltips[tabulator.Icon.src.icon_foaf] = 'Friends'
tabulator.Icon.tooltips[tabulator.Icon.src.icon_rows] = 'Make a table of data like this'
// Note the string '[Tt]his resource' can be replaced with an actual URI by the code
tabulator.Icon.tooltips[tabulator.Icon.src.icon_unrequested] = 'Fetch this.'
tabulator.Icon.tooltips[tabulator.Icon.src.icon_fetched] = 'Fetched successfully.'
tabulator.Icon.tooltips[tabulator.Icon.src.icon_failed] = 'Failed to load. Click to retry.'
tabulator.Icon.tooltips[tabulator.Icon.src.icon_requested] = 'This is being fetched. Please wait...'

tabulator.Icon.tooltips[tabulator.Icon.src.icon_visit] = 'View document'
tabulator.Icon.tooltips[tabulator.Icon.src.icon_retract] = 'Remove this source and all its data from tabulator.'
tabulator.Icon.tooltips[tabulator.Icon.src.icon_refresh] = 'Refresh this source and reload its triples.'

///////////////////////////////// End comon area

tabulator.Icon.OutlinerIcon= function (src, width, alt, tooltip, filter)
{
	this.src=src;
	this.alt=alt;
	this.width=width;
	this.tooltip=tooltip;
	this.filter=filter;
       //filter: RDFStatement,('subj'|'pred'|'obj')->boolean, inverse->boolean (whether the statement is an inverse).
       //Filter on whether to show this icon for a term; optional property.
       //If filter is not passed, this icon will never AUTOMATICALLY be shown.
       //You can show it with termWidget.addIcon
	return this;
}

tabulator.Icon.termWidgets = {}
tabulator.Icon.termWidgets.optOn = new tabulator.Icon.OutlinerIcon(tabulator.Icon.src.icon_opton,20,'opt on','Make this branch of your query mandatory.');
tabulator.Icon.termWidgets.optOff = new tabulator.Icon.OutlinerIcon(tabulator.Icon.src.icon_optoff,20,'opt off','Make this branch of your query optional.');
tabulator.Icon.termWidgets.addTri = new tabulator.Icon.OutlinerIcon(tabulator.Icon.src.icon_add_triple,18,"add tri","Add one");
// Ideally: "New "+label(subject)
