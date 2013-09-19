var table,
    displayedData = {},
    initialisedTable = false;

/**
    Finds the row with data for the given key in.
    @param {string} key The key to search for
    @returns The ID for the row with that key in
*/
function getRowID(key){
    var rowEl = $('#' + key);
    if( rowEl.length > 0 ){
        return rowEl.parent().parent()[0];
    } else {
        return Number.MAX_VALUE;
    }
}

/**
    Adds a row of data to the table.
    @param {string} key The key for the data
    @param {array} data The data to add
*/
function addRow(key, data){
    var rowID = table.fnAddData( data );
    displayedData[key] = data;
}

/**
    Updates a row of data to the table.
    @param {string} key The key for the data
    @param {array} data The data to update
*/
function updateRow(key, data){
    var rowID = getRowID(key);
    if( rowID !== Number.MAX_VALUE ){
        table.fnUpdate( data, rowID );
    }
    displayedData[key] = data;
}

/**
    Deletes a row of data in the table.
    @param {string} key The key for the data
*/
function deleteRow(key){
    var rowID = getRowID(key);
    if( rowID !== Number.MAX_VALUE ){
        table.fnDeleteRow( rowID );
    }
    delete displayedData[key];
}

/**
    Updates the table with data from a config object.
    @param {object} newData The new data that should be displayed in the table.
*/
function updateTable(newData){
    var key;
    // update with new data
    for(key in newData){
        if(displayedData[key]){
            updateRow(key, newData[key]);
        } else {
            addRow(key, newData[key]);
        }
    }

    // remove data that has gone
    for(key in displayedData){
        if(!newData[key]){
            deleteRow(key);
        }
    }
}

/**
    Parses the hash (fragment) in the current URL.
    @returns {object} An object representing the parsed hash
*/
function parseHash(){
    return JSON.parse(location.hash.substring(1));
}

/**
    Initialises the table.
    @param {object} configData The data to use to configure the table
*/
function initTable(configData){
    // set up columns
    if( configData.columnNames instanceof Array ){
        $('#dataTable')
        .append(
            $(document.createElement('thead'))
            .append(
                $(document.createElement('tr'))
            )
        );
        var headerRow = $('#dataTable thead tr');
        configData.columnNames.forEach(function( columnName ){
            headerRow.append(
                $(document.createElement('th'))
                .text(columnName)
            );
        });
    }
    var allowedDataConfigNames = [
        'aoColumns',
        'bPaginate',
        'sScrollY',
        'sPaginationType',
        'aaSorting',
        'bDestroy',
        'bJQueryUI',
        'bAutoWidth'
    ],
        tableConfig = {};

    allowedDataConfigNames.forEach(function(allowedType){
        if( configData[allowedType] ){
            tableConfig[allowedType] = configData[allowedType];
        }
    });

    table = $('#dataTable').dataTable(tableConfig);

    initialisedTable = true;
}

/**
    Handles a changed URL hash.
*/
function handleChangedHash(){
    var parsedHash = parseHash(),
        tableData = parsedHash.data,
        configData = parsedHash.tableConfig;
    
    if( !initialisedTable && configData && typeof configData === 'object' ){
        initTable(configData);
    }

    if( initialisedTable && tableData && typeof tableData === 'object' ){
        updateTable(tableData);
    }
}

$(function() {
    if( jQuery.fn.dataTableExt ){
        jQuery.fn.dataTableExt.oSort['percent-asc'] = function(a,b) {
            var x = (a == '-') ? 0 : a.replace( /%/, '' );
            var y = (b == '-') ? 0 : b.replace( /%/, '' );
            x = parseFloat( x );
            y = parseFloat( y );
            return ((x < y) ? -1 : ((x > y) ?  1 : 0));
        };
        jQuery.fn.dataTableExt.oSort['percent-desc'] = function(a,b) {
            var x = (a == '-') ? 0 : a.replace( /%/, '' );
            var y = (b == '-') ? 0 : b.replace( /%/, '' );
            x = parseFloat( x );
            y = parseFloat( y );
            return ((x < y) ?  1 : ((x > y) ? -1 : 0));
        };

        // modified version of the currency plugin http://www.datatables.net/plug-ins/sorting
        jQuery.fn.dataTableExt.oSort['currency-asc'] = function(a,b) {
            // Remove any commas (assumes that if present all strings will have a fixed number of d.p)
            var x = a == '-' ? 0 : a.replace( /,/g, '' );
            var y = b == '-' ? 0 : b.replace( /,/g, '' );

            // Remove the currency sign
            x = x.match( /[\d\.]+/ )[0];
            y = y.match( /[\d\.]+/ )[0];

            // Parse and return
            x = parseFloat( x );
            y = parseFloat( y );
            return x - y;
        };
        jQuery.fn.dataTableExt.oSort['currency-desc'] = function(a,b) {
            // Remove any commas (assumes that if present all strings will have a fixed number of d.p)
            var x = a == '-' ? 0 : a.replace( /,/g, '' );
            var y = b == '-' ? 0 : b.replace( /,/g, '' );

            // Remove the currency sign
            x = x.match( /[\d\.]+/ )[0];
            y = y.match( /[\d\.]+/ )[0];

            // Parse and return
            x = parseFloat( x );
            y = parseFloat( y );
            return y - x;
        };
    }

    $(window).bind('hashchange', function(e){
        handleChangedHash();
    });

    handleChangedHash();
});
