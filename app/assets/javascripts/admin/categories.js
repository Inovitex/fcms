//= require dataTables/jquery.dataTables
//= require dataTables/jquery.dataTables.bootstrap

$(document).ready(function() {
    var oClassesForm = $('form');

    // Copy the form url for further usage
    modelUrl = $(oClassesForm).attr('action');
    if(!/\/$/.test(modelUrl))
        modelUrl += '/';

    // Find the modelName out of the id
    modelName = $(oClassesForm).attr('id').replace(/^[a-zA-Z0-9]+_/g, '');

    // Create regular expression to find inputs
    re = new RegExp(modelName + '.*', 'g');

    // -- Classes list   -----------------------------------------------------------------------------------------------
    var oClassesList = $('#classes_list').dataTable({
        "bInfo": false,
        "sDom": "<'row-fluid'r>t<'row-fluid'<'span6'i>>",
        "sPaginationType": "bootstrap" ,
        "oLanguage": {
            "sProcessing":     "Traitement en cours...",
            "sSearch":         "Rechercher&nbsp;:",
            "sLengthMenu":     "Afficher _MENU_ &eacute;l&eacute;ments",
            "sInfo":           "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
            "sInfoEmpty":      "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
            "sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
            "sInfoPostFix":    "",
            "sLoadingRecords": "Chargement en cours...",
            "sZeroRecords":    "Aucun &eacute;l&eacute;ment &agrave; afficher",
            "sEmptyTable":     "Aucune donnée disponible dans le tableau",
            "oPaginate": {
                "sFirst":      "Premier",
                "sPrevious":   "Pr&eacute;c&eacute;dent",
                "sNext":       "Suivant",
                "sLast":       "Dernier"
            },
            "oAria": {
                "sSortAscending":  ": activer pour trier la colonne par ordre croissant",
                "sSortDescending": ": activer pour trier la colonne par ordre décroissant"
            }
        }
    });

    // Add 'delete' & 'add' buttons
    $('#classes_list_wrapper .row-fluid:last .span6:first').html(
        "<a id='categories_addItem' class='btn btn-primary' href='#'>Ajouter</a>" +
        "<a id='categories_deleteItem' class='btn' href='#'>Supprimer</a></div>"
    );

    // Add delete button's click handler
    $('#categories_deleteItem').click( function() {
        var anSelected = fcms.fnGetSelected( oClassesList );
        if ( anSelected.length !== 0 ) {
            var id = oClassesList.fnGetData(oClassesList.fnGetPosition(anSelected[0]))[0];
            $.ajax({
                url: modelUrl + id,
                type: 'DELETE',
                complete: function(result) {
                    oClassesList.fnDeleteRow(anSelected[0]);
                    fcms.fnClearForm();
                    fcms.showMessage('L\'item a été effacé avec succès.');
                }
            });
        }
    });
    // -- Control Events
    // Add Button click handler

    // Delete Button click handler
    $('#categories_deleteItem').click( function() {
        var anSelected = fcms.fnGetSelected( oClassesList );
        if ( anSelected.length !== 0 ) {
            var id = oClassesList.fnGetData(oClassesList.fnGetPosition(anSelected[0]))[0];
            $.ajax({
                url: modelUrl + id,
                type: 'DELETE',
                complete: function(result) {
                    oClassesList.fnDeleteRow(anSelected[0]);
                    fcms.fnClearForm();
                    fcms.showMessage('L\'item a été effacé avec succès.');
                }
            });
        }
    });

    // Rows Select Event
    $("#classes_list tbody tr").click(function(event) {
        oAgegroupsList.fnClearTable()
        fcms.fnSelectClass($(this), oClassesForm);
    });

    // -- Agegroups list   ---------------------------------------------------------------------------------------------
    var oAgegroupsList = $('#agegroups_list').dataTable({
        "bInfo": false,
        "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
        "sPaginationType": "bootstrap" ,
        "oLanguage": {
            "sProcessing":     "Traitement en cours...",
            "sSearch":         "Rechercher&nbsp;:",
            "sLengthMenu":     "Afficher _MENU_ &eacute;l&eacute;ments",
            "sInfo":           "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
            "sInfoEmpty":      "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
            "sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
            "sInfoPostFix":    "",
            "sLoadingRecords": "Chargement en cours...",
            "sZeroRecords":    "Aucun &eacute;l&eacute;ment &agrave; afficher",
            "sEmptyTable":     "Aucune donnée disponible dans le tableau",
            "oPaginate": {
                "sFirst":      "Premier",
                "sPrevious":   "Pr&eacute;c&eacute;dent",
                "sNext":       "Suivant",
                "sLast":       "Dernier"
            },
            "oAria": {
                "sSortAscending":  ": activer pour trier la colonne par ordre croissant",
                "sSortDescending": ": activer pour trier la colonne par ordre décroissant"
            }
        }
    })

    // Agegroup Grid components
    $('#agegroups_list_wrapper .row-fluid:last .span6:first').html(
        // Add Agegroup Modal window
        "<div id='addAgegroup_modal' class='modal hide fade' tabindex='-1' role='dialog' aria-labelledby='addAgegroup_modal' aria-hidden='true'>" +
            "<div class='modal-header'>" +
                "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>" +
                "<h3 id='myModalLabel'>Ajouter un groupe d'âge</h3>" +
            "</div>" +
            "<div class='modal-body form-horizontal'>" +
                "<div class='control-group'>" +
                    "<label class='control-label'>Description</label>" +
                    "<div class='controls'>" +
                        "<textarea id='addAgegroup_modal_description' rows='3'></textarea>" +
                    "</div>" +
                "</div>" +
                 "<div class='control-group'>" +
                    "<label class='control-label'>Âge minimale</label>" +
                    "<div class='controls'>" +
                        "<input id='addAgegroup_modal_min' type='number' class='input-small control-hidden'>" +
                    "</div>" +
                "</div>" +
                "<div class='control-group'>" +
                    "<label class='control-label'>Âge maximale</label>" +
                    "<div class='controls'>" +
                        "<input id='addAgegroup_modal_max' type='number' class='input-small control-hidden'>" +
                    "</div>" +
                "</div>" +
                "<div class='control-group'>" +
                    "<label class='control-label'>Tarif ($)</label>" +
                    "<div class='controls'>" +
                        "<input id='addAgegroup_modal_fee' type='number' class='input-small control-hidden'>" +
                    "</div>" +
                "</div>" +
                "<div class='control-group'>" +
                    "<label class='control-label'>Durée maximale (mnin)</label>" +
                    "<div class='controls'>" +
                        "<input id='addAgegroup_modal_duration' type='number' class='input-small control-hidden'>" +
                    "</div>" +
                "</div>" +
            "</div>" +
            "<div class='modal-footer'>" +
                "<button id='addAgegroup_modal_addButton' class='btn btn-primary'>Ajouter le groupe d'âge</button>" +
                "<button class='btn' data-dismiss='modal' aria-hidden='true'>Annuler</button>" +
            "</div>" +
        "</div>" +

        // Buttons
        "<a id='agegroups_addItem' data-toggle='modal' class='btn btn-primary' href='#addAgegroup_modal'>Ajouter un groupe d'âges</a>" +
        "<a id='agegroups_deleteItem' class='btn' href='#'>Supprimer</a></div>" +
        "<a id='agegroups_saveItem' class='btn btn-primary control-hidden' href='#'>Enregistrer le groupe d'âge</a></div>" +

        // Item modified Modal window
        "<div id='itemModified_modal' class='modal hide fade' tabindex='-1' role='dialog' aria-labelledby='itemModified_modal' aria-hidden='true'>" +
            "<div class='modal-header'>" +
                "<h3 id='myModalLabel'>Groupe d'âge en cours d'édition</h3>" +
            "</div>" +
            "<div class='modal-body form-horizontal'>" +
                "<p>Un groupe d'âge est présentement en cours d'édition.<br />Avant d'éditer un nouveau groupe d'âge, désirez-vous enregistrer les modifications appliquées ?</p>" +
            "</div>" +
            "<div class='modal-footer'>" +
                "<button id='itemModified_modal_saveButton' class='btn'>Enregistrer les modifications</button>" +
                "<button id='itemModified_modal_cancelButton' class='btn' data-dismiss='modal' aria-hidden='true'>Annuler les modifications</button>" +
            "</div>" +
        "</div>"
    );

    $('#itemModified_modal_saveButton').click(function (e) {
        e.preventDefault();
        fcms.fnSaveEditedRow();
        fcms.fnHideItemModified();
    });

    $('#itemModified_modal_cancelButton').click(function (e) {
        fcms.fnEditButtons(false);
        oAgegroupsList.$('tr.row_edited').removeClass('row_edited');
    });

    //
    $('#agegroups_saveItem').click(function (e) {
        e.preventDefault();
        fcms.fnSaveEditedRow();
        fcms.fnHideItemModified();
    });

    // Button containers
    var oAgegroupsAddButton = $('#agegroups_addItem');
    var oAgegroupsDeleteButton = $('#agegroups_deleteItem');
    var oAgegroupsSaveButton = $('#agegroups_saveItem');

    // Modal window containers
    var mItemModified = $('#itemModified_modal');

    // Rows Select Event
    $('#agegroups_list tbody tr').click(function(event) {
        fcms.fnSelectAgegroup($(this));
    });

    // Rows Double click Event
    $('#agegroups_list tbody tr').dblclick(function(event) {
        fcms.fnEditableRow(oAgegroupsList, $(this));
    });

    fcms.fnSaveEditedRow = function (e) {
        var oRow = fcms.fnGetEdited(oAgegroupsList).first();
        var rowId = oRow.children().first().text();

        var oLabels = oRow.children().children('label');
        var oControls = oRow.children().children('input');
        var newAgegroup = {};

        var length = oControls.length;
        newAgegroup['id'] = rowId;
        for (var i = 0; i < length; i++) {
            newAgegroup[oControls[i].id] = oControls[i].value;
        }

        var paramsJSON = JSON.stringify((newAgegroup));

        $.ajax({
            url     : '/admin/agegroups/' + rowId,
            type    : 'put',
            dataType: 'json',
            data    : {"agegroup": paramsJSON},
            success : function (data) {
                fcms.fnEditButtons(false);
                var aItem = new Array();
                aItem.push(rowId);
                for (var i = 0;i < oControls.length; i++) {
                    if (oControls[i].id in data) {
                        aItem.push(data[oControls[i].id]);
                    }
                }

                oAgegroupsList.fnAddData(aItem);
                oAgegroupsList.fnDeleteRow(oRow[0]);

            },
            error   : function (xhr, err) {
                console.log("error");
            }
        });
    };

    // -- General grid functions    ------------------------------------------------------------------------------------
    fcms.fnGetSelected = function ( oTable ) {
        return oTable.$('tr.row_selected');
    };

    fcms.fnGetEdited = function ( oTable ) {
        return oTable.$('tr.row_edited');
    };

    fcms.fnClearForm = function ( oForm ) {
        $('#' + oForm.attr('id') + ' input').filter(function() { return this.id.match(re); }).each(
            function(){
                $(this).val('');
            }
        );
    };

    fcms.fnSelectAgegroup = function ( oRow ) {
        // If item is already editing
        if (oRow.hasClass('row_edited')) {
            return;
        }

        // If item is already selected
        else if (oRow.hasClass('row_selected')) {
            oRow.removeClass('row_selected');
        }

        // If item isn't already selected
        else {
            // If an item is currently editing
            if (oAgegroupsList.$('tr').hasClass('row_edited')) {
                fcms.fnShowItemModified();
            }

            // If another item is currently selected
            else if (oAgegroupsList.$('tr').hasClass('row_selected')) {
                oAgegroupsList.$('tr.row_selected').removeClass('row_selected');
            }

            oRow.addClass('row_selected');
        }
    };

    fcms.fnSelectClass = function ( oRow, oForm ) {
        // If item is already editing
        if (oRow.hasClass('row_edited')) {
            return;
        }

        // If item is already selected
        else if (oRow.hasClass('row_selected')) {
            oRow.removeClass('row_selected');
            if(oForm) fcms.fnClearForm(oForm);
        }

        // If item isn't already selected
        else {
            // If an item is currently editing
            if (oClassesList.$('tr').hasClass('row_edited')) {
                fcms.fnShowItemModified();
            }

            oClassesList.$('tr.row_selected').removeClass('row_selected');
            oRow.addClass('row_selected');
            var id = oRow.children().first().text();

            if (oForm) {
                $.ajax({
                    url     : modelUrl + id,
                    type    : 'GET',
                    dataType: 'json',
                    success : function( data ) {
                        $('#' + oForm.attr('id') + ' input').filter(function() { return this.id.match(re); }).each(
                            function(){
                                var field = $(this).attr('id').replace(modelName + "_", "");
                                if (field in data['category']) {
                                    $(this).val(data['category'][field]);
                                }
                            }
                        );

                        var oAgegroup = data['agegroups'];
                        for (var i = 0; i < oAgegroup.length; i++) {
                            var aItem = new Array();
                            aItem.push(oAgegroup[i]['id']);
                            aItem.push(oAgegroup[i]['description']);
                            aItem.push(oAgegroup[i]['min']);
                            aItem.push(oAgegroup[i]['max']);
                            aItem.push(oAgegroup[i]['fee']);
                            aItem.push(oAgegroup[i]['max_duration']);

                            var iRow = oAgegroupsList.fnAddData(aItem);
                            $(oAgegroupsList.fnGetNodes(iRow)).click( function(event) {
                                fcms.fnSelectAgegroup($(this))
                            });
                            $(oAgegroupsList.fnGetNodes(iRow)).dblclick( function(event) {
                                fcms.fnEditableRow(oAgegroupsList, $(this));
                            });

                            var oRowChild = $(oAgegroupsList.fnGetNodes(iRow)).children('td');

                            $(oRowChild[1]).empty();
                            $(oRowChild[1]).append('<label id="description">' + oAgegroup[i]['description'] + '</label>');
                            $(oRowChild[1]).append('<input id="description" type="text" class="input-xlarge control-hidden" placeholder="Description" value="' + oAgegroup[i]['description'] + '">');

                            $(oRowChild[2]).empty();
                            $(oRowChild[2]).append('<label id="min">' + oAgegroup[i]['min'] + '</label>');
                            $(oRowChild[2]).append('<input id="min" type="number" class="input-small control-hidden" value="' + oAgegroup[i]['min'] + '">');

                            $(oRowChild[3]).empty();
                            $(oRowChild[3]).append('<label id="max">' + oAgegroup[i]['max'] + '</label>');
                            $(oRowChild[3]).append('<input id="max" type="number" class="input-small control-hidden" value="' + oAgegroup[i]['max'] + '">');

                            $(oRowChild[4]).empty();
                            $(oRowChild[4]).append('<label id="fee">' + oAgegroup[i]['fee'] + '</label>');
                            $(oRowChild[4]).append('<input id="fee" type="number" class="input-small control-hidden" value="' + oAgegroup[i]['fee'] + '">');

                            $(oRowChild[5]).empty();
                            $(oRowChild[5]).append('<label id="max_duration">' + oAgegroup[i]['max_duration'] + '</label>');
                            $(oRowChild[5]).append('<input id="max_duration" type="number" class="input-small control-hidden" value="' + oAgegroup[i]['max_duration'] + '">');

                            console.log($(oAgegroupsList.fnGetNodes(iRow)));
                        }
                    }
                });
            }
        }
    };

    fcms.fnEditableRow = function (oTable, oRow) {
        // If item is already editing
        if (oRow.hasClass('row_edited')) {
            return;
        }

        // If item isn't already editing
        else {
            // If another item is already editing
            if (oTable.$('tr').hasClass('row_edited')) {
                fcms.fnShowItemModified();
            }

            // If no other item is already editing
            else {
                oRow.addClass('row_edited');
                fcms.fnEditButtons(true);
            }
        }
    };

    fcms.fnEditButtons = function ( hide ) {
        if (hide) {
            oAgegroupsAddButton.addClass('control-hidden');
            oAgegroupsDeleteButton.addClass('control-hidden');
            oAgegroupsSaveButton.removeClass('control-hidden');
        }
        else {
            oAgegroupsAddButton.removeClass('control-hidden');
            oAgegroupsDeleteButton.removeClass('control-hidden');
            oAgegroupsSaveButton.addClass('control-hidden');
        }

    };

    fcms.fnShowItemModified = function () {
        mItemModified.modal('show');
    };

    fcms.fnHideItemModified = function () {
        mItemModified.modal('hide');
    };
});