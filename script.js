$(document).ready(function() {
    // Variables to keep track of items and the total
    var items = [];
    var total = 0;

    // Event handler to add a new item row
    $('#add-item').click(function() {
        // Create a new row
        var newRow = $('<tr>');
        newRow.append('<td><input type="text" class="item-name" placeholder="Item"></td>');
        newRow.append('<td><input type="text" class="item-description" placeholder="Description"></td>');
        newRow.append('<td><input type="number" class="item-quantity" placeholder="Quantity" value="1"></td>');
        newRow.append('<td><input type="number" class="item-price" placeholder="Price"></td>');
        newRow.append('<td class="item-subtotal">0.00</td>');

        // Append the row to the table
        $('#invoice-items tbody').append(newRow);

        // Event handler to update the subtotal and total when values change
        $('.item-quantity, .item-price').on('input', function() {
            updateItemSubtotal(newRow);
            updateInvoiceTotal();
        });
    });

    // Function to update the subtotal for an item
    function updateItemSubtotal(row) {
        var quantity = parseFloat(row.find('.item-quantity').val());
        var price = parseFloat(row.find('.item-price').val());
        var itemSubtotal = quantity * price || 0;
        row.find('.item-subtotal').text(itemSubtotal.toFixed(2));
    }

    // Function to update the total for the entire invoice
    function updateInvoiceTotal() {
        var newTotal = 0;
        $('.item-subtotal').each(function() {
            newTotal += parseFloat($(this).text());
        });
        total = newTotal;
        $('#invoice-total').text('Total: $' + total.toFixed(2));
    }

    // Event handler to generate the invoice
    $('#generate-invoice').click(function() {
        // Collect data from the form and create the invoice
        items = [];
        $('.item-name').each(function(index) {
            items.push({
                name: $(this).val(),
                description: $(this).closest('tr').find('.item-description').val(),
                quantity: parseFloat($(this).closest('tr').find('.item-quantity').val()),
                price: parseFloat($(this).closest('tr').find('.item-price').val())
            });
        });

        // Optionally, you can send this data to a server for further processing or storage.

        // Clear the form
        $('#invoice-items tbody').empty();

        // Reset the total
        total = 0;
        $('#invoice-total').text('Total: $0.00');
    });
});

$(document).ready(function() {
    // ... (previous code)

    // Event handler to print the invoice
    $('#print-invoice').click(function() {
        // Use the browser's print functionality to print the invoice
        window.print();
    });
});
